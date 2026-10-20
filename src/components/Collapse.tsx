
import { useState } from "react";
import {
  ChevronDown,
  Smartphone,
  Monitor,
  Download,
  CheckCircle2
} from "lucide-react";

type Platform = "ios" | "android" | "ordinateur";

export default function Collapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Platform>("ios");

  const contenus: Record<Platform, string[]> = {
    ios: [
      "Ouvrez BADDIES dans Safari.",
      "Appuyez sur le bouton Partager.",
      "Choisissez « Sur l'écran d'accueil », puis confirmez."
    ],
    android: [
      "Ouvrez BADDIES dans Chrome.",
      "Appuyez sur le menu ⋮ du navigateur.",
      "Choisissez « Installer l'application » ou « Ajouter à l'écran d'accueil »."
    ],
    ordinateur: [
      "Ouvrez BADDIES dans Chrome ou Edge.",
      "Cliquez sur l'icône d'installation dans la barre d'adresse, si elle apparaît.",
      "Confirmez l'installation."
    ]
  };

  const plateformes = [
    { id: "ios", label: "iOS", icon: Smartphone },
    { id: "android", label: "Android", icon: Smartphone },
    { id: "ordinateur", label: "Ordinateur", icon: Monitor }
  ] as const;

  return (
    <div className="collapse">
      <button
        type="button"
        className="collapse-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="collapse-installation"
      >
        <span className="collapse-heading">
          <span className="collapse-icon">
            <Download size={20} />
          </span>

          <span className="collapse-title">
            <strong>Installer BADDIES</strong>
            <small>Pour une utilisation hors ligne</small>
          </span>
        </span>

        <ChevronDown
          size={20}
          className={`collapse-chevron ${isOpen ? "open" : ""}`}
        />
      </button>

      {isOpen && (
        <div id="collapse-installation" className="collapse-content">
          <p className="collapse-description">
            Choisissez votre appareil pour découvrir
            comment installer BADDIES.
          </p>

          <div className="btnCollapse">
            {plateformes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`btnChoice ${content === id ? "selected" : ""}`}
                onClick={() => setContent(id)}
                aria-pressed={content === id}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <ol className="installation-steps">
            {contenus[content].map((item, index) => (
              <li key={index}>
                <span className="step-number">{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>

          <div className="collapse-note">
            <CheckCircle2 size={18} />
            <p>
              Une fois installée et ses ressources mises en cache,
              BADDIES peut être utilisée hors ligne pour
              les fonctionnalités prévues à cet effet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
