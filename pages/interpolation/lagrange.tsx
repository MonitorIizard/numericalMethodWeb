import Data from '../../class/interpolation/Data';
import Interpolation from '../../class/interpolation/Interpolation';
import { useEffect, useRef, useState } from 'react';
import Graph from '@/components/interpolation/graph';
import Input from '@/components/interpolation/input';
import ShowSolution from '@/components/interpolation/show-solution';
import { number } from 'mathjs';
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
	const [step, setStep] = useState<number>(0);

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
          // find L for each x
          let l = 1;
          for( let k = 0; k < n; k++ ) {
            if (k == i) continue;
            l *= (j - setOfx[k]) / (setOfx[i] - setOfx[k]);
                    //console.log(`j${j} - ${setOfx[k]} / ${setOfx[i]} - ${setOfx[k]}`)
          }
          // console.log(`setOfy[i] = ${setOfy[i]}`)
          // console.log(`l = ${l}`)
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
