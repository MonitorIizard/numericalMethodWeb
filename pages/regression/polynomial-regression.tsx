import Graph from "@/components/interpolation/graph";
import Input from "../../components/regression/input"
import ShowSolution from "@/components/interpolation/show-solution"
import { useEffect, useRef, useState } from "react";
import Data from "@/class/interpolation/Data";
import Point from "../../class/regression/Point";
import Regression from "../../class/regression/Regression";

type InputData = {
  data : Data[];
  target : number;
  mOrder : number;
}

export default function Page() {
  const [answer, setAnswer] = useState<number>(0);
  const [inputData, setInputData] =  useState<InputData>({data : [], target : 0, mOrder : 2});
  const [givenData, setGivenData] = useState<Data[]>([]);
  const [graph, setGraph] = useState<Point[]>([]);
  const [mOrder, setMOrder] = useState<number>(2);
  const [xToFind, setXToFind] = useState<number>(0);

  useEffect(() => {

    const setOfx = givenData.map((data) => data.point.x[0]);
    const setOfy = givenData.map((data) => data.point.y);
    const setOfA = Regression.polynomialRegression(setOfx, setOfy, mOrder);
    const sum = setOfA.reduce((sum, a, i) => sum + a * Math.pow(xToFind, i), 0);

    let step = Math.floor(Math.log(Math.abs(setOfx[0] - setOfx[setOfx.length - 1])) / Math.log(10));
		step = Math.pow(10, step - 1);

    setAnswer(sum);
    setGraph(() => {
      const next : Point[] = [];
      for ( let x = setOfx[0]; x <= setOfx[setOfx.length - 1]; x += step ) {
        const y = setOfA.reduce((sum, a, i) => sum + a * Math.pow(x, i), 0);
        next.push(new Point([x], y));
      }
      return next;
    });
  }, [givenData, mOrder, xToFind]);

  const count = useRef(0);
  
  useEffect(() => {

    if ( inputData.data.length < mOrder + 1) return ;

    const {data, target : x, mOrder : mOrderInp} = inputData;
    setGivenData(data);
    setXToFind(x);
    setMOrder(mOrderInp);

  }, [inputData]);

  async function writeRecord() {
		const type = new URLSearchParams(window.location.search).get('type');

		if (isNaN(answer)) return;

		const res = await fetch('/api/regression/add', {
			method: 'POST',
			body: JSON.stringify({
				numberOfPoint: givenData.length,
				x: givenData.map((data) => data.point.x[0]),
				y: givenData.map((data) => data.point.y),
				xToFind: [Number(xToFind)],
				answer: answer,
				graph: graph,
        mOrder : mOrder,
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
      let x = data.x;
      let y = data.y;
      let numPoint = data.numberOfPoint;
      let graph = data.graph;
      let answer = data.answer;
      let xToFind = data.xToFind[0];

			let structureDataFetch = Array.from({length : numPoint}, (_, idx) => new Data(true, new Point([x[idx]], y[idx])) );

      setGraph(graph);
      setAnswer(answer);
      setMOrder(mOrder);
      setXToFind(xToFind);
      setGivenData(structureDataFetch);

			// setInputData({structureDataFetch, target, 0});
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="my-8 text-center text-3xl font-bold">Polynomial Regression</h1>
      <Input setInputData={setInputData} m={true}/>
      <ShowSolution answer={[answer]}
                    xToFind={xToFind}/>
      <Graph graph={graph} 
             points={givenData.map((row) => row.point)}
             answerPoint={new Point([xToFind], answer)}/>
    </div>
  )
}

