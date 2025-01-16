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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { createPomodoro } from "@/lib/pomodoro/create";

const workTime = 50;
function usePomodoroTimer() {
  const minsToSecs = (mins: number) => mins * 60;

  const [intervals, setIntervals] = useState([workTime, 10]);
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

type Props = {
  listPomodoros: { id: string; createdAt: string; workTime: number }[];
};

function Timer({ listPomodoros }: Props) {
  const { timer, setTimer, isWork, isActive, setIsActive } = usePomodoroTimer();

  useEffect(() => {
    if (timer != 0) return;
    if (isWork) createPomodoro(workTime);
  }, [timer]);

  return (
    <Card className="min-h-80 min-w-80 flex flex-col">
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-center gap-8">
        <div className="px-10 flex gap-1">
          {listPomodoros.map((el) => (
            <TooltipProvider key={el.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="w-4 h-4 bg-black rounded-full" />
                </TooltipTrigger>
                <TooltipContent>{el.workTime}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <H1 className="text-center">
          {Math.trunc(timer / 60)}:{timer % 60}
        </H1>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button
          variant={"outline"}
          onClick={() => setTimer(0)}
          disabled={!isActive}
        >
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
