import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // State principal
  // ciudad = state, guardarCiudad = this.setState
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  const datosConsulta = datos => {
    
    // Validar que ambos datos estén
    if(datos.ciudad === '' || datos.pais === ''){
      guardarError(true);
      return;
    }
    // Ciudad y país existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);

  }  

  useEffect(() => {

    // Prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {

      const appId = 'b1a7014557729a3630109631832fdd59';
  
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
      // consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
  
    }
    
    consultarAPI();
  }, [ciudad, pais]);

  

  // Cargar un componente Condicionalmente
  let componente;
  if(error){
    // Hay un error, mostrarlo
    componente = <Error mensaje = 'Ambos campos son obligatorios'/>
  } else if(resultado.cod === "404"){
    componente = <Error mensaje= "La ciudad no existe en nuestro registro" />
  }else{
    // Mostrar el Clima
    componente = <Clima 
                    resultado={resultado}
                    />;
  }

  return (
      <div className="App">
        <Header
            titulo="Clima React App"
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                <Formulario
                datosConsulta={datosConsulta}
                />
              </div>

              <div className="col s12 m6">
                {componente}
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default App;
