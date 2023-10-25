import { Card, Checkbox, TextField } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Point from "@/pages/interpolation/class/Point";
import { useState } from "react";
import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';

class Data {
  isChecked: boolean;
  point: Point;
  constructor(isChecked : boolean,point: Point) {
    this.point = point;
    this.isChecked = isChecked;
  }
}

export default function Input() {
  const [numberOfPoint, setNumberOfPoint] = useState<number>(5);
  const [data, setData] = useState<Data[]>(Array.from( {length : numberOfPoint}, (_, index) => new Data(false, new Point([NaN],NaN))));

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
    console.log(name[1]);
    console.log(value);

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

  }

  function checkAll() {
    setData((prev) => {
      const next = [...prev];
      next.forEach((data) => {
        data.isChecked = !data.isChecked;
      });
      return next;
    })
  }

  return (
    <div>
      <Card className="w-11/12 max-w-xl mx-auto p-4">

        <div className="flex">
          <TextField className=""
                     label="X to Find f(x)"
                     type="number"
                     name="xToFind"
                     fullWidth/>
          <TextField className="w-28" label="Point" required fullWidth type={"number"}
                    name="numberOfPoint" value={numberOfPoint} 
                    onChange={(e) => resize(Number(e.target.value))}/>
        </div>

        <div className="flex justify-center items-center">
            <TableContainer>
                <Table aria-label="simple table">
              <TableHead>
                <TableRow className="text-black">
                  <TableCell size="small" align="center" className="w-10"><Checkbox onChange={checkAll}/></TableCell>
                  <TableCell size="small" align="center"> <InlineMath> Point </InlineMath></TableCell>
                  <TableCell size="small" align="center"><InlineMath>X</InlineMath></TableCell>
                  <TableCell size="small" align="center"><InlineMath>Y</InlineMath></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  data.slice(0, numberOfPoint).map((row, index) => { 
                    console.log(row);
                    return (
                    <TableRow className={row.isChecked ? "bg-slate-300 color-white" : ""}
                                key={`row=${index}`}>
                      <TableCell size="small" align="center" className="w-10">
                        <Checkbox onChange={(e) => onChangeHandle(e)}
                                  name={`check${index}`}
                                  />
                      </TableCell>
                      <TableCell size="small" align="center">{index+1}</TableCell>
                      <TableCell size="small" align="center">
                        <TextField className=""
                                  label={`x${index+1}`}
                                  name={`x${index}`}
                                  value={Number.isNaN(row.point.x[0]) ? "" : row.point.x[0]}
                                  onChange={(e) => onChangeHandle(e)}/>
                      </TableCell>
                      <TableCell size="small" align="center">
                        <TextField className=""
                                  label={`y${index+1}`}
                                  name={`y${index}`}
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
    </div>
  )
}