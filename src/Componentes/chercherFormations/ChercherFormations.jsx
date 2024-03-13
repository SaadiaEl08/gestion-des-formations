import React, { useEffect, useState } from 'react';
import styles from "./chercher.module.css";
import { useDispatch } from 'react-redux';
import { setDateMax, setDateMin, setFilterFormation, setFilterFormationValue } from '../../store/Actions';
import axios from 'axios';
function ChercherFormations() {
    const dispatch = useDispatch();
    const [etats, setEtats] = useState([]);
    const [html, setHtml] = useState([]);

    useEffect(() => {
        dispatch(setFilterFormationValue(""));
        dispatch(setFilterFormation(""));
        axios.get("http://localhost:8000/formationEtats")
            .then((response) => setEtats(response.data[0].etats));
    }, []);

    const generateChercherHtml = (event) => {
        dispatch(setFilterFormationValue(""))
        dispatch(setFilterFormation(event.target.value));
        if (event.target.value === "nom") {
            return (
                <input type="text" className={styles.chercherInput} placeholder="Entrer le nom"
                    onChange={(e) => dispatch(setFilterFormationValue(e.target.value))} />
            );
        }
        if (event.target.value === "etat") {
            return (
                <select
                    onChange={(e) => dispatch(setFilterFormationValue(e.target.value))}>
                    <option value="">Selecter une etat......</option>
                    {
                        etats.map(e => <option value={e} key={e}>{e}</option>)
                    }
                </select>

            );
        }
        if (event.target.value === "periode") {
            return (
                <div className={styles.chercherParPeriode}>
                    <div>
                        <label htmlFor="dateDebut">Date debute : </label>
                        <input type="date" id="dateDebut" className={styles.chercherInput}
                            onChange={(e) => {
                                dispatch(setDateMin(e.target.value));
                            }} />
                    </div>
                    <div>
                        <label htmlFor="datefin">Date fin : </label>
                        <input type="date" id="datefin" className={styles.chercherInput}
                            onChange={(e) => {
                                dispatch(setDateMax(e.target.value));
                            }} />
                    </div>
                </div>);
        }
    };

    return (

        <form className={`${styles.form} ${styles.noprint}`} onSubmit={(e) => { e.preventDefault(); }} >
            <label htmlFor="">Chercher selon : </label>
            <div>
                <input type="radio" name="chercherSelon" id="nom" value="nom" onChange={(e) => setHtml(generateChercherHtml(e))} />
                <label htmlFor="nom">Nom </label> <br />

                <input type="radio" name="chercherSelon" id="periode" value="periode" onChange={(e) => setHtml(generateChercherHtml(e))} />
                <label htmlFor="periode">Periode </label> <br />

                <input type="radio" name="chercherSelon" id="etat" value="etat" onChange={(e) => setHtml(generateChercherHtml(e))} />
                <label htmlFor="etat">Etat </label>

            </div>
            <div className={styles.chercher}>
                {
                    html
                }
            </div>
        </form>

    );
}

export default ChercherFormations;