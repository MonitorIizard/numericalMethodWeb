import Column from '../../types/Column';
import {evaluate, isUndefined, log} from 'mathjs';
import Modal from '@/components/ui/Modal'
import { useEffect, useRef, useState } from 'react';
import Point from '@/class/interpolation/Point';
import HistoryIcon from '@mui/icons-material/History';
import Graph from '@/components/interpolation/graph';
import Input from '@/components/root-of-equation/Input'
import ShowSolution from '@/components/ui/ShowSolution';
import Secant from '../../class/root-of-equation/Secant';
import History from '@/components/root-of-equation/history';
import StickyHeadTable from "./../../components/ui/dataTable";
import InputData from '../../class/root-of-equation/InputData';
import SetOfResult from '../../class/root-of-equation/SetOfResult';
import RootOfEquation from '../../class/root-of-equation/RootOfEquation';

type Props = {
  closeEndSolver?: RootOfEquation;
  openEndSolver?: RootOfEquation;
	secantSolver?: Secant;
}

function Page({closeEndSolver, openEndSolver, secantSolver } : Props) {
	const [y , setY] = useState(0);
	let solver : Secant | RootOfEquation;
	const [open, setOpen] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const [graph, setGraph] = useState<Point[]>([]);
	const [answer, setAnswer] = useState<number>(NaN);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [inputData, setInputData] = useState<InputData>( InputData.createInputData('', 0, 0, 0));
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const [id, setId] = useState<string | null>(null);
	

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

	async function createRecord(){
			const response = await fetch('/api/root-of-equation/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"equation" : inputData.equation,
														  "x_start" : JSON.stringify([inputData.xstart]),
															"x_end" : inputData.xend,
															"tolerance" : inputData.errorTol,
															"graph" : JSON.stringify(graph),
															"answer" : answer,
															"result" : JSON.stringify(result),
															"type" : solver.constructor.name,
															"isOpenMethod" : openEndSolver ? true : false,
														 })
			})
	}
	
	useEffect(() => {
		if (inputData.equation === '') {
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

		console.log(inputData);
	}, [inputData]);

	useEffect(() => { 
		if (result.length == 0 || inputData.equation === '') {
			return;
		}

		createRecord();
	}
	,[result, answer, graph]);

	async function getRecord() {
		const queryParameters = new URLSearchParams(window.location.search);
		const id = queryParameters.get('id');

		if ( id !== null ) {
			const res = await fetch('/api/root-of-equation/get?' + new URLSearchParams({
				id : id!
			}).toString(), {
				method : "GET",
			})
	
			const json = await res.json();
			const data = json.data[0];
			setGraph( data.graph );
			setResult( data.result );
			setAnswer( data.answer );
			
			try {
				setY( evaluate(data.equation, {x : data.answer}) );
			} catch(e) {
				setY( NaN );
			}
	}
}

	useEffect(() => {
			getRecord();
			setIsShow(true);
	}, [id])

	useEffect(() => {
		const queryParameters = new URLSearchParams(window.location.search);
		const id = queryParameters.get('id');
		setId(id);
	})

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl items-center relative">
			<div className=' absolute right-10 top-10 -translate-y-1/2 cursor-pointer' onClick={() => setIsHistoryOpen((prev)=> !prev)}>
				<HistoryIcon className='fill-black'/>
			</div>

			<Input setInputData={setInputData} isXtoEnd={!isUndefined(closeEndSolver)} isSecantMethod={!isUndefined(secantSolver)}/>

			{ isShow &&
			<>
			<StickyHeadTable result={result} attributes={columns} />

			<div className='w-full'>
				<ShowSolution answer={answer} isSolution={!(result.length === 1000)}/>
			</div>

			<Graph graph={graph} answerPoint={new Point([answer], solver!.f(answer) || y)}/>
			</>
			}

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>

			<History isOpen={isHistoryOpen}
							 setOpen={setIsHistoryOpen}/>
			
		</div>
	);
}

export default Page;
