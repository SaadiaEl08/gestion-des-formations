import React, { useEffect, useRef, useState } from 'react';
import styles from "./chercher.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFilterEmploye, setFilterEmployeValue } from '../../store/Actions';
import axios from 'axios';
function ChercherEmployes() {
    const dispatch = useDispatch();
    const filterEmployeValue = useSelector(state => state.filterEmployeValue);
    const chercherInputRef = useRef();
    const chercherInputRefSelect = useRef();
    const [diploms, setDiplomes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/diplomes")
            .then((response) => {
                setDiplomes(response.data.filter(e=>e.id!=0));
            });
        dispatch(setFilterEmployeValue(""));
        dispatch(setFilterEmploye(""));
        chercherInputRef.current.disabled = true;
    }, [dispatch]);



    const chercherInputEffect = (event, type = "text", placeholder = "") => {
        dispatch(setFilterEmployeValue(""));
        if (type !== "select") {
            chercherInputRefSelect.current.hidden = true;
            chercherInputRef.current.hidden = false;
            chercherInputRef.current.disabled = false;
            chercherInputRef.current.type = type;
            chercherInputRef.current.placeholder = placeholder;
            chercherInputRef.current.focus();
        } else {
            chercherInputRef.current.hidden = true;
            chercherInputRefSelect.current.hidden = false;
            chercherInputRefSelect.current.focus();
        }
        if (type === "number") {
            chercherInputRef.current.min = 0;
        }

        dispatch(setFilterEmploye(event.target.value));
    };





    return (
        <form className={`${styles.form} ${styles.noprint}`} onSubmit={(e) => { e.preventDefault(); }} >
            <label htmlFor="">Chercher selon :</label>
            <div>
                <input type="radio" name="chercherSelon" id="nom" value="nom" onChange={(e) => chercherInputEffect(e, "text", "Entrer le nom de l'employe")} />
                <label htmlFor="nom">Nom</label> <br />

                <input type="radio" name="chercherSelon" id="diplomeId" value="diplomeId" onChange={(e) => chercherInputEffect(e, "select", "")} />
                <label htmlFor="diplomeId">Diplôme</label><br />

                <input type="radio" name="chercherSelon" id="nmbrFormation" value="nmbrFormation" onChange={(e) => chercherInputEffect(e, "number", "Entrer le nembre d'information de l'employe")} />
                <label htmlFor="nmbrFormation">Nembre de formation</label>

            </div>

            <input type="text" ref={chercherInputRef} className={styles.chercherInput}
                onChange={() => dispatch(setFilterEmployeValue(chercherInputRef.current.value))} value={filterEmployeValue} disabled />
            <select ref={chercherInputRefSelect} className={styles.chercherInput} hidden
                onChange={() => dispatch(setFilterEmployeValue(chercherInputRefSelect.current.value))} value={filterEmployeValue}>
                <option value="">Selecte un diplome...</option>
                {diploms.map(e => (
                    <option key={e.id} value={e.id}>{e.nom}</option>
                ))}
            </select>

        </form>

    );
}

export default ChercherEmployes;