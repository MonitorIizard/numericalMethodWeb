import { useEffect, useState } from 'react';
import SetOfResult from './Class/SetOfResult';
import ShowSolution from '@/components/ui/ShowSolution';
import Column from './Class/Column';
import {log} from 'mathjs';
import Graph from '@/components/interpolation-ui/graph';
import StickyHeadTable from "./../../components/ui/dataTable";
import Modal from '@/components/ui/Modal'
import Input from '@/components/root-of-equa-ui/Input'
import InputData from './Class/InputData';
import Point from '@/pages/interpolation/class/Point';
import { Result } from 'postcss';
import RootOfEquation from './Class/RootOfEquation';

type Props = {
  closeEndSolver?: (InputData: InputData) => Result;
  openEndSolver?: (InputData: InputData) => Result;
  solver: RootOfEquation;
}

function Page({closeEndSolver, openEndSolver, solver} : Props) {
	const [answer, setAnswer] = useState<number>(0);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [graph, setGraph] = useState<Point[]>([]);
	const [open, setOpen] = useState(false);
	const [inputData, setInputData] = useState<InputData>( InputData.createInputData('', 0, 0, 0));
	const [isShow, setIsShow] = useState(false);

	const [modalContent, setModalContent] = useState<{ header: string; description: string }>({
		header: 'header',
		description: 'description'
	});
	const columns: Column[] = [
		{ id: 'iterationNo', label: 'Iteration No.' },
		{ id: 'root', label: 'Root' },
		{ id: 'tolerance', label: 'Tolerance' }
	];

	useEffect(() => {
		if (inputData.equation === '') {
			console.log('return');
			return;
		}

    solver.setNewValue(inputData);

		let resultOfSolve = solver.solve();
		setResult(resultOfSolve);

		let answer = resultOfSolve[resultOfSolve.length - 1].root;
		setAnswer(answer);

		setGraph(() => {
			const next : Point[] = [];
			const xstart = inputData.xstart;
			const xend = inputData.xend!;	
			const step = Math.pow(10, Math.floor(log(Math.abs(xend - xstart)) / log(10)) - 1);
			for ( let i = xstart; i <= xend; i += step ) {
				next.push(new Point([i], solver.f(i)));
			}

			return next;
		})
		
		setIsShow(true);

	}, [inputData]);

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl items-center">
				<h1 className="my-8 text-center text-3xl font-bold text-black">Graphical Method</h1>

			<Input setInputData={setInputData}/>

			{ isShow &&
			<>
			<StickyHeadTable result={result} attributes={columns} />

			<div className='w-full'>
				<ShowSolution answer={answer}/>
			</div>

			<Graph graph={graph} answerPoint={new Point([answer], solver.f(answer))}/>
			</>
			}

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>
		</div>
	);
}

export default Page;
