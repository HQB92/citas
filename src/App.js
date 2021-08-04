import React, { Fragment, useState, useEffect }from 'react';
import Formulario from "./components/Formulario";
import Cita from './components/Cita';

function App() {
  // Citas en local storage
  let citasIniciales =localStorage.getItem('citas');
  /*if(!citasIniciales){
    citasIniciales=[];
  }
*/
  //Arreglo de citas
  const [citas,guardarCitas] = useState(!!citasIniciales?JSON.parse(citasIniciales):[]);

  //useefecct para cuando operacion del state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Funcio que toam citas actuales e  ingresa las nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }
  // Funcion que elimina cta or ID
  const eliminarCita = ID =>{
    const nuevasCitas = citas.filter(cita => cita.ID !== ID);
    guardarCitas(nuevasCitas);
  }

// MensajeCondicional de citas
const titulo =citas.length === 0 ? 'No hay Citas':'Administra tus Citas' ;
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key = {cita.ID}
                cita= {cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
