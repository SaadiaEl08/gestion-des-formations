import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployes, setParticipations } from '../../store/Actions';
import "./employesTable.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function EmployesTable() {
  const dispatch = useDispatch();

  const employes = useSelector(state => state.employes);
  const participations = useSelector(state => state.participations);
  const filterEmploye = useSelector(state => state.filterEmploye);
  const filterEmployeValue = useSelector(state => state.filterEmployeValue);
  const [reload, setReload] = useState("");
  const [diploms, setDiplomes] = useState([]);
  const [load, setLoad] = useState(false);
  const printContent = useRef();
  const nav = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:8000/diplomes")
      .then((response) => {
        setDiplomes(response.data);
      }).then(() => setLoad(true));
    axios.get("http://localhost:8000/participations")
      .then((response) => {
        dispatch(setParticipations(response.data));
      });


  }, [dispatch]);


  useEffect(() => {
    fetch("http://localhost:8000/employes")
      .then(response => response.json())
      .then(response => {
        if ((!filterEmploye && !filterEmployeValue)
          || (filterEmploye && !filterEmployeValue)) {
          dispatch(setEmployes(response));
          return;
        }
        let data = response.filter(e => {
          if (e[filterEmploye]) {
            return e[filterEmploye].toUpperCase().includes(filterEmployeValue.toUpperCase());
          }
          return (participations.filter((p) => p.employe_id === e.id).length) == (filterEmployeValue);
        });
        dispatch(setEmployes(data));
      });
  }, [filterEmployeValue, filterEmploye,participations,reload, dispatch]);

  const deleteHandle = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("etes vous sure de supprimer cet employe?")) {
      axios.delete(`http://localhost:8000/employes/${id}`).then(() => {
        setReload(id);
      });
    }
  };

  return (
    <div className="container" ref={printContent}>
      <div className='no-print'>
        <button className="fa-solid fa-plus" onClick={() => nav("/employes/add")}> Ajouter</button>
        <button className="fa-solid fa-print printBtn" onClick={()=>window.print()}> Print</button>
      </div>
      {load ?
        <table >
          <thead>
            <tr>
              <th>#ID</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Tel</th>
              <th>Nombre de formation(s)</th>
              <th>Diplôme</th>
              <th className='no-print' colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employes.map(e => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.nom}</td>
                    <td>{e.prenom}</td>
                    <td>{e.telephone}</td>
                    <td>{(participations.filter((p) => p.employe_id === e.id).length)}</td>
                    <td>{(diploms.filter(d => d.id === e.diplomeId))[0].nom}</td>
                    <td className='no-print' onClick={() => deleteHandle(e.id)}><i className="fa-solid fa-trash" ></i></td>
                    <td className='no-print'><Link to={`/employes/${e.id}`} className="fa-solid fa-edit" ></Link></td>
                  </tr>);
              })
            }
          </tbody>
        </table> : "loading..."}
    </div>
  );
}

export default EmployesTable;