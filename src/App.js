import './App.css';
import './Normalize.css';
import React, { useEffect } from 'react';
import Header from './Components/Header/Header';
import PieDePagina from './Components/Footer/Footer';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NuevoVideo from './Formularios/FormVideo/NuevoVideo';
import NuevaCategoria from './Formularios/FormCategoria/NuevaCategoria';
import Home from './Pages/Home';
import Error from './Pages/404';



function App() {

  const getCategorias = JSON.parse(localStorage.getItem('Categorias'));
  const getVideos = JSON.parse(localStorage.getItem('Videos'));

  const [categorias, setCategorias] = useState(getCategorias || [
    {
      id: uuid(),
      titulo: "Front End",
      colorPrimario: "#6BD1FF",
      descripcion: "Formación Front End de Alura Latam"
    },
    {
      id: uuid(),
      titulo: "Back End",
      colorPrimario: "#00C86F",
      descripcion: "Formación Back End de Alura Latam"
    },
    {
      id: uuid(),
      titulo: "Innovación y Gestión",
      colorPrimario: "#FF8C2A",
      descripcion: "Formación Innovación y Gestión de Alura Latam"
    }
  ]);




  const [videos, setVideos] = useState(getVideos || [
    {
      id: uuid(),
      categoria: 'Front End',
      link: 'https://youtu.be/PztCEdIJITY',
      imagen: 'https://i.ytimg.com/vi/PztCEdIJITY/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Front End',
      link: 'https://youtu.be/GJfOSoaXk4s',
      imagen: 'https://i.ytimg.com/vi/GJfOSoaXk4s/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Front End',
      link: 'https://youtu.be/rpvrLaBQwgg',
      imagen: 'https://i.ytimg.com/vi/rpvrLaBQwgg/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Front End',
      link: 'https://youtu.be/UuAX5azcvDQ',
      imagen: 'https://i.ytimg.com/vi/UuAX5azcvDQ/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Back End',
      link: 'https://youtu.be/t-iqt1b2qqk',
      imagen: 'https://i.ytimg.com/vi/t-iqt1b2qqk/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Back End',
      link: 'https://youtu.be/cLLKVd5CNLc',
      imagen: 'https://i.ytimg.com/vi/cLLKVd5CNLc/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Back End',
      link: 'https://youtu.be/EoPvlE85XAQ',
      imagen: 'https://i.ytimg.com/vi/EoPvlE85XAQ/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Back End',
      link: 'https://youtu.be/7_UXo-aqAeM',
      imagen: 'https://i.ytimg.com/vi/7_UXo-aqAeM/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Innovación y Gestión',
      link: 'https://www.youtube.com/watch?v=vhwspfvI52k',
      imagen: 'https://i.ytimg.com/vi/vhwspfvI52k/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Innovación y Gestión',
      link: 'https://youtu.be/YhR7Zp8NUzE',
      imagen: 'https://i.ytimg.com/vi/YhR7Zp8NUzE/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Innovación y Gestión',
      link: 'https://youtu.be/6N3OkLCfK-0',
      imagen: 'https://i.ytimg.com/vi/6N3OkLCfK-0/maxresdefault.jpg'
    },
    {
      id: uuid(),
      categoria: 'Innovación y Gestión',
      link: 'https://youtu.be/_zYbZ5S0VMw',
      imagen: 'https://i.ytimg.com/vi/_zYbZ5S0VMw/maxresdefault.jpg'
    }
  ]);



  //*useEffect para localStorage
  useEffect(() => {
    localStorage.setItem('Videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('Categorias', JSON.stringify(categorias));
  }, [categorias]);


  const guardarVideo = (nuevoVideo) => {

    setVideos([...videos, { ...nuevoVideo, id: uuid() }]);
  }

  function guardarCategoria(nuevaCategoria) {

    setCategorias([...categorias, { ...nuevaCategoria, id: uuid() }]);
  }

  function eliminarCategoria(id) {

    const nuevoCategorias = categorias.filter((categoria) => categoria.id !== id)

    setCategorias(nuevoCategorias)
  }


  function eliminarVideo(id) {

    const confirmar = window.confirm('¿Deseas eliminar este video?');

    if (confirmar) {
      const videoEliminado = videos.filter((video) => video.id !== id);
      return setVideos(videoEliminado);
    } else {
      return;
    }
  }

  return (

    <Router>

      <Header />

      <Routes>

        <Route
          path='/'
          element={<Home
            categorias={categorias}
            videos={videos}
            eliminarVideo={eliminarVideo}
          />}
        />

        <Route
          path='/video'
          element={<NuevoVideo
            guardarVideo={guardarVideo}
            categorias={categorias} />}
        />

        <Route
          path='/categoria'
          element={<NuevaCategoria
            guardarCategoria={guardarCategoria}
            categorias={categorias}
            eliminarCategoria={eliminarCategoria} />}
        />

        <Route path='*' element={<Error />} />

      </Routes>

      <PieDePagina />

    </Router>

  );
}

export default App;
