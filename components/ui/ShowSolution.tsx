import { Card } from "@mui/material";
import { InlineMath } from "react-katex";

type Props = {
  answer : number;
  text? : string;
}

export default function Page ({answer, text} : Props ) {
  return (
    <Card>
      <div className="py-8 flex justify-center">
        {
        text != '' ?
        <span>
          <InlineMath>{`Solution = `}</InlineMath>
          <p>{text}</p>
        </span>:
        <InlineMath>{`Solution = ${answer}`}</InlineMath>
        }
      </div>
    </Card>
  )
}

