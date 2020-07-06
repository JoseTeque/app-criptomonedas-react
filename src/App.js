import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import axios from 'axios';
import Cotizacion from './componentes/Cotizacion';
import Loading from './componentes/Loading'

const Contenedor = styled.div`
  max-width:900px;
  margin:0 auto;

  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap:2rem;
  }
`;

const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;

`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color:#fff;
  text-align:left;
  font-weight:bold;
  font-size:40px;
  margin-bottom:50px;
  margin-top:80px;

  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color:#66a2fe;
    display:block;
  }
`;

function App() {

  const [moneda, setmoneda] = useState('');
  const [criptomoneda, setcriptomoneda] = useState('');
  const [cotizacion, setcotizacion] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {

      const CotizacionApi = async () => {

        if(moneda === '') return;

        setloading(true);

        const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      
        const resultado =  await axios.get(url);

        setcotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);

        setloading(false);
      }
      
      CotizacionApi();
  }, [moneda, criptomoneda])

  return (

      <Contenedor>
        <div>
          <Imagen
            src={imagen}
            alt="Imagen Cripto"
          />
        </div>
        <div>
          <Heading>
            Cotiza Criptomonedas al Instante
          </Heading>
          <Formulario
            setmoneda={setmoneda}
            setcriptomoneda={setcriptomoneda}
          />
          {loading ? <Loading />  : 
          
            <Cotizacion
            cotizacion = {cotizacion}
          />
           }
          
        </div>
      </Contenedor>

  );
}

export default App;
