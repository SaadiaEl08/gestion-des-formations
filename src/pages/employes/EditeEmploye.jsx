import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./form.module.css";
function EditeEmploy() {
  const { id } = useParams();
  const [editedEmploy, setEditedEmploy] = useState({ "nom": "", "prenom": "", "telephone": "", "diplomeId": ""});
  const [diplomeName, setDiplomeName] = useState("");
  const [diploms, setDiplomes] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/diplomes")
      .then((response) => {
        setDiplomes(response.data.filter(d => d.id != 0));
      });
  }, []);


  useEffect(() => {
    axios.get(`http://localhost:8000/employes/${id}`)
      .then((response) => setEditedEmploy(response.data))
      .then(() => {
        let diplome = diploms.filter(e => e["id"] === editedEmploy["diplomeId"])[0];
        setDiplomeName(diplome?diplome.nom:"");
      });

  }, [id, diploms]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/employes/${id}`, editedEmploy);
    nav("/employes");
  };
  const changeHandler = (e) => {
    setEditedEmploy({ ...editedEmploy, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Edite l'Employee ayant l'id {id}</h2>
      <div>
        <label htmlFor="nom">Nom : </label>
        <input type="text" name='nom' id='nom' value={editedEmploy["nom"]} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="prenom">Prenom : </label>
        <input type="text" name='prenom' id='prenom' value={editedEmploy["prenom"]} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="telephone">Telephone : </label>
        <input type="tel" name='telephone' id='telephone' value={editedEmploy["telephone"]} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor="diplomeId">Deplome : </label>
        <select name='diplomeId' id='diplomeId'  onChange={changeHandler} required >
          <option value={editedEmploy["diplomeId"]} defaultValue>{diplomeName}</option>
          {diploms.map(e => (
            <option key={e.id} value={e.id}>{e.nom}</option>
          ))}
        </select>

      </div>
      <div>
        <button>Save</button>
      </div>



    </form>
  );
}

export default EditeEmploy;