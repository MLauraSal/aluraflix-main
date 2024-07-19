import styled from "styled-components";

const Img = styled.img`
     max-width: 100%;
     border: 4px solid;
     width: 40rem;
 `;

const styles = {
    borderRadius: '1rem',
    backgroundColor: 'red',
    color: '#fff',
    padding: '.5rem 1rem',
    margin: '.5rem 0 0 .5rem',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center'
}

const Card = (props) => {

    const { link, imagen, id } = props.datos;
    const {eliminarVideo} = props;

    return (
        <>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href={link} target="_blank" rel="noreferrer" >
                <Img src={imagen} alt="Miniatura Video" style={{ borderColor: props.colorPrimario }} />
            </a >
        </div>

        <input 
        type="button" 
        value="Eliminar X"
        style={styles}
        onClick={() => {
            eliminarVideo(id)
        }}
        />
        </>
       
    )
}


export default Card;