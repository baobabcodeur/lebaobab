import "./button.scss";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  bg: string;
  border: string;
  color: string;
  link?: string;
  type?: "button" | "submit" | "reset"; // Ajoutez le type comme prop optionnel
  disabled?: boolean; // Prop disabled optionnelle
};

export const Button = (props: Props) => {
  return (
    <div className="button">
      {props.link ? (
        <Link to={props.link} style={{ textDecoration: 'none' }}>
          <button 
            type={props.type || "button"} // Utilisez le type passé ou "button" par défaut
            style={{ 
              backgroundColor: props.bg, 
              border: props.border, 
              color: props.color 
            }}
            disabled={props.disabled} // Appliquez l'état disabled
          >
            {props.name}
          </button>
        </Link>
      ) : (
        <button 
          type={props.type || "button"} // Utilisez le type passé ou "button" par défaut
          style={{ 
            backgroundColor: props.bg, 
            border: props.border, 
            color: props.color 
          }}
          disabled={props.disabled} // Appliquez l'état disabled
        >
          {props.name}
        </button>
      )}
    </div>
  );
};
