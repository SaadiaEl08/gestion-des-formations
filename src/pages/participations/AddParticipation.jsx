import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployes, setFormations, setParticipations } from '../../store/Actions';
import { useNavigate } from 'react-router-dom';
import styles from "./form.module.css";

function AddParticipation() {
  const employes = useSelector(state => state.employes);
  const formations = useSelector(state => state.formations);
  const participations = useSelector(state => state.participations);

  const dispatch = useDispatch();
  const [empFilter, setEmpFilter] = useState("");
  const [selectedFormationId, setSelectedFormationId] = useState("");
  const [selectedEmployes, setSelectedEmployes] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setEmpFilter("");
    setSelectedFormationId("");
    axios.get("http://localhost:8000/formations").then((res) => dispatch(setFormations(res.data.filter(e => e.etat === "Programmer"))));
    axios.get("http://localhost:8000/participations").then((res) => dispatch(setParticipations(res.data)));
  }, [dispatch]);

  useEffect(() => {
    if (empFilter && selectedFormationId) {
      axios.get("http://localhost:8000/employes").then((res) => {
        let participatedEmployes = participations.map(e => {
          if (e.formation_id === selectedFormationId) {
            return e.employe_id;
          }
        }
        );
        if (empFilter === "diplome") {
          let formation = formations.filter(e => e.id === selectedFormationId);
          dispatch(setEmployes(res.data.filter(e =>
            e.diplomeId === formation[0].diplomeId
            && !participatedEmployes.includes(e.id)
          )));
          return;
        }
        dispatch(setEmployes(res.data.filter(e => !participatedEmployes.includes(e.id))));
      });
    }

  }, [empFilter, dispatch, selectedFormationId, participations, formations]);

  const checkHandler = (e) => {
    setSelectedEmployes([...selectedEmployes, e.target.value]);
  };
  const submitHandler = () => {
    axios.all(
      selectedEmployes.map(
        (e) => {
          axios.post("http://localhost:8000/participations", {
            "formation_id": selectedFormationId,
            "employe_id": e
          });
        }
      )
    ).then(() => nav("/participations"));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <h2>Ajouter une Participation </h2>
      <div>
        <label htmlFor="formation">Choisir une formation :</label>
        <select name="formation" id="formation" onChange={(e) => setSelectedFormationId(e.target.value)} required>
          <option value="">Choisi une formation....</option>
          {formations.map((e) => {
            return (
              <option value={e.id} key={e.id}>{e.nom}</option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="">Employes :</label>
        <label htmlFor="all">All </label>
        <input type="radio" name="formationsBy" id="all" value="all" onChange={(e) => setEmpFilter(e.target.value)} required />
        <label htmlFor="diplome">Selon Le diplome </label>
        <input type="radio" name="formationsBy" id="diplome" value="diplome" onChange={(e) => setEmpFilter(e.target.value)} required />
      </div>
      <div className={styles.radios}>
        {empFilter && selectedFormationId && employes.map((e) => {
          return (
            <div key={e.id}>
              <label htmlFor={e.id}>{e.id} | {e.nom}</label>
              <input type="checkbox" name="employe" id={e.id} value={e.id} onChange={checkHandler} />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={submitHandler}>Ajouter</button>
      </div>
    </form>
  );
}

export default AddParticipation;