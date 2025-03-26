import { useContext } from "react";
import { HistoryContainer, HistoryList, Stauts } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
export function History(){
    const {cycles}=useContext(CyclesContext)
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Staus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle=>{
                            return(
                                <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{formatDistanceToNow(cycle.startData,{
                                    addSuffix:true,
                                    locale:ptBR,
                                })}</td>
                                <td>
                                    {cycle.finishedDate && (<Stauts statusColor="green">Concluido</Stauts>)}
                                    {cycle.interruptDate && (<Stauts statusColor="red">Interrompido</Stauts>)}
                                    {(!cycle.finishedDate && !cycle.interruptDate) && (<Stauts statusColor="yellow">Em andamento</Stauts>)}
                                </td>
                            </tr>
                            )
                        })}
                        

                    </tbody>
                </table>
            </HistoryList>


        </HistoryContainer>
    )
}