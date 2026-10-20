
import { useRef, useState } from "react";
import type { FormEvent } from "react";

import Navbar from "../components/Navbar";
import { apiService } from "../services/apiService";
import type { ProfileUser } from "../services/apiService";

import defaultProfile from "../assets/images/DefaultProfile.webp";
import MochiCol1 from "../assets/images/MochiCol.webp";
import MochiHeureux from "../assets/images/MochiHeureux.webp";
import MochiSom from "../assets/images/MochiSom.webp";
import MochiSupris from "../assets/images/MociSurpris.webp";

import "../styles/setting.scss";

const avatars = [MochiCol1, MochiHeureux, MochiSom, MochiSupris];

function getStoredUser(): ProfileUser | null {
    try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) return null;

        const parsed = JSON.parse(storedUser);

        if (!parsed || typeof parsed !== "object") return null;

        const id =
            typeof parsed.id === "number"
                ? parsed.id
                : typeof parsed.id === "string" && parsed.id.trim()
                    ? Number(parsed.id)
                    : NaN;

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

                        <h2 id="avatar-title">Choisir mon compagnon</h2>

                        <div className="avatar-list" role="group" aria-labelledby="avatar-title">
                            {avatars.map((avatar, index) => (
                                <button type="button" key={avatar} onClick={() => handleAvatarChange(avatar)} className={`settings-avatar ${selectedAvatar === avatar ? "selected" : ""}`} aria-label={`Choisir le compagnon ${index + 1}`} aria-pressed={selectedAvatar === avatar} disabled={isSaving}>
                                    <img src={avatar} alt="" />
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} aria-busy={isSaving}>
                            <label htmlFor="pseudo">Pseudo</label>
                            <input id="pseudo" name="pseudo" type="text" autoComplete="nickname" value={pseudo} onChange={(e) => setPseudo(e.target.value)} disabled={isSaving} required />

                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSaving} required />

                            <div className="btn-container">
                                <button className="btn" type="submit" disabled={isSaving}>
                                    {isSaving ? "Enregistrement…" : "Enregistrer les modifications"}
                                </button>
                            </div>
                        </form>

                        {error && <p role="alert">{error}</p>}
                        {message && <p role="status">{message}</p>}
                    </>
                ) : (
                    <p>Connecte-toi pour modifier ton profil.</p>
                )}
            </main>
        </>
    );
}
