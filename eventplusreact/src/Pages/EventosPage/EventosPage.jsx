import React, { useState, useEffect } from 'react';
import './EventosPage.css'
import MainContent from '../../Components/MainContent/MainContent';

import Container from '../../Components/Container/Container';
import Title from '../../Components/Title/Title';
import { Input, Button } from '../../Components/FormComponents/FormComponents';

import api from "../../Services/Service";
import TableEvento from './TableEv/TableEv';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';

import eventImage from '../../assets/images/evento.svg';
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";


const EventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [idEvento, setIdEvento] = useState(null);
    const [titulo, setTitulo] = useState("");

    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [events, setEvents] = useState([]);

    const [notifyUser, setNotifyUser] = useState(); 
    const [showSpinner, setShowSpinner] = useState(false);
    const [nomeEvento, setNomeEvento] = useState("");

    const [dataEvento, setDataEvento] = useState("");
    const [idTipoEvento, setIdTipoEvento] = useState([]); 


    useEffect(() => {
        async function carregarEventos() {
            try {
                setShowSpinner(true);
                const retorno = await api.get("/Evento");
                setEvents(retorno.data)
            } catch(error) {
                console.log("Erro na API");
                console.log(error);
            }
            setShowSpinner(false);

        }
        carregarEventos();
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
      const retorno = await api.post("/Evento", {
        nomeEvento: nomeEvento,
        descricao: descricao,
        dataEvento: dataEvento,
        idTipoEvento: idTipoEvento  
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      
      setTitulo("") // Limpa a variavel.

    } catch (error) {
        console.log("Erro na API!")
        console.log(error)
    }
}



    
    async function showUpdateForm(idEvento) {
         setFrmEdit(true);
        
        try {
            // Get para pegar os dados.
            const retorno = await api.get('/Evento/' + idEvento)

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
            const retorno = await api.put("/Evento/" + idEvento, {
                nomeEvento: nomeEvento,
                descricao: descricao,
                dataEvento: dataEvento,
                idTipoEvento: idTipoEvento  
            });

            // Atualizar o state:
            const retornoGet = await api.get("/Evento")
            setEvents(retornoGet.data) // Atualiza o state da tabela.


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



    // DELETAR OS DADOS:
    async function handleDelete(idEvento) {    
        try {
            const retorno = await api.delete(`/Evento/${idEvento}`);

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Deletado com sucesso!`,
                imgIcon: "success",
                imgAlt:
                  "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
              });

            const retornoGet = await api.get('/Evento')
            setEvents(retornoGet.data)
    
            
          } catch (error) {
            console.log("Erro ao deletar o elemento selecionado...");
          }
       }


       
    function editActionAbort() {
        setFrmEdit(false);
        setTitulo("");
        setIdEvento(null);
    }



    
    return (
        <>
        <MainContent>

        <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
            {showSpinner ? <Spinner /> : null }

            <section className="cadastro-evento-section">
                <Container>
                  <div className="cadastro-evento__box">
                  <Title titleText={'Página de eventos'}/>
            <ImageIllustrator 
            alterText={""}
            imageRender={eventImage}
            />
            <form
            action=""
            className='ftipo-evento'
            onSubmit=""
            >

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


                <Input 
                id={"descricao"}
                type={"text"}
                name={"descricao"}
                required={"required"}
                placeholder={"Descrição"}
                value={descricao}
                manipulationFunction={
                    (e) => {
                        setDescricao(e.target.value)
                    }
                }
                />


                {/* <Select /> */}


                <Input 
                id={"data"}
                type={"date"}
                name={"dataEvento"}
                required={"required"}
                placeholder={"Data"}
                value={data}
                manipulationFunction={
                    (e) => {
                        setTitulo(e.target.value)
                    }
                }
                />



                

                <Button
                textButton="Cadastrar"
                id="cadastrar"
                additionalClass= "btn-cadastrar"
                name="cadastrar"
                type="submit"
                />
            </>

            </form>
                </div>

            </Container>
            </section>
            
            <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Cadastro de Eventos"} color="white"/>
                        <TableEvento
                            dados={events}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            
        </MainContent>
           
        </>  
    );
};

export default EventosPage;