import "./announcementCard.scss";

type Props = {
    id: number; // Adding id to Props
    image: string;
    title: string;
    description: string;
    price: number;
    type: string;
    city: string;
}

export const AnnouncementCard = (props: Props) => {
  return (
    <div className="announcementCard" id={`announcement-${props.id}`}> {/* Optional use of id in the component */}
      <img src={props.image} alt={props.title} />
      <div className="card-body">
        <h4 className="title">{props.title}</h4>
        <p className="description">{props.description}</p>
        <p className="price">Prix : {props.price} Fcfa</p>
        <p><strong>Ville:</strong> {props.city}</p>
        <span className="tag">{props.type} <pre></pre> <img src="/icons8-whatsapp.png" alt="whatsapp"  /></span>
        
      </div>
    </div>
  );
};
