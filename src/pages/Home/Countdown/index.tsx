import { useEffect, useState } from "react";
import { CountdownContainer, SeparatorContainer } from "../styles";
import { differenceInSeconds } from "date-fns";

export function Countdown() {

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDiferents = differenceInSeconds(new Date(), activeCycle.startData)

                if (secondsDiferents >= totalSeconds) {

                    setCycles(state =>
                        state.map((cycle) => {
                            if (cycle.id == activeCycleID) {
                                return { ...cycle, finishedDate: new Date() }
                            } else {
                                return cycle
                            }
                        }),
                    )
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
    }, [activeCycle, totalSeconds, activeCycleID])


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