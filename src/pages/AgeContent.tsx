import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import "../styles/pages/age.scss";

const ages = [
  {
    id: "-12ans",
    label: "Moins de 12 ans"
  },
  {
    id: "12-14ans",
    label: "De 12 à 14 ans"
  },
  {
    id: "+15ans",
    label: "15 ans et plus"
  },
];

export default function Age() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [savedAge] = useState(() =>
    localStorage.getItem("baddies-age")
  );
  const navigate = useNavigate();

  const hasSavedAge = ages.some((item) => item.id === savedAge);

  useEffect(() => {
    if (hasSavedAge) {
      navigate("/Home", { replace: true });
    }
  }, [hasSavedAge, navigate]);

  const handleContinue = () => {
    if (!selectedAge)
      return;

    localStorage.setItem("baddies-age", selectedAge);
    navigate("/Home", { replace: true });
  };

  if (hasSavedAge)
    return null;

  return (
    <main className="age-page">
      <section className="age-card" aria-labelledby="age-title">

        <h1 id="age-title">Quel âge avez-vous ?</h1>

        <p className="age-description">
          Choisissez votre tranche d’âge pour adapter votre parcours.
        </p>

        <div role="group" aria-labelledby="age-title" className="age-options">
          {ages.map((item) => {
            const isSelected = selectedAge === item.id;

            return (
              <button key={item.id} type="button"
                className={`age-option${isSelected
                  ? " is-selected"
                  : ""}`
                }
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedAge(item.id)
                }
              >

                <span>{item.label}</span>

                <span className="age-indicator" aria-hidden="true">
                  {isSelected && <Check size={18} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>

        <button type="button" className="age-continue" onClick={handleContinue} disabled={!selectedAge}>
          Continuer
        </button>
      </section>
    </main>
  );
}