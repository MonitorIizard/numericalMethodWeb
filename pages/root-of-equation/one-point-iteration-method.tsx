import OnePointIteration from './Class/OnePointIteration';
import { Button, Card, Modal, TextField } from '@mui/material';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlockMath, InlineMath } from 'react-katex';
import SetOfResult from './Class/SetOfResult';
import { evaluate } from 'mathjs';
import Column from './Class/Column';
import StickyHeadTable from '@/components/ui/dataTable';
import ShowSolution from '@/components/ui/ShowSolution';
import PlotGraph from '@/pages/Graph';
import ModalEdit from '@/components/ui/Modal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const columns: Column[] = [
	{ id: 'iterationNo', label: 'Iteration No.' },
	{ id: 'root', label: 'Root' },
	{ id: 'tolerance', label: 'Tolerance' }
];

function page() {
	const [showEquation, setShowEquation] = useState<string>(' ');
	const [openNotify, setOpenNotify] = useState<boolean>(true);
	const [equation, setEquation] = useState<string>(' ');
	const [xStart, setxStart] = useState<number>(0);
	const [errorTol, setErrorTol] = useState<number>(0);
	const [answer, setAnswer] = useState<number>(0);
	const [point, setPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [domain, setDomain] = useState<number[]>([-10, 10]);
	const [range, setRange] = useState<number[]>([-10, 10]);
	const [step, setStep] = useState<number>(1);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [open, setOpen] = useState(false);
	const [modalContent, setModalContent] = useState<{ header: string; description: string }>({
		header: 'header',
		description: 'description'
	});
	const [viewBox, setViewBox] = useState<number[]>([-10, 10]);

	let onePointIterationSolver = new OnePointIteration({
		xStart: 0,
		tolerance: 0,
		fx: ""
	});

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 500,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	};

	const isEquationCalculable = (equation:string) => {
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

		// setOpen(false);

		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const inputEquation = formJson.functionInput.toString();
		const inputxStart = formJson.Xstart;
		const inputErrorTol = formJson.errorTol;

    setxStart(+inputxStart);
		
		if (!isEquationCalculable(inputEquation)) {
			setOpen(true);
			setModalContent({
				header: 'Your equation is uncalculable 😡.',
				description: 'Please input new equation'
			});
			return;
		}

		if (Number.isNaN(+inputxStart)) {
			setOpen(true);
			setModalContent({
				header: 'X start is not a number 😡.',
				description: 'Please input new X start'
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
		setErrorTol(+inputErrorTol);
	}

	const zoomIn = () => {
		console.log( viewBox[0] );
		if ( viewBox[0] >= -10) {
			return;
		}
		setViewBox([viewBox[0] / 10, viewBox[1] / 10]);
		//console.log( viewBox[0], viewBox[1] );
	}

	const zoomOut = () => {
		if ( viewBox[0] <= -10000) {
			return;
		}
		setViewBox([viewBox[0] * 10, viewBox[1] * 10]);
	}

	const count = useRef(0);
	useEffect(() => {
    if ( count.current > 1 && process.env.NODE_ENV === "development" ||
				 count.current > 0 && process.env.NODE_ENV === "production") {
      onePointIterationSolver.setXstart(xStart);
		  onePointIterationSolver.setFx(equation);
		  onePointIterationSolver.setTolerance(errorTol);

		  let resultOfSolve = onePointIterationSolver.solve();
		  let answer = resultOfSolve[resultOfSolve.length - 1].root;
		  setResult(resultOfSolve);
		  // console.log(resultOfSolve);
		//setResult(resultOfSolve);
		  setAnswer(answer);
		  setPoint({x : answer, y : onePointIterationSolver.f(answer)});

			console.log( point, equation);

			setStep((1000) / 10);
			setDomain([-(1000 / 2), (1000/ 2)]);
			setViewBox([-(1000 / 2), (1000/ 2)]);
			setRange([-(1000 / 2), +(1000 / 2)]);
    }
    count.current++;
	}, [equation, errorTol, xStart])

	const count1 = useRef(0);
	useEffect(() => {
		if ( count1.current > 1 && process.env.NODE_ENV === "development" ||
				 count1.current > 0 && process.env.NODE_ENV === "production") {
			if ( step <= 1000 && step >= 0.01) 
				{
					setStep((Math.abs((viewBox[0] / 10))) ? (Math.abs((viewBox[0] / 10))) : 1000 / 10);
				}
			console.log(step);
		}
		count1.current++;
	}, [viewBox])

	// console.log(step);

	return (
		<div
			className="  bg-green-100
                   text-black"
		>
			<div>
				<Modal
					open={openNotify}
					onClose={(e) => setOpenNotify(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							className="text-1xl text-center font-bold text-black"
						>
							Before use one point iteration method
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black">
							You need to reform the equation in form <span>
								<InlineMath>{`x_{i+1} = f(x)`}</InlineMath>
							</span>  <br />
							<span className="font-black">Example</span> <br />
							You want to find root of this equation <br /><span className='text-center'> <BlockMath>(((5 + x) / 2) - x) = 0</BlockMath></span>
							You need to reform equation to <BlockMath>(5 + x) / 2 = x</BlockMath>
							<BlockMath>{`x_{i+1} = (5 + x) / 2`}</BlockMath>
						</Typography>
						<div
							className="flex w-full
                              justify-center pt-4"
						>
							<Button
								onClick={(e) => setOpenNotify(false)}
								className="bg-green-600 text-white
                                    hover:bg-green-300"
							>
								Understood
							</Button>
						</div>
					</Box>
				</Modal>
			</div>

			<h1 className="my-8 text-center text-3xl font-bold">One Point Iteration</h1>

			<div className="mx-auto flex w-11/12 max-w-xl flex-col gap-4 text-xl">
				<Card variant="outlined" className=" p-8">
					<InlineMath math={`x_{i+1} = ${showEquation}`} />
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
								label="x(i+1) = "
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
									label="Tolerance"
									variant="outlined"
									name="errorTol"
									fullWidth
									required
								/>
							</div>

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

				<StickyHeadTable result={result} attributes={columns} />

				<Card className="text-black">
					<BlockMath>{`\\begin{align}
									Dr \\in [ ${domain[0]}, ${domain[1]}] \\\\
									Rr \\in [ ${range[0]}, ${range[1]}]
								\\end{align}`}</BlockMath>
				</Card>

				<ShowSolution answer={answer} isSolution={answer <= -5000 || answer >= 5000 ? false : true} />

				<div className='relative'>
					<PlotGraph equation={[equation, "x"]} step={step} domain={viewBox} range={viewBox} point={point} />
					<div className=' absolute top-5 right-5 flex gap-2'>
						<Button className="bg-white hover:bg-green-100" onClick={zoomIn} variant="contained"><AddIcon className='fill-black'/></Button>
						<Button className="bg-white hover:bg-green-100" onClick={zoomOut} variant="contained"><RemoveIcon className='fill-black'/></Button>
					</div>
				</div>

				<ModalEdit open={open} setOpen={setOpen} modalContent={modalContent} />
			</div>
		</div>
	);
}

export default page;
