
import { Link } from "react-router-dom";
import "../styles/legalePrivacy.scss";
import Navbar from "../components/Navbar";

export default function CGU() {
  return (
    <>
    <Navbar/>
    <main className="legal-page">
      <h1>CONDITIONS GÉNÉRALES D'UTILISATION</h1>

      <p>Dernière mise à jour : <span className="date"> 28 octobre 2026</span> </p>

      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation (CGU)
        définissent les modalités d'accès et d'utilisation de
        BADDIES, application web progressive (PWA) accessible
        à l'adresse{" "}
        <a href="https://baddies-beryl.vercel.app/">
          https://baddies-beryl.vercel.app/
        </a>.
      </p>
      <p>
        BADDIES est une application gratuite d'accompagnement
        des douleurs menstruelles. Elle permet aux utilisatrices
        de renseigner des informations sur leurs douleurs et
        symptômes afin d'obtenir des conseils et des
        informations adaptés.
      </p>
      <p>
        L'utilisation de l'application est soumise aux présentes
        CGU dans les conditions où leur acceptation est demandée.
      </p>

      <h2>Article 2 — Mentions légales</h2>
      <p>
        L'application BADDIES est éditée par
        Giovanie ANDRIANIRINA.
      </p>
      <p>
        Email de contact :{" "}
        <a href="mailto:giovanieandrianirina@gmail.com">
          giovanieandrianirina@gmail.com
        </a>
      </p>
      <p>
        Les informations relatives à l'édition et à
        l'hébergement de l'application sont disponibles
        dans les mentions légales.
      </p>

      <h2>Article 3 — Accès à l'application</h2>
      <p>
        BADDIES est accessible gratuitement à toute personne
        disposant d'un accès à Internet et d'un navigateur
        compatible.
      </p>
      <p>
        L'application peut également être installée comme
        application web progressive (PWA) sur certains appareils
        compatibles et proposer des fonctionnalités hors connexion.
      </p>
      <p>
        L'éditrice s'efforce d'assurer le bon fonctionnement
        de l'application. Toutefois, des interruptions peuvent
        survenir, notamment pour des opérations de maintenance,
        des mises à jour ou des incidents techniques.
      </p>

      <h2>Article 4 — Propriété intellectuelle</h2>
      <p>
        Les éléments originaux de BADDIES, notamment ses textes,
        graphismes, interfaces, logos et développements
        spécifiques, sont protégés par les règles applicables
        en matière de propriété intellectuelle.
      </p>
      <p>
        Certains éléments peuvent appartenir à des tiers et
        être utilisés conformément aux licences ou
        autorisations correspondantes.
      </p>
      <p>
        Toute reproduction ou exploitation non autorisée
        d'éléments protégés est interdite, sous réserve
        des exceptions prévues par la loi et des licences
        applicables.
      </p>

      <h2>Article 5 — Gratuité du service</h2>
      <p>
        L'utilisation de BADDIES est actuellement gratuite.
        Aucun abonnement ni paiement n'est nécessaire pour
        accéder aux fonctionnalités proposées.
      </p>
      <p>
        Si des fonctionnalités payantes sont proposées
        ultérieurement, leurs conditions seront présentées
        avant toute souscription.
      </p>

      <h2>Article 6 — Compte utilisateur</h2>
      <p>
        Les utilisatrices peuvent réaliser une évaluation
        de leurs douleurs menstruelles sans créer de compte.
      </p>
      <p>
        BADDIES propose également la création d'un compte
        utilisateur permettant d'accéder aux fonctionnalités
        réservées aux personnes connectées.
      </p>
      <p>
        Lors de l'inscription, l'utilisatrice renseigne
        notamment un pseudonyme, une adresse e-mail
        et un mot de passe.
      </p>
      <p>
        Chaque utilisatrice est responsable de la
        confidentialité de ses identifiants et doit
        signaler toute utilisation non autorisée
        de son compte.
      </p>

      <h2>Article 7 — Comportements interdits</h2>
      <p>L'utilisatrice s'engage à ne pas :</p>
      <ul>
        <li>
          Utiliser l'application à des fins illégales
          ou non autorisées.
        </li>
        <li>
          Tenter d'accéder frauduleusement aux comptes
          ou aux données d'autres utilisatrices.
        </li>
        <li>
          Perturber le fonctionnement de l'application
          ou de ses serveurs.
        </li>
        <li>
          Introduire des logiciels malveillants ou
          exploiter des failles de sécurité.
        </li>
        <li>
          Collecter des données personnelles d'autres
          utilisatrices sans autorisation.
        </li>
      </ul>

      <h2>Article 8 — Données personnelles</h2>
      <p>
        BADDIES traite certaines données personnelles
        nécessaires au fonctionnement de l'application,
        notamment les informations de compte et les
        réponses fournies lors des évaluations.
      </p>
      <p>
        Les réponses aux évaluations sont actuellement
        enregistrées dans le stockage local du navigateur
        (localStorage). Aucune synchronisation automatique
        de ces réponses vers la base de données PostgreSQL
        n'est actuellement mise en place.
      </p>
      <p>
        Les informations relatives aux douleurs menstruelles
        et aux symptômes peuvent constituer des données
        de santé sensibles au sens du RGPD.
      </p>
      <p>
        Pour en savoir plus sur la collecte, l'utilisation,
        la conservation des données et les droits des
        utilisatrices, consultez notre{" "}
        <a href="/confidentialite">
          Politique de confidentialité
        </a>.
      </p>

      <h2>Article 9 — Informations de santé</h2>
      <p>
        BADDIES est un outil d'information et
        d'accompagnement des douleurs menstruelles.
      </p>
      <p>
        Les conseils et solutions proposés ne constituent
        ni un diagnostic médical, ni une prescription,
        ni une consultation médicale.
      </p>
      <p>
        L'application ne remplace pas l'avis d'un
        professionnel de santé.
      </p>
      <p>
        En cas de douleurs inhabituelles, particulièrement
        intenses ou accompagnées de symptômes inquiétants,
        l'utilisatrice est invitée à consulter rapidement
        un professionnel de santé.
      </p>

      <h2>Article 10 — Responsabilité</h2>
      <p>
        L'éditrice s'efforce de fournir des informations
        pertinentes et de maintenir l'application
        en bon état de fonctionnement.
      </p>
      <p>
        Toutefois, les informations proposées ne
        garantissent pas un résultat particulier et
        ne sont pas nécessairement adaptées à toutes
        les situations individuelles.
      </p>
      <p>
        Les présentes CGU ne limitent pas les
        responsabilités qui ne peuvent légalement
        être exclues.
      </p>

      <h2>Article 11 — Liens hypertextes</h2>
      <p>
        BADDIES peut contenir des liens vers des
        sites ou ressources externes.
      </p>
      <p>
        L'éditrice ne contrôle pas nécessairement
        leur contenu ni leurs pratiques en matière
        de confidentialité.
      </p>

      <h2>Article 12 — Modification des CGU</h2>
      <p>
        Les présentes CGU peuvent être modifiées
        pour tenir compte des évolutions de
        l'application ou de la réglementation.
      </p>
      <p>
        La version en vigueur est accessible
        depuis l'application.
      </p>

      <h2>Article 13 — Droit applicable et litiges</h2>
      <p>
        Les présentes CGU sont régies par le droit
        français, sous réserve des dispositions
        impératives éventuellement applicables.
      </p>
      <p>
        En cas de difficulté, l'utilisatrice peut
        contacter l'éditrice à l'adresse suivante :{" "}
        <a href="mailto:giovanieandrianirina@gmail.com">
          giovanieandrianirina@gmail.com
        </a>.
      </p>
      <p>
        À défaut de résolution amiable, les juridictions
        compétentes seront déterminées conformément
        aux règles légales applicables.
      </p>
        <Link to= "/Setting" className="btn">Fermer</Link>
    </main>
    </>
  );
}
