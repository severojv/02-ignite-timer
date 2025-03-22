import { HandPalm, Play, Target } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput, StopCountdownButton } from "./styles"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { differenceInSeconds, interval } from "date-fns";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
/*
function register(name:string){
    return(
    
        onChange:() =>void
        onBlur:() =>void
        onFoucus...
    )
}
*/

/*interface newCycleFormData{
    task:string
    minutesAmount:number
}*/


interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startData: Date
    interruptDate?: Date
    finishedDate?: Date

}
export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])

    const [activeCycleID, setactiveCycleID] = useState<string | null>(null)


    

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleID)   //percorre até achar cycle ativo


    

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
    function handleInterruptCycle() {
        setCycles((state)=>
            state.map(cycle => {
            if (cycle.id == activeCycleID) {
                return { ...cycle, interruptDate: new Date() }
            } else {
                return cycle
            }
        }))
        setactiveCycleID(null)

    }

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
                <NewCycleForm/>
                <Countdown/>
                
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