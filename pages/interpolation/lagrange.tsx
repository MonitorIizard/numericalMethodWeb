import Data from '../../class/interpolation/Data';
import Interpolation from '../../class/interpolation/Interpolation';
import { useEffect, useRef, useState } from 'react';
import Graph from '@/components/interpolation/graph';
import Input from '@/components/interpolation/input';
import ShowSolution from '@/components/interpolation/show-solution';
import Point from '../../class/interpolation/Point';

type InputData = {
	data: Data[];
	target: number;
};

export default function Page() {
	const [answer, setAnswer] = useState<number>(0);
	const [inputData, setInputData] = useState<InputData>({ data: [], target: 0 });
	const [givenData, setGivenData] = useState<Point[]>([]);
	const [graph, setGraph] = useState<Point[]>([]);
	const [largrangGraph, setLargrangGraph] = useState<Point[][]>([]);
	const [xToFind, setXToFind] = useState<number>(0);

	function calculateGraph() {
		if (givenData.length === 0) {
			return [];
		}
		setGraph((prev) => {
			let next = [];
			const setOfx = givenData.map((data) => data.x[0]);
			const setOfy = givenData.map((data) => data.y);

			let calStep = Math.floor(
				Math.log(givenData[givenData.length - 1].x[0] - givenData[0].x[0]) / Math.log(10)
			);
			calStep = Math.pow(10, calStep - 1);

			for (
				let x = givenData[0].x[0], i = 0;
				x <= givenData[givenData.length - 1].x[0] && i < 10000;
				i++, x += calStep
			) {
				const y = Interpolation.largrange(setOfx, setOfy, x).fx;
				next.push(new Point([x], y));
			}

			return next;
		});
	}

	function calCoorToDrawLargrange() {
		if (givenData.length <= 1) return;

		setLargrangGraph((prev) => {
			let next : Point[][] = [];
			let setOfx = givenData.map((data) => data.x[0]);
			let setOfy = givenData.map((data) => data.y);
			let calStep = Math.floor(
				Math.log(givenData[givenData.length - 1].x[0] - givenData[0].x[0]) / Math.log(10)
			);
			calStep = Math.pow(10, calStep - 1);
			// console.log( givenData );
			let n = givenData.length;
      for ( let i = 0; i < n; i++ ) {
        next.push([]);
      }

			// find each graph
			for (let i = 0; i < n; i++) {
				// find coordinate/
				for (
					let j = 0, o = 0;
					j <= setOfx[n - 1] && o < 10000;
					o++, j += calStep
				) {
          
          let fx = 0;
          let l = 1;
          for( let k = 0; k < n; k++ ) {
            if (k == i) continue;
            l *= (j - setOfx[k]) / (setOfx[i] - setOfx[k]);
          }
          fx += l * setOfy[i];
          const x = j;
					const y = fx;
					next[i].push(new Point([x], y));
				}
			}
			return next;
		});

	}

	useEffect(() => {
		const x = givenData.map((data) => data.x[0]);
		const y = givenData.map((data) => data.y);
		const { fx, Llist } = Interpolation.largrange(x, y, xToFind);
		setAnswer(fx);
		calculateGraph();
		calCoorToDrawLargrange();
	}, [givenData]);

	const count = useRef(0);

	useEffect(() => {
		if (
			(count.current > 1 && process.env.NODE_ENV === 'development') ||
			(count.current > 0 && process.env.NODE_ENV === 'production')
		) {
			const { data, target: x } = inputData;
			setGivenData(data.map((element) => element.point));
			setXToFind(x);
		}
		count.current++;
	}, [inputData]);

	async function createRecord() {
		const type = new URLSearchParams(window.location.search).get('type');

		if (type === null) return;

		const res = await fetch('http://localhost:3000/api/interpolation/add', {
			method: 'POST',
			body: JSON.stringify({
				numberOfPoint: givenData.length,
				x: givenData.map((data) => data.x[0]),
				y: givenData.map((data) => data.y),
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
				(_, idx) => new Point([x[idx]], y[idx])
			);

			setGivenData(structureDataFetch);
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

	// console.log(graph);
	return (
		<div className="flex flex-col items-center gap-6">
			<h1 className="my-8 text-center text-3xl font-bold">Largrange</h1>
			<Input setInputData={setInputData} />
			<ShowSolution answer={[answer]} xToFind={xToFind} />
			<div className="flex justify-center">
				<Graph
					graph={graph}
					points={givenData}
					answerPoint={new Point([xToFind], answer)}
					largrangGraph={largrangGraph}
				/>
			</div>
		</div>
	);
}
