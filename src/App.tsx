import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { EvaluationProvider } from "./evaluation/evaluationContext";
import NotFound from "./pages/NotFound";
import Notice from "./pages/legaleNotice";
import SessionExpiredModal from "./components/SessionExpiredModal"

// Pages principales
const Country = lazy(() => import("./pages/Country"));
const Home = lazy(() => import("./pages/Home"));

// Évaluation des douleurs
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

function RequireCountry() {
  const country = localStorage.getItem("country");
  const hasCountry = country === "Mada" || country === "France";

  return hasCountry ? <Outlet /> : <Navigate to="/Country" replace />;
}

export default function App() {
  return (
    <EvaluationProvider>
      <SessionExpiredModal/>
      <Suspense fallback={ 
          <main className="loading1" role="status" aria-label="Connexion en cours">
        <div className="container">
            <div className="content">
                <div className="heart-rate">
                    <svg viewBox="0 0 150 73" height="73" width="150" aria-hidden="true">
                        <polyline
                            points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                            fill="none"
                            strokeMiterlimit={10}
                            strokeWidth={3}
                        />
                    </svg>

                    <div className="fade-in"></div>
                    <div className="fade-out"></div>
                </div>
            </div>
            <p className="loading-text" aria-hidden="true">Chargement...</p>
        </div>
      </main>
        
        }>
        <Routes>
          <Route path="/" element={<Navigate to="/Country" replace />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/emergencyContact" element={<Urgency />} />
          <Route element={<RequireCountry />}>
            <Route path="/Home" element={<Home />} />
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
            <Route path="/Setting" element={<Settings />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/EditProfle" element={<Navigate to="/EditProfile" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/LegaleNotice" element={<Notice />} />
        </Routes>
      </Suspense>
    </EvaluationProvider>
  );
}