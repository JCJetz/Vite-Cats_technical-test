import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  // Primero Bootstrap
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Navbar from "./componets/Navbar.jsx";
import Footer from "./componets/Footer";
import "./App.css";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import Pagination from "./componets/Pagination";
//import 'bootstrap/dist/css/bootstrap.min.css';


const apiKey = import.meta.env.VITE_API_KEY;



// uso el estado de React "cats" para guardar los resultados obtenidos del servidor.
export function App() {
  const [cats, setCats] = useState("");   // Almacena todas las imágenes de gatos 
  //const [selects, setSelects] = useState("");
  const [selects, setSelects] = useState([]); // Maneja selección de razas  
  const [breedsData, setBreedsData] = useState([]); // Datos de todas las razas
  const [breeds, setBreeds] = useState(""); // Imágenes filtradas por raza

  //<Pagination nPages={nPages} currentPage={paginaActual} setCurrentPage={setPaginaActual}/>

  // User is currently on this page
  const [paginaActual, setPaginaActual] = useState(1);
  // Num of Records to be displayed on each page
  const [itemsPorPagina] = useState(12);

  // pagination calculations
  const ultimoItem = paginaActual * itemsPorPagina;
  const primerItem = ultimoItem - itemsPorPagina;
  // Records to be displayed on the current page
  const catsActuales = cats.slice(primerItem, ultimoItem);

  const nPages = Math.ceil(cats.length / itemsPorPagina);

  //La funcion "getCatsFromApi" hace una solicitud asíncrona a thecatapi.com para recuperar los datos;
  // que devuelve un objeto json que contiene imágenes de gatos con otros datos de la imagen:
  // {"id":"8tq","url":"https://cdn2.thecatapi.com/images/8tq.jpg","width":483,"height":323}
  //El método fetch() inicia una solicitud a esta API y await detiene la ejecución hasta que se reciba la respuesta.
  //El método res.json() luego convierte la respuesta en un objeto json que devuelve la función. gatitosAPIjson
  //una lista de gatos, desde URL específica.
  async function getCatsFromApi() {
    const res = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    console.log("res headers: " + JSON.stringify(res));
    const gatitosAPIjson = await res.json();
    console.log(gatitosAPIjson);
    return gatitosAPIjson;
  }
  //const url = `https://api.thecatapi.com/v1/images/search?limit=30&size=thumb&api_key=${apiKey}`;
  const url = `https://api.thecatapi.com/v1/images/search?limit=${100}`;
  //Lafunción getAndSetCats llama a la función getCatsFromApi() para obtener datos de la API,
  //luego establece esos datos en una variable global con setCats().
  //obtengo y Seteo los gatitos
  function getAndSetCats() {
    //getCatsFromApi().then((c) => setCats(c));
    getCatsFromApi().then((return_desde_funcion) => {
      setCats(return_desde_funcion);
      // Actualiza la variable de estado "pagination" con la información de paginación que devuelve la API.
      //setPagination(return_desde_funcion.pagination);
    });
  }

  function loadMoreCats() {
    setCats("");
    getAndSetCats();
  }
  // // // BREEDS // // //
  //La función "getBreedsFromApi" hace una solicitud asíncrona ala API para recuperar los datos;
  //una lista de razas, desde URL específica.
  async function getBreedsFromApi() {
    const res = await fetch("https://api.thecatapi.com/v1/breeds");

    const breedsAPIjson = await res.json();
    //console.log(breedsAPIjson)
    return breedsAPIjson;
  }

  //Lafunción getAndSetBreeds llama a la función getBreedsFromApi() para obtener datos de la API,
  //luego establece esos datos en una variable global con setBreedsData().
  //obtengo y Seteo las razas
  function getAndSetBreeds() {
    //getBreedsFromApi().then((c) => setSelects(c));
    getBreedsFromApi().then((r) =>
      setBreedsData(
        r.map((breed) => ({
          id: breed.id,
          name: breed.name ? breed.name.toString() : "",
          image: breed.image ? breed.image.toString() : "",
        }))
      )
    );
  }
  async function getBreedImage(breed) { // Obtengo data, retorna JSON
    console.log(
      // `Url fetch desde selector: https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}` devuelve solo una pic raza
      `Url fetch desde selector: https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=100&page=1`
    );
    const res = await fetch(
      // `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=100&page=3`
    );
    const razasAPIjson = await res.json();
    console.log(razasAPIjson);
    return razasAPIjson;
  }

  function getRazas(breed) {  // Llamo a getBreedImage para actualizar el estado
    console.log("Llamando getRazas con: " + JSON.stringify(breed));
    getBreedImage(breed).then((return_desde_funcion) =>
      setBreeds(return_desde_funcion) 
    );
  }

  //Gatitos aleatorios
  //Cuando carga la página useEffect ejecutará a las funciónes "getAndSetCats" y "getAndSetBreeds".
  //Al pasar un Array vacío como segundo argumento [], React que solo ejecuta las funciones una vez, cuando el componente se renderice/cargue inicialmente.
  useEffect(() => {
    getAndSetCats();    // Carga imágenes iniciales
    getAndSetBreeds();  // Carga lista de razas
  }, []);

  //useEffect() registra los valores de selects y breedsData en la consola.
  //useEffect() toma dos parámetros:
  //una función anónima para realizar el efecto secundario y
  //un Array[] que contiene dependencias asociadas con el efecto.
  //las variables 'selects' y 'breedsData' son las dependencias, lo que significa que si alguna de ellas cambia, el efecto secundario se ejecutará nuevamente.

  useEffect(() => {
    console.log(selects);   
    if (selects.length > 0) {     
      getRazas(selects[0]);    // Carga imágenes de la raza seleccionada
    }
    //console.log(breedsData);
    //console.log(selects[0]?.id);
  }, [selects]);

  return (
    <main>
      <div className="app">
        <Navbar></Navbar>
        <Container className="main-container">
          <h1>He visto un lindo gatito! (ᵔᴥᵔ) </h1>
          {/*   <Button size="lg" onClick={loadMoreCats}> 
      <Button size="lg" onClick={() => loadMoreCats(page, limit)}>
            Carga más gatitos
      </Button>
*/}
          <Container>
            <Form>
              <Form.Group className="mb-3">
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  options={breedsData}
                  onChange={(selected) => {
                    setSelects(selected);
                    if (selected.length > 0) {
                      getRazas(selected[0]);
                    }
                  }}
                  selected={selects}
                  placeholder="Busca una RAZA de gatito"
                  isLoading={breedsData.length === 0}
                />
              </Form.Group>
            </Form>
          </Container>
          <Container>
            <Card>      
             {/* Renderizado condicional basado en el estado */}
              {breeds.length > 0 ? (
                <ListGroup>
                  {breeds.map((each_breed) => (
                    <ListGroup.Item className="razas" key={each_breed.id}>
                      <Image src={each_breed.url} alt="" />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : cats.length > 0 ? (
                <div>
                  <ListGroup>
                    {catsActuales.map((each_cat) => (
                      <ListGroup.Item key={each_cat.id}>
                        <Image src={each_cat.url} alt="" />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="pagination-container">
                    <Pagination
                      nPages={nPages}
                      currentPage={paginaActual}
                      setCurrentPage={setPaginaActual}
                    />
                    <p className="copyright">@ JCJetz.</p>
                  </div>
                </div>
              ) : (
                <div className="loadinggif">
                  <Image src="https://media.tenor.com/G98e-mpzOiMAAAAd/cat-paw.gif" />
                </div>
              )}
            </Card>
          </Container>
        </Container>
      </div>
    </main>
  );
}
