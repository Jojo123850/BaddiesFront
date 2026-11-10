import { Link } from "react-router-dom"
import "../styles/pages/legalePrivacy.scss";
import Navbar from "../components/Navbar";
export default function Notice(){
    return(
        <>
        <Navbar/>
        <main className="legal-page">
         <h1>MENTIONS LÉGALES</h1>
         <p>En vigueur au  <span className="date">22/10/2026</span></p>

       
             <p> Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, ci-après l'<span>"Utilisateur"</span> , du site https://baddies-beryl.vercel.app , ci-après le <span> "Site"</span>, les présentes mentions légales.</p>
           
         
            
             <p>Ces dernières sont accessibles sur le Site à la rubrique "Mentions légales".</p>
         
             <h2>EDITION DU SITE</h2>
             <p>L’édition et la direction de la publication du Site est assurée par Madame Giovanie Andrica ANDRIANIRINA, domiciliée 11 place Caramy, dont le numéro de téléphone est 0652979673, et l'adresse e-mail giovanieandrianirina@gmail.com.</p>
             <p>ci-après l'"Editeur".</p>
      
            <h2>HÉBERGEMENT DU SITE ET DES SERVICES</h2>
            
             <h3>Hébergeur du Frontend</h3>
            <p>
                Le site BADDIES est hébergé par Vercel Inc.,440 N Barranca Avenue #4133,  Covina, CA 91723, États-Unis.
            </p>
        
            <p>
                Site web : <a href="https://vercel.com">vercel.com</a>
            </p>
          
            <h3>Hébergeur du backend</h3>
            <p>
                L'API de BADDIES est hébergée par Render.
            </p>
            <p>
                Site web : <a href="https://render.com">render.com</a>
            </p>
            
            <h3>Hébergeur de la base de données</h3>
            <p>
            La base de données PostgreSQL de BADDIES
            est hébergée par Supabase.
            </p>
            <p>
            Site web : <a href="https://supabase.com">supabase.com</a>
            </p>

            
            <h2>DONNÉES PERSONNELLES</h2>

            <p>
            BADDIES traite des données personnelles pour le fonctionnement
            des comptes et des évaluations. Les informations relatives
            aux douleurs et aux symptômes peuvent constituer des données
            de santé.
            </p>

            <p>
            Les finalités des traitements, les données concernées,
            leurs modalités de conservation, les prestataires et les
            choix de consentement sont présentés dans la{" "}
            <Link to="/PrivacyPolicy">
                politique de confidentialité
            </Link>.
            </p>

            <p>
            Selon les conditions prévues par la réglementation,
            vous pouvez exercer vos droits d'accès, de rectification,
            d'effacement, de limitation, d'opposition et de portabilité.
            Lorsque le traitement repose sur votre consentement,
            vous pouvez le retirer.
            </p>

            <p>
            Pour toute demande concernant vos données :{" "}
            <a href="mailto:giovanieandrianirina@gmail.com">
                giovanieandrianirina@gmail.com
            </a>.
            Vous pouvez également adresser une réclamation à la{" "}
            <a href="https://www.cnil.fr/fr/adresser-une-plainte">
                CNIL
            </a>.
            </p>
            <h2>PROPRIÉTÉ INTELLECTUELLE</h2>

                <p>
                Les éléments originaux du site sont protégés par les règles
                applicables en matière de propriété intellectuelle.
                Les éléments appartenant à des tiers restent soumis
                à leurs licences respectives. Toute reproduction ou
                exploitation nécessite une autorisation, sous réserve
                des exceptions légales et des licences applicables.
                </p>
            <br />
            <p>Rédigé sur http://legalplace.fr</p>
              <Link to= "/Setting" className="btn">Fermer</Link>
            
        </main>
        </>
    )
} 