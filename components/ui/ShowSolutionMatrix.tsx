import { Card } from "@mui/material";
import { InlineMath } from "react-katex";

type Props = {
  results : number[];
  isSolution? : boolean;
}

export default function Page ({results, isSolution} : Props ) {
  return (
    <Card>
      <div className="flex justify-center py-4">
        {
        isSolution ?
        <div>
          <div className="text-center">
            <InlineMath>Solution</InlineMath>
          </div>
          <br />
          { results.map( (ans, idx) => {
            return (
              <span key={idx}>
                <InlineMath>{`x_${idx}=${ ans == null ? "no answer" : ans.toString()}`}</InlineMath>
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

