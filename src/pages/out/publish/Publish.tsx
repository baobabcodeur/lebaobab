import "./publish.scss"

export const Publish = () => {
  return (
    <div className="publish">

      <div className="conteneurP">
        <div className="border"></div>
        <div className="cForm">

          <h2>Dites-nous ce que vous avez besoin de faire réaliser</h2>
          <p>Contactez des prestataires qualifiés en quelques minutes.
             Visualisez leur profil, leurs évaluations, leurs portfolios
              et discutez avec eux. Votre paiement est transférer au 
            prestataire que lorsque vous êtes satisfait à 100 % de leur travail.</p>

            <form action="">
              <div className="nom">
                <label htmlFor="nom">Ecrivez le nom du projet</label>
              <input type="text" id="nom" />
              </div>
              <div className="description">
                <label htmlFor="description">Decrivez nous le projet</label>
                <textarea name="description" id="description"></textarea>
              </div>
              <div className="image">
                <label htmlFor="image">Joindre image du projet</label>
                <input type="file" />
              </div>
              <div className="fichier">
                <label htmlFor="file">Joindre un fichier</label>
                <input type="file" />
              </div>
              <div className="competence">
                <label htmlFor="skill">Quelles compétences sont nécessaires?</label>
               
               <textarea name="skill" id="skill"></textarea>
              </div>
              <div className="budgetMin">
                <label htmlFor="">Budget minimum</label>
                <input type="number" />
              </div>
              <div className="budgetMax">
                <label htmlFor="">Budget maximum</label>
                <input type="number" />
              </div>
              <div className="typeProjet">
              <label >Types de projet:</label>

                    <select name="pets" id="pet-select">
                      <option value="">--choisir une option--</option>
                      <option value="dog">En ligne</option>
                      <option value="cat">Présentiel</option>

                    </select>
              </div>
              <div className="duree">
                <label htmlFor="">Duree</label>
                <input type="text" />
              </div>
              <button type="submit">Publier mon projet</button>
            </form>
        </div>
      </div>
    </div>
  )
}
