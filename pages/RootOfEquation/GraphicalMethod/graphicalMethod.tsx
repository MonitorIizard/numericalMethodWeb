import { useState } from "react";
import { SetOfResult } from "../class";
import Template from "../RootOfEquationTemplate";
import GraphicalMethod from "./GraphicalMethodClass";

function page() {
  const [equation, setEquation] = useState<string>("1");
  const [xStart, setxStart] = useState<number>(0);
  const [xEnd, setxEnd] = useState<number>(0);
  const [tolerance, setTolerance] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>(["wait for calculate"]);
  const [numberOfIteration, setNumberOfIteration] = useState<number>(0);
  const [result, setResult] = useState<SetOfResult[]>([]);

  let graphicalEquation;
  let content = {
    header : "Graphical Method"
  }

  function eventHandler(e: any) {
    e.preventDefault();

    graphicalEquation = new GraphicalMethod({
      xStart: xStart,
      xEnd : xEnd,
      es: tolerance,
      fx: equation
    });

    graphicalEquation.solve( {setAnswer, setResult} );
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
                numberOfIteration={numberOfIteration}
                result={result}/>
    </>
  );
}

export default page;
