import React from "react";
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Botones from "../../Components/Botones/Botones";
import { useState } from "react";

import { validarTitulo, validarLink, validarDescripcion } from "./validaciones";
import Spinner from "../../Components/Spinner/Spinner";
import { Navigate } from "react-router-dom";


const Heading = styled.h1`
    color: #fff;
    height: .7rem;
    font-size: 5rem;
    font-weight: 400;
    margin: 1.4rem 0 5.4rem 0;
    padding: 1rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const CssTextField = styled(TextField)({
    '& label': {
        color: '#fff',
        fontSize: '1.5rem'
    },
    '& color': {
        color: "#fff"
    }
});

const CssSelect = styled(Select)({
    '& label': {
        color: '#fff',
    }
});


const styles = {
    backgroundColor: '#5c5c5c',
    borderRadius: '1rem',
    margin: '3rem 0',
    color: '#fff'
}


const NuevoVideo = (props) => {

    const { guardarVideo } = props;

    //* State Campos
    const [titulo, setTitulo] = useState({ value: '', valid: null });
    const [link, setLink] = useState({ value: '', valid: null });
    const [imagen, setImagen] = useState({ value: '', valid: null });
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState({ value: '', valid: null });


    const [loader, setLoader] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        setCategoria(e.target.value);
    };


    function manejarNuevoVideo(e) {
        e.preventDefault();

        guardarVideo({
            titulo: titulo.value,
            categoria,
            link: link.value,
            imagen: imagen.value
        });

        setLoader(true);

        setTimeout(() => {
            setLoader(false)
            setRedirect(true)
        }, 3000);
    }

    function sugerirUrlImg(link) {

        const paramsImg = link.slice(-11);
        const urlImg = `https://i.ytimg.com/vi/${paramsImg}/maxresdefault.jpg`;


        return urlImg;
    }


    async function reset() {
        const valor = '';

        try {
            setLink({ value: valor, valid: null });
            setTitulo({ value: valor, valid: null });

            setImagen({ value: valor, valid: null });
            setDescripcion({ value: valor, valid: null });
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div className="contenedor">

            <Heading>Nuevo Video</Heading>

            <form
                onSubmit={manejarNuevoVideo}
                id="formularioVideo"
            >
                <CssTextField
                    id="titulo"
                    label="Titulo"
                    variant="filled"
                    fullWidth
                    required
                    margin="dense"
                    style={styles}
                    sx={{ input: { color: '#fff', fontSize: '1.8rem' } }}
                    value={titulo.value}
                    onChange={(e) => {
                        const valor = e.target.value;
                        const valido = validarTitulo(valor);

                        setTitulo({ value: valor, valid: valido })
                    }}
                    error={titulo.valid === false}
                    helperText={titulo.valid === false ? 'Campo obligatorio, ingresa al menos 5 caracteres' : ''}

                />

                <CssTextField
                    id="link-video"
                    label="Link del video"
                    variant="filled"
                    fullWidth
                    required
                    margin="dense"
                    style={styles}
                    sx={{ input: { color: '#fff', fontSize: '1.8rem' } }}
                    onChange={(e) => {

                        const valor = e.target.value;
                        const valido = validarLink(valor);

                        setLink({ value: valor, valid: valido });
                    }}
                    error={link.valid === false}
                    helperText={link.valid === false ? 'Ingresa un link válido.' : null}
                    value={link.value}
                />


                <CssTextField
                    label="Link sugerido para imagen del video. Copiar y pegar en el campo de abajo"
                    variant="filled"
                    fullWidth
                    margin="dense"
                    style={styles}
                    sx={{ input: { color: '#fff', fontSize: '1.8rem' } }}
                    value={sugerirUrlImg(link.value)}
                />


                <CssTextField
                    id="link-imagen"
                    label="Link de la imagen del video"
                    variant="filled"
                    fullWidth
                    required
                    margin="dense"
                    style={styles}
                    sx={{ input: { color: '#fff', fontSize: '1.8rem' } }}

                    error={imagen.valid === false}
                    helperText={imagen.valid === false ? 'Ingresa un link válido.' : null}
                    onChange={(e) => {
                        const valor = e.target.value;

                        setImagen({ value: valor, valid: null })
                    }}
                    value={imagen.value}
                />

                <FormControl variant="filled" fullWidth style={styles}>
                    <InputLabel
                        style={{ color: "#fff", fontSize: "1.5rem" }}

                    >Seleccione una categoría
                    </InputLabel>

                    <CssSelect
                        value={categoria}
                        onChange={handleChange}
                        defaultValue={categoria}

                    >
                        {props.categorias.map(categoria => {

                            return <MenuItem key={categoria.id} value={categoria.titulo}>{categoria.titulo}</MenuItem>
                        })}

                    </CssSelect>
                </FormControl>


                <CssTextField
                    id="descripcion"
                    label="Descripción"
                    rows={4}
                    variant="filled"
                    fullWidth
                    style={styles}
                    sx={{ input: { color: '#fff', fontSize: '1.8rem' } }}
                    onChange={(e) => {
                        const valor = e.target.value;
                        const valido = validarDescripcion(valor);

                        setDescripcion({ value: valor, valid: valido })
                    }}
                    value={descripcion.value}
                />

                <Botones reset={reset} />

                {loader ? <Spinner /> : null}
                {redirect ? <Navigate to={'/'} /> : null}
            </form>


        </div>
    )
}

export default NuevoVideo;