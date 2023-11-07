import InputData from '../../class/integration/InputData'
import { useEffect, useState } from 'react'
import Simson from '../../class/integration/Simpson';
import Input from '../../components/integrated/input'
import ShowSolution from '@/components/integrated/show-solution';
import Graph from '@/components/integrated/graph';
import Point from '../../class/interpolation/Point';
import { evaluate } from 'mathjs';

export default function Page() {
  const [data, setData] = useState<InputData>();
  const [answer, setAnswer] = useState<number[]>([]); 
  const [error, setError] = useState<number>(0);
  const [realValue, setRealValue] = useState<number>(0);
  const [graph, setGraph] = useState<Point[]>([]);
  let solver = new Simson(data!);

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

  async function writeRecord() {
    const type = new URLSearchParams(window.location.search).get("type");

    const res = fetch("/api/integrated/add", {
      method : "POST",
      body: JSON.stringify({
        equation : data?.equation,
        x_start : data?.xStart,
        x_end : data?.xEnd,
        calAnswer : answer,
        realAnswer : realValue,
        error : error,
        n : data?.n,
        graph : graph,
        type : type
    })
  })
  }

  useEffect(() => {
    writeRecord();
  }, [answer])

  async function fetchData() {
    const id = new URLSearchParams(window.location.search).get("id");

    if ( id == null ) return ;
    const res = await fetch("/api/integrated/get?" + new URLSearchParams({id : id!}), {
      method : "GET"
    });

    const json = await res.json();
    const data = json.data[0];

    return data;
  }

  useEffect(() => {
    const setDataInp = async () => {
      const data = await fetchData();
      if ( data === undefined ) return;
      
      setGraph(data.graph);
      setAnswer(data.calAnswer);
      setRealValue(data.realAnswer);
      setError(data.error);
      // console.log(data);
    }

    setDataInp();
  }, [typeof window != "undefined" ? new URLSearchParams(window.location.search).get("id") : ""]);

  return (
  <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-center font-bold py-4">Simpson</h1>
      <Input setData={setData}/>

      <ShowSolution answer={answer} realValue={realValue} error={error}/>

      <Graph graph={graph}/>
  </div>
  )
}