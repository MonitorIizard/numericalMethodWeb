import InputData from './class/InputData'
import { useEffect, useState } from 'react'
import Trapezoidal from './class/Trapezoidal';
import Input from '../../components/integrated-ui/input'
import ShowSolution from '@/components/integrated-ui/show-solution';

export default function Page() {
  const [data, setData] = useState<InputData>();
  const [answer, setAnswer] = useState<number[]>([]); 
  const [error, setError] = useState<number>(0);
  const [realValue, setRealValue] = useState<number>(0);
  let solver = new Trapezoidal(data!);

  useEffect(() => {
    setAnswer([solver.solve()]);
    const {error : e, realValue : r} = solver.calError();
    setError(e);
    setRealValue(r);
  }, [data])

  return (
  <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold py-4">Trapezoidal</h1>
      <Input setData={setData}/>

      <ShowSolution answer={answer} realValue={realValue} error={error}/>
  </div>
  )
}