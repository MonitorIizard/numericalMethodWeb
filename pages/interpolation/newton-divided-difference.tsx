import Graph from "@/components/interpolation-ui/graph";
import Input from "../../components/interpolation-ui/input"
import ShowSolution from "@/components/interpolation-ui/show-solution"
import { useEffect, useRef, useState } from "react";
import Data from "@/pages/interpolation/class/Data";
import Interpolation from "./class/Interpolation";
import Point from "./class/Point";

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
  function calculateGraph( answerOfC : number[]) {
    if ( givenData.length === 0 ) return [];

    let coordinate : Point[] = [];
    for ( let x = givenData[0].point.x[0]; x <= givenData[givenData.length - 1].point.x[0]; x += 1) {
      let sum = answerOfC[0];

      for ( let i = 1; i < answerOfC.length; i++ ) {
        let currentSumThisTerm = 1;
        let coefficient = answerOfC[i];
          
        for ( let j = 0; j < i; j++ ) {
          currentSumThisTerm *= (x - givenData[j].point.x[0]);
          // console.log( `${coefficient} * (${xToFind} - ${ givenData[j].x })` );
        }   
        sum += currentSumThisTerm * coefficient;
      } 

      coordinate.push(new Point([x], sum));
    }

    return coordinate;
  }

  useEffect(() => {
    const x = givenData.map((data) => data.point.x[0]);
    const y = givenData.map((data) => data.point.y);
    const {sum, answerOfC: c} = Interpolation.newtonDividedDifference(x, y, xToFind);
    setAnswer(sum);
    setGraph(calculateGraph(c));
  }, [givenData]);

  const count = useRef(0);
  
  useEffect(() => {
    if ( count.current > 1 && process.env.NODE_ENV === "development" ||
				 count.current > 0 && process.env.NODE_ENV === "production") {
          const {data, target : x} = inputData;
      setGivenData(inputData.data);
      setXToFind(inputData.target);
    }
    count.current++;
  }, [inputData]);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="my-8 text-center text-3xl font-bold">Newton Divided Difference</h1>
      <Input setInputData={setInputData}/>
      <ShowSolution answer={[answer]}/>
      <Graph graph={graph} 
             points={givenData.map((row) => row.point)}
             answerPoint={new Point([xToFind], answer)}/>
    </div>
  )
}

