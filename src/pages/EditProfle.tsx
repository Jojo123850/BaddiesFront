import { useState } from "react";
import type { FormEvent } from "react";

import Navbar from "../components/Navbar";
import defaultProfile from "../assets/images/DefaultProfile.webp";

import avatar1 from "../assets/avatars/avatar1.webp";
import avatar2 from "../assets/avatars/avatar2.webp";
import avatar3 from "../assets/avatars/avatar3.webp";
import avatar4 from "../assets/avatars/avatar4.webp";

import "../styles/setting.scss";

const avatars = [avatar1, avatar2, avatar3, avatar4];

type User = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
};

function getStoredUser(): User | null {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser);

    if (
      typeof parsed.pseudo !== "string" ||
      typeof parsed.email !== "string"
    ) {
      return null;
    }

    return parsed as User;
  } catch {
    return null;
  }
}

function getInitialAvatar(): string {
  const savedAvatar = localStorage.getItem("companionAvatar");

  if (savedAvatar) {
    const index = Number(savedAvatar);

    if (
      Number.isInteger(index) &&
      index >= 0 &&
      index < avatars.length
    ) {
      return avatars[index];
    }
  }

  const randomIndex = Math.floor(Math.random() * avatars.length);

  localStorage.setItem("companionAvatar", String(randomIndex));

  return avatars[randomIndex];
}

export default function EditProfile() {
  const [user] = useState<User | null>(getStoredUser);

  const [pseudo, setPseudo] = useState(user?.pseudo ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const [selectedAvatar, setSelectedAvatar] =
    useState<string>(getInitialAvatar);

  const [message, setMessage] = useState("");

  const handleAvatarChange = (avatar: string, index: number) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("companionAvatar", String(index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    // Mise à jour locale provisoire.
    // Il faudra aussi envoyer les changements au backend.
    const updatedUser: User = {
      ...user,
      pseudo,
      email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setMessage("Modifications enregistrées localement.");
  };

  return (
    <>
      <Navbar />

      {user ? (
        <main className="edit-profile">
          <h1>Modifier mon profil</h1>

          <div className="profile-avatar">
            <img
              src={selectedAvatar || defaultProfile}
              alt="Mon compagnon BADDIES"
            />
          </div>

          <h2>Choisir mon compagnon</h2>

          <div className="avatar-list">
            {avatars.map((avatar, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleAvatarChange(avatar, index)}
                className={
                  selectedAvatar === avatar ? "selected" : ""
                }
                aria-label={`Choisir le compagnon ${index + 1}`}
                aria-pressed={selectedAvatar === avatar}
              >
                <img
                  src={avatar}
                  alt={`Compagnon ${index + 1}`}
                />
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="pseudo">Pseudo</label>
            <input
              id="pseudo"
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="btn-container">
              <button className="btn" type="submit">
                Enregistrer les modifications
              </button>
            </div>
          </form>

          {message && <p>{message}</p>}
        </main>
      ) : (
        <p>Connecte-toi pour modifier ton profil.</p>
      )}
    </>
  );
}