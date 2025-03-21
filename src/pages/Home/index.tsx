import { HandPalm, Play, Target } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput,StopCountdownButton } from "./styles"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { differenceInSeconds, interval } from "date-fns";
/*
function register(name:string){
    return(
    
        onChange:() =>void
        onBlur:() =>void
        onFoucus...
    )
}
*/
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
})
/*interface newCycleFormData{
    task:string
    minutesAmount:number
}*/

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //inferir o typo de acordo com o objeto 

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startData: Date
    interruptDate?: Date

}
export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])

    const [activeCycleID, setactiveCycleID] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, formState, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleID)   //percorre até achar cycle ativo

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startData))
            }, 1000)
        }

        return () => {

            clearInterval(interval)
        }
    }, [activeCycle])

    function handleCreateNewCycle(data: newCycleFormData) {

        const id = String(new Date().getTime()) //pega a data atual com os milisegundos para id

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startData: new Date(),
        }
        setCycles((state) => [...state, newCycle])
        setactiveCycleID(id)
        setAmountSecondsPassed(0)
        reset();

    }
    function handleInterruptCycle(){
        setCycles(cycles.map(cycle=>{
            if(cycle.id==activeCycleID){
                return{...cycle,interruptDate: new Date()}
            }else {
                return cycle
            }
        }))
        setactiveCycleID(null)

    }


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60); // arrredondar para baixo
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])


    console.log(formState.errors)
    const task = watch('task');         //"'observa '" a task


    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>mintutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={!task} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeConteiner>
    )
}