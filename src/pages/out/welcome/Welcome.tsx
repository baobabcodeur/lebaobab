import { Button } from "../../../components/button/Button"
import "./welcome.scss"

export const Welcome = () => {
  return (
    <div className="welcome">
      <div className="sMenu">
        <a href="provider">Embaucher un prestataire</a>
        <a href="work">Trouver du travail</a>
      </div>

      <div className="container">

        <div className="info">

        <h2>Embaucher <span>les meilleurs <br /> prestataires </span>  
          pour n'importe <br /> quel travail <span> en ligne ou présentiel.</span></h2>

        <ul>
          <li>Le plus grand marché au Togo en prestation de service</li>
          <li>Tous les travaux auxquels vous pouvez potentiellement penser</li>
          <li>Économisez jusqu'à <span>50 %</span>  & obtenez gratuitement des devis</li>
          <li>Votre paiement est transférer au prestataire que lorsque vous êtes 
            satisfait à <span>100 %</span>  en fonction des termes du contrat</li>
        </ul>
        <div className="btn">
         <Button link="announcement" name="Rapide annonce de 6h" bg="#343891" border="none" color=""  />
        <Button link="presentation" name="Embauche personnaliser" bg="#343891" border="none" color=""  />
         
        </div>
        </div>

  <img src="undraw.png" alt=""  />

   

      </div>

     <div className="sep">
      <div className="separator"></div>
      </div> 


    </div>
  )
}
