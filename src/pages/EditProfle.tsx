
import { useRef, useState } from "react";
import type { FormEvent } from "react";

import Navbar from "../components/Navbar";
import { apiService } from "../services/apiService";
import type { ProfileUser } from "../services/apiService";
import defaultProfile from "../assets/images/DefaultProfile.webp";
import AvatarCrepusRose from "../assets/images/01-crepus-rose.webp";
import AvatarCrepusNoir from "../assets/images/02-crepus-noir.webp";

import AvatarBouclesRousses from "../assets/images/03-boucles-claires.webp";
import AvatarBouclesBrunes from "../assets/images/04-boucles-brunes.webp";

import AvatarLissesNoirs from "../assets/images/05-lisses-noirs.webp";
import AvatarLissesRoses from "../assets/images/06-lisses-roses.webp";

import AvatarTressesNoires from "../assets/images/07-tresses-noires.webp";
import AvatarTressesCuivrees from "../assets/images/08-tresses-cuivrees.webp";

import AvatarCoupeArgentee from "../assets/images/09-courts-argentes.webp";
import AvatarCoupeCourte from "../assets/images/10-courts-noirs.webp";

import AvatarHijabBordeaux from "../assets/images/11-hijab-bordeaux.webp";
import AvatarHijabRose from "../assets/images/12-hijab-rose.webp";

import AvatarLunettesRondes from "../assets/images/13-lunettes-rondes.webp";
import AvatarLunettesEcaille from "../assets/images/14-lunettes-ecaille.webp";

import AvatarJeuneChatain from "../assets/images/imageBlonde1.webp";
import AvatarJeuneBlonde from "../assets/images/imageBlonde2.webp";
import AvatarJeuneBoucles from "../assets/images/imageBlonde3.webp";
import AvatarJeuneCheveuxNoirs from "../assets/images/imageBlonde4.webp";

import "../styles/pages/editProfile.scss";

import "../styles/pages/setting.scss";
import "../styles/pages/home.scss";

const avatars = [AvatarCrepusRose, AvatarCrepusNoir, AvatarBouclesRousses, AvatarBouclesBrunes, AvatarLissesNoirs, AvatarLissesRoses, AvatarTressesNoires, AvatarTressesCuivrees, AvatarCoupeArgentee, AvatarCoupeCourte, AvatarHijabBordeaux, AvatarHijabRose, AvatarLunettesRondes, AvatarLunettesEcaille, AvatarJeuneChatain, AvatarJeuneBlonde, AvatarJeuneBoucles, AvatarJeuneCheveuxNoirs];

function getStoredUser(): ProfileUser | null {
    try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) 
            return null;

        const parsed = JSON.parse(storedUser);

        if (!parsed || typeof parsed !== "object") 
            return null;
// à simplifier
        const id =
            typeof parsed.id === "number"
                ? parsed.id
                : typeof parsed.id === "string" && parsed.id.trim()
                    ? Number(parsed.id)
                    : NaN;
// à simplifier
        if (
            !Number.isSafeInteger(id) ||
            id <= 0 ||
            typeof parsed.pseudo !== "string" ||
            typeof parsed.email !== "string"
        ) {
            return null;
        }

        return {
            id,
            pseudo: parsed.pseudo,
            email: parsed.email,
            avatar_url: typeof parsed.avatar_url === "string" ? parsed.avatar_url : null,
        };
    } catch {
        return null;
    }
}

function getInitialAvatar(user: ProfileUser | null): string {
    if (user?.avatar_url) return user.avatar_url;

    try {
        const savedAvatar = localStorage.getItem("companionAvatar");

        if (savedAvatar !== null && savedAvatar !== "") {
            const index = Number(savedAvatar);

            if (Number.isInteger(index) && index >= 0 && index < avatars.length) {
                return avatars[index];
            }
        }
    } catch {
        // Utiliser le premier compagnon si le stockage est indisponible.
    }

    return avatars[0];
}

export default function EditProfile() {
    const [user, setUser] = useState<ProfileUser | null>(getStoredUser);
    const [pseudo, setPseudo] = useState(user?.pseudo ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [selectedAvatar, setSelectedAvatar] = useState(() => getInitialAvatar(user));
    const [openSection, setOpenSection] = useState<"avatars" | "informations" | null >(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const submitting = useRef(false);

    const handleAvatarChange = (avatar: string) => {
        setSelectedAvatar(avatar);
        setMessage("");
        setError("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user || submitting.current) return;

        setMessage("");
        setError("");

        const cleanPseudo = pseudo.trim();
        const cleanEmail = email.trim();

        if (!cleanPseudo || !cleanEmail) {
            setError("Le pseudo et l’email sont obligatoires.");
            return;
        }

        submitting.current = true;
        setIsSaving(true);

        try {
            const updatedUser = await apiService.updateProfile({
                pseudo: cleanPseudo,
                email: cleanEmail,
                avatar_url: selectedAvatar,
            });

            setUser(updatedUser);
            setPseudo(updatedUser.pseudo);
            setEmail(updatedUser.email);
            setSelectedAvatar(updatedUser.avatar_url || defaultProfile);

            try {
                localStorage.setItem("user", JSON.stringify(updatedUser));

                const avatarIndex = avatars.indexOf(updatedUser.avatar_url ?? "");

                if (avatarIndex >= 0) {
                    localStorage.setItem("companionAvatar", String(avatarIndex));
                } else {
                    localStorage.removeItem("companionAvatar");
                }
            } catch {
                setMessage("Profil enregistré sur le serveur, mais le stockage local n’a pas pu être actualisé.");
                return;
            }

            setMessage("Modifications enregistrées.");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Impossible d’enregistrer les modifications."
            );
        } finally {
            submitting.current = false;
            setIsSaving(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="edit-profile">
                <h1>Modifier mon profil</h1>

                {user ? (
                    <>
                        <div className="profile-avatar">
                            <img src={selectedAvatar || defaultProfile} alt="Mon compagnon BADDIES" className="settings-avatar" />
                        </div>

                        
                    <form className="profile-form" onSubmit={handleSubmit} aria-busy={isSaving} >
  <div className="collapseDiv">
    <div className="collapse">
      <button type="button" id="avatars-trigger" className="collapse-trigger" aria-expanded={openSection === "avatars"} aria-controls="avatars-panel" onClick={() => setOpenSection((current) => current === "avatars" ? null : "avatars" ) } >
        <span>Choisir ma photo de profil</span>
        <span aria-hidden="true">
          {openSection === "avatars" ? "−" : "+"}
        </span>
      </button>

      <div id="avatars-panel" hidden={openSection !== "avatars"} >
        <div className="avatar-list" role="group" aria-labelledby="avatars-trigger" >
          {avatars.map((avatar, index) => (
            <button type="button" key={avatar} onClick={() => handleAvatarChange(avatar)} className={`settings-avatar ${ selectedAvatar === avatar ? "selected" : "" }`} aria-label={`Choisir l’avatar ${index + 1}`} aria-pressed={selectedAvatar === avatar} disabled={isSaving} >
              <img src={avatar} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="collapse">
      <button type="button" id="informations-trigger" className="collapse-trigger" aria-expanded={openSection === "informations"} aria-controls="informations-panel" onClick={() => setOpenSection((current) => current === "informations" ? null : "informations" ) } >
        <span>Modifier mes informations</span>
        <span aria-hidden="true">
          {openSection === "informations" ? "−" : "+"}
        </span>
      </button>

      <div id="informations-panel" hidden={openSection !== "informations"} >
        <div className="profile-fields">
          <label htmlFor="pseudo">Pseudo</label>
          <input id="pseudo" name="pseudo" type="text" autoComplete="nickname" value={pseudo} onChange={(event) => setPseudo(event.target.value)} disabled={isSaving} required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isSaving} required />
        </div>
      </div>
    </div>
  </div>

  <div className="btn-container">
    <button className="btn" type="submit" disabled={isSaving}>
      {isSaving ? "Enregistrement…" : "Enregistrer les modifications"}
    </button>
  </div>

  {error && <p role="alert">{error}</p>}
                    </form>

                        {message && <p role="status">{message}</p>}
                    </>
                ) : (
                    <p>Connecte-toi pour modifier ton profil.</p>
                )}

            </main>
        </>
    );
}
