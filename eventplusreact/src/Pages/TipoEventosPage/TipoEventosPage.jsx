import React, { useState } from 'react';
import './TipoEventosPage.css';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent'

import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg"
import Container from '../../Components/Container/Container';

import { Input } from "../../Components/FormComponents/FormComponents";
import { Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Service";

import TableTp from "./TableTp/TableTp";


const TipoEventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([
        { idTipoEvento: "123", titulo: "Evento 1" },
        { idTipoEvento: "321", titulo: "Evento 2" },
        { idTipoEvento: "456", titulo: "Evento 3" }
    ]); // Array.

   async function handleSubmit(e) {
        // Parar o submit do formulário.
        e.preventDefault();

        // Validar pelo menos 3 caractéres.
        if (titulo.trim().lenght < 3) {
            alert("O título deve ter no mínimo 3 caractéres!")
            return;
        }

        // Chamar a API
        try {
          const retorno = await api.post("/TiposEvento", {titulo: titulo});
          console.log("Cadastrado com sucesso!");           
          console.log(retorno.data);
          
          setTitulo("") // Limpa a variavel.

        } catch (error) {
            console.log("Erro na API!")
            console.log(error)
        }
    }


    function handleDelete() {
        alert('Bola la apagar na api')
    }

    // ATUALIZAÇÃO DOS DADOS:
    function showUpdateForm() {
        alert('Mostrando a tela de update')
    }

    function handleUpdate() {
        alert("Atualizar")
    }

    function editActionAbort() {
        alert("Cancelar a tela de edição de dados.")   
    }


    return (
        <MainContent>
            {/* CADASTRO DE TIPO DE EVENTO */}
            <section className='cadastro-evento-section'>

            <Container>
            <div className='cadastro-evento__box'>
            <Title titleText={'Página de tipos de eventos'}/>
            <ImageIllustrator 
            alterText={""}
            imageRender={eventTypeImage}
            />

            <form 
            className='ftipo-evento'
            onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >

                {!frmEdit ?             
                (
                <>
                <Input 
                id={"titulo"}
                type={"text"}
                name={"titulo"}
                required={"required"}
                placeholder={"Título"}
                value={titulo}
                manipulationFunction={
                    (e) => {
                        setTitulo(e.target.value)
                    }
                }
                /> 
                

                <span>{titulo}</span>

                <Button 
                type={"submit"}
                name={"cadastrar"}
                id={"cadastrar"}
                textButton={"Cadastrar"}
                />
                </>
                
                ) 
                : 
                (<p>Tela de Edição</p>)}

            </form>
            </div>
            </Container>

            </section>

            {/* LISTAGEM DE TIPO DE EVENTO */}
            <section className="lista-eventos-section">
                <Container>
                    <Title titleText={"Lista Tipo de Eventos"} color="white"/>
                    
                    <TableTp 
                    dados={tipoEventos}
                    fnUpdate={showUpdateForm}
                    fnDelete={handleDelete}           
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventosPage;