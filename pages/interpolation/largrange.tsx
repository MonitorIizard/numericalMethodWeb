import Data from "./class/Data";
import Interpolation from "./class/Interpolation";
import { useEffect, useRef, useState } from "react";
import Graph from "@/components/interpolation-ui/graph"
import Input from "@/components/interpolation-ui/input"
import ShowSolution from "@/components/interpolation-ui/show-solution"
import { number } from "mathjs";
import Point from "./class/Point";

type InputData = {
  data : Data[];
  target : number;
}

export default function Page() {
  const [answer, setAnswer] = useState<number>(0);
  const [inputData, setInputData] =  useState<InputData>({data : [], target : 0});
  const [givenData, setGivenData] = useState<Point[]>([]);
  const [graph, setGraph] = useState<Point[]>([]);
  const [xToFind, setXToFind] = useState<number>(0);

  function calculateGraph(){
    if (givenData.length === 0) {
      return [];
    }

    const setOfx = givenData.map((data) => data.x[0]);
    const setOfy = givenData.map((data) => data.y);
    let graph : Point[] = [];
    for (let x = givenData[0].x[0]; x <= givenData[givenData.length - 1].x[0]; x += 1000) {
      const y = Interpolation.largrange(setOfx, setOfy, x).fx;
      graph.push(new Point([x], y));
    }

    return graph;
  }

  useEffect(() => {
    const x = givenData.map((data) => data.x[0]);
    const y = givenData.map((data) => data.y);
    const {fx} = Interpolation.largrange(x, y, xToFind);
    setAnswer(fx);
    setGraph(calculateGraph());
  }, [givenData]);

  const count = useRef(0);
  
  useEffect(() => {
    if ( count.current > 1 && process.env.NODE_ENV === "development" ||
				 count.current > 0 && process.env.NODE_ENV === "production") {
      const {data, target : x} = inputData;
      setGivenData(data.map((element) => element.point));
      setXToFind(x);
      console.log("inputData", inputData)
    }
    count.current++;
  }, [inputData]);

  return (
    <div className="flex flex-col gap-6 items-center">
        <h1 className="my-8 text-center text-3xl font-bold">Largrange</h1>
        <Input setInputData={setInputData}/>
        <ShowSolution answer={[answer]} xToFind={xToFind}/>
        <div className="flex justify-center">
          <Graph graph={graph} points={givenData} answerPoint={new Point([xToFind], answer)}/>
        </div>
    </div>
  )
}