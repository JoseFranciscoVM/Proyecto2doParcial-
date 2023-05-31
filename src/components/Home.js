import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import YouTube from 'react-youtube';
import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';

import { useAuth } from "../context/AuthContext";

export function Home() {

  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };



  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // endpoint para las imagenes
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data',results);
    //setSelectedMovie(results[0])

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(100, 0);
  };

  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
    
  };
   
  useEffect(() => {
    fetchMovies();
 
  }, []);



  return (
   
    <div>
       <p className="text-white mb-4">BIENVENIDO USUARIO: {user.displayName || user.email}</p>
  <button
    className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
    onClick={handleLogout}
  >
    CERRAR
  </button >
    
    <h1>REDES SOCIALES </h1>
    <a href="https://www.facebook.com/?stype=lo&jlou=Afc_Z0hz1P5oSMQ4yvIqJLXEdZdUsucil6h5ndzo16q0e47x8g4d4gj4EROAEjcOK1u0-NQS_nPkwmVfK7JyfxBXb0gxpuqPwNaCg3p7YDP_WQ&smuh=44431&lh=Ac8cHfAdhTce7BGJ1dM" className="bg-slate-200 hover:bg-slate-300 rounded py-1 px-1 text-black">FACEBOOK </a>
    <a href="https://www.instagram.com/" className="bg-slate-200 hover:bg-slate-300 rounded py-1 px-1 text-black">INSTAGRAM </a>   
    <a href="https://twitter.com/?lang=es" className="bg-slate-200 hover:bg-slate-300 rounded py-1 px-1 text-black">TWITTER </a>
    <a href="https://web.telegram.org/a/" className="bg-slate-200 hover:bg-slate-300 rounded py-1 px-1 text-black">TELEGRAM </a>
     <h1>Peliculas De Hoy </h1> 
    {/* el buscador */}
    <center>
    <form className="container mb-4" onSubmit={searchMovies}>
    
      <input
        type="text"
        placeholder="Busqueda De Peliculas "
        onChange={(e) => setSearchKey(e.target.value)}
      />
     <button className="btn btn-primary">BUSCAR </button>
    </form>
      </center>
    {/* contenedor para previsualizar  */}
    {/* <div>
      <div
        className="viewtrailer"
        style={{
          backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
        }}
      >
        
        
        <div className="container">
          
          
          <button className="boton">Play Trailer</button>
          <h1 className="text-white">{movie.title}</h1>
          {movie.overview ? (
            <p className="text-white">{movie.overview}</p>
          ) : null}
        </div>
      </div>
    </div> */}

    {/* esto es por prueba */}
    <div>
      <main>
        {movie ? (
          <div
            className="viewtrailer"
            style={{
              backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
            }}
          >
            {playing ? (
              <>
                <YouTube
                  videoId={trailer.key}
                  className="reproductor container"
                  containerClassName={"youtube-container amru"}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
                <button onClick={() => setPlaying(false)} className="boton">
                  Cerrar 
                </button>
              </>
            ) : (
              <div className="container">
                <div className="col">
                  {trailer ? (
                    <button
                      className="boton"
                      onClick={() => setPlaying(true)}
                      type="button"
                    >
                      Reproduce El Trailer Oficial 
                    </button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  <h2 className="text-black">{movie.title}</h2>
                  <p className="text-black">{movie.overview}</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>

    {/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
    <div className="container mt-3">
      <div className="row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-md-4 mb-3"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={`${URL_IMAGE + movie.poster_path}`}
              alt=""
              height={200}
              width={200}
              
            />
            <h4 className="text-white">{movie.title}</h4>
           
          </div>
        ))}
      </div>
    </div>
  </div>

    


);


};

