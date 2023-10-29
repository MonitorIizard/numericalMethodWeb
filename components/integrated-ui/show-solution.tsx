import { Card } from "@mui/material";
import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';

type Props = {
  answer : number[];
  realValue : number;
  error : number;
}

export default function showSolution( {answer, realValue, error} : Props) {

  return (
    <Card className="w-11/12 max-w-xl p-4 text-center">
      <InlineMath>Solution</InlineMath>
        <div>
          <InlineMath>{`\\text{Approximation of Intregrated} = ${answer}`}</InlineMath>
          <br />
          <InlineMath>{`\\text{Real value of Intregrated} = ${realValue}`}</InlineMath>
          <br />
          <InlineMath>{`\\text{Approximation of Intregrated} = ${error.toFixed(3)}\\%`}</InlineMath>
        </div>
    </Card>
  )
}