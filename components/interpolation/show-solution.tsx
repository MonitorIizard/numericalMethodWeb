import { Card } from "@mui/material";
import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';

type Props = {
  answer : number[];
  xToFind? : number;
  multiX? : number[];
}

export default function showSolution({answer, xToFind, multiX} : Props) {
  return (
    <Card className="w-11/12 max-w-xl p-4 text-center">
      <InlineMath>Solution</InlineMath>
      {
        multiX ?
          <div>
            <InlineMath>{`f(${multiX.join(',')}) = y = ${answer[0]}`}</InlineMath>
          </div>
        :
        answer.map((value, index) => {
          return (
            <div key={index}>
              <InlineMath>{`f(${xToFind}) = y = ${value}`}</InlineMath>
            </div>
          )
        }
      )}
    </Card>
  )
}