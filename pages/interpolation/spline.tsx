import Input from '@/components/interpolation/input';
import ShowSolution from '@/components/interpolation/show-solution';
import Graph from '@/components/interpolation/graph';
import { useEffect, useRef, useState } from 'react';
import Data from '../../class/interpolation/Data';
import Point from '../../class/interpolation/Point';
import { Button, Card } from '@mui/material';
import Interpolation from '../../class/interpolation/Interpolation';
import { NextLinkComposed } from '../../src/Link';

type InputData = {
	data: Data[];
	target: number;
};

export default function Page() {
	const [answer, setAnswer] = useState<number>(NaN);
	const [inputData, setInputData] = useState<InputData>({ data: [], target: 0 });
	const [givenData, setGivenData] = useState<Point[]>([]);
	const [graph, setGraph] = useState<Point[]>([]);
	const [xToFind, setXToFind] = useState<number>(0);
	const [method, setMethod] = useState<number>(-1);
	const methodMenu = ['Linear', 'Quadratic', 'Cubric'];
	const pathName = useRef<string[]>([]);

	useEffect(() => {
		let data = inputData.data.map((element) => element.point);
		setGivenData(data);
		setXToFind(inputData.target);
	}, [inputData]);

	useEffect(() => {
		// console.log( givenData.length );

		if (givenData.length <= 1) return;

		let setOfx = givenData.map((row) => row.x[0]);
		let setOfy = givenData.map((row) => row.y);
		let step = Math.floor(Math.log(Math.abs(setOfx[0] - setOfx[setOfx.length - 1])) / Math.log(10));
		step = Math.pow(10, step - 1);

		if (method == 0) {
			setAnswer(Interpolation.linearSpline(setOfx, setOfy, xToFind));
			setGraph(() => {
				let next: Point[] = [];
				for (let i = 0; i < setOfx.length; i++) {
					next.push(new Point([setOfx[i]], setOfy[i]));
				}
				return next;
			});
		}

		if (method == 1) {
			let { answer, matrixX } = Interpolation.quadraticSpline(setOfx, setOfy, xToFind);
			setAnswer(answer);
			setGraph(() => {
				let next: Point[] = [];
				let answer;
				let i;

				let matrixX2: number[][] = [];
				for (let i = 0, j = 0; i < matrixX.length; ) {
					if (i < 2) {
						matrixX2.push([]);
						matrixX2[j].push(matrixX[0]);
						matrixX2[j].push(matrixX[1]);
						j++;
						i += 2;
					}

					if (i >= 2) {
						matrixX2.push([]);
						matrixX2[j].push(matrixX[i]);
						matrixX2[j].push(matrixX[i + 1]);
						matrixX2[j].push(matrixX[i + 2]);
						// console.log(i);
						j++;
						i += 3;
					}
				}

				for (let xtf = setOfx[0]; xtf <= setOfx[setOfx.length - 1]; xtf += 0.1) {
					if (setOfx.length == 2) {
						let b = (setOfy[1] - setOfy[0]) / (setOfx[1] - setOfx[0]);
						answer = b * (xtf - setOfx[0]) + setOfy[0];
						next.push(new Point([xtf], answer!));
						continue;
					}
					// console.log( xtf );
					for (i = 1; i < setOfx.length; i++) {
						if (xtf < setOfx[i] && i <= 1) {
							let Bx = matrixX[0] * xtf;
							let C = matrixX[1];
							// console.log(`Bx = ${Bx} C = ${C}`);
							answer = Bx + C;
							next.push(new Point([xtf], answer!));
							break;
						}

						if (xtf < setOfx[i] && i >= 2) {
							let Ax2 = matrixX2[i - 1][0] * Math.pow(xtf, 2);
							let Bx = matrixX2[i - 1][1] * xtf;
							let C = matrixX2[i - 1][2];
							answer = Ax2 + Bx + C;
							next.push(new Point([xtf], answer!));
							break;
						}
					}
				}

				// console.log(next);
				return next;
			});
		}

		if (method === 2) {
			let { answer, matrixX } = Interpolation.cubricSpline(setOfx, setOfy, xToFind);
			setAnswer(answer);
			setGraph(() => {
				let n = setOfx.length - 1;
				let next = [];

				for (let x = givenData[0].x[0]; x <= givenData[givenData.length - 1].x[0]; x += step) {
					let answer = 0;
					for (let i = 0; i < n; i++) {
						const a = matrixX[4 * i];
						const b = matrixX[4 * i + 1];
						const c = matrixX[4 * i + 2];
						const d = matrixX[4 * i + 3];
						if (x <= setOfx[i + 1]) {
							answer = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
							next.push(new Point([x], answer));
							break;
						}
					}
				}
				return next;
			});
		}
	}, [givenData, xToFind]);

	async function writeRecord() {
		const type = new URLSearchParams(window.location.search).get('type');

		if (isNaN(answer)) return;

		const res = await fetch('/api/interpolation/add', {
			method: 'POST',
			body: JSON.stringify({
				numberOfPoint: givenData.length,
				x: givenData.map((point) => point.x[0]),
				y: givenData.map((point) => point.y),
				xToFind: Number(xToFind),
				answer: answer,
				graph: graph,
				type: type
			})
		});
	}

	useEffect(() => {
		writeRecord();
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
				(_, idx) => new Point([x[idx]], y[idx])
			);

			setGivenData(structureDataFetch);
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

	return (
		<div className="flex flex-col items-center gap-6">
			<h1 className="my-8 text-center text-3xl font-bold">Spline</h1>
			<div className="flex flex-col items-center">
				<Card className="flex w-11/12 max-w-xl">
					{methodMenu.map((methodName, index) => (
						<Button
							key={methodName}
							size="large"
							variant="contained"
							component={NextLinkComposed}
							to={{
								pathname: `${
									typeof location === 'undefined'
										? 'http://localhost:3000/interpolation/spline'
										: location.protocol + '//' + location.host + location.pathname
								}`,
								query: {
									type: methodName + 'Spline'
								}
							}}
							className={`m-1 h-16 w-1/3 text-black ${
								method == index ? 'bg-green-400 hover:bg-green-300' : 'hover:bg-green-300'
							}`}
							onClick={() => setMethod(index)}
						>
							{methodName}
						</Button>
					))}
				</Card>
				<Input setInputData={setInputData} />
			</div>
			<ShowSolution answer={[answer]} xToFind={xToFind} />
			<Graph
				graph={graph}
				points={givenData.map((row) => row)}
				answerPoint={new Point([xToFind], answer)}
			/>
		</div>
	);
}
