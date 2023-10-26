import { Card, Checkbox, TextField } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Point from "@/pages/interpolation/class/Point";
import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';
import Data from "@/pages/interpolation/class/Data";

type Props = {
  setInputData? : ( value : { data : Data[], target : number } ) => void;
}


export default function Input( {setInputData} : Props) {
  let givenData = [ new Point([0], 9.81), new Point([20_000], 9.7487), new Point ( [40_000], 9.6879), new Point ( [60_000], 9.6879),  new Point ( [80000], 9.5682) ];
  const [numberOfPoint, setNumberOfPoint] = useState<number>(5);
  const [data, setData] = useState<Data[]>(givenData.map((element, index) => new Data(false, element)));
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [xToFind, setXToFind] = useState<number>(0);
  function resize(value: number) {
    setNumberOfPoint((prev) => {
      if ( value <= 0 ) {
        return prev;
      }
      return value;
    });

    setData((prev) => {
      if(prev.length < value) {
        const next = [...prev];
        for (let i = prev.length; i < value; i++) {
          next.push(new Data(false, new Point([NaN],NaN)));
        }
        return next;
      }
      return prev;
    });
  }

  function onChangeHandle(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    // console.log(value);

    if ( name.includes('Find') ) {
      setXToFind(Number(value));
      // console.log(name);
    }

    if ( name.includes('x') ) {
      const i = Number(name[1]);
      setData((prev) => {
        const next = [...prev];
        next[i].point.x[0] = Number(value);
        return next;
      });
    }

    if ( name.includes('y') ) {
      const i = Number(name[1]);
      setData((prev) => {
        const next = [...prev];
        next[i].point.y = Number(value);
        return next;
      });
    }

    if ( name.includes('check') ) {
      const i = Number(name[name.length-1]);
      setData((prev) => {
        const next = [...prev];
        next[i].isChecked = !next[i].isChecked;
        return next;
      });
    }

    // setInputData && setInputData({ data : data.filter((row) => row.isChecked), xToFind});
  }

  function markAll(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData((prev) => {
      const next = [...prev];
      next.forEach((data) => {
        data.isChecked = !isCheckAll;
      });
      return next;
    })

    setIsCheckAll((prev) => !prev);
    // setInputData && setInputData({ data : data.filter((row) => row.isChecked), xToFind});
  }

  useEffect(() => { 
    setInputData && setInputData({ data : data.filter((row) => row.isChecked), target : xToFind});
  }, [data, xToFind]);

  return (
      <Card className="w-11/12 max-w-xl p-4">

        <div className="flex sticky">
          <TextField className=""
                     label="X to Find f(x)"
                     type="number"
                     name="Find"
                     required
                     value={xToFind}
                     onChange={(e) => onChangeHandle(e)}
                     fullWidth/>
          <TextField className="w-60" label="Number of Point" required type={"number"}
                    name="numberOfPoint" value={numberOfPoint} 
                    onChange={(e) => resize(Number(e.target.value))}/>
        </div>

        <div className="flex justify-center items-center">
            <TableContainer>
                <Table aria-label="simple table">
              <TableHead>
                <TableRow className="text-black">
                  <TableCell size="small" align="center" className="w-10"><Checkbox checked={isCheckAll} onChange={(e) => markAll(e)}/></TableCell>
                  <TableCell size="small" align="center"> <InlineMath> Point </InlineMath></TableCell>
                  <TableCell size="small" align="center"><InlineMath>X</InlineMath></TableCell>
                  <TableCell size="small" align="center"><InlineMath>Y</InlineMath></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  data.slice(0, numberOfPoint).map((row, index) => { 
                    return (
                    <TableRow className={row.isChecked ? "bg-slate-300 color-white" : ""}
                                key={`row=${index}`}>
                      <TableCell size="small" align="center" className="w-10">
                        <Checkbox onChange={(e) => onChangeHandle(e)} 
                                  checked={row.isChecked}
                                  name={`check${index}`}
                                  />
                      </TableCell>
                      <TableCell size="small" align="center">{index+1}</TableCell>
                      <TableCell size="small" align="center">
                        <TextField className=""
                                  label={`x${index+1}`}
                                  name={`x${index}`}
                                  value={Number.isNaN(row.point.x[0]) ? "" : row.point.x[0]}
                                  required
                                  onChange={(e) => onChangeHandle(e)}/>
                      </TableCell>
                      <TableCell size="small" align="center">
                        <TextField className=""
                                  label={`y${index+1}`}
                                  value={Number.isNaN(row.point.y) ? "" : row.point.y}
                                  name={`y${index}`}
                                  required
                                  onChange={(e) => onChangeHandle(e)}/>
                      </TableCell>
                    </TableRow>
                  )})
                }
              </TableBody>

            </Table>
            </TableContainer>
          </div>

      </Card>
  )
}