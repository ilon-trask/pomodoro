"use client";
import React, { useEffect, useState } from "react";
import { H1 } from "./ui/typography";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {};

function useTimer() {
  const minsToSecs = (mins: number) => mins * 60;

  const [intervals, setIntervals] = useState([50, 10]);
  const [timer, setTimer] = useState(minsToSecs(intervals[0]));
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (isActive ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timer != 0) return;
    setTimer(minsToSecs(intervals[+isWork]));
    setIsWork((prev) => !prev);
    setIsActive(false);
  }, [timer, isWork]);

  useEffect(() => setTimer(minsToSecs(intervals[+!isWork])), [isWork]);

  return { timer, setTimer, isWork, isActive, setIsActive };
}

function Timer({}: Props) {
  const { timer, setTimer, isWork, isActive, setIsActive } = useTimer();

  const [pomodoros, setPomodoros] = useState<
    {
      workTime: number;
      actualWorkTime: number;
      //   area: string;
    }[]
  >([
    // { workTime: 50, actualWorkTime: 45 },
    // { workTime: 50, actualWorkTime: 45 },
  ]);

  useEffect(() => {
    if (timer != 0) return;
    const workTime = 50;
    if (isWork)
      setPomodoros((prev) => [
        ...prev,
        { workTime, actualWorkTime: workTime - (timer % 60) / 60 },
      ]);
  }, [timer]);

  return (
    <Card className="min-h-80 min-w-80 flex flex-col">
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-center gap-8">
        <div className="px-10">
          {pomodoros.map((el, i) => (
            <React.Fragment key={i}>
              {i != 0 ? ", " : null}
              <span>{el.actualWorkTime}</span>
            </React.Fragment>
          ))}
        </div>
        <H1 className="text-center">
          {Math.trunc(timer / 60)}:{timer % 60}
        </H1>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant={"outline"} onClick={() => setTimer(0)}>
          Skip
        </Button>
        <Button
          onClick={() => {
            setIsActive((prev) => !prev);
            setTimer((prev) => (isActive ? prev : prev - 1));
          }}
        >
          {isActive ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Timer;
