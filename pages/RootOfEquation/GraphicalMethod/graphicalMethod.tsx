import { FormEvent, useState } from "react";
import RootOfEquation from "../app";
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Template from "../template"


class GraphicalMethod extends RootOfEquation {
  fx: string;

  constructor(props: { xStart: number; xEnd : number; tolerance: number; fx: string }) {
    super(props.xStart, props.xEnd, props.tolerance);
    this.fx = props.fx;
  }

  f(x: number) {
    return eval(this.fx);
  }

  solve( setAnswer: ( value : string[] ) => void ) {
    let answer:string[] = [];
    let p = 1;
    let x = this.xStart;
    let temp = x;
    let temp1 = x;

    while (true) {

      if ( x < this.xStart || x > this.xEnd ) 
        { 
          if ( answer.length == 0 ) {
            answer.push("root of equation is out of index");
          }

          break; 
        }

      if ( this.f(x) == 0 || Math.abs(this.f(x) - this.f(temp) / this.f(x)) < this.tolerance ) {
          console.log( x );
          console.log("found x ");
          answer.push(x.toString());
        }

      // if (this.f(temp) / this.f(x) < 0) {
      //   x = temp;
      //   temp = temp1;
      //   p /= 10;
      // } else {
      //   temp = x;
      // }

      temp1 = temp;

      console.log(x);
      x += p;
    }

    setAnswer( answer );
  }
}

function page() {
  const [equation, setEquation] = useState<string>("1");
  const [xStart, setxStart] = useState<number>(0);
  const [xEnd, setxEnd] = useState<number>(0);
  const [tolerance, setTolerance] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>(["wait for calculate"]);
  const [numberOfIteration, setNumberOfIteration] = useState<number>(0);

  function eventHandler(e: any) {
    e.preventDefault();

    graphicalEquation = new GraphicalMethod({
      xStart: xStart,
      xEnd : xEnd,
      tolerance: tolerance,
      fx: equation
    });

    graphicalEquation.solve( setAnswer );
  }

  let graphicalEquation;

  let content = {
    header : "Graphical Method"
  }

  return (
    <>
      <Template eventHandler={eventHandler}
                setEquation={setEquation}
                setTolerance={setTolerance}
                setxEnd={setxEnd}
                setxStart={setxStart}
                answer={answer}
                content={content}
                numberOfIteration={numberOfIteration}/>
    </>
  );
}

export default page;
