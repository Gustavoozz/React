import React, { useState, useEffect } from 'react';
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
import Notification from "../../Components/Notification/Notification";


const TipoEventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]); // Array.
    const [notifyUser, setNotifyUser] = useState({}); // Array.

    useEffect(() => {
        async function loadTypes() {
            try {
                const retorno = await api.get("/TiposEvento");
                setTipoEventos(retorno.data)
            } catch(error) {
                console.log("Erro na API");
                console.log(error);
            }
        }
        loadTypes();
    }, []);

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
          const retorno = await api.post("/TiposEvento", {titulo:titulo});

          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Cadastrado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });

          console.log("Cadastrado com sucesso!");           
          console.log(retorno.data);
          
          setTitulo("") // Limpa a variavel.

        } catch (error) {
            console.log("Erro na API!")
            console.log(error)
        }
    }


    async function handleDelete(idTipoEvento) {    
        try {
            const retorno = await api.delete(`/TiposEvento/${idTipoEvento}`);

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Deletado com sucesso!`,
                imgIcon: "success",
                imgAlt:
                  "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
              });
            const retornoGet = await api.get('/TiposEvento')
            setTipoEventos(retornoGet.data)
    
            
          } catch (error) {
            console.log("Erro ao deletar o elemento selecionado...");
          }
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
            <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
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