import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, MinutesAmountInput, SeparatorContainer, StartCountdownButton, StopCountdownButton, TaskInput } from "../styles";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //inferir o typo de acordo com o objeto 


export function NewCycleForm() {
    
    const { register, handleSubmit, watch, formState, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })
    
    
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