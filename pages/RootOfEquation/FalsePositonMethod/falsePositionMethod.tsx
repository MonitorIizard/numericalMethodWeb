import { useState } from 'react';
import { RootOfEquation, SetOfResult } from '../Class/RootOfEquation';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import exp from 'constants';
import Template from '../RootOfEquationTemplate';

class BisectionMethod extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; xEnd: number; tolerance: number; fx: string }) {
		super(props.xStart, props.xEnd, props.tolerance);
		this.fx = props.fx;
	}

	f(x: number) {
		return eval(this.fx);
		// return x - 5;
	}

	findX1(xl: number, xr: number) {
		return (xl * this.f(xr) - xr * this.f(xl)) / (this.f(xr) - this.f(xl));
	}

	solve(setAnswer: (value: string[]) => void, setIteration: (value: number) => void) {
		let answer: string[] = [];
		let x1;
		let iteration = 0;
		let xl = this.xStart;
		let xr = this.xEnd;
		let es = this.es;
		let xOld = xl;

		if (this.f(xl) * this.f(xr) > 0) {
			answer.push('Root in not in given range');
			setAnswer(answer);
			return;
		}

		while (true && iteration < 1000) {
			x1 = this.findX1(xl, xr);

			if (this.f(xl) * this.f(x1) <= 0) {
				xl = x1;
			} else {
				xr = x1;
			}

			let tol = Math.abs((this.f(xOld) - this.f(x1)) / this.f(x1)) * 100;

			if (tol < es || this.f(x1) == 0) {
				answer.push(x1.toString());
				break;
			}

			xOld = x1;
			iteration++;
			console.log(x1 + ' ' + tol + ' ' + es);
			console.log(xOld + ' ' + x1 + ' ' + this.f(xOld) + ' ' + this.f(x1));
		}

		setAnswer(answer);
		setIteration(iteration);
	}
}

function page() {
	const [equation, setEquation] = useState<string>('1');
	const [xStart, setxStart] = useState<number>(0);
	const [xEnd, setxEnd] = useState<number>(0);
	const [tolerance, setTolerance] = useState<number>(0);
	const [answer, setAnswer] = useState<string[]>(['wait for calculate']);
	const [numberOfIteration, setNumberOfIteration] = useState<number>(0);
	const [result, setResult] = useState<SetOfResult[]>([]);

	let bisectionMethod;
	let content = {
		header: 'False Position Method'
	};

	function eventHandler(e: any) {
		e.preventDefault();

		bisectionMethod = new BisectionMethod({
			xStart: xStart,
			xEnd: xEnd,
			tolerance: tolerance,
			fx: equation
		});

		bisectionMethod.solve(setAnswer, setNumberOfIteration);
	}

	return (
		<>
			<Template
				eventHandler={eventHandler}
				setEquation={setEquation}
				setTolerance={setTolerance}
				setxEnd={setxEnd}
				setxStart={setxStart}
				answer={answer}
				content={content}
				numberOfIteration={numberOfIteration}
				result={result}
			/>
		</>
	);
}

export default page;
