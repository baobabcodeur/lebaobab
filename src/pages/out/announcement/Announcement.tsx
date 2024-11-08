

import { AnnouncementGrid } from "../../../components/announcementGrid/AnnouncementGrid"
import { Button } from "../../../components/button/Button"
import "./announcement.scss"


export const Announcement = () => {

 

  
  return (
    <div className="announcement">
  <h1>PETITE ANNONCE</h1>
  <p>Découvrez ici les annonces de services urgents : des demandes pour lesquelles nous recherchons activement des prestataires qualifiés. Chaque annonce est visible pendant 
    6 heures pour favoriser une réponse rapide et efficace.</p>
  <div className="rigth">
 <Button link="/login" name="Publier une annonce" bg="#4caf50" border="none" color=""  />   
  </div>
  
      <AnnouncementGrid />
    </div>
  )
}
