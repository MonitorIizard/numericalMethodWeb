import { useEffect, useState } from 'react';
import Input from '../../components/derivative-ui/Input';
import InputData from './class/InputData';
import Derivative from './class/Derivative';
import { DifferentiationResult } from './class/Derivative';
import ShowSolution from '../../components/derivative-ui/show-solution';

export default function Page() {
  const [data, setData] = useState<InputData>(new InputData(0, '', '', '', '', 0));
  const [result, setResult] = useState<DifferentiationResult>();
  const solver = new Derivative(data!);

  useEffect(() => {
    if (!data) return;
    setResult(solver.differentiation());
  }, [data]);
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold p-4'>Ordinary Derivative</h1>
      <Input setInputData={setData}/>
      <ShowSolution result={result!}/>
    </div>
  )
}