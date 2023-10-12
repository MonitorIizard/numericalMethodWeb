import RootOfEquation from '../Class/RootOfEquation';
import { Button } from '@mui/material';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ConstructorInterface {
	xStart: number;
	tolerance: number;
	fx: string;
}

interface MethodSolveParameter {
	setNumberOfIteration: (value: number) => void;
	setAnswer: (value: string[]) => void;
}

class OnePointIteration extends RootOfEquation {
	fx: string;

	constructor({ xStart, tolerance, fx }: ConstructorInterface) {
		super(xStart, 0, tolerance);
		this.fx = fx;
	}

	f(x: number): any {
		try {
			return eval(this.fx);
			// return x-5;
		} catch (error) {
			console.error(error);
		}

		// return eval(this.fx);
	}

	solve({ setNumberOfIteration, setAnswer }: MethodSolveParameter): void {
		let xNew;
		let i = 0;
		let answer = [];
		let xOld = this.xStart;
		let es = this.tolerance;

		while (i < 10000) {
			xNew = this.f(xOld);
			let tol = Math.abs((xNew - xOld) / xNew) * 100;
			xOld = xNew;

			if (tol < es) {
				answer.push(xNew.toString());
				setAnswer(answer);
				setNumberOfIteration(i);
				return;
			}

			i++;
		}
		answer.push("Root of this equation can't find with this method");
		setAnswer(answer);
	}
}

function page() {
	let onePointIterationMethod;
	const [xStart, setxStart] = useState<number>(0);
	const [equation, setEquation] = useState<string>(' ');
	const [tolerance, setTolerance] = useState<number>(0);
	const [answer, setAnswer] = useState<string[]>(['wait for calculate']);
	const [numberOfIteration, setNumberOfIteration] = useState<number>(0);
	const [open, setOpen] = useState(true);

	const handleClose = () => setOpen(false);

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

	function eventHandler(e: any) {
		e.preventDefault();

		onePointIterationMethod = new OnePointIteration({
			xStart: xStart,
			tolerance: tolerance,
			fx: equation
		});

		onePointIterationMethod.solve({ setNumberOfIteration, setAnswer });
	}

	return (
		<div
			className="w-scree h-screen  bg-green-100
                   text-black"
		>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
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
							You need to reform the equation in form x = f(x) <br />{' '}
							<span className="font-black">Example</span> <br />
							You want to find root of this equation (((5 + x) / 2) - x) = 0 <br />
							You need to reform equation to (5 + x) / 2 = x
						</Typography>
						<div
							className="flex w-full
                              justify-center pt-4"
						>
							<Button
								onClick={handleClose}
								className="bg-green-600 text-white
                                    hover:bg-green-300"
							>
								Understood
							</Button>
						</div>
					</Box>
				</Modal>
			</div>

			<h1 className="text-center text-3xl font-bold">One Point Iteration</h1>

			<div className=" flex justify-center">
				<form action="" onSubmit={eventHandler}>
					<div className="w-full">
						<label htmlFor=""> x = </label>
						<input
							className="w-80"
							type="text"
							name="fx"
							onInput={(e) => setEquation(e.currentTarget.value)}
						/>
					</div>

					<div className="">
						<label htmlFor="">x start </label>
						<input
							type="text"
							className="w-8"
							name="xStart"
							onInput={(e) => setxStart(Number(e.currentTarget.value))}
						/>
					</div>

					<div>
						<label htmlFor="">Tolerance = </label>
						<input
							type="text"
							name="tolerance"
							onInput={(e) => setTolerance(Number(e.currentTarget.value))}
						/>
					</div>

					<Button
						variant="contained"
						type="submit"
						className="bg-black"
						startIcon={<CalculateRoundedIcon />}
					>
						Calculate 😉
					</Button>
				</form>
			</div>

			<p className="text-center">
				{' '}
				x ={' '}
				{answer.map((element, index) => {
					if (index == answer.length - 1) return `${element}`;
					return `${element}, `;
				})}
			</p>

			<p className="text-center">number of iteration is {numberOfIteration}</p>
		</div>
	);
}

export default page;
