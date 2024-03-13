import React, { Component } from 'react'
import ChercherFormations from '../../Componentes/chercherFormations/ChercherFormations';
import FormationsTable from '../../Componentes/FormationsTable/FormationsTable';

export default class Formations extends Component {
  render() {
    return (
      <>
     <ChercherFormations/>
     <FormationsTable/>
     
     </>
    )
  }
}
