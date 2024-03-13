import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormations } from '../../store/Actions';
import "./formationsTable.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
function FormationsTable() {
  const dispatch = useDispatch();

  const formations = useSelector(state => state.formations);
  const filterFormation = useSelector(state => state.filterFormation);
  const filterFormationValue = useSelector(state => state.filterFormationValue);
  const dateMin = useSelector(state => state.dateMin);
  const dateMax = useSelector(state => state.dateMax);
  const [reload, setReload] = useState("");
  const nav = useNavigate();



  useEffect(() => {
    axios.get("http://localhost:8000/formations")
      .then((response) => {
        let updatedData = [];
        response.data.forEach((e) => {
          if (e.etat !== "Annuler") {
            let date_debut = moment(e["date_debut"], "YYYY-MM-DD");
            let date_fin = moment(e["date_fin"], "YYYY-MM-DD");
            let now = moment().format("YYYY-MM-DD");
            if (date_debut.isBefore(now) && date_fin.isAfter(now)) {
              updatedData.push({ "id": e.id, "etat": "En cours" });
            } else if (date_debut.isAfter(now)) {
              updatedData.push({ "id": e.id, "etat": "Programmer" });
            } else if (date_fin.isBefore(now)) {
              updatedData.push({ "id": e.id, "etat": "Terminé" });
            }
          }

        });
        return updatedData;
      }
      )
      .then(res =>
        axios.all(
          res.map(
            e => axios.patch(`http://localhost:8000/formations/${e.id}`, { "etat": e.etat })
          ))

      ).then(res => axios.get("http://localhost:8000/formations")).then(res => dispatch(setFormations(res.data)));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/formations")
      .then(response => response.json())
      .then(response => {
        if (filterFormation !== "periode" && (!filterFormation || !filterFormationValue)) {
          dispatch(setFormations(response));
          return;
        }
        let data = response.filter(e => {
          if (filterFormation === "periode") {
            let date_debut = moment(e["date_debut"], "YYYY-MM-DD");
            let date_fin = moment(e["date_fin"], "YYYY-MM-DD");
            let date_filter_min = moment(dateMin, "YYYY-MM-DD");
            let date_filter_max = moment(dateMax, "YYYY-MM-DD");
            if (dateMax && dateMin) {
              return (date_debut.isAfter(date_filter_min) || date_debut.isSame(date_filter_min))
                && (date_fin.isBefore(date_filter_max) || date_fin.isSame(date_filter_max));
            }
            if (!dateMin && !dateMax) {
              return response;
            }
            if (dateMin && !dateMax) {
              return date_debut.isAfter(date_filter_min);
            }
            if (!dateMin && dateMax) {
              return date_fin.isBefore(date_filter_max);
            }
          }
          return e[filterFormation].toUpperCase().includes(filterFormationValue.toUpperCase());
        });
        dispatch(setFormations(data));

      });
  }, [filterFormation, filterFormationValue, dateMax, dateMin, reload, dispatch]);



  const deleteHandle = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("etes vous sure de supprimer cette formation?")) {
      axios.delete(`http://localhost:8000/formations/${id}`).then(() => {
        setReload(id);
      });
    }
  };

  return (
    <div className="container">
      <div className='noprint'>
        <button className="fa-solid fa-plus" onClick={() => nav("/formations/add")}> Ajouter</button>
        <button className="fa-solid fa-print printBtn" onClick={() => window.print()}> Print</button>
      </div>
      <table >
        <thead>
          <tr>
            <th>#ID</th>
            <th>Nom</th>
            <th>Date debut</th>
            <th>Date fin</th>
            <th>Etat</th>
            <th>Adresse</th>
            <th className='noprint' colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            formations.map(e => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.nom}</td>
                  <td>{e.date_debut}</td>
                  <td>{e.date_fin}</td>
                  <td>{e.etat}</td>
                  <td>{e.adresse}</td>
                  <td className='noprint' onClick={() => deleteHandle(e.id)}><i className="fa-solid fa-trash" ></i></td>
                  {e.etat !== "Annuler" && e.etat !== "Terminé" && <td><Link to={`/formations/${e.id}`} className="fa-solid fa-edit noprint" ></Link></td>}
                </tr>);
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default FormationsTable;