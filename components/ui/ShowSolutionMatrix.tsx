import { Card } from "@mui/material";
import { InlineMath } from "react-katex";

type Props = {
  results : number[];
  isSolution? : boolean;
}

export default function Page ({results, isSolution} : Props ) {
  return (
    <Card>
      <div className="py-8 flex justify-center">
        {
        isSolution ?
        <div>
          { results.map( (ans, idx) => {
            return (
              <span key={idx}>
                <InlineMath>{`x_${idx}=${ans.toString()}`}</InlineMath>
                <br />
              </span>
            )
          })
          }
        </div>:
        <InlineMath>{`\\text{there is no solution or infinite solution.}`}</InlineMath>
        }
      </div>
     
    </Card>
  )
}

