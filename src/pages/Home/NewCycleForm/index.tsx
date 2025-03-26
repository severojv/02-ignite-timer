import {  FormContainer, MinutesAmountInput, TaskInput } from "../styles";
import {  useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../context/CyclesContext";



export function NewCycleForm() {

    const {activeCycle} = useContext(CyclesContext)
    const {register }=useFormContext()
    return (
        <FormContainer>

            <label htmlFor="task">Vou trabalhar em </label>
            <TaskInput
                placeholder="Dê um nome para seu projeto"
                id="task"
                list="task-sugestions"
                {...register('task')}
                disabled={!!activeCycle}


            />
            <datalist id="task-sugestions">
                <option value="projeto um"></option>
            </datalist>
            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountInput
                placeholder="00"
                type="number"
                id="minutesAmount"
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>mintutos.</span>
        </FormContainer>
    )
}