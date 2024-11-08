import Chat from "../../../../components/chat/Chat"
import "./discussionsClient.scss"

export const DiscussionsClient = () => {

  const projectId = 5; // Remplacez par le project ID réel
  const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
  return (
    <div className="discussionsClient">
     <Chat projectId={projectId} userId={userId} />
    </div>
  )
}
