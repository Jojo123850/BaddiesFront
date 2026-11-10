import Navbar from "../components/Navbar";
import "../styles/pages/legalePrivacy.scss";
import { Link } from "react-router-dom";
export default function Privacy() {
  return (
    <>
    <Navbar/>
    <main className="legal-page">
      <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>

      <p>Dernière mise à jour : <span className="date">4 novembre 2026</span> </p>

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
          Préférences et choix : pays, tranche d'âge déclarée et
          consentements. Si vous ajoutez un contact d'urgence,
          son nom et son numéro de téléphone sont enregistrés sur l'appareil.
        </li>
        <li>
          Données de mesure d'audience lorsque vous acceptez Google Analytics :
          informations de navigation et données techniques associées.
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
          Mesurer la fréquentation des pages suivies pour comprendre
          l'utilisation du service, uniquement avec votre accord pour Analytics.
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
            Le traitement des réponses à l'évaluation et des données
            de santé associées repose sur votre consentement,
            conformément à l'article 6, paragraphe 1, point a,
            et sur votre consentement explicite conformément
            à l'article 9, paragraphe 2, point a, du RGPD.
            Cet accord est demandé avant l'évaluation.
        </p>

      <p>
        Le consentement aux statistiques Google Analytics est distinct de celui
        concernant les données de santé. Vous pouvez refuser les statistiques
        sans renoncer à l'évaluation. Les réglages correspondants sont décrits
        dans la section 7.
      </p>

      <h2>5. Durée de conservation</h2>

      <h3>Données conservées sur votre appareil</h3>
      <p>
        Les évaluations sauvegardées localement, les préférences,
        les choix de consentement et les coordonnées d'un éventuel
        contact d'urgence restent dans le stockage du navigateur
        jusqu'à leur suppression par les fonctions disponibles
        dans l'application ou par l'effacement des données du site.
        Le navigateur peut également supprimer ces données selon
        ses propres règles.
      </p>
      <p>
        La fermeture du navigateur ou la déconnexion ne supprime
        pas automatiquement l'ensemble de ces informations.
        Effacer les données locales ne supprime pas celles déjà
        enregistrées sur le compte.
      </p>

      <h3>Compte et évaluations enregistrées en ligne</h3>
      <p>
        Les informations de compte et les évaluations enregistrées
        en ligne restent conservées tant qu'elles n'ont pas été
        supprimées. La version actuelle ne prévoit pas de suppression
        automatique des comptes inactifs.
        Vous pouvez demander l'effacement de votre compte et des
        données associées au contact indiqué dans la section 9.
        La suppression du compte n'est pas proposée par un bouton dédié.
      </p>
      {/* À FINALISER AVANT PUBLICATION : définir et appliquer les durées
          maximales des comptes et des évaluations, y compris en cas
          d'inactivité. Le constat ci-dessus ne remplace pas cette règle. */}

      <h3>Authentification et réinitialisation du mot de passe</h3>
      <p>
        Le jeton d'accès est valable 15 minutes. Le jeton de
        renouvellement est valable 7 jours et peut être remplacé
        ou révoqué avant son expiration. Un lien de réinitialisation
        du mot de passe est valable une heure et ne peut plus être
        utilisé après une réinitialisation réussie.
      </p>
      <p>
        Ces durées concernent la validité des jetons. Leur expiration
        ne correspond pas nécessairement à la suppression immédiate
        de leurs enregistrements dans la base de données.
      </p>

      {/* À FINALISER AVANT PUBLICATION : vérifier et documenter le nettoyage
          des jetons expirés, utilisés ou révoqués. */}

      <h3>Google Analytics</h3>
      <p>
        Lorsque vous acceptez Google Analytics, les données d'événements
        concernées par ses paramètres de conservation sont conservées
        pendant 2 mois et les données utilisateur concernées pendant
        14 mois. Ces paramètres ne déterminent pas la durée de
        conservation de la plupart des rapports standards fondés sur
        des données agrégées, ni la durée de vie des cookies.
      </p>

      {/* À VÉRIFIER AVANT PUBLICATION : état de l'option de réinitialisation
          de la conservation à chaque nouvelle activité, et durées des cookies. */}

      <h3>Journaux techniques et sauvegardes</h3>
      <p>
        Les services techniques peuvent conserver des journaux de
        fonctionnement et des copies de sauvegarde. La suppression
        d'une donnée dans l'application ne signifie pas son effacement
        immédiat de toutes les sauvegardes.
      </p>
      {/* À FINALISER AVANT PUBLICATION : vérifier l'existence des sauvegardes,
          leurs durées et cycles de rotation ainsi que la conservation des
          journaux de BADDIES et des prestataires ; préciser ici les valeurs. */}

      <h3>Copies téléchargées ou partagées</h3>
      <p>
        Un PDF téléchargé ou un résumé partagé constitue une copie
        distincte. Supprimer une évaluation dans BADDIES ne supprime
        pas les fichiers présents sur votre appareil ni les copies
        déjà transmises à des tiers.
      </p>

      <h2>6. Hébergement, destinataires et prestataires</h2>
      <p>
        Les données sont traitées par la responsable du traitement
        et, dans la mesure nécessaire à leurs missions respectives,
        par les prestataires techniques suivants :
      </p>
      <ul>
        <li>
          <strong>Vercel :</strong> hébergement et diffusion de
          l'interface web.{' '}
          <a href="https://vercel.com/legal/privacy-notice">
            Politique de confidentialité de Vercel
          </a>.
        </li>
        <li>
          <strong>Render :</strong> hébergement de l'API backend,
          qui traite notamment l'authentification et les évaluations
          transmises pour un enregistrement sur le compte.{' '}
          <a href="https://render.com/privacy">
            Politique de confidentialité de Render
          </a>.
        </li>
        <li>
          <strong>Supabase :</strong> hébergement de la base PostgreSQL
          contenant les données de compte, les éléments nécessaires
          à l'authentification et les évaluations enregistrées en ligne.{' '}
          <a href="https://supabase.com/privacy">
            Politique de confidentialité de Supabase
          </a>.
        </li>
        <li>
          <strong>Brevo :</strong> envoi des e-mails transactionnels,
          notamment de réinitialisation du mot de passe. Les informations
          traitées pour cet envoi comprennent l'adresse du destinataire
          et le contenu du message, dont le lien de réinitialisation.{' '}
          <a href="https://www.brevo.com/fr/legal/privacypolicy/">
            Politique de confidentialité de Brevo
          </a>.
        </li>
        <li>
          <strong>Google Analytics 4 :</strong> mesure d'audience
          facultative après votre accord, selon les modalités
          de la section 7.{' '}
          <a href="https://policies.google.com/privacy">
            Politique de confidentialité de Google
          </a>.
        </li>
      </ul>

      <h3>Localisation et transferts de données</h3>
      <p>
        L'API backend est hébergée par Render dans la région
        Oregon (US West), aux États-Unis. La base PostgreSQL
        est hébergée par Supabase dans la région eu-west-1,
        en Irlande, dans l'Union européenne.
      </p>
      <p>
        Les données envoyées à l'API sont traitées par le backend
        situé aux États-Unis, même lorsque leur stockage en base
        de données est effectué en Irlande. L'hébergement européen
        de la base ne signifie donc pas que tous les traitements
        sont réalisés dans l'Espace économique européen.
      </p>
      <p>
        Les services de diffusion, de support, d'envoi d'e-mails et
        de mesure d'audience peuvent également impliquer des traitements
        ou des accès en dehors de l'Espace économique européen.
      </p>
      
      {/* À FINALISER AVANT PUBLICATION : identifier les autres destinations
          effectives et vérifier les garanties applicables aux transferts
          (décision d'adéquation applicable à l'entité concernée, ou clauses
          contractuelles types et mesures complémentaires si nécessaires).
          Ne pas présenter une garantie comme acquise sans cette vérification. */}
      <p>
        Pour toute question sur les destinataires et les transferts
        de vos données, vous pouvez contacter la responsable
        du traitement à l'adresse indiquée dans la section 9.
      </p>
      <h2>7. Stockage des données et choix de consentement</h2>

      <h3>Historique sur cet appareil</h3>
      <p>
        Sans compte, lorsque vous enregistrez une évaluation, son contenu
        et les conseils associés sont conservés dans le stockage local
        du navigateur (localStorage). Cet historique n'est pas envoyé
        à la base de données du compte par cette action de sauvegarde locale.
      </p>
      <p>
        Le stockage local peut persister après la fermeture du navigateur.
        Sur un appareil partagé, d'autres personnes utilisant le même
        profil de navigateur peuvent accéder aux informations qui y restent.
        La suppression des données du site dans le navigateur efface les
        informations locales, mais pas celles déjà enregistrées sur un compte.
      </p>

      <h3>Historique enregistré sur le compte</h3>
      <p>
        Lorsque vous êtes connectée et que vous enregistrez une évaluation
        avec un accès réseau disponible, l'application transmet l'évaluation
        et les conseils associés à l'API afin de les enregistrer dans
        PostgreSQL et de permettre leur consultation depuis le compte.
      </p>
      <p>
        Si l'enregistrement sur le compte échoue, ou si vous utilisez le
        parcours sans connexion réseau, l'application peut conserver
        l'évaluation sur cet appareil et vous en informer. Cette sauvegarde
        locale n'est pas automatiquement synchronisée vers le compte au
        retour du réseau. Il faut distinguer les copies locales des
        enregistrements distants pour les consulter ou les supprimer.
      </p>

      <h3>Préférences et session</h3>
      <p>
        Le navigateur conserve également des préférences, les choix de
        consentement et, lors d'une connexion, des informations de profil
        et des jetons de session. La déconnexion retire les informations
        locales de session ; elle n'efface pas à elle seule l'historique
        local, les préférences ou les épisodes enregistrés sur le compte.
      </p>

      <h3>Statistiques Google Analytics</h3>
      <p>
        Le tag Google Analytics est chargé après votre acceptation des
        statistiques. Il peut utiliser des cookies et des identifiants
        techniques pour mesurer la fréquentation. Le suivi manuel prévu
        dans le code porte sur l'accueil et la page des premiers gestes.
        Les réponses au questionnaire, les symptômes et le contenu des
        historiques ne sont pas des paramètres prévus par ce suivi manuel.
      </p>
      <p>
        Vous pouvez modifier ce choix dans les <Link to="/Setting">paramètres</Link>,
        rubrique « Confidentialité et consentements », avec le réglage
        « Statistiques Google Analytics ». Le refus empêche le chargement
        initial du tag. Après une acceptation, le retrait désactive les
        collectes suivantes via le module Analytics ; il n'efface pas
        automatiquement les données déjà transmises ni les cookies déjà déposés.
      </p>
      <p>
        Pour en savoir plus sur les pratiques de Google, consultez sa{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          politique de confidentialité
        </a>.
      </p>

      <h3>Retrait du consentement aux données de santé</h3>
      <p>
        Dans les paramètres, un bouton permet de retirer votre consentement
        aux données de santé. Cette action supprime la trace locale de votre
        accord. Elle ne supprime pas automatiquement les évaluations déjà
        enregistrées. Pour demander l'effacement des données du compte ou
        exercer vos droits, utilisez le contact indiqué dans la section 9.
      </p>
      <p>
        Un fichier PDF téléchargé ou un résumé partagé constitue une copie
        distincte : sa suppression n'est pas effectuée par la suppression
        d'un épisode dans l'application.
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
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" >
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
    </>
  );
}
