import "./head.scss"
import { Input } from "../../components/input/Input"
import { Button } from "../../components/button/Button"
import { Link } from "react-router-dom"

type Props = {
   
}
export const Head = (props: Props) => {
  return (
    <div className="head">
         <div className="logo">
      <a href="/"><h1><span>Le</span>Baobab</h1></a>  
       
        <div className="connexion" style={{display: "flex", gap: "25px"}}>
     <a href="registration">S'inscrire</a>
     <a href="login">Se Connecter</a>
     
     <Button name="Publier un projet" bg="#343891" border="none" color="white" link="publish"  />
     
    
     </div>
        </div>
      </div>
   
  )
}
