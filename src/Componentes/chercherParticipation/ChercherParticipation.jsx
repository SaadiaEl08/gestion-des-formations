import React, { useEffect, useRef, useState } from 'react';
import styles from "./chercher.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setEmployes, setFilterEmploye, setFilterEmployeValue, setFilterParticipation, setFilterParticipationValue, setFormations } from '../../store/Actions';
import axios from 'axios';
function ChercherParticipation() {
    const dispatch = useDispatch();
    const filterParticipationValue = useSelector(state => state.filterParticipationValue);
    const filterParticipation = useSelector(state => state.filterParticipation);
    const employes = useSelector(state => state.employes);
    const formations = useSelector(state => state.formations);
    const selectRef = useRef();
    const [html, setHtml] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/formations")
            .then((response) => {
                dispatch(setFormations(response.data));
            });
        axios.get("http://localhost:8000/employes")
            .then((response) => {
                dispatch(setEmployes(response.data));
            });
        dispatch(setFilterParticipation(""));
        dispatch(setFilterParticipationValue(""));
    }, [dispatch]);

    useEffect(() => {
        selectRef.current.disabled = true;
        if (filterParticipation === "employe") {
            selectRef.current.disabled = false;
            setHtml(employes.map(e => (
                <option key={e.id} value={e.id}>{e.id}--{e.nom}</option>
            )));
        }
        if (filterParticipation === "formation") {
            selectRef.current.disabled = false;
            setHtml(formations.map(e => (
                <option key={e.id} value={e.id}>{e.id}--{e.nom}</option>
            )));
        }

    }, [filterParticipation, formations, employes]);
   

    return (
        <form className={`${styles.form} ${styles.noprint}`} onSubmit={(e) => { e.preventDefault(); }} >
            <label htmlFor="">Chercher selon :</label>
            <div>
                <input type="radio" name="chercherSelon" id="employe" value="employe" onChange={(e) => { dispatch(setFilterParticipation("employe")); dispatch(setFilterParticipationValue("")); }} />
                <label htmlFor="employe">Employe : </label> <br />
                <input type="radio" name="chercherSelon" id="formation" value="formation" onChange={(e) => { dispatch(setFilterParticipation("formation")); dispatch(setFilterParticipationValue("")); }} />
                <label htmlFor="formation">Formation : </label><br />
            </div>
            <select ref={selectRef} className={styles.chercherInput} disabled
                onChange={(e) => dispatch(setFilterParticipationValue(e.target.value))} value={filterParticipationValue}>
                <option value="">Choisir.............</option>
                {html}
            </select>
        </form>

    );
}

export default ChercherParticipation;