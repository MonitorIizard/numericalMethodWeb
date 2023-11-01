import Input from "../../components/regression/input-multi-linear-regression"
import ShowSolution from "@/components/interpolation/show-solution"
import { useEffect, useRef, useState } from "react";
import Data from "@/class/interpolation/Data";
import Regression from "../../class/regression/Regression";

type InputData = {
  data : Data[];
  target : number[];
}

export default function Page() {
  const [answer, setAnswer] = useState<number>(0);
  const [inputData, setInputData] =  useState<InputData>({data : [], target : []});
  const [givenData, setGivenData] = useState<Data[]>([]);
  // const [graph, setGraph] = useState<Point[]>([]);
  const [mOrder, setMOrder] = useState<number>(2);
  const [xToFind, setXToFind] = useState<number[]>([]);

  useEffect(() => {
    if ( givenData.length < 1) return ;

    const setOfx = givenData.map((data) => data.point.x);
    const setOfy = givenData.map((data) => data.point.y);
    const answer =Regression.multipleLinearRegression(setOfx, setOfy, xToFind);
    
    // let step = Math.floor(Math.log(Math.abs(setOfx[0] - setOfx[setOfx.length - 1])) / Math.log(10));
		// step = Math.pow(10, step - 1);

    setAnswer(answer);
    // setGraph(() => {
    //   const next : Point[] = [];
    //   for ( let x = setOfx[0]; x <= setOfx[setOfx.length - 1]; x += step ) {
    //     const y = setOfA.reduce((sum, a, i) => sum + a * Math.pow(x, i), 0);
    //     next.push(new Point([x], y));
    //   }
    //   return next;
    // });
  }, [givenData, mOrder, xToFind]);

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
      <h1 className="my-8 text-center text-3xl font-bold">Multiple Linear Regression</h1>
      <Input setInputData={setInputData}/>
      <ShowSolution answer={[answer]}
                    multiX={xToFind}/>
    </div>
  )
}

