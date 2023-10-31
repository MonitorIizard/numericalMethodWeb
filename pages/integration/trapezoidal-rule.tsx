import InputData from '../../class/integration-class/InputData'
import { useEffect, useState } from 'react'
import Trapezoidal from '../../class/integration-class/Trapezoidal';
import Input from '../../components/integrated-ui/input'
import ShowSolution from '@/components/integrated-ui/show-solution';
import Graph from '@/components/integrated-ui/graph';
import Point from '../../class/interpolation-class/Point';
import { evaluate } from 'mathjs';

export default function Page() {
  const [data, setData] = useState<InputData>();
  const [answer, setAnswer] = useState<number[]>([]); 
  const [error, setError] = useState<number>(0);
  const [realValue, setRealValue] = useState<number>(0);
  const [graph, setGraph] = useState<Point[]>([]);
  let solver = new Trapezoidal(data!);

  useEffect(() => {
    setAnswer([solver.solve()]);
    const {error : e, realValue : r} = solver.calError();
    setError(e);
    setRealValue(r);
    setGraph(() => {
      const equation = data?.equation;
      const xStart = data?.xStart;
      const xEnd = data?.xEnd;
      const next:Point[] = [];
      let step = Math.floor(Math.log(Math.abs(xEnd! - xStart!))/Math.log(10));
      step = Math.pow(10, step - 1);

      for ( let x = xStart!; x <= xEnd!; x += step) {
        let y = evaluate(equation!, {x});
        next.push(new Point([x], y));
      }

      return next;
    })
  }, [data])

  return (
  <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-center font-bold py-4">Trapezoidal</h1>
      <Input setData={setData}/>

      <ShowSolution answer={answer} realValue={realValue} error={error}/>

      <Graph graph={graph}/>
  </div>
  )
}