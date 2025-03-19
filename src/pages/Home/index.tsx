import { Play, Target } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput } from "./styles"
import { useState } from "react"
import {useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

/*
function register(name:string){
    return(
    
        onChange:() =>void
        onBlur:() =>void
        onFoucus...
    )
}
*/
const newCycleFormValidationSchema=zod.object({
     task: zod.string().min(1,'Informe a tarefa'),
     minutesAmount: zod.number().min(5).max(60),
})
/*interface newCycleFormData{
    task:string
    minutesAmount:number
}*/

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema > //inferir o typo de acordo com o objeto 

export function Home(){
   
    const {register,handleSubmit,watch,formState,reset} = useForm<newCycleFormData>({
        resolver:zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task:'',
            minutesAmount:0,
        }
    })

    function handleCreateNewCycle(data:newCycleFormData){    
        reset();
    }
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
                    {...register('minutesAmount',{valueAsNumber:true})}
                />

                <span>mintutos.</span>
                </FormContainer>
            <CountdownContainer>
                <span>0</span>
                <span>0</span>
                <SeparatorContainer>:</SeparatorContainer>
                <span>0</span>
                <span>0</span>
            </CountdownContainer>
            <StartCountdownButton  disabled={!task} type="submit">
                <Play size={24}/>
                Começar
            </StartCountdownButton>
            </form>
        </HomeConteiner>
    )
}