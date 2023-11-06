import Graph from '@/components/interpolation/graph';
import Input from '../../components/interpolation/input';
import ShowSolution from '@/components/interpolation/show-solution';
import { useEffect, useRef, useState } from 'react';
import Data from '@/class/interpolation/Data';
import Interpolation from '../../class/interpolation/Interpolation';
import Point from '../../class/interpolation/Point';

type InputData = {
	data: Data[];
	target: number;
};

export default function Page() {
	const [answer, setAnswer] = useState<number>(NaN);
	const [inputData, setInputData] = useState<InputData>({ data: [], target: 0 });
	const [givenData, setGivenData] = useState<Data[]>([]);
	const [graph, setGraph] = useState<Point[]>([]);
	const [xToFind, setXToFind] = useState<number>(0);

	function calculateGraph(answerOfC: number[]) {
		if (givenData.length === 0) return [];

		const setOfx = givenData.map((data) => data.point.x[0]);

		let calStep = Math.floor(
			Math.log(Math.abs(setOfx[0] - setOfx[setOfx.length - 1])) / Math.log(10)
		);
		calStep = Math.pow(10, calStep - 1);

		let coordinate: Point[] = [];
		for (
			let x = givenData[0].point.x[0], i = 0;
			x <= givenData[givenData.length - 1].point.x[0] && i < 10000;
			i++, x += calStep
		) {
			let sum = answerOfC[0];

			for (let i = 1; i < answerOfC.length; i++) {
				let currentSumThisTerm = 1;
				let coefficient = answerOfC[i];

				for (let j = 0; j < i; j++) {
					currentSumThisTerm *= x - givenData[j].point.x[0];
					// console.log( `${coefficient} * (${xToFind} - ${ givenData[j].x })` );
				}
				sum += currentSumThisTerm * coefficient;
			}

			coordinate.push(new Point([x], sum));
		}

		console.log(coordinate);
		return coordinate;
	}

	async function createRecord() {
		const type = new URLSearchParams(window.location.search).get('type');

		if (type === null) return;

		const res = await fetch('http://localhost:3000/api/interpolation/add', {
			method: 'POST',
			body: JSON.stringify({
				numberOfPoint: givenData.length,
				x: givenData.map((data) => data.point.x[0]),
				y: givenData.map((data) => data.point.y),
				xToFind: xToFind,
				answer: answer,
				data: givenData,
				target: xToFind,
				graph: graph,
				type: type
			})
		});
	}

	useEffect(() => {
		const x = givenData.map((data) => data.point.x[0]);
		const y = givenData.map((data) => data.point.y);
		const { sum, answerOfC: c } = Interpolation.newtonDividedDifference(x, y, xToFind);
		setAnswer(sum);
		setGraph(calculateGraph(c));
	}, [givenData]);

	const count = useRef(0);

	useEffect(() => {
		if (
			(count.current > 1 && process.env.NODE_ENV === 'development') ||
			(count.current > 0 && process.env.NODE_ENV === 'production')
		) {
			const { data, target: x } = inputData;
			setGivenData(inputData.data);
			setXToFind(inputData.target);
		}
		count.current++;
	}, [inputData]);

	useEffect(() => {
		if (Number.isNaN(answer)) return;
		createRecord();
	}, [answer]);

	async function fetchSolution() {
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const res = await fetch(
			'http://localhost:3000/api/interpolation/get?' +
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
		const setResourceData = async () => {
			const id = new URLSearchParams(window.location.search).get('id');
			if (id === null) return;

			const data = await fetchSolution();
			let x = data.x;
			let y = data.y;
			let answer = data.answer;
			let graph = data.graph;
			let numPoint = data.numberOfPoint;
			let target = data.xToFind;

			setGraph(graph);
			setAnswer(answer);
			setXToFind(target);
			let structureDataFetch = Array.from(
				{ length: numPoint },
				(_, idx) => new Data(false, new Point([x[idx]], y[idx]))
			);

			setGivenData(structureDataFetch);
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

	return (
		<div className="flex flex-col items-center gap-6">
			<h1 className="my-8 text-center text-3xl font-bold">Newton Divided Difference</h1>
			<Input setInputData={setInputData} />
			<ShowSolution answer={[answer]} xToFind={xToFind} />
			<Graph
				graph={graph}
				points={givenData.map((row) => row.point)}
				answerPoint={new Point([xToFind], answer)}
			/>
		</div>
	);
}
