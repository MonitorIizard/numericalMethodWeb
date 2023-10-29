import { useState } from "react";
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Button, Card, TextField } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';

type Props = {
  setData : ( value : {equation : string, xStart : number, xEnd : number, n : number}) => void;
}

export default function Page({setData}: Props) {
  const [equation, setEquation] = useState<string>("4x^5 - 3x^4 + x^3 - 6x + 2");
  const [range, setRange] = useState<{ start : number, end : number }>({ start : 2, end : 8 });

  // function onChangeHandle(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) {
  //   const {name, value} = e.target;
  //   const regex = /[^-][^0-9]$/;

  //   console.log(name, value);
  //   if ( regex.test(value) ) console.log("invalid input");

  //   if ( name === "start" ) {
  //     setRange(() => {
  //       return {
  //         start : Number(value),
  //         end : range.end
  //       }
  //     })
  //   }

  //   if ( name === "end" ) {
  //     setRange(() => {
  //       return {
  //         start : range.start,
  //         end : Number(value)
  //       }
  //     })
  //   }

  //   if ( name === "n" ) {
  //     if ( Number(value) <= 0 ) return;
  //     setN(Number(value));
  //   }
  // }

  function submit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setRange({start : Number(data.start), end : Number(data.end)});
    setData({equation : data.equation.toString(), xStart : Number(data.start), xEnd : Number(data.end), n : Number(data.n)});
  }

  return (
    <Card className="w-11/12 max-w-xl mx-auto ">
        <form action="" onSubmit={(e) => submit(e)} className=" flex flex-col gap-4 p-4">
        <div className="text-2xl over">
          <InlineMath>{` \\int_{${range.start}}^{${range.end}}(${equation})dx`}</InlineMath>
        </div>
        <TextField label="equation" fullWidth name="equation" value={equation} onChange={(e) => setEquation(e.target.value)}/>
        <div className="flex">
          <TextField label="X start" fullWidth name="start" required/>
          <TextField label="X end" fullWidth name="end" required/>
          <TextField label="n" type="number" fullWidth name="n" required/>
        </div>
        
        <Button className="bg-green-500 text-white hover:bg-green-600"
                type="submit">
          Calculate <CalculateIcon/>
        </Button>
      </form>
      </Card>
  )
}