"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {};

function Areas({}: Props) {
  const [areas, setAreas] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return (
    <Card className="flex flex-col min-h-80 min-w-80">
      <CardHeader>
        <CardTitle>Areas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-grow">
        {areas.map((el, i) => (
          <Button key={el + i} variant={"secondary"} className="justify-start">
            {el}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <form
          className="flex gap-2"
          action={() => setAreas((prev) => [...prev, input])}
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button variant={"secondary"} type="submit">
            <Plus />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default Areas;
