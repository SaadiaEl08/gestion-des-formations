import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./form.module.css";
import moment from 'moment';
function EditeFormation() {
  const { id } = useParams();
  const [editedFormation, setEditedFormation] = useState({ "nom": "", "date_debut": "", "date_fin": "", "etat": "", "adresse": "", "diplomeId": "0" });
  const [diploms, setDiplomes] = useState([]);
  const [diplomeName, setDiplomeName] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/diplomes")
      .then((response) => {
        setDiplomes(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8000/formations/${id}`)
      .then((response) => setEditedFormation(response.data)
      )
      .then(() => {
        let diplome = diploms.filter(e => e["id"] === editedFormation["diplomeId"])[0];
        setDiplomeName(diplome ? diplome.nom : "All");
      });
  }, [id,diploms]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (moment(editedFormation.date_debut).isAfter(moment(editedFormation.date_fin)) ||
    moment(editedFormation.date_fin) < moment()) {
      alert("La date de début doit être anférieure à la date de fin et supérieure à la date d'aujourd'hui.");
      return;
    }
    axios.put(`http://localhost:8000/formations/${id}`, editedFormation);
    nav("/formations");
  };
  const changeHandler = (e) => {
    setEditedFormation({ ...editedFormation, [e.target.name]: e.target.value });
  };




  return (  
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Editer la formation ayant lid {id} </h2>
      <div>
        <label htmlFor="nom">Nom : </label>
        <input type="text" name='nom' id='nom' placeholder='Entrer le nom du formation' onChange={changeHandler} value={editedFormation["nom"]} required />
      </div>
      <div>
        <label htmlFor="date_debut">Date Debut : </label>
        <input type="date" name='date_debut' id='date_debut' value={editedFormation["date_debut"]} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="date_fin">Date Fin : </label>
        <input type="date" name='date_fin' id='date_fin' value={editedFormation["date_fin"]} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="adresse">Adresse : </label>
        <input type="text" name='adresse' id='adresse' value={editedFormation["adresse"]} placeholder='Entrer l adresse du formation ' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="etat">Etats : </label>
        <select name="etat" id="etat" onChange={changeHandler}>
          <option value={editedFormation["etat"]} defaultValue>{editedFormation["etat"]}</option>
          {editedFormation["etat"]!=="Terminé" &&editedFormation["etat"]!=="Annuler" && <option value="Annuler">Annuler</option>}
        </select>
      </div>
      <div>
        <label htmlFor="diplomeId">Diplome Nécessaire :</label>
        <select name="diplomeId" id="diplomeId" onChange={changeHandler}>
          <option value={editedFormation["diplomeId"]} defaultValue>{diplomeName}</option>
          <option value="0">All</option>
          {
            diploms.map(e => (
              <option key={e.id} value={e.id}>{e.nom}</option>
            ))
          }

        </select>
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
}

export default EditeFormation;