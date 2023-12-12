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
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big"
           data-tooltip-id={descricaoEvento}
           data-tooltip-content={description}
           data-tooltip-place="top"
          >
            Descrição
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
        {dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {dateFormateDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {e.descricao}
                <Tooltip id={descricaoEvento} className='tooltip'/>
                {/* {description.substr(0, 16)}... */}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {e.tipoEvento}
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
