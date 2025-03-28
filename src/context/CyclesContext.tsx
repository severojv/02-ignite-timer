import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducers } from '../reducers/cycles/reducers'
import { actionTypes, addNewCycleAction, interruptCurrentCycleAction, marckCurrentCycleAction } from "../reducers/cycles/actions";
import { redirectDocument } from "react-router-dom";
import { differenceInSeconds } from "date-fns";
interface CreateCycleData {
    task: string
    minutesAmount: number
}
interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleID: String | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}
interface CyclesConstextProvaiderProps {
    children: ReactNode
}


export const CyclesContext = createContext({} as CycleContextType)

export function CyclesConstextProvaider({ children }: CyclesConstextProvaiderProps) {


    const [cyclesState, dispatch] = useReducer(cyclesReducers,
        {
            cycles: [],
            activeCycleID: null
        }, (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite-tipe:cyclesState');
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON);
            }
            return initialState
        })
    const { cycles, activeCycleID } = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleID)   //percorre até achar cycle ativo

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startData))
        }

        return 0
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-tipe:cyclesState', stateJSON)
    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch(marckCurrentCycleAction())
    }

    function createNewCycle(data: CreateCycleData) {

        const id = String(new Date().getTime()) //pega a data atual com os milisegundos para id

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startData: new Date(),
        }
        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)

    }
    function interruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction())


    }
    return (
        <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle }}>
            {children}
        </CyclesContext.Provider>
    )
}