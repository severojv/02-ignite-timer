import { actionTypes } from "./actions"
import { isDraft, produce } from 'immer'


interface CyclesState {
    cycles: Cycle[]
    activeCycleID: string | null
}

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startData: Date
    interruptDate?: Date
    finishedDate?: Date

}




export function cyclesReducers(state: CyclesState, action: any) {
    if (action.type == actionTypes.ADD_NEWCYCLE) {
        return produce(state,(isDraft) =>{
             isDraft.cycles.push(action.payload.newCycle)
             isDraft.activeCycleID=action.payload.newCycle.id
        })
    }
    if (action.type == actionTypes.MARK_CURRENT_CYCLE) {
 
        const currentCycleIndex=state.cycles.findIndex((cycle)=>{
            return cycle.id==state.activeCycleID
        })
        if(currentCycleIndex<0){
            return state
        }


        return produce(state,(isDraft)=>{
            isDraft.activeCycleID=null
            isDraft.cycles[currentCycleIndex].finishedDate=new Date()
        })
    }

    
    if (action.type == actionTypes.INTERRUPT_CURRENT_CYCLE) {

        const currentCycleIndex=state.cycles.findIndex((cycle)=>{
            return cycle.id==state.activeCycleID
        })
        if(currentCycleIndex<0){
            return state
        }


        return produce(state,(isDraft)=>{
            isDraft.activeCycleID=null
            isDraft.cycles[currentCycleIndex].interruptDate=new Date()
        })
    }
    return state
}