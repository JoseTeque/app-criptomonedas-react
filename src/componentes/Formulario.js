import React , {useEffect , useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda'
import useCriptomonedas from '../hooks/useCriptomonedas';
import axios from 'axios';
import Error from './Error'

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({setmoneda, setcriptomoneda}) => {

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre:'Peso Mexicano'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'GBP', nombre:'Libre esterlina'},
        {codigo: 'CHL', nombre:'Peso Chileno'},
    ]

    //STATE
    const [resultado, setresultado] = useState([]);
    const [error, seterror] = useState(false)

    //useMoneda
    const [moneda , SelectMoneda] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //useCriptomonedas
    const [criptomoneda , SelectCripto] = useCriptomonedas('Elige tu Criptomoneda', '', resultado);

    //Ejecutar llamado a la API

    useEffect(() => {
        const consultarApi = async() => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await axios.get(url);

            setresultado(resultado['data']['Data'])
        }

        consultarApi();
    }, []);


    const handleSubmit = e => {
        e.preventDefault();
        
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            setTimeout(() => {
                seterror(true);

                setTimeout(() => {
                    seterror(false);
                },4000)
            },50)
            
            return;
        }

        setmoneda(moneda);
        setcriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje = "Los campos son obligarotios"/> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton 
                type="submit"
                value="Calcular"
            />

            
        </form>
     );
}
 
export default Formulario;