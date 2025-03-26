import { HandPalm, Play, Target } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput, StopCountdownButton } from "./styles"
import { createContext, useContext, useEffect, useState } from "react"
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { differenceInSeconds, interval } from "date-fns";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { CyclesContext } from "../../context/CyclesContext";
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





const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //inferir o typo de acordo com o objeto 

export function Home() {
    const {activeCycle,createNewCycle,interruptCurrentCycle}=useContext(CyclesContext)

    const newCycleForms = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForms
    

    function handleCreateNewCycle(data: newCycleFormData){
        createNewCycle(data)
        reset()
    }



    

 


    const task = watch('task');         //"'observa '" a task


    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
               
                    <FormProvider  {...newCycleForms}>
                        <NewCycleForm />

                    </FormProvider>
                    <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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