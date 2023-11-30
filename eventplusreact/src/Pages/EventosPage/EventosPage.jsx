import React, { useState, useEffect } from "react";
import "./EventosPage.css";
import MainContent from "../../Components/MainContent/MainContent";

import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";
import { Input, Button, Select } from "../../Components/FormComponents/FormComponents";

import api from "../../Services/Service";
import TableEvento from "./TableEv/TableEv";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";

import eventImage from "../../assets/images/evento.svg";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";

// Componente principal Eventos
const Eventos = () => {
    // Estados para controle
    const idInstituicao = "68a03bdf-54fe-40b3-9c32-0fdbcfbc3be4";
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");

    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [options, setOptions] = useState([]);

    const [tiposEvento, setTiposEvento] = useState("");
    const [eventos, setNextEvents] = useState([]);
    const [idEvento, setidEvento] = useState("");

    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false);


    useEffect(() => {
        async function loadEvents() {
            setShowSpinner(true);
            try {

                const promise = await api.get("/Evento");
                dePara(promise.data);

                const promiseEvent = await api.get("/Evento");
                setNextEvents(promiseEvent.data);
            } catch (error) {
                console.log("Erro na API", error);
            }
            setShowSpinner(false);
        }
        loadEvents();
    }, []);


    function dePara(eventos) {
        const arrayOptions = [];
        eventos.forEach((e) => {
            arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
        });
        setOptions(arrayOptions);
    }


    async function handleSubmit(e) {
        e.preventDefault();

 
        if (titulo.trim().length < 3) {
         
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O título deve conter pelo menos 3 caracteres",
                imgIcon: "warning",
                imgAlt: "Ilustração de aviso. Moça em frente a um símbolo de exclamação.",
                showMessage: true
            });
            return;
        }


        setShowSpinner(true);
        try {

            await api.post("/Evento", {
                nomeEvento: titulo,
                idTipoEvento: tiposEvento,
                dataEvento: data,
                descricao: descricao,
                idInstituicao: idInstituicao
            });


            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Evento cadastrado com sucesso!",
                imgIcon: "success",
                imgAlt: "Ilustração de sucesso. Moça em frente a um símbolo de exclamação",
                showMessage: true
            });


            const searchEvents = api.get("/Evento");
            setNextEvents((await searchEvents).data);


            setTitulo("");
            setDescricao("");
            setTiposEvento("");
            setData("");
        } catch (e) {
            
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Não foi possível cadastrar o evento!",
                imgIcon: "danger",
                imgAlt: "Ilustração de erro. Moço em frente a um símbolo de erro",
                showMessage: true
            });
        }

        setShowSpinner(false);
    }

   
    async function handleUpdate(e) {
        e.preventDefault();
        setShowSpinner(true);
        try {
            // Requisição PUT para atualizar o evento
            const promise = await api.put(`/Evento/${idEvento}`, {
                nomeEvento: titulo,
                idTipoEvento: tiposEvento,
                dataEvento: data,
                descricao: descricao,
                idInstituicao: idInstituicao
            });

            // Notificação de sucesso
            if (promise.status === 204) {
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: "Evento atualizado com sucesso",
                    imgIcon: "success",
                    imgAlt: "Ilustração de sucesso. Moça em frente a um símbolo de exclamação.",
                    showMessage: true
                });
            }
            editActionAbort(true)

            // Atualização da lista de eventos
            const searchEvents = await api.get("/Evento");
            setNextEvents(searchEvents.data);
            
        } catch (error) {
            // Notificação de erro
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Não foi possível atualizar o evento",
                imgIcon: "danger",
                imgAlt: "Ilustração de erro. Moço em frente a um símbolo X se referindo a um erro.",
                showMessage: true
            });
        }
        setShowSpinner(false);
    }

    // Função para exibir o formulário de edição
    async function showUpdateForm(idElement) {
        setidEvento(idElement);
        setShowSpinner(true);
        try {
            // Requisição GET para obter os detalhes do evento
            const promise = await api.get(`/Evento/${idElement}`);

            setTitulo(promise.data.nomeEvento);
            setDescricao(promise.data.descricao);
            setTiposEvento(promise.data.idTipoEvento);
            setData(new Date((promise.data.dataEvento)).toLocaleDateString('sv-SE'));
        } catch (error) {
            // Tratamento de erro
        }
        setShowSpinner(false);
        setFrmEdit(true);
    }

    // Função para cancelar a edição
    function editActionAbort() {
        setFrmEdit(false);
        // Limpeza dos campos do formulário
        setTitulo("");
        setDescricao("");
        setTiposEvento("");
        setData("");
    }

    // Função para lidar com a exclusão de um evento
    async function handleDelete(idElement) {
        setShowSpinner(true);
        try {
            // Requisição DELETE para excluir o evento
            const promise = await api.delete(`/Evento/${idElement}`);

            // Atualização da lista de eventos
            const searchEvents = await api.get("/Evento");
            setNextEvents(searchEvents.data);
            
        } catch (error) {
            console.log("Erro na exclusão");
        }
        setShowSpinner(false);
    }
    
    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            {showSpinner ? <Spinner /> : null}
            <MainContent>
                <section className='cadastro-evento-section'>
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText={"Cadastro de Eventos"} />
                            <ImageIllustrator imageRender={eventImage} />
                            <form
                                action=""
                                className='ftipo-evento'
                                onSubmit={frmEdit ? handleUpdate : handleSubmit}
                            >
                 
                                {!frmEdit ? (
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder="Titulo"
                                            name="Titulo"
                                            type="Text"
                                            required="required"
                                            value={titulo}
                                            manipulationFunction={(e) => setTitulo(e.target.value)}
                                        />
                                        <Input
                                            id="Descricao"
                                            placeholder="Descrição"
                                            name="Descricao"
                                            type="text"
                                            required="required"
                                            value={descricao}
                                            manipulationFunction={(e) => setDescricao(e.target.value)}
                                        />
                                        <Select
                                            name="Eventos"
                                            id="eventos"
                                            required="required"
                                            options={options}
                                            value={tiposEvento}
                                           // defaultValue={tiposEvento}
                                            manipulationFunction={(e) => setTiposEvento(e.target.value)}
                                        />


                                        <Input
                                            id="data"
                                            placeholder="Data do Evento"
                                            name="data"
                                            type="date"
                                            required="required"
                                            value={data}
                                            manipulationFunction={(e) => setData(e.target.value)}
                                        />

                                        <Button
                                            textButton="Cadastrar"
                                            id="cadastrar"
                                            additionalClass="btn-cadastrar"
                                            name="cadastrar"
                                            type="submit"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder="Titulo"
                                            name="Titulo"
                                            type="Text"
                                            required="required"
                                            value={titulo}
                                            manipulationFunction={(e) => setTitulo(e.target.value)}
                                        />
                                        <Input
                                            id="Descricao"
                                            placeholder="Descrição"
                                            name="Descricao"
                                            type="text"
                                            required="required"
                                            value={descricao}
                                            manipulationFunction={(e) => setDescricao(e.target.value)}
                                        />
                                        <Select
                                            name="Eventos"
                                            id="eventos"
                                            required="required"
                                            options={options}
                                            value={tiposEvento}
                                            defaultValue={tiposEvento}
                                            manipulationFunction={(e) => setTiposEvento(e.target.value)}
                                        />


                                        <Input
                                            id="data"
                                            placeholder="Data do Evento"
                                            name="data"
                                            type="date"
                                            required="required"
                                            value={data}
                                            manipulationFunction={(e) => setData(e.target.value)}
                                        />
                                        <div className="buttons-editbox">

                                            <Button
                                                textButton="Atualizar"
                                                id="atualizar"
                                                additionalClass="btn-cadastrar"
                                                name="atualizar"
                                                type="submit"
                                            />
                                            <Button
                                                textButton="Cancelar"
                                                id="cancelar"
                                                additionalClass="btn-cadastrar"
                                                name="cancelar"
                                                type="button"
                                                manipulationFunction={(e) => {
                                                    { editActionAbort() }
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </Container>
                </section>

                <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Eventos"} color='white' />
                        <TableEvento
                            dados={eventos}
                            fnDelete={handleDelete}
                            fnUpdate={showUpdateForm}
                        />

                    </Container>
                </section>
            </MainContent>
        </>



    );
};

export default Eventos;