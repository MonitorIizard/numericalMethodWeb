import { FormEvent, useState } from "react";
import RootOfEquation from "../app";
import CalculateIcon from '@mui/icons-material/Calculate';
import { Button } from "@mui/material";


class GraphicalMethod extends RootOfEquation {
  fx: string;

  constructor(props: { xToStart: number; tolerance: number; fx: string }) {
    super(props.xToStart, props.tolerance);
    this.fx = props.fx;
  }

  f(x: number) {
    return eval(this.fx);
  }

  solve() {
    let p = 1;
    let x = this.xStart;
    let temp = x;
    let temp1 = x;

    if (this.f(x) > 0) {
      p *= -1;
    }

    // x  += p;

    while (
      this.f(x) != 0 &&
      Math.abs(this.f(x) - this.f(temp) / this.f(x)) > 0.00006
    ) {
      // console.log( `temp ${temp} temp1 ${temp1} x${x}`);

      if (this.f(temp) / this.f(x) < 0) {
        x = temp;
        temp = temp1;
        p /= 10;
      } else {
        temp = x;
      }

      temp1 = temp;

      // console.log(x);
      x += p;
    }
    console.log(x);
  }
}

function page() {
  const [equation, setEquation] = useState<string>("1");
  const [xToStart, setxToStart] = useState<number>(0);
  const [tolerance, setTolerance] = useState<number>(0);

  function eventHandler(e: any) {
    e.preventDefault();
    // let form = e.target;
    // let formData = new FormData(form);

    // const formJson: { [k: string]: FormDataEntryValue } = Object.fromEntries(
    //   formData.entries()
    // );

    graphicalEquation = new GraphicalMethod({
      xToStart: xToStart,
      tolerance: tolerance,
      fx: equation,
    });

    graphicalEquation.solve();
  }

  let graphicalEquation;

  return (
    <>
      <div
        className="bg-green-100 w-scree  h-screen
                        text-black"
      >
        <h1 className="text-center text-3xl font-bold">Graphical Method</h1>
        <form action="">
          <label htmlFor="">
            f(x) ={" "}
            <input
              className=""
              type="text"
              name="fx"
              onInput={(e) => setEquation(e.currentTarget.value)}
            />{" "}
            <br />
            xToStart ={" "}
            <input
              type="text"
              name="xToStart"
              onInput={(e) => setxToStart(Number(e.currentTarget.value))}
            />
            xToStop ={" "}
            <input
              type="text"
              name="xToStart"
              onInput={(e) => setxToStart(Number(e.currentTarget.value))}
            />
            <br />
            tolerance ={" "}
            <input
              type="text"
              name="tolerance"
              onInput={(e) => setTolerance(Number(e.currentTarget.value))}
            />
            <br />
            <Button variant="contained"
                    type="submit"
                    className="bg-black">Calculate 😉</Button>
          </label>
        </form>
      </div>
    </>
  );
}

export default page;

{
  /* <form action="" onSubmit={eventHandler}>
          <label htmlFor="">
            f(x) ={" "}
            <input
              type="text"
              name="fx"
              onInput={(e) => setEquation(e.currentTarget.value)}
            />
            xToStart = <input type="text" 
                              name="xToStart" 
                              onInput={(e) => setxToStart(Number(e.currentTarget.value))}/>
            tolerance = <input type="text" name="tolerance" 
                         onInput={(e) => setTolerance(Number(e.currentTarget.value))}/>

            <button type="submit">submit</button>
          </label>
        </form> */
}
