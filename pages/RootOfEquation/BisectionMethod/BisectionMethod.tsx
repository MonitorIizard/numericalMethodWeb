import { useState } from 'react';
import { RootOfEquation, SetOfResult } from '../Class/RootOfEquation';
import Template from '../RootOfEquationTemplate';

class BisectionMethod extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; xEnd: number; es: number; fx: string }) {
		super(props.xStart, props.xEnd, props.es);
		this.fx = props.fx;
	}

	f(x: number) {
		return eval(this.fx);
		// return x - 5;
	}

	findXm(xl: number, xr: number) {
		return (xl + xr) / 2;
	}

	solve(setAnswer: (value: string[]) => void, setIteration: (value: number) => void): void {
		let answer: string[] = [];

		let xl = this.xStart;
		let xr = this.xEnd;
		let xm;
		let temp = xl;
		let iteration = 0;
		let tolerance = this.es;

		while (true && iteration < 100000) {
			xm = this.findXm(xl, xr);

			if (this.f(xm) * this.f(xr) > 0) {
				answer.push('root of equation out of index');
				break;
			}

			let tolerance = Math.abs((this.f(xm) - this.f(temp)) / this.f(xm));

			if (this.f(xm) == 0 || tolerance < this.es) {
				answer.push(xm.toString());
				break;
			}

			// console.log( `iteration = ${iteration}`);
			// console.log(` xl = ${xl}, xr = ${xr}, xm = ${xm} `);
			// console.log( ` f(xl) = ${f(xl)}, f(xr) = ${f(xr)}, f(xm) = ${f(xm)} \n` );

			if (this.f(xl) * this.f(xm) <= 0) {
				xr = xm;
			}

			if (this.f(xr) * this.f(xm) <= 0) {
				xl = xm;
			}

			// console.log( `f${}` );

			temp = xm;
			// console.log( );
			iteration += 1;
		}
		// console.log( f(xm) );
		// console.log( this.f(xm) );
		setAnswer(answer);
		setIteration(iteration);
	}
}

function Page() {
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
			es: es,
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

export default Page;
