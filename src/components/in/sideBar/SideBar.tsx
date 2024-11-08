import "./sideBar.scss"
import { menu } from "../../../data";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
  <div className="sideBar">

    <div className="item">
      <a href="/dashboard">Tableau de Bord</a>
     <a href="/dashboard/todo">Liste de Tache</a> 
      <a href="/dashboard/project">Mes Projets</a>
      <a href="/dashboard/fastannouncement">Rapide annonce</a>
      <a href="/dashboard/discussion">Discussion</a>
      <a href="/dashboard/subscription">Abonnement</a>
    </div>
        
         </div>
)}
