import { useState } from "react";
import RootOfEquation from "./app";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
// import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

interface Page {
  eventHandler: (value: any) => void;
  setEquation: (value: string) => void;
  setxStart: (value: number) => void;
  setxEnd: (value: number) => void;
  setTolerance: (value: number) => void;
  answer: string[];
  content: { header: string };
  numberOfIteration : number;
}

function Template({
  eventHandler,
  setEquation,
  setxStart,
  setxEnd,
  setTolerance,
  answer,
  content,
  numberOfIteration
}: Page) {
  return (
    <>
      <div
        className="bg-green-100 w-scree  h-screen
                   text-black"
      >
        <h1 className="text-center text-3xl font-bold">{content.header}</h1>

        <div className=" flex justify-center">
          <form action="" onSubmit={eventHandler}>
            <div className="w-full">
              <label htmlFor=""> f(x) = </label>
              <input
                className="w-80"
                type="text"
                name="fx"
                onInput={(e) => setEquation(e.currentTarget.value)}
              />
            </div>

            <div className="">
              <label htmlFor="">Range = [ </label>
              <input
                type="text"
                className="w-8"
                name="xStart"
                onInput={(e) => setxStart(Number(e.currentTarget.value))}
              />
              <label htmlFor=""> , </label>
              <input
                type="text"
                className="w-8"
                name="xEnd"
                onInput={(e) => setxEnd(Number(e.currentTarget.value))}
              />
              <label htmlFor=""> ]</label>
            </div>

            <div>
              <label htmlFor="">Tolerance = </label>
              <input
                type="text"
                name="tolerance"
                onInput={(e) => setTolerance(Number(e.currentTarget.value))}
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              className="bg-black"
              startIcon={<CalculateRoundedIcon />}
            >
              Calculate 😉
            </Button>
          </form>
        </div>

        <p className="text-center">
          {" "}
          x ={" "}
          {answer.map((element, index) => {
            if (index == answer.length - 1) return `${element}`;
            return `${element}, `;
          })}
        </p>

        <p className="text-center">
          number of iteration is {numberOfIteration}
        </p>
      </div>
    </>
  );
}

export default Template;
