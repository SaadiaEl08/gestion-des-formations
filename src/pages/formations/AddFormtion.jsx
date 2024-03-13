import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./form.module.css";
import moment from 'moment';
function AddFormation() {
  const [newFormation, setNewFormation] = useState({
    "nom": "", "date_debut": "", "date_fin": "", "etat": "Programmer", "adresse": "", "diplomeId": "0"
  });
  const nav = useNavigate();
  const [diploms, setDiplomes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/diplomes")
      .then((response) => { setDiplomes(response.data); });
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(newFormation.date_debut)
    console.log(newFormation.date_fin)

    if (moment(newFormation.date_debut).isAfter(moment(newFormation.date_fin)) ||
      moment(newFormation.date_fin) < moment()) {
      alert("La date de début doit être anférieure à la date de fin et supérieure à la date d'aujourd'hui.");
      return;
    }
    axios.post("http://localhost:8000/formations", newFormation);
    nav("/formations");
  };
  const changeHandler = (e) => {
    setNewFormation({ ...newFormation, [e.target.name]: e.target.value });
  };




  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Ajouter une formation </h2>
      <div>
        <label htmlFor="nom">Nom : </label>
        <input type="text" name='nom' id='nom' placeholder='Entrer le nom du formation' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="date_debut">Date Debut : </label>
        <input type="date" name='date_debut' id='date_debut' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="date_fin">Date Fin : </label>
        <input type="date" name='date_fin' id='date_fin' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="adresse">Adresse : </label>
        <input type="text" name='adresse' id='adresse' placeholder='Entrer l adresse du formation ' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="diplomeId">Diplome Nécessaire :</label>
        <select name="diplomeId" id="diplomeId" onChange={changeHandler}>
          <option value="0">All</option>
          {
            diploms.map(e => (
              <option key={e.id} value={e.id}>{e.nom}</option>
            ))
          }

        </select>
      </div>
      <div>
        <button>Ajouter</button>
      </div>



    </form>
  );
}

export default AddFormation;