
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { EvaluationProvider } from "./evaluation/evaluationContext";

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

export default function App() {
  return (
    <EvaluationProvider>
      <Suspense
        fallback={
          <div className="loading1" role="status">
            Chargement...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Country />} />

          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/Analyse" element={<Analyse />} />
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
          <Route path="/EditProfle" element={<EditProfile />} />
          <Route path="/emergencyContact" element={<Urgency />} />
        </Routes>
      </Suspense>
    </EvaluationProvider>
  );
}
