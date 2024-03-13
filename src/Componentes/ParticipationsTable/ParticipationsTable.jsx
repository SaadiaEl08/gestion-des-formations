import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setParticipations } from '../../store/Actions';
import "./participationTable.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function ParticipationsTable() {
  const dispatch = useDispatch();

  const participations = useSelector(state => state.participations);
  const employes = useSelector(state => state.employes);
  const formations = useSelector(state => state.formations);

  const filterParticipation = useSelector(state => state.filterParticipation);
  const filterParticipationValue = useSelector(state => state.filterParticipationValue);
  
  const [reload, setReload] = useState("");
  const [load, setLoad] = useState(false);



  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/participations")
      .then(response => response.json())
      .then(response => {
        if ((!filterParticipation && !filterParticipationValue)
          || (filterParticipation && !filterParticipationValue)) {
          dispatch(setParticipations(response));
          return;
        }
         let data = response.filter(e =>e[`${filterParticipation}_id`] === filterParticipationValue);
        dispatch(setParticipations(data));
      }).then(()=>setLoad(true));
  }, [filterParticipationValue, filterParticipation, reload, dispatch]);

  const deleteHandle = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("etes vous sure de supprimer cet employe?")) {
      axios.delete(`http://localhost:8000/participations/${id}`).then(() => {
        setReload(id);
      });
    }
  };

  return (
    load ? (
      <div className="container">
        <div className='noprint'>
        <button className="fa-solid fa-plus" onClick={() => nav("/participations/add")}> Ajouter</button>
        <button className="fa-solid fa-print printBtn" onClick={()=>window.print()}> Print</button>
        </div>
        <table >
          <thead>
            <tr>
              <th>#ID</th>
              <th>ID Employe</th>
              <th>Nom Employe</th>
              <th>ID Formation</th>
              <th>Nom Formation</th>
              <th className='noprint'>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {
              participations.map(e => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{employes.filter(emp => emp.id === e.employe_id)[0].id}</td>
                    <td>{employes.filter(emp => emp.id === e.employe_id)[0].nom}</td>
                    <td>{formations.filter(form => form.id === e.formation_id)[0].id}</td>
                    <td>{formations.filter(form => form.id === e.formation_id)[0].nom}</td>
                    <td onClick={() => deleteHandle(e.id)} className='noprint'><i className="fa-solid fa-trash" ></i></td>
                  </tr>);
              })
            }
          </tbody>
        </table>
      </div>) : "Loading ...."
  );
}

export default ParticipationsTable;