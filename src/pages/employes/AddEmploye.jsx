import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./form.module.css";
function AddEmploye() {
  const [newEmploy, setNewEmploy] = useState({ "nom": "", "prenom": "", "telephone": "", "diplomeId": "" });
  const nav = useNavigate();
  const [diplomes, setDiplomes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/diplomes")
      .then((response) => { 
        setDiplomes(response.data.filter(e=>e.id != 0));
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/employes", newEmploy);
    nav("/employes");
  };
  const changeHandler = (e) => {
    setNewEmploy({ ...newEmploy, [e.target.name]: e.target.value });
  };




  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Ajouter un Employee </h2>

      <div>
        <label htmlFor="nom">Nom : </label>
        <input type="text" name='nom' id='nom' placeholder='Entrer votre nom' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="prenom">Prenom : </label>
        <input type="text" name='prenom' id='prenom' placeholder='Entrer votre prenom' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="telephone">Telephone : </label>
        <input type="tel" name='telephone' id='telephone' placeholder='Entrer votre numero de telephone' onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="diplomeId">Deplome : </label>
        <select name="diplomeId" id='diplomeId' onChange={changeHandler} required>
          <option value="">Choisir un diplôme.....</option>
          {
            diplomes.map(deplome => (
              <option key={deplome.id} value={deplome.id}>{deplome.nom}</option>
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

export default AddEmploye;