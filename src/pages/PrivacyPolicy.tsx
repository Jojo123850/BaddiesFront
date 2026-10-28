// import "./Legal.scss";
import { Link } from "react-router-dom";
export default function Privacy() {
  return (
    <main className="legal-page">
      <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>

      <p>Dernière mise à jour : 28 octobre 2026.</p>

      <p>
        La présente politique de confidentialité décrit la manière
        dont les données personnelles des utilisateurs de BADDIES,
        accessible à l'adresse {" "}
            <a href="https://baddies-beryl.vercel.app/">
            https://baddies-beryl.vercel.app/
            </a>
            , sont collectées, utilisées et protégées conformément
            au Règlement général sur la protection des données (RGPD)
            et à la loi Informatique et Libertés.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        La responsable du traitement est Giovanie ANDRIANIRINA,
        éditrice de l'application BADDIES.
      </p>
      <p> Pour toute question relative aux données personnelles :
        {" "}
        <a href="mailto:giovanieandrianirina@gmail.com">
          giovanieandrianirina@gmail.com
        </a>
      </p>

      <h2>2. Données personnelles collectées</h2>
      <p>
        Selon les fonctionnalités utilisées, BADDIES peut traiter
        les catégories de données suivantes :
      </p>
      <ul>
        <li>
          Données de compte : pseudonyme, adresse e-mail et
          informations nécessaires à l'authentification.
        </li>
        <li>
          Données d'évaluation : intensité des douleurs menstruelles,
          localisation, symptômes associés, contexte et
          caractéristiques de la douleur.
        </li>
        <li>
          Historique des évaluations enregistrées.
        </li>
        <li>
          Données techniques nécessaires au fonctionnement
          et à la sécurité de l'application.
        </li>
      </ul>
      <p>
        Les informations relatives aux douleurs et aux symptômes
        peuvent constituer des données de santé sensibles
        au sens du RGPD.
      </p>

      <h2>3. Finalités du traitement</h2>
      <p>
        Les données personnelles sont traitées pour les
        finalités suivantes :
      </p>
      <ul>
        <li>Créer et gérer les comptes utilisateurs.</li>
        <li>Permettre l'authentification et la connexion.</li>
        <li>
          Réaliser les évaluations des douleurs menstruelles.
        </li>
        <li>
          Présenter des conseils adaptés aux réponses fournies.
        </li>
        <li>
          Permettre la consultation de l'historique
          des évaluations enregistrées.
        </li>
        <li>
          Envoyer des e-mails nécessaires à la gestion du compte.
        </li>
        <li>
          Assurer la sécurité et le bon fonctionnement
          de l'application.
        </li>
      </ul>
      <p>
        BADDIES est une application d'accompagnement et
        d'information. Elle ne réalise aucun diagnostic médical
        et ne remplace pas un professionnel de santé.
      </p>

      <h2>4. Bases légales et données de santé</h2>
      <p>
        Chaque traitement de données personnelles doit reposer
        sur une base légale appropriée, conformément à
        l'article 6 du RGPD.
      </p>
      <p>
        Les traitements liés à la gestion du compte peuvent
        notamment être nécessaires à la fourniture du service.
        Certains traitements de sécurité peuvent reposer
        sur un intérêt légitime, sous réserve des conditions
        applicables.
      </p>
      <p>
        Les données relatives aux douleurs menstruelles et
        aux symptômes nécessitent également une condition
        particulière prévue par l'article 9 du RGPD.
        Lorsque le consentement explicite est retenu,
        il doit être recueilli avant le traitement concerné
        et pouvoir être retiré.
      </p>

      <h2>5. Durée de conservation</h2>

        <p>
        Les réponses aux évaluations enregistrées dans le
        localStorage du navigateur sont conservées jusqu'à
        leur suppression par l'application, par l'utilisatrice
        ou par le navigateur.
        </p>

        <p>
        Les données liées aux comptes utilisateurs sont
        conservées pendant la durée nécessaire à la gestion
        du compte, selon les règles de conservation
        applicables.
        </p>

      <h2>6. Hébergement et prestataires</h2>
      <p>
        BADDIES utilise les services techniques suivants :
      </p>
      <ul>
        <li>
          <strong>Vercel :</strong> hébergement de
          l'interface web.
        </li>
        <li>
          <strong>Render :</strong> hébergement de
          l'API backend.
        </li>
        <li>
          <strong>Supabase :</strong> hébergement de
          la base de données PostgreSQL.
        </li>
        <li>
          <strong>Brevo :</strong> envoi d'e-mails
          transactionnels liés aux comptes utilisateurs.
        </li>
      </ul>
      <p>
        Les régions d'hébergement et les éventuels transferts
        de données hors de l'Espace économique européen
        doivent être vérifiés afin de préciser les garanties
        applicables.
      </p>

     <h2>7. Cookies et stockage local</h2>

        <p>
        BADDIES utilise le localStorage du navigateur
        pour enregistrer les réponses aux évaluations
        des douleurs menstruelles.
        </p>

        <p>
        Ces réponses restent sur l'appareil de
        l'utilisatrice. Aucune synchronisation automatique
        vers la base de données PostgreSQL n'est
        actuellement mise en place.
        </p>

        <p>
        Le localStorage peut conserver des informations
        après la fermeture du navigateur.
        L'utilisatrice peut supprimer ces informations
        en effaçant les données du site.
        </p>
      <h2>8. Droits des utilisateurs</h2>
      <p>
        Conformément au RGPD, les utilisateurs disposent,
        selon les conditions applicables, des droits suivants :
      </p>
      <ul>
        <li>Droit d'accès à leurs données personnelles.</li>
        <li>Droit de rectification des données inexactes.</li>
        <li>Droit à l'effacement des données.</li>
        <li>Droit à la limitation du traitement.</li>
        <li>Droit d'opposition, lorsque ce droit s'applique.</li>
        <li>Droit à la portabilité, lorsque ce droit s'applique.</li>
        <li>
          Droit de retirer leur consentement lorsque
          le traitement repose sur celui-ci.
        </li>
      </ul>
      <p>
        Les utilisateurs peuvent également définir
        des directives relatives au sort de leurs
        données personnelles après leur décès.
      </p>

      <h2>9. Exercice des droits</h2>
      <p>
        Pour exercer leurs droits, les utilisateurs
        peuvent envoyer une demande à :
        {" "}
        <a href="mailto:giovanieandrianirina@gmail.com">
          giovanieandrianirina@gmail.com
        </a>.
      </p>
      <p>
        Une réponse est apportée en principe dans
        un délai d'un mois à compter de la réception
        de la demande, sous réserve des prolongations
        autorisées par le RGPD.
      </p>
      <p>
        Un justificatif d'identité peut être demandé
        uniquement en cas de doute raisonnable
        sur l'identité du demandeur.
      </p>

      <h2>10. Réclamation auprès de la CNIL</h2>
      <p>
        Si un utilisateur estime que ses droits ne
        sont pas respectés, il peut déposer une
        réclamation auprès de la Commission nationale
        de l'informatique et des libertés (CNIL).
      </p>
      <p>
        CNIL — 3 place de Fontenoy, 75007 Paris.
      </p>
      <p>
        Site internet :
        {" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
      </p>

      <h2>11. Modification de la politique</h2>
      <p>
        La présente politique de confidentialité
        peut être modifiée pour tenir compte
        des évolutions de BADDIES ou de
        la réglementation applicable.
      </p>
      <p>
        La version en vigueur est celle publiée
        sur le site à la date de consultation.
      </p>
      <Link to= "/Setting" className="btn">Fermer</Link>
    </main>
  );
}
