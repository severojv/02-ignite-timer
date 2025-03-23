import { useContext, useEffect, useState } from "react";
import { CountdownContainer, SeparatorContainer } from "../styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "..";

export function Countdown() {

    const { activeCycle, activeCycleID, markCurrentCycleAsFinished } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDiferents = differenceInSeconds(new Date(), activeCycle.startData)

                if (secondsDiferents >= totalSeconds) {
                    markCurrentCycleAsFinished()

                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDiferents)
                }

            }, 1000)
        }
        return () => {

            clearInterval(interval)
        }
        }, [activeCycle, totalSeconds, activeCycleID, markCurrentCycleAsFinished])
        
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




    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <SeparatorContainer>:</SeparatorContainer>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}