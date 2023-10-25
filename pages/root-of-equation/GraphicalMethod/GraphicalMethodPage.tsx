import { useState } from 'react';
import SetOfResult from '../Class/SetOfResult';
import ShowSolution from '@/components/ui/ShowSolution';
import GraphicalMethod from '../Class/GraphicalMethod';
import Column from '../Class/Column';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { evaluate, range } from 'mathjs';
import { InlineMath, BlockMath } from 'react-katex';
import { Button, Card, TextField } from '@mui/material';
import StickyHeadTable from '@/components/ui/DataTable';
import PlotGraph from '@/pages/Graph';
import Modal from '@/components/ui/Modal'

function Page() {
	const [showEquation, setShowEquation] = useState<string>(' ');
	const [equation, setEquation] = useState<string>(' ');
	const [xStart, setxStart] = useState<number>(0);
	const [xEnd, setxEnd] = useState<number>(0);
	const [errorTol, setErrorTol] = useState<number>(0);
	const [answer, setAnswer] = useState<number>(0);
	const [point, setPoint] = useState<{x : number, y : number}>({x : 0, y : 0});
	const [domain, setDomain] = useState<number[]>([10, 10]);
	const [range, setRange] = useState<number[]>([10, 10]);
	const [step, setStep] = useState<number>(1);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [open, setOpen] = useState(false);
	const [modalContent, setModalContent] = useState<{ header: string; description: string }>({
		header: 'header',
		description: 'description'
	});

	const columns: Column[] = [
		{ id: 'iterationNo', label: 'Iteration No.' },
		{ id: 'root', label: 'Root' },
		{ id: 'tolerance', label: 'Tolerance' }
	];

	let graphical1 = new GraphicalMethod({
		xStart: xStart,
		xEnd: xEnd,
		es: errorTol,
		fx: equation
	});

	const isEquationCalculable = (equation : string) => {
		let testValue = 5;
		try {
			evaluate(equation, { x: testValue });
		} catch (error) {
			return false;
		}
		return true;
	};

	function eventHandler(e: any) {
		e.preventDefault();

		setOpen(false);

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
			console.log('test');
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

		setResult([]);

		setEquation(inputEquation);
		setxStart(+inputxStart);
		setxEnd(+inputxEnd);
		setErrorTol(+inputErrorTol);

		setStep((xEnd - xStart) / 10);
		setDomain([xStart - step, xEnd + step]);
		setRange([xStart - step, xEnd + step]);

		graphical1 = new GraphicalMethod({
			xStart: xStart,
			xEnd: xEnd,
			es: errorTol,
			fx: equation
		});

		let resultOfSolve = graphical1.solve();
		setResult(resultOfSolve);

		let answer = resultOfSolve[resultOfSolve.length - 1].root;
		setAnswer(answer);
		setPoint({x : answer, y : graphical1.f(answer)});
	}

	return (
		<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl">
			<div className="h-full w-full">
				<h1 className="my-8 text-center text-3xl font-bold text-black">Graphical Method</h1>
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

			<PlotGraph equation={[equation]} step={step} domain={domain} range={range} point={point}/>

			<Modal open={open} setOpen={setOpen} modalContent={modalContent}/>
		</div>
	);
}

export default Page;
