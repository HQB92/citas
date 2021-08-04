import React, { Fragment, useState }from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
    //crear state de citas
    const[cita,actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [ error, actualizarError] = useState(false)

    //Funcion Para verificar el uso de state
    const updateState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value

        })
    }
    //Extrear datos
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e =>{
        e.preventDefault();
        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //Eliminar el Mensaje Previo
        actualizarError(false);
        //asignar ID
        cita.ID = uuidv4();

        //Crear la cita
        crearCita(cita);

        //Reiniciar la cita
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }
    return (
        <Fragment>
            <h2>Crear citas</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios.</p>
            :null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota </label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={updateState}
                    value={mascota}
                />
                <label>Nombre Dueño </label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={updateState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={updateState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={updateState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={updateState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}
Formulario.protoType ={
    crearCita: PropTypes.func.isRequired
}

export default Formulario;