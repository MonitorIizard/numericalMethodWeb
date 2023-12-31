import Input from "../../components/regression/input-multi-linear-regression"
import ShowSolution from "@/components/interpolation/show-solution"
import { useEffect, useRef, useState } from "react";
import Data from "@/class/interpolation/Data";
import Regression from "../../class/regression/Regression";

type InputData = {
  data : Data[];
  target : number[];
}

export default function Page() {
  const [answer, setAnswer] = useState<number>(0);
  const [inputData, setInputData] =  useState<InputData>({data : [], target : []});
  const [givenData, setGivenData] = useState<Data[]>([]);
  // const [graph, setGraph] = useState<Point[]>([]);
  const [mOrder, setMOrder] = useState<number>(2);
  const [xToFind, setXToFind] = useState<number[]>([]);

  useEffect(() => {
    if ( givenData.length < 1) return ;

    const setOfx = givenData.map((data) => data.point.x);
    const setOfy = givenData.map((data) => data.point.y);
    const answer =Regression.multipleLinearRegression(setOfx, setOfy, xToFind);
    console.log(answer);
    setAnswer(answer);
  }, [givenData, mOrder, xToFind]);

  const count = useRef(0);
  
  useEffect(() => {
    if ( count.current > 1 && process.env.NODE_ENV === "development" ||
				 count.current > 0 && process.env.NODE_ENV === "production") {
          const {data, target : x} = inputData;
      setGivenData(data);
      setXToFind(x);
    }
    count.current++;
  }, [inputData]);

  async function writeRecord() {
		const type = new URLSearchParams(window.location.search).get('type');

		if (isNaN(answer)) return;

		const res = await fetch('/api/regression/add', {
			method: 'POST',
			body: JSON.stringify({
				numberOfPoint: givenData.length,
				x: givenData.map((data) => data.point.x),
				y: givenData.map((data) => data.point.y),
				xToFind: xToFind,
				answer: answer,
				type: type
			})
		});
    console.log(res);
	}

	useEffect(() => {
		writeRecord();
	}, [answer]);

  async function fetchSolution() {
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const res = await fetch(
			'http://localhost:3000/api/regression/get?' +
				new URLSearchParams({
					id: id
				}).toString(),
			{
				method: 'GET'
			}
		);

		const json = await res.json();
		const data = json.data[0];

		return data;
	}

  useEffect(() => {
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const setResourceData = async () => {

			const data = await fetchSolution();
      let answer = data.answer;
      let xToFind = data.xToFind;

      setAnswer(answer);
      setXToFind(xToFind);

			// setInputData({structureDataFetch, target, 0});
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="my-8 text-center text-3xl font-bold">Multiple Linear Regression</h1>
      <Input setInputData={setInputData}/>
      <ShowSolution answer={[answer]}
                    multiX={xToFind}/>
    </div>
  )
}

