import { useEffect, useRef, useState } from 'react';
import SetOfResult from '../Class/SetOfResult';
import ShowSolution from '@/components/ui/ShowSolution';
import Column from '../Class/Column';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { evaluate, range } from 'mathjs';
import { InlineMath, BlockMath } from 'react-katex';
import { Button, Card, TextField } from '@mui/material';
import StickyHeadTable from '@/components/ui/DataTable';
import PlotGraph from '@/pages/Graph';
import Modal from '@/components/ui/Modal'
import RootOfEquation from '../Class/RootOfEquation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

class FalsePositionMethod extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; xEnd: number; es: number; equation: string }) {
		super(props.xStart, props.xEnd, props.es);
		this.fx = props.equation;
	}

	f(x: number) {
		return evaluate(this.fx, {x});
		// return x - 5;
	}

	findX1(xl: number, xr: number) {
		return (xl * this.f(xr) - xr * this.f(xl)) / (this.f(xr) - this.f(xl));
	}

	solve() {
		let result : SetOfResult[] = [];
		let x1;
		let iteration = 0;
		let xl = this.xStart;
		let xr = this.xEnd;
		let es = this.es;
		let xOld = xl;

		while (true && iteration < 1000) {
			x1 = this.findX1(xl, xr);

			if (this.f(xl) * this.f(x1) <= 0) {
				xr = x1;
			} else {
				xl = x1;
			}
			
			let tol = Math.abs((xOld - x1) / x1) * 100;

			result.push( new SetOfResult(iteration, x1, tol));
			
			if (tol < es || this.f(x1) == 0) {
				break;
			}

			xOld = x1;
			iteration++;
			console.log(x1 + ' ' + tol + ' ' + es);
			console.log(xOld + ' ' + x1 + ' ' + this.f(xOld) + ' ' + this.f(x1));
		}

		return result;
	}

	setXstart( xStart : number ) {
		this.xStart = xStart;
	}

	setXend( xEnd : number ) {
		this.xEnd = xEnd;
	}

	setEquation( equation : string ) {
		this.fx = equation;
	}

	setES( es : number ) {
		this.es = es;
	}
}

function page() {
	const [showEquation, setShowEquation] = useState<string>(' ');
	const [equation, setEquation] = useState<string>(' ');
	const [xStart, setxStart] = useState<number>(0);
	const [xEnd, setxEnd] = useState<number>(0);
	const [errorTol, setErrorTol] = useState<number>(0);
	const [answer, setAnswer] = useState<number>(0);
	const [point, setPoint] = useState<{x : number, y : number}>({x : 0, y : 0});
	const [domain, setDomain] = useState<number[]>([-11, 11]);
	const [range, setRange] = useState<number[]>([-11, 11]);
	const [step, setStep] = useState<number>(1);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [open, setOpen] = useState(false);
	const [modalContent, setModalContent] = useState<{ header: string; description: string }>({
		header: 'header',
		description: 'description'
	});
	const [viewBox, setViewBox] = useState<number[]>([-11, 11]);

	const columns: Column[] = [
		{ id: 'iterationNo', label: 'Iteration No.' },
		{ id: 'root', label: 'Root' },
		{ id: 'tolerance', label: 'Tolerance' }
	];

	const isEquationCalculable = (equation : string) => {
		let testValue = 5;
		try {
			evaluate(equation, { x: testValue });
		} catch (error) {
			return false;
		}
		return true;
	};

	const falsePositionSolver = new FalsePositionMethod(
		{
			xStart : xStart,
			xEnd : xEnd,
			es : errorTol,
			equation : equation
		});

	function eventHandler(e: any) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const inputEquation = formJson.functionInput.toString();
		const inputxStart = formJson.Xstart;
		const inputxEnd = formJson.Xend;
		const inputErrorTol = formJson.errorTol;

		if (!isEquationCalculable(inputEquation)) {
			setOpen(true);
			setModalContent({
				header: 'Your equation is uncalculable 😡.',
				description: 'Please input new equation'
			});
			return;
		}

		if (Number.isNaN(+inputxStart) || Number.isNaN(+inputxEnd)) {
			// console.log(Number.isNaN(+inputxEnd));
			setOpen(true);
			setModalContent({
				header: 'X start or X end is not a number 😡.',
				description: 'Please input new X start or X end'
			});
			return;
		}

		if (+inputxEnd < +inputxStart) {
			setOpen(true);
			setModalContent({
				header: 'X start is Greater than X end 😡.',
				description: 'Please input new X start or X end \n X start must <= X end'
			});
			return;
		}

		if (Number.isNaN(+inputErrorTol)) {
			setOpen(true);
			setModalContent({
				header: 'Tolerance is not number 😡.',
				description: 'Please input tolerance in number.'
			});
			return;
		}

		if (+inputErrorTol < 0) {
			setOpen(true);
			setModalContent({
				header: 'Tolerance must greate than 0 😡.',
				description: 'Please input new tolerance.'
			});
			return;
		}

		setEquation(inputEquation);
		setxStart(+inputxStart);
		setxEnd(+inputxEnd);
		setErrorTol(+inputErrorTol);

	}

	const zoomIn = () => {
		console.log("step zoom in");
		console.log(viewBox);
		if ( Math.floor(viewBox[0]) < -1 && Math.floor(viewBox[1]) > 1 )
			setViewBox([viewBox[0] / 10, viewBox[1] / 10]);
		if ( step <= 1) {
			return;
		}
		console.log("decrease step");
		setStep( step / 10 );
	}

	const zoomOut = () => {
		console.log("step zoom out");
		console.log(viewBox);
		if ( Math.floor(viewBox[0]) > -1000 && Math.floor(viewBox[1]) < 1000 )
			setViewBox([viewBox[0] * 10, viewBox[1] * 10]);
		if ( step >= 1000) {
			return;
		}
		console.log("increase step");
		setStep( step * 10 );
	}	

	const count = useRef(0);
	useEffect(() => {
		if ( count.current > 1 && process.env.NODE_ENV === "development" ||
		count.current > 0 && process.env.NODE_ENV === "production") {
			falsePositionSolver.setXstart(xStart);
			falsePositionSolver.setXend(xEnd);
			falsePositionSolver.setEquation(equation);
			
			let records = falsePositionSolver.solve();
			let answer = records[records.length - 1].root;
			setAnswer(answer);

			setPoint({x : answer, y : falsePositionSolver.f(answer)})
			setResult(records);

			let step = Math.ceil((xEnd - xStart) / 10);

			if ( step < 0.1 ) {
				step = 1;
			} else if ( step > 1000 ) {
				step = 1000;
			}

			setDomain([xStart, xEnd]);
			setRange([xStart, xEnd]);
			setViewBox([xStart - step, xEnd + step]);
			setStep(step);

			console.log("use effect work");
		}
		count.current++;
	}, [equation, xStart, xEnd, errorTol]) 

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl">
			<div className="h-full w-full">
				<h1 className="my-8 text-center text-3xl font-bold text-black">False Position Method</h1>
				<Card variant="outlined" className=" p-8">
					<InlineMath math={`f(x) = ${showEquation}`} />
				</Card>
				<Card variant="outlined" className=" p-8">
					<div>
						<form
							className="flex flex-wrap  gap-2"
							action=""
							onSubmit={(e) => {
								eventHandler(e);
							}}
						>
							<TextField
								id="outlined-basic"
								label="f(x) = "
								variant="outlined"
								name="functionInput"
								fullWidth
								size="medium"
								onChange={(e) => {
									setShowEquation(e.currentTarget.value);
								}}
								required
							/>
							<div className="flex w-full gap-2">
								<TextField
									id="outlined-basic"
									label="X start"
									variant="outlined"
									name="Xstart"
									fullWidth
									required
								/>
								<TextField
									id="outlined-basic"
									label="X end"
									variant="outlined"
									name="Xend"
									fullWidth
									required
								/>
							</div>
							<TextField
								id="outlined-basic"
								label="Tolerance"
								variant="outlined"
								name="errorTol"
								fullWidth
								required
							/>
							<Button
								variant="contained"
								type="submit"
								className="mx-auto mt-4 w-1/2 bg-black"
								startIcon={<CalculateRoundedIcon />}
								size="large"
							>
								Calculate 😉
							</Button>
						</form>
					</div>
				</Card>
			</div>

			<StickyHeadTable result={result} attributes={columns} />
	
			<Card className='text-black'>
				<BlockMath>{`\\begin{align}
											Dr \\in [ ${domain[0] +step}, ${domain[1] - step}] \\\\
											Rr \\in [ ${range[0] + step}, ${range[1] - step}]
										\\end{align}`}</BlockMath>
			</Card>

			<ShowSolution answer={answer}/>

			<div className='relative'>
					<PlotGraph equation={[equation]} step={step} domain={viewBox} range={viewBox} point={point} />
					{/* <div className=' absolute top-5 right-5 flex gap-2'>
						<Button className="bg-white hover:bg-green-100" onClick={zoomIn} variant="contained"><AddIcon className='fill-black'/></Button>
						<Button className="bg-white hover:bg-green-100" onClick={zoomOut} variant="contained"><RemoveIcon className='fill-black'/></Button>
					</div> */}
			</div>

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>
		</div>
	);
}

export default page;
