import Graph from "@/components/interpolation-ui/graph";
import Input from "../../components/interpolation-ui/input"
import ShowSolution from "@/components/interpolation-ui/show-solution"
import { useEffect, useRef, useState } from "react";
import Data from "@/pages/interpolation/class/Data";
import Point from "./class/Point";
import Regression from "./class/Regression";

type InputData = {
  data : Data[];
  target : number;
}

export default function Page() {
  const [answer, setAnswer] = useState<number>(0);
  const [inputData, setInputData] =  useState<InputData>({data : [], target : 0});
  const [givenData, setGivenData] = useState<Data[]>([]);
  const [graph, setGraph] = useState<Point[]>([]);
  const [xToFind, setXToFind] = useState<number>(0);

  useEffect(() => {
    if ( givenData.length < 1) return ;
    const setOfx = givenData.map((data) => data.point.x[0]);
    const setOfy = givenData.map((data) => data.point.y);
    const setOfA = Regression.linearRegression(setOfx, setOfy);
    const sum = setOfA.reduce((sum, a, i) => sum + a * Math.pow(xToFind, i), 0);
    let step = Math.floor(Math.log(Math.abs(setOfx[0] - setOfx[setOfx.length - 1])) / Math.log(10));
		step = Math.pow(10, step - 1);
    setAnswer(sum);
    setGraph(() => {
      const next : Point[] = [];
      for ( let x = setOfx[0]; x <= setOfx[setOfx.length - 1]; x += step ) {
        const y = setOfA.reduce((sum, a, i) => sum + a * Math.pow(x, i), 0);
        next.push(new Point([x], y));
      }
      return next;
    });
  }, [givenData]);

  const count = useRef(0);
  
  useEffect(() => {
    if ( count.current > 1 && process.env.NODE_ENV === "development" ||
				 count.current > 0 && process.env.NODE_ENV === "production") {
          const {data, target : x} = inputData;
      setGivenData(data);
      setXToFind(x);
    }
    count.current++;
  }, [inputData]);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="my-8 text-center text-3xl font-bold">Linear Regression</h1>
      <Input setInputData={setInputData}/>
      <ShowSolution answer={[answer]}
                    xToFind={xToFind}/>
      <Graph graph={graph} 
             points={givenData.map((row) => row.point)}
             answerPoint={new Point([xToFind], answer)}/>
    </div>
  )
}

