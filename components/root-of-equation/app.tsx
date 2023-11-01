import { useEffect, useState } from 'react';
import SetOfResult from '../../class/root-of-equation/SetOfResult';
import ShowSolution from '@/components/ui/ShowSolution';
import Column from '../../types/Column';
import {isUndefined, log} from 'mathjs';
import Graph from '@/components/interpolation/graph';
import StickyHeadTable from "../ui/dataTable";
import Modal from '@/components/ui/Modal'
import Input from '@/components/root-of-equation/Input'
import InputData from '../../class/root-of-equation/InputData';
import Point from '@/class/interpolation/Point';
import RootOfEquation from '../../class/root-of-equation/RootOfEquation';
import Secant from '../../class/root-of-equation/Secant';

type Props = {
  closeEndSolver?: RootOfEquation;
  openEndSolver?: RootOfEquation;
	secantSolver?: Secant;
}

function Page({closeEndSolver, openEndSolver, secantSolver } : Props) {
	const [answer, setAnswer] = useState<number>(0);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [graph, setGraph] = useState<Point[]>([]);
	const [open, setOpen] = useState(false);
	const [inputData, setInputData] = useState<InputData>( InputData.createInputData('', 0, 0, 0));
	const [isShow, setIsShow] = useState(false);
	let solver : Secant | RootOfEquation;

	if ( !closeEndSolver && !openEndSolver ) {
		solver  = secantSolver!;
	} else 
	{
		solver = closeEndSolver! || openEndSolver
	}

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

		if (solver instanceof Secant) {
			solver.setXstart2(inputData.xend!);
		}

    solver!.setNewValue(inputData);

		let resultOfSolve = solver!.solve();
		setResult(resultOfSolve);

		let answer = resultOfSolve[resultOfSolve.length - 1].root;
		setAnswer(answer);

		setGraph(() => {
			const next : Point[] = [];
			const xstart = inputData.xstart;
			let xend = inputData.xend!;

			if ( openEndSolver || secantSolver ) {
				xend = resultOfSolve[resultOfSolve.length - 1].root;
			}	

			const step = Math.pow(10, Math.floor(log(Math.abs(xend - xstart)) / log(10)) - 1);

			if ( xend < xstart && openEndSolver || secantSolver ) {
				for ( let i = xstart; i >= xend; i -= step ) {
					next.push(new Point([i], solver!.f(i)));
				}
			} else {
				for ( let i = xstart; i <= xend; i += step ) {
					next.push(new Point([i], solver!.f(i)));
				}
			}

			return next;
		})
		
		setIsShow(true);

	}, [inputData]);

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl items-center">

			<Input setInputData={setInputData} isXtoEnd={!isUndefined(closeEndSolver)} isSecantMethod={!isUndefined(secantSolver)}/>

			{ isShow &&
			<>
			<StickyHeadTable result={result} attributes={columns} />

			<div className='w-full'>
				<ShowSolution answer={answer} isSolution={!(result.length === 1000)}/>
			</div>

			<Graph graph={graph} answerPoint={new Point([answer], solver!.f(answer))}/>
			</>
			}

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>
		</div>
	);
}

export default Page;
