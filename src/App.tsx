
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { EvaluationProvider } from "./evaluation/evaluationContext";
import NotFound from "./pages/NotFound";
import Notice from "./pages/legaleNotice";
import SessionExpiredModal from "./components/SessionExpiredModal";
import Privacy from "./pages/PrivacyPolicy";
import CGU from "./pages/CGU";
import { DataPrivacy } from "./components/Dataprivacy";
import ImmediateHelp from "./pages/ImmediateHelp";
import AnalyticsConsent from "./components/AnalyticsConsent.tsx";

import {
  ANALYTICS_CONSENT_CHANGED,
  hasAnalyticsConsent,
  initAnalytics,
  trackPageView,
} from "./services/analytics";

import { hasHealthConsent } from "./services/healthConsent.ts";

// Pages principales
const Country = lazy(() => import("./pages/Country"));
const Home = lazy(() => import("./pages/Home"));
const Age = lazy(() => import("./pages/AgeContent"));

// Évaluation
const Analyse = lazy(() => import("./pages/Analyse"));
const ZoneP = lazy(() => import("./pages/Zone"));
const Localisation = lazy(() => import("./pages/Localisation"));
const Recap = lazy(() => import("./pages/Recap"));
const RulesAlert = lazy(() => import("./pages/Rules"));
const MedicalAlert = lazy(() => import("./pages/MedicalAlert"));
const Solution = lazy(() => import("./pages/Solution"));

// Authentification
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);

const ResetPassword = lazy(() =>
  import("./components/ResetPassword").then((module) => ({
    default: module.ResetPassword,
  }))
);

// Historique et suivi
const History = lazy(() =>
  import("./components/History").then((module) => ({
    default: module.History,
  }))
);

const Episode = lazy(() => import("./pages/Episode"));
const Tracking = lazy(() => import("./pages/Tracking"));

// Profil et urgence
const Settings = lazy(() => import("./pages/Setting"));
const EditProfile = lazy(() => import("./pages/EditProfle"));
const Urgency = lazy(() => import("./pages/EmergencyContact"));

// Vérification du pays et de l'âge
function RequireCountryAndAge() {
  const country = localStorage.getItem("country");
  const age = localStorage.getItem("baddies-age");

  if (country !== "France" && country !== "Mada") {
    return <Navigate to="/Country" replace />;
  }

  if (
    age !== "-12ans" &&
    age !== "12-14ans" &&
    age !== "+15ans"
  ) {
    return <Navigate to="/AgeContent" replace />;
  }

  return <Outlet />;
}

// Redirection au démarrage
function StartRedirection() {
  const country = localStorage.getItem("country");
  const age = localStorage.getItem("baddies-age");

  if (country !== "France" && country !== "Mada") {
    return <Navigate to="/Country" replace />;
  }

  if (
    age !== "-12ans" &&
    age !== "12-14ans" &&
    age !== "+15ans"
  ) {
    return <Navigate to="/AgeContent" replace />;
  }

  return <Navigate to="/Home" replace />;
}

// Protection des fonctionnalités 15+
function RequireAge() {
  const age = localStorage.getItem("baddies-age");

  if (age !== "+15ans") {
    return <Navigate to="/ImmediateHelp" replace />;
  }

  return <Outlet />;
}

// Protection des données de santé
function RequireHealthConsent() {
  const [consentGranted, setConsentGranted] = useState(
    () => hasHealthConsent()
  );

  useEffect(() => {
    const updateConsent = () => {
      setConsentGranted(hasHealthConsent());
    };

    window.addEventListener("consent-updated", updateConsent);
    window.addEventListener("storage", updateConsent);

    updateConsent();

    return () => {
      window.removeEventListener("consent-updated", updateConsent);
      window.removeEventListener("storage", updateConsent);
    };
  }, []);

  if (!consentGranted) {
    return <Navigate to="/DataPrivacy" replace />;
  }

  return <Outlet />;
}

// Bandeau après sélection du pays et de l'âge
function ConsentManager() {
  const location = useLocation();

  const country = localStorage.getItem("country");
  const age = localStorage.getItem("baddies-age");

  const validCountry =
    country === "France" || country === "Mada";

  const validAge =
    age === "-12ans" ||
    age === "12-14ans" ||
    age === "+15ans";

  if (
    location.pathname.toLowerCase() !== "/home" ||
    !validCountry ||
    !validAge
  ) {
    return null;
  }

  return <AnalyticsConsent />;
}

// Suivi des pages publiques
function AnalyticsTracker() {
  const location = useLocation();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    const trackCurrentPage = () => {
      if (!hasAnalyticsConsent()) {
        lastPage.current = null;
        return;
      }
      initAnalytics();
      if (lastPage.current === location.pathname) return;
      trackPageView(location.pathname);
      lastPage.current = location.pathname;
    };
    trackCurrentPage();
    window.addEventListener(ANALYTICS_CONSENT_CHANGED, trackCurrentPage);
    return () => window.removeEventListener(ANALYTICS_CONSENT_CHANGED, trackCurrentPage);
  }, [location.pathname]);

  return null;
}

// Animation de chargement
function LoadingScreen() {
  return (
    <main className="loading1" role="status" aria-label="Chargement en cours" >
      <div className="container">
        <div className="content">
          <div className="heart-rate">
            <svg viewBox="0 0 150 73" height="73" width="150" aria-hidden="true" >
              <polyline points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486" fill="none" strokeMiterlimit={10} strokeWidth={3} />
            </svg>
            <div className="fade-in"></div>
            <div className="fade-out"></div>
          </div>
        </div>
        <p className="loading-text" aria-hidden="true">
          Chargement...
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <EvaluationProvider>
      <SessionExpiredModal />

      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Première ouverture */}
          <Route path="/" element={<StartRedirection />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/AgeContent" element={<Age />} />

          {/* Aide et informations accessibles à tous */}
          <Route path="/ImmediateHelp" element={<ImmediateHelp />} />
          <Route path="/emergencyContact" element={<Urgency />} />
          <Route path="/LegaleNotice" element={<Notice />} />
          <Route path="/PrivacyPolicy" element={<Privacy />} />
          <Route path="/CGU" element={<CGU />} />

          {/* Vérification du pays et de l'âge */}
          <Route element={<RequireCountryAndAge />}>
            <Route path="/Home" element={<Home />} />

            {/* Paramètres accessibles à tous les âges */}
            <Route path="/Setting" element={<Settings />} />

            {/* Fonctionnalités réservées aux 15+ */}
            <Route element={<RequireAge />}>

              {/* Consentement aux données de santé */}
              <Route path="/DataPrivacy" element={<DataPrivacy />} />

              {/* Évaluation, historique et suivi */}
              <Route element={<RequireHealthConsent />}>
                <Route path="/analyse" element={<Analyse />} />
                <Route path="/Zone" element={<ZoneP />} />
                <Route path="/Localisation" element={<Localisation />} />
                <Route path="/Recapitulatif" element={<Recap />} />
                <Route path="/Analyse-reponse" element={<RulesAlert />} />
                <Route path="/Alerte" element={<MedicalAlert />} />
                <Route path="/Solution" element={<Solution />} />

                <Route path="/Historique" element={<History />} />
                <Route path="/Historique/:id" element={<Episode />} />
                <Route path="/Suivi" element={<Tracking />} />
              </Route>

              {/* Authentification */}
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />

              {/* Profil */}
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/EditProfle" element={ <Navigate to="/EditProfile" replace /> } />
            </Route>
          </Route>

          {/* Page inexistante */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ConsentManager />
      <AnalyticsTracker />
    </EvaluationProvider>
  );
}
