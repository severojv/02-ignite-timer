import { Cycle } from "./reducers";

export enum actionTypes {
    ADD_NEWCYCLE = 'ADD_NEWCYCLE',
    MARK_CURRENT_CYCLE = 'MARK_CURRENT_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {

        type: actionTypes.ADD_NEWCYCLE,
        payload: {
            newCycle,
        },

    }
}

export function interruptCurrentCycleAction() {
    return {

        type: actionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}

export function marckCurrentCycleAction() {
    return {

        type: actionTypes.MARK_CURRENT_CYCLE,
    }
}