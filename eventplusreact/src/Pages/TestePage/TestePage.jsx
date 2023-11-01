import React, { useState } from 'react';
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import Header from '../../Components/Header/Header'

const TestePage = () => {
    const [total, setTotal] = useState()
    const [n1, setN1] = useState()
    const [n2, setN2] = useState()

    function handleCalcular(e) { // Chamar no submit do form
        e.preventDefault();
        setTotal (parseFloat(n1) + parseFloat(n2))
    }
    return (
        <>
            <h1>Teste Page</h1>
            <h3>Calculator</h3>
            <form onSubmit={handleCalcular}>
            <Input 
            tipo="number"
            id="numero1"
            nome="numero1"
            dicaCampo="Primeiro número"
            valor={n1}
            fnAltera={setN1}
            />
            <Input 
            tipo="number"
            id="numero2"
            nome="numero2"
            dicaCampo="Segundo número"
            valor={n2}
            fnAltera={setN2}
            />

            <Button tipo="submit" textoBotao="Somar" />
            <p>Resultado <strong>{total}</strong></p>
            </form>
        </>
    );
};

export default TestePage;