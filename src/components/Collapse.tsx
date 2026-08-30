import { useState } from "react";

export default function Collapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string | null>("ios");

  const contenus: Record<string, string[]> = {
    ios: ["1   Ouvrez Baddies dans Safari", "2    Appuyez sur l'icône partager", "3   Sélectionnez Sur l'écran d'accueil"],
    android: ["1    Ouvrez Baddies dans Android", "2    Appuyez sur l'icône partager", "3   Sélectionnez Sur l'écran d'accueil"],
    ordinateur: ["1 Ouvrez Baddies dans ordi", "2   Appuyez sur l'icône partager", "3   Sélectionnez Sur l'écran d'accueil"],
  };

  const handleClick = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setContent(key);
    setIsOpen(true);
  };

  return (
    <div className="collapse" onClick={() => setIsOpen(!isOpen)}>
      <div className="collapsediv">
        <p aria-expanded={isOpen}>Installable pour un usage hors ligne</p>
        <i className={`fa-solid fa-square-caret-${isOpen ? "up" : "down"}`}></i>
      </div>

      {isOpen && (
        <>
          <div className="btnCollapse">
            <button className="btn1" onClick={(e) => handleClick(e, "ios")}>IOS</button>
            <button className="btn1" onClick={(e) => handleClick(e, "android")}>Android</button>
            <button className="btn1" onClick={(e) => handleClick(e, "ordinateur")}>Ordinateur</button>
          </div>

          {content && (
            <ul className="ulCollapse">
              {contenus[content].map((item, index) => (
                <li key={index}>
                  {item}
                  {index < contenus[content].length - 1 && <hr className="hrCollapse" />}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}