import { Card } from "@mui/material";
import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';

type Props = {
  answer : number[];
}

export default function showSolution({answer} : Props) {
  return (
    <Card className="w-11/12 max-w-xl p-4 text-center">
      <InlineMath>Solution</InlineMath>
      {
        answer.map((value, index) => {
          return (
            <div key={index}>
              <InlineMath>{`y = ${value}`}</InlineMath>
            </div>
          )
        }
      )}
    </Card>
  )
}