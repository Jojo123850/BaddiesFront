import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../src/services/analytics.ts', import.meta.url), 'utf8');
function setup(debug = false, id = 'G-Q1F6WRV1N4') {
  const values = new Map();
  const scripts = [];
  const events = [];
  const window = { dispatchEvent: event => events.push(event.type) };
  const code = stripTypeScriptTypes(source
    .replaceAll('import.meta.env.VITE_GA_MEASUREMENT_ID', JSON.stringify(id))
    .replaceAll('import.meta.env.VITE_GA_DEBUG_MODE', JSON.stringify(String(debug)))
    .replaceAll('export ', ''));
  const api = runInNewContext(`${code}\n({initAnalytics, saveAnalyticsConsent, trackPageView})`, {
    window, Event, localStorage: {
      getItem: key => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    }, document: { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } },
  });
  return { api, window, scripts, events };
}

for (const debug of [false, true]) {
  const { api, window, scripts, events } = setup(debug);
  api.initAnalytics();
  api.trackPageView('/Home');
  assert.equal(scripts.length, 0, 'No tag before consent');
  api.saveAnalyticsConsent('accepted');
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].src, /id=G-Q1F6WRV1N4$/);
  assert.equal(Object.prototype.toString.call(window.dataLayer[0]), '[object Arguments]');
  const config = window.dataLayer.find(entry => entry[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.debug_mode, debug ? true : undefined);
  const before = window.dataLayer.length;
  api.trackPageView('/AgeContent');
  api.trackPageView('/Recap');
  assert.equal(window.dataLayer.length, before, 'Excluded pages stay excluded');
  api.trackPageView('/Home');
  assert.equal(window.dataLayer.at(-1)[1], 'page_view');
  api.saveAnalyticsConsent('refused');
  assert.equal(window['ga-disable-G-Q1F6WRV1N4'], true);
  const refused = window.dataLayer.length;
  api.trackPageView('/Home');
  assert.equal(window.dataLayer.length, refused);
  api.saveAnalyticsConsent('accepted');
  assert.equal(scripts.length, 1, 'Reacceptance reuses the tag');
  assert.equal(window['ga-disable-G-Q1F6WRV1N4'], false);
  assert.equal(window.dataLayer.at(-1)[2].analytics_storage, 'granted');
  assert.equal(events.length, 3);
}
const missing = setup(false, '');
missing.api.saveAnalyticsConsent('accepted');
assert.equal(missing.scripts.length, 0);
console.log('Analytics: consent, command format, destination, debug, page allowlist and reacceptance passed.');
