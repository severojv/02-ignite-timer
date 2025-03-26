import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData{
    task:string
    minutesAmount:number
}
interface CycleContextType {
    cycles:Cycle[]
    activeCycle: Cycle | undefined
    activeCycleID: String | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds : number) => void
    createNewCycle:(data:CreateCycleData)=>void
    interruptCurrentCycle:()=>void


}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startData: Date
    interruptDate?: Date
    finishedDate?: Date

}
interface CyclesConstextProvaiderProps{
    children:ReactNode
}

interface CyclesState{
    cycles:Cycle[]
    activeCycleID:string|null
}
export const CyclesContext = createContext({} as CycleContextType)

export function CyclesConstextProvaider({children}:CyclesConstextProvaiderProps){


    const [cyclesState, dispatch] = useReducer((state:CyclesState,action:any)=>{
        if(action.type=='ADD_NEWCYCLE'){
            return {
                ...state,
                cycles:[...state.cycles,action.payload.newCycle],
                activeCycleID:action.payload.newCycle.id,
            }
        }
        if(action.type=='MARK_CURRENT_CYCLE'){

        }
        if(action.type=='INTERRUPT_CURRENT_CYCLE'){
            return{
                ...state,
                cycles:
                    state.cycles.map((cycle) => {
                                 if (cycle.id ==state.activeCycleID) {
                                     return { ...cycle, interruptDate: new Date() }
                                } else {
                                     return cycle
                                 }
                     }),
                
                activeCycleID:null,
            }
        }
        return state
    },{
        cycles:[],
        activeCycleID:null
    },)
    const {cycles,activeCycleID} =cyclesState
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleID)   //percorre até achar cycle ativo

    function setSecondsPassed(seconds:number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch({
            type:'MARK_CURRENT_CYCLE',
            payload:{
                activeCycleID
            },
        })

        // setCycles(state =>
        //     state.map((cycle) => {
        //         if (cycle.id == activeCycleID) {
        //             return { ...cycle, finishedDate: new Date() }
        //         } else {
        //             return cycle
        //         }
        //     }),
        // )
    }

    function createNewCycle(data: CreateCycleData) {

        const id = String(new Date().getTime()) //pega a data atual com os milisegundos para id

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startData: new Date(),
        }
        dispatch({
            type:'ADD_NEWCYCLE',
            payload:{
                newCycle
            },
        })
        //setCycles((state) => [...state, newCycle])
        setAmountSecondsPassed(0)

    }
    function interruptCurrentCycle() {
       
        dispatch({
            type:'INTERRUPT_CURRENT_CYCLE',
            payload:{
                activeCycleID
            },
        })

        // setCycles((state) =>
        //     state.map(cycle => {
        //         if (cycle.id == activeCycleID) {
        //             return { ...cycle, interruptDate: new Date() }
        //         } else {
        //             return cycle
        //         }
        //     }))
        // setactiveCycleID(null)

    }
    return(
         <CyclesContext.Provider value={{ cycles,activeCycle, activeCycleID, markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed,createNewCycle ,interruptCurrentCycle}}>
            {children}
         </CyclesContext.Provider>
    )
}