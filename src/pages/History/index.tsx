import { HistoryContainer, HistoryList, Stauts } from "./styles";

export function History(){
    
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
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td><Stauts statusColor="green">Concluido</Stauts></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>
                                <Stauts statusColor="red">Concluido</Stauts>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>
                                <Stauts statusColor="yellow">Concluido</Stauts>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>
                                <Stauts statusColor="green">Concluido</Stauts>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>concluido </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>concluido </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minuitos</td>
                            <td>ha dois meses</td>
                            <td>concluido </td>
                        </tr>

                    </tbody>
                </table>
            </HistoryList>


        </HistoryContainer>
    )
}