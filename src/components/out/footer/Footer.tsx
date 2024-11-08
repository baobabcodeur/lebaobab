import "./footer.scss"

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="plateforme">
          <h3>Plateforme</h3>
         <a href="">Enligne</a>
          <a href="">Physiques</a>
          <a href="">Rapide annonce 6h</a>
        </div>
        <div className="services">
          <h3>Nos services</h3>
          <a href="">Nos freelance a distance</a>
          <a href="">Nos prestataires physique</a>
          <a href="">Les projets</a>
        </div>
        <div className="mentions">
          <h3>Mentions légales</h3>
          <a href="">Mentions légales</a>
          <a href="">Conditions d'utilisation</a>
          <a href="">Protections des données</a>
        </div>
        <div className="nous">
          <h3>LeBaobab</h3>
          <a href="">Qui sommes-nous</a>
          <a href="">Aide</a>
          <a href="">Contact</a>
        </div>
      </div>
      <div className="message">
      La plateforme LeBaobab vous permet de trouver vos futurs prestataires parmi les métiers référencés : Développeur, Social Média Manager, Photographe, Coiffeur, UX Designer, etc. Trouvez facilement et rapidement la perle rare parmi nos milliers
       de prestataire pour mener à bien tous vos projets.
      </div>
      <div className="social">
        <div>
          <h3>Retrouvez-nous sur </h3>
        <img src="icons8-fb-48.png" alt="" />
        <img src="icons8-instagram-48.png" alt="" />
        <img src="icons8-linkedin-48.png" alt="" />
        <img src="icons8-tic-tac-51.png" alt="" />
        <img src="icons8-x-48.png" alt="" />
        
        </div>
       
      </div>
      <div className="sign">
        LeBaobab 2024 - Powered & design by <a href="">jeanamekpod@gmail.com</a>
      </div>
    </div>
  )
}
