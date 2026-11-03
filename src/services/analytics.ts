
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const DEBUG_MODE = import.meta.env.VITE_GA_DEBUG_MODE === "true";
export const ANALYTICS_CONSENT_CHANGED = "analytics-consent-changed";

// Clé utilisée pour mémoriser le choix de l'utilisatrice
const CONSENT_KEY = "baddies-analytics-consent";

type Consent = "accepted" | "refused";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let initialized = false;

// Vérifie si les statistiques sont autorisées
export function hasAnalyticsConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

// Enregistre le choix de l'utilisatrice
export function saveAnalyticsConsent(choice: Consent): void {
  localStorage.setItem(CONSENT_KEY, choice);

  if (choice === "accepted") {
    initAnalytics();
  } else {
    // Bloque également les collectes automatiques du tag déjà chargé.
    if (GA_ID) window[`ga-disable-${GA_ID}`] = true;

    // Désactive les prochaines collectes via gtag
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGED));
}

// Charge Google Analytics uniquement après consentement
export function initAnalytics(): void {
  if (!hasAnalyticsConsent() || !GA_ID) {
    return;
  }

  const wasDisabled = window[`ga-disable-${GA_ID}`] === true;
  window[`ga-disable-${GA_ID}`] = false;
  if (initialized) {
    if (wasDisabled) {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    return;
  }

  initialized = true;

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    // gtag.js attend le format de la fonction gtag officielle.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  // Consentement limité aux statistiques
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("js", new Date());

  // Désactive les pages vues automatiques
  window.gtag("config", GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(DEBUG_MODE ? { debug_mode: true } : {}),
  });

  const script = document.createElement("script");
  script.async = true;
  script.src =
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;

  document.head.appendChild(script);
}

// Envoie uniquement les pages publiques autorisées
export function trackPageView(path: string): void {
  if (!hasAnalyticsConsent() || !initialized || !window.gtag) {
    return;
  }

  const allowedPages = [
    "/Home",
    "/ImmediateHelp",
  ];

  if (!allowedPages.includes(path)) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_title:
      path === "/Home" ? "Accueil" : "Premiers gestes",
  });
}
