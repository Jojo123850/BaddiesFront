
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Clé utilisée pour mémoriser le choix de l'utilisatrice
const CONSENT_KEY = "baddies-analytics-consent";

type Consent = "accepted" | "refused";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
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
    // Empêche les futurs événements via notre module
    initialized = false;

    // Désactive les prochaines collectes via gtag
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }
}

// Charge Google Analytics uniquement après consentement
export function initAnalytics(): void {
  if (!hasAnalyticsConsent() || initialized || !GA_ID) {
    return;
  }

  initialized = true;

  window.dataLayer = window.dataLayer || [];

  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
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
