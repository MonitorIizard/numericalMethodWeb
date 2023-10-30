import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Card } from '@mui/material';
import { DifferentiationResult } from '@/pages/derivative/class/Derivative';

type Props = {
  result : DifferentiationResult;
}

export default function Page( { result } : Props ) {
  return (
    <div className='w-11/12 max-w-xl'>

    { result && <Card className=" p-4 text-center">
      <div className='text-3xl'>
        <InlineMath>Solution</InlineMath>
      </div>
        <div>
          <InlineMath>{`\\text{Derivative equation} = ${ result.exactFunc } `}</InlineMath>
          <br />
          <InlineMath>{`\\text{result} = ${ result.result } `}</InlineMath>
          <br />
          <InlineMath>{`\\text{real value} = ${ result.exactResult } `}</InlineMath>
          <br />
          <InlineMath>{`\\text{error} = ${ result.errorValue }\\% `}</InlineMath>
        </div>
    </Card>}
    </div>
  )
}