
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { enviroments } from './env';
import { useState, useEffect } from "react";
import Modal from "react-modal";
function App() {


  var [cedula, setcedula] = useState("");
  var [estadon, setestadon] = useState(false);
  var [estadol, setestadol] = useState(false);

  Modal.setAppElement("body");
  var [modalIsOpen, setIsOpen] = useState(false);
  var [modalmensaje, setmodalmensaje] = useState(false);
  var [modalmensajedos, setmodalmensajedos] = useState();
  var [estadoboton, setestadoboton] = useState(false);

  var [nombre, setnombre] = useState(null);
  var [lugar, setlugar] = useState([
    null,
    null,
    null,
    null,
    null,
    null,

  ]);
  var [persona, setpersona] = useState([]);

  useEffect(() => {

    mostrar();
  }, []);
  const mostrar = async () => {
    const res = await axios.get(enviroments.backendUrl + "/api/persona");
    //  setpersona(res.data[0]);
    console.log(res.data);
    setpersona(res.data);

    //   console.log(persona);
  }
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let precentage = Math.floor((loaded * 100) / total);
      console.log("options");
      console.log(precentage);
      if (precentage < 100) {
        console.log(precentage);
      }
    }
  }
  const config = {
    onUploadProgress: progressEvent => console.log("progreso" + progressEvent.loaded)
  }
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",

      transform: "translate(-50%, -50%)",
    },
  };
  const cedulaChange = async (e) => {
    e.preventDefault();
    console.log("cedula : " + e.target.value);
    setcedula((cedula = e.target.value));
  };

  const onChangeNombre = async (e) => {
    console.log("Nombre");
    setestadon(estadon = !estadon);
    console.log(estadon);
  }
  const onChangeLugardevotacion = async (e) => {
    console.log("Lugar de votacion");
    setestadol(estadol = !estadol);
    console.log(estadol);
  }
  const Guardar = async () => {
    var params = {
      nombrecompleto: nombre,
      cedula: lugar[0],
      departamento: lugar[1],
      municipio: lugar[2],
      puesto: lugar[3],
      direccion: lugar[4],
      mesa: lugar[5]

    }
    if (cedula == "") {
      console.log("NADA");
    } else {
      if (estadol == false && estadon == false) {
        console.log("NADA");
      }
      if (estadol == true && estadon == false) {
        if (nombre == null && lugar[0] == null) {
          //  setpersona(res.data[0]);
        } else {
          const res = await axios.post(enviroments.backendUrl + "/api/persona", params);
          console.log(res);
          mostrar();
        }
      }
      if (estadol == false && estadon == true) {
        if (nombre == null && lugar[0] == null) {
          //  setpersona(res.data[0]);
        } else {
          const res = await axios.post(enviroments.backendUrl + "/api/persona", params);
          console.log(res);
          mostrar();
        }
      }
      if (estadol == true && estadon == true) {
        if (nombre == null && lugar[0] == null) {
          //  setpersona(res.data[0]);
        } else {
          const res = await axios.post(enviroments.backendUrl + "/api/persona", params);
          console.log(res);
          mostrar();
        }
      }
    }


  }
  const borrar = async (id) => {
    // console.log(id.id);
    await axios.delete(enviroments.backendUrl + "/api/delete/" + id);
    mostrar();
  }
  const CerrarModal = async () => {
    Guardar();
    mostrar();
    closeModal();
    setestadoboton(false);
  }
  function renderboton() {
    if (estadoboton == true) {
      return (
        <button
          style={{ width: "100px", height: "100%" }}
          type="button"
          className="btn btn-dark"
          onClick={() => CerrarModal()}
        >
          Cerrar
        </button>
      );
    }
  }

  const enviar = async () => {
    console.log(cedula)
    if (cedula == "") {
      openModal();
      setestadoboton(true);
      setmodalmensaje("Ingrese cedula");
    } else {
      //  console.log("Enviar");
      if (estadol == false && estadon == false) {
        openModal();
        setestadoboton(true);
        setmodalmensaje("Por favor elija una opción");
      }
      if (estadol == true && estadon == false) {
        console.log("opción Lugar de votacion")
        setnombre(null);
        openModal();
        setmodalmensaje("Buscando el lugar de votacion, espere unos segundos...");

        var params = {
          cedula: cedula
        }
        ///'+ this.selectedRoute
        var confuguracion = (config) =>
          axios.post(

            enviroments.backendUrl + "/api/consulta/lugar",
            params,
            config
          ).then(response => setlugar(response.data));
        // setlugar(response
        confuguracion({

          onDownloadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (percentage == 100) {
              console.log("ter")
              setmodalmensaje("Busqueda terminada");
              setestadoboton(true);
            }
          }
        });
        console.log(lugar)
      }
      if (estadol == false && estadon == true) {
        openModal();
        setmodalmensaje("Buscando Nombre, espere unos segundos...");
        setlugar([null, null, null, null, null, null]);

        console.log("opción Nombre")
        var params = {
          cedula: cedula
        }
        ///'+ this.selectedRoute
        var confuguracion = (config) =>
          axios.post(

            enviroments.backendUrl + "/api/consulta/nombre/",
            params,
            config
          ).then(response => setnombre(response.data));

        confuguracion({

          onDownloadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (percentage == 100) {
              console.log("ter")
              setmodalmensaje("Busqueda terminada");
              setestadoboton(true);
            }
          }
        });

        /*
        const config = {
          onUploadProgress: (progressEvent) => console.log(progressEvent.loaded)
        };
        const dato = await axios.post(
          enviroments.backendUrl + "/api/consulta/nombre",
          params,config);
          console.log(dato);*/
      }
      if (estadol == true && estadon == true) {
        var estado = 0;
        console.log("Las dos opciones")
        openModal();
        setmodalmensaje("Buscando Nombre y lugar de votacion, espere unos segundos...");

        console.log("opción Nombre")
        var params = {
          cedula: cedula
        }
        ///'+ this.selectedRoute
        var confuguracion = (config) =>
          axios.post(

            enviroments.backendUrl + "/api/consulta/nombre/",
            params,
            config
          ).then(response => setnombre(response.data));

        confuguracion({

          onDownloadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (percentage == 100) {
              console.log("ter")
              setmodalmensajedos("Busqueda de nombre completada, espere que encuentre el lugar de votacion...")
              estado = estado + 1;
              if (estado == 1) {
                console.log("termino una tarea")
              }
              if (estado == 2) {
                setmodalmensaje("Busqueda terminada");
                console.log("termino las dos tareas")
                setmodalmensajedos("Terminado")
                setestadoboton(true);
              }
            }
          }
        });
        console.log("opción Lugar de votacion")




        var params = {
          cedula: cedula
        }
        ///'+ this.selectedRoute
        var confuguracion = (config) =>
          axios.post(

            enviroments.backendUrl + "/api/consulta/lugar",
            params,
            config
          ).then(response => setlugar(response.data));
        // setlugar(response
        confuguracion({

          onDownloadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (percentage == 100) {
              console.log("ter")
              setmodalmensajedos("Busqueda del lugar de votacion terminado, espere que encuentre el nombre...")
              estado = estado + 1;
              if (estado == 1) {
                console.log("termino una tarea")
              }
              if (estado == 2) {
                setmodalmensaje("Busqueda terminada");
                setmodalmensajedos("Terminado")
                console.log("termino las dos tareas")
                setestadoboton(true);
              }
            }
          }
        });

      }


    }


  }
  return (
    <>
      <br></br>
      <br></br>
      <br></br>

      <div className="container">
        <div className="form-check" onChange={onChangeNombre} >
          <input className="form-check-input" type="checkbox" value={estadon} id="flexCheckIndeterminate"></input>
          <label className="form-check-label" htmlFor="flexCheckIndeterminate">
            Nombre
          </label>
        </div>
        <div className="form-check" onChange={onChangeLugardevotacion}>
          <input className="form-check-input" type="checkbox" value={estadol} id="flexCheckIndeterminate"></input>
          <label className="form-check-label" htmlFor="flexCheckIndeterminate">
            Lugar de votacion
          </label>
        </div>
      </div>
      <div className="page-hero d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column bd-highlight mb-3">

          <div className="p-2 bd-highlight">
            <input
              type="number"
              className="form-control"
              placeholder="CEDULA"
              aria-label="# Placa"
              aria-describedby="basic-addon1"
              onChange={cedulaChange}
              maxLength="20"
            ></input>
          </div>

          <div className="p-2 bd-highlight">
            <button
              style={{ width: "100px", height: "100%" }}
              type="button"
              className="btn btn-dark"
              onClick={() => enviar()}
            >
              ENVIAR
            </button>
          </div>
        </div>

      </div>
      <div className="container">
        <table className="table">
          <thead className="table table-striped table-dark">
            <tr>
              <th scope="col">NOMBRE COMPLETO</th>
              <th scope="col">CEDULA</th>
              <th scope="col">DEPARTAMENTO</th>
              <th scope="col">MUNICIPIO</th>
              <th scope="col">PUESTO</th>
              <th scope="col">DIRECCION</th>
              <th scope="col">MESA</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

            <tr className="table-info " style={{ height: '60px' }}>

              <th scope="row " >{nombre}</th>
              <td>{lugar[0]}</td>
              <td>{lugar[1]}</td>
              <td>{lugar[2]}</td>
              <td>{lugar[3]}</td>
              <td>{lugar[4]}</td>
              <td>{lugar[5]}</td>
              <td></td>

            </tr>

            {persona.map((persona) => (
              <><br></br>
                <tr key={persona.id} >

                  <th>{persona.nombrecompleto}</th>
                  <td>{persona.cedula}</td>
                  <td>{persona.departamtento}</td>
                  <td>{persona.municipio}</td>
                  <td>{persona.puesto}</td>
                  <td>{persona.direccion}</td>
                  <td>{persona.mesa}</td>
                  <td>
                    <button
                      style={{ width: "100px", height: "100%" }}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => borrar(persona.id)}
                    >
                      ELIMINAR
                    </button>
                  </td>

                </tr>
              </>))}

          </tbody>
        </table>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <h2>{modalmensaje}</h2>
          <p>{modalmensajedos}</p>
          {renderboton()}

        </Modal>
      </div>
    </>
  );
}

export default App;
