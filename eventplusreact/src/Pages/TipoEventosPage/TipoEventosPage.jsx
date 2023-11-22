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
import Spinner from "../../Components/Spinner/Spinner"


const TipoEventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null);
    
    const [tipoEventos, setTipoEventos] = useState([]); // Array.
    const [notifyUser, setNotifyUser] = useState(); 
    const [showSpinner, setShowSpinner] = useState(false);

    // Ao carregar a página:
    useEffect(() => {
        async function loadTypes() {    
            setShowSpinner(true);
            try {
                const retorno = await api.get("/TiposEvento");
                setTipoEventos(retorno.data)
            } catch(error) {
                console.log("Erro na API");
                console.log(error);
            }

            setShowSpinner(false);
        }
        loadTypes();
    }, []);



// CADASTRAR DADOS:
   async function handleSubmit(e) {
        // Parar o submit do formulário.
        e.preventDefault();

        // Validar pelo menos 3 caractéres.
        if (titulo.trim().lenght < 3) {

            setNotifyUser({
                titleNote: "Erro",
                textNote: `O título deve conter, no mínimo, 3 caractéres`,
                imgIcon: "danger",
                imgAlt:
                  "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
              });
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



// DELETAR OS DADOS: 
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




    // ATUALIZAÇÃO DOS DADOS (MOSTRAR A TELA DE ATUALIZAÇÃO DE DADOS):
    async function showUpdateForm(idEvento) {
        setFrmEdit(true);
        
        try {
            // Get para pegar os dados.
            const retorno = await api.get('/TiposEvento/' + idEvento)

            // Preencher o titulo e o id no state.
            setTitulo(retorno.data.titulo)
            setIdEvento(retorno.data.idTipoEvento)

        } catch (error) {
            alert("Erro ao mostrar a tela de atualização!")
        }
    }


// ATUALIZAR OS DADOS:
    async function handleUpdate(e) {
        e.preventDefault();

        try {
            // Salvar os dados:
            const retorno = await api.put("/TiposEvento/" + idEvento, {
                titulo: titulo,
            });

            // Atualizar o state:
            const retornoGet = await api.get("/TiposEvento")
            setTipoEventos(retornoGet.data) // Atualiza o state da tabela.


            setNotifyUser({
              titleNote: "Sucesso",
              textNote: `Atualizado com sucesso!`,
              imgIcon: "success",
              imgAlt:
                "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
              showMessage: true,
            });
  
            editActionAbort(); // Limpa a variavel.
            
        } catch (error) {
            alert("Erro ao atualizar os dados!!")
        }
       
    }



    function editActionAbort() {
        setFrmEdit(false);
        setTitulo("");
        setIdEvento(null);
    }


    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
            {showSpinner ? <Spinner /> : null }

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
                (<>
                <Input 
                id={"titulo"}
                placeholder={"Titulo"}
                name={"titulo"}
                type={"text"}
                required={"required"}
                value={titulo}
                manipulationFunction={(e) => {
                    setTitulo(e.target.value);
                }}
                />


                <div className="buttons-editbox">
                    <Button 
                    type={"submit"}
                    id={"atualizar"}
                    name={"atualizar"}
                    textButton={"Atualizar"}
                    additionalClass="button-component--middle"
                    />

                    <Button 
                    id={"cancelar"}
                    placeholder={"cancelar"}
                    name={"cancelar"}
                    textButton={"Cancelar"}
                    additionalClass="button-component--middle"
                    manipulationFunction={() => {
                        editActionAbort();
                    }}
                    />

                </div>
                </>)}

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
                    fnUpdate={(showUpdateForm)}
                    fnDelete={handleDelete}           
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventosPage;