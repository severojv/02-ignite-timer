import { HandPalm, Play, Target } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput, StopCountdownButton } from "./styles"
import { createContext, useEffect, useState } from "react"
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
interface CycleContextType {
    activeCycle: Cycle | undefined
    activeCycleID: String | null
    markCurrentCycleAsFinished: ()=> void

}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {



    const [cycles, setCycles] = useState<Cycle[]>([])

    const [activeCycleID, setactiveCycleID] = useState<string | null>(null)

    function markCurrentCycleAsFinished() {

        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id == activeCycleID) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
    }

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
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id == activeCycleID) {
                    return { ...cycle, interruptDate: new Date() }
                } else {
                    return cycle
                }
            }))
        setactiveCycleID(null)

    }


    console.log(formState.errors)
    const task = watch('task');         //"'observa '" a task


    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider value={{ activeCycle, activeCycleID,markCurrentCycleAsFinished}}>

                    <NewCycleForm />
                    <Countdown />
                </CyclesContext.Provider>

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