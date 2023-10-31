import { useEffect, useState } from 'react';
import SetOfResult from '../Class/SetOfResult';
import ShowSolution from '@/components/ui/ShowSolution';
import Column from '../Class/Column';
import { evaluate, log} from 'mathjs';
import Graph from '@/components/interpolation-ui/graph';
import GraphicalMethod from '../Class/GraphicalMethod';
import StickyHeadTable from "../../../components/ui/dataTable";
import Modal from '@/components/ui/Modal'
import Input from '@/components/root-of-equa-ui/Input'
import InputData from '../Class/InputData';
import Point from '@/pages/interpolation/class/Point';
import { set } from 'nerdamer';

function Page() {
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

	const solver = new GraphicalMethod(inputData);

	const isEquationCalculable = (equation : string) => {
		let testValue = 5;
		try {
			evaluate(equation, { x: testValue });
		} catch (error) {
			return false;
		}
		return true;
	};

	// function eventHandler(e: any) {
	// 	e.preventDefault();

	// 	setOpen(false);

	// 	const form = e.target;
	// 	const formData = new FormData(form);
	// 	const formJson = Object.fromEntries(formData.entries());
	// 	const inputEquation = formJson.functionInput.toString();
	// 	const inputxStart = formJson.Xstart;
	// 	const inputxEnd = formJson.Xend;
	// 	const inputErrorTol = formJson.errorTol;

		// if (!isEquationCalculable(inputEquation)) {
		// 	setOpen(true);
		// 	setModalContent({
		// 		header: 'Your equation is uncalculable 😡.',
		// 		description: 'Please input new equation'
		// 	});
		// 	return;
		// }

		// if (Number.isNaN(+inputxStart) || Number.isNaN(+inputxEnd)) {
		// 	// console.log(Number.isNaN(+inputxEnd));
		// 	setOpen(true);
		// 	setModalContent({
		// 		header: 'X start or X end is not a number 😡.',
		// 		description: 'Please input new X start or X end'
		// 	});
		// 	return;
		// }

		// if (+inputxEnd < +inputxStart) {
		// 	console.log('test');
		// 	setOpen(true);
		// 	setModalContent({
		// 		header: 'X start is Greater than X end 😡.',
		// 		description: 'Please input new X start or X end \n X start must <= X end'
		// 	});
		// 	return;
		// }

		// if (Number.isNaN(+inputErrorTol)) {
		// 	setOpen(true);
		// 	setModalContent({
		// 		header: 'Tolerance is not number 😡.',
		// 		description: 'Please input tolerance in number.'
		// 	});
		// 	return;
		// }

		// if (+inputErrorTol < 0) {
		// 	setOpen(true);
		// 	setModalContent({
		// 		header: 'Tolerance must greate than 0 😡.',
		// 		description: 'Please input new tolerance.'
		// 	});
		// 	return;
		// }

	useEffect(() => {
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
		
	}, [inputData]);

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl">
				<h1 className="my-8 text-center text-3xl font-bold text-black">Graphical Method</h1>

			<Input setInputData={setInputData}/>

			{ isShow &&
			<>
			<StickyHeadTable result={result} attributes={columns} />

			<ShowSolution answer={answer}/>

			<Graph graph={graph} answerPoint={new Point([answer], solver.f(answer))}/>
			</>
			}

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>
		</div>
	);
}

export default Page;
