
const HEALTH_KEY = "consentment-RGPD";
const VERSION = "1.1";

export function hasHealthConsent(): boolean {
  try {
    const stored = localStorage.getItem(HEALTH_KEY);
    if (!stored) return false;

    const consent = JSON.parse(stored);

    return (
      consent?.accepted === true &&
      consent?.version === VERSION
    );
  } catch {
    return false;
  }
}

export function saveHealthConsent(): void {
  localStorage.setItem(
    HEALTH_KEY,
    JSON.stringify({
      accepted: true,
      version: VERSION,
      date: new Date().toISOString(),
    })
  );

  window.dispatchEvent(new Event("consent-updated"));
}

export function withdrawHealthConsent(): void {
  localStorage.removeItem(HEALTH_KEY);
  window.dispatchEvent(new Event("consent-updated"));
}
