import { Link } from "react-router-dom"
import "../styles/legalePrivacy.scss";
import Navbar from "../components/Navbar";
export default function Notice(){
    return(
        <>
        <Navbar/>
        <main className="legal-page">
         <h1>MENTIONS LEGALES</h1>
         <p>En vigueur au  <span className="date">22/10/2026</span></p>

       
             <p> Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, ci-après l'<span>"Utilisateur"</span> , du site https://baddies-beryl.vercel.app , ci-après le <span> "Site"</span>, les présentes mentions légales.</p>
           
             <p>La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</p>
            
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
            

            <p>
            La base de données PostgreSQL de BADDIES
            est hébergée par Supabase.
            </p>
            <p>
            Site web : <a href="https://supabase.com">supabase.com</a>
            </p>

            <h2>COLLECTE DES DONNEES</h2>
            <p>
                Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers  aux libertés et dans le respect de la règlementation applicable en matière de traitement des données à caractère personnel conformément au règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (ci-après, ensemble, la <span>Règlementation applicable en matière de protection des Données à caractère personnel")</span> </p>
            
            <p>En vertu de la Règlementation applicable en matière de protection des Données à caractère personnel, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur peut exercer ce droit :</p> 
            <p>par mail à l'adresse email giovanieandrianirina@gmail.com</p>
            <p> 
            Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation expresse de l’Editeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que prévues par la règlementation en vigueur.</p>
            <br />
            <br />
            <p>Rédigé sur http://legalplace.fr</p>
              <Link to= "/Setting" className="btn">Fermer</Link>
            
        </main>
        </>
    )
} 