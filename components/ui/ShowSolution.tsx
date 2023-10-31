import { Card } from "@mui/material";
import { InlineMath } from "react-katex";

type Props = {
  answer : number;
  isSolution? : boolean;
}

export default function Page ({answer, isSolution = true} : Props ) {
  return (
    <Card>
      <div className="w-11/12 max-w-xl py-8 flex justify-center">
        {
        !isSolution ?
        <span>
          <InlineMath>{`Solution = \\text{not found}`}</InlineMath>
        </span>:
        <InlineMath>{`Solution = ${answer}`}</InlineMath>
        }
      </div>
    </Card>
  )
}

