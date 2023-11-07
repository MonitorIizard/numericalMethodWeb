import { useEffect, useState } from "react";
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Button, Card, TextField } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';
import History from './history';
import HistoryIcon from '@mui/icons-material/History';


type Props = {
  setData : ( value : {equation : string, xStart : number, xEnd : number, n : number}) => void;
}

export default function Page({setData}: Props) {
  const [equation, setEquation] = useState<string>("4x^5 - 3x^4 + x^3 - 6x + 2");
  const [range, setRange] = useState<{ start : number, end : number }>({ start : 2, end : 8 });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [n, setN] = useState<number>(2);

  function submit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setRange({start : Number(data.start), end : Number(data.end)});
    setData({equation : data.equation.toString(), xStart : Number(data.start), xEnd : Number(data.end), n : Number(data.n)});
  }

  async function fetchData() {
    const id = new URLSearchParams(window.location.search).get("id");

    if ( id == null ) return ;
    const res = await fetch("/api/integrated/get?" + new URLSearchParams({id : id!}), {
      method : "GET"
    });

    const json = await res.json();
    const data = json.data[0];

    return data;
  }

  useEffect(() => {
    const setDataInp = async () => {
      const data = await fetchData();
      if ( data === undefined ) return;
      
      setEquation(data.equation);
      setRange({start : data.x_start, end : data.x_end});
      setN(data.n);
      // console.log(data);
    }

    setDataInp();
  }, [typeof window != "undefined" ? new URLSearchParams(window.location.search).get("id") : ""]);

  return (
    <Card className="w-11/12 max-w-xl mx-auto ">
        <form action="" onSubmit={(e) => submit(e)} className=" flex flex-col gap-4 p-4 relative">
        <div
					className=" absolute right-10 top-10 z-50 -translate-y-1/2"
					onClick={() => setIsHistoryOpen((prev) => !prev)}
				>
					<HistoryIcon className="fill-black " />
				</div>
        <div className="text-2xl over">
          <InlineMath>{` \\int_{${range.start}}^{${range.end}}(${equation})dx`}</InlineMath>
        </div>
        <TextField label="equation" fullWidth name="equation" value={equation} onChange={(e) => setEquation(e.target.value)}/>
        <div className="flex">
          <TextField label="X start" fullWidth name="start" required value={isNaN(range.start) ? "" : range.start} onChange={(e) => setRange((prev) => {return {start : Number(e.target.value), end : prev.end}})}/>
          <TextField label="X end" fullWidth name="end" required value={isNaN(range.end) ? "" : range.end} onChange={(e) => setRange((prev) => {return {start : prev.start, end : Number(e.target.value)}})}/>
          <TextField label="n" type="number" fullWidth name="n" required value={isNaN(n) ? "" : n} onChange={(e) => setN(Number(e.target.value))}/>
        </div>
        
        <Button className="bg-green-500 text-white hover:bg-green-600"
                type="submit">
          Calculate <CalculateIcon/>
        </Button>
      </form>
      <History isOpen={isHistoryOpen} setOpen={setIsHistoryOpen} />
      </Card>
  )
}