import { useEffect, useState } from 'react';
import Input from '../../components/derivative/Input';
import InputData from '../../class/derivative/InputData';
import Derivative from '../../class/derivative/Derivative';
import { DifferentiationResult } from '../../class/derivative/Derivative';
import ShowSolution from '../../components/derivative/show-solution';

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