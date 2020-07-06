import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    font-size: 2.4rem;
    margin-top:2rem;
    display:block;
`;

const Select = styled.select`
    display:block;
    -webkit-appearance:none;
    width:100%;
    padding:1rem;
    border-radius:10px;
    border:none;
    font-size:1.5rem;
`;

const useCriptomonedas = (label, stateInicial, Opciones) => {
   
    //STATE DE NUEXTRO CUSTOM HOOKS
    const [state, setstate] = useState(stateInicial);

    //Extrayendo la informacion

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setstate(e.target.value)}
                value={state}
            >
                <option value="">-- Selecione -- </option>
                {Opciones.map(opcion => (
                <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}> {opcion.CoinInfo.FullName} </option>
                ))}
            </Select>
        </Fragment>
    )

    return [state, SelectCripto, setstate];
}
 
export default useCriptomonedas;