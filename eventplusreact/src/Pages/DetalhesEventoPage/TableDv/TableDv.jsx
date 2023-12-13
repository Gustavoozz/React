import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunction";
import ToggleSwitch from "../../../Components/Toggle/Toggle";
import { Tooltip } from "react-tooltip";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableDv.css";

const TableDv = ({ dados, description, descricaoEvento, fnConnect = null, fnShowModal = null }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
           Descrição
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipo de Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Feedback
          </th>
          
        </tr>
      </thead>
      <tbody>
        {dados.map((tp) => {
          return (
            <tr className="table-data__head-row" key={tp.idEvento}>
            <td className="table-data__data table-data__data--big">
              {tp.nomeEvento}
            </td>
            <td
              className="table-data__data table-data__data--big table-data__data--handover"
              data-tooltip-id="description-tooltip"
              data-tooltip-content={tp.descricao}
              data-tooltip-place="top"
            >
              {tp.descricao.substr(0, 15)} ...
              <Tooltip
                id="description-tooltip"
                className="custom-tootip"
              />
            </td>
            <td className="table-data__data table-data__data--big">
              {dateFormateDbToView(tp.dataEvento)}
            </td>
            <td className="table-data__data table-data__data--big">
              {tp.tiposEvento.titulo}
            </td>
            <td className="table-data__data table-data__data--big">
              {tp.comentariosEvento}
            </td>


             {/* <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {new Date(e.dataEvento) < Date.now() ? (
                  <img
                    className="tbal-data__icon"
                    
                    src={comentaryIcon}
                    alt=""
                    onClick={() => {
                      fnShowModal(e.idEvento);
                    }}
                  />
                ) : null}
                <ToggleSwitch
                  toggleActive={e.situacao}
                  manipulationFunction={
                    new Date(e.dataEvento) > Date.now()
                      ? () => {
                          fnConnect(
                            e.idEvento,
                            e.situacao ? "unconnect" : "connect",
                            e.idPresencaEvento 
                          );
                        }
                      : () => {
                          alert("Evento não está mais disponível");
                        }
                  }
                />
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDv;
