import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";
import { evaluate } from "mathjs";

interface solveArguement {
	setAnswer: (value: string[]) => void;
	setResult: (value: SetOfResult[]) => void;
}

export default class GraphicalMethod extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; xEnd: number; es: number; fx: string }) {
		super(props.xStart, props.xEnd, props.es);
		this.fx = props.fx;
	}

	f(x: number) {
		return evaluate(this.fx, { x });
	}

	calcultateStep() {
		const step = Math.log(this.xEnd - this.xStart) / Math.log(10) ;
		if ( step % 1 == 0 ) return Math.pow(10, step - 1);
		return Math.pow(10, Math.floor(step));
	}

	solve() {
		let step = this.calcultateStep();
		const MaxIter = 1000;
		let iter = 0;
		let x = this.xStart;
		let temp = this.f(x);
		let tempX = x;
		let newTemp;
		let result: SetOfResult[] = [];

		while( iter < MaxIter ) {	
			
			if ( iter == MaxIter ) {
				result.push(new SetOfResult(0 ,0, 0));
				console.log("Max Iteration Reached");
				break;
			}
			
			newTemp = this.f(x);
			
			// console.log(`temp = ${temp} newTemp = ${newTemp} x = ${x}`);
			let tol = Math.abs( (tempX - x ) / tempX) * 100;
			
			result.push( new SetOfResult(iter, x, tol));
			// console.log( tol );
			if ( tol < this.es && x != tempX || newTemp == 0 ) {
				break;
			}

			if (temp * newTemp < 0) {

				x-=step;
				step /= 10;

				newTemp = this.f(x);
			}

			if (x == this.xEnd) {
				break;
			}

			tempX = x;
			x += step;
			iter += 1;
			temp = newTemp;

			if( x > this.xEnd ) {
				x = this.xEnd;
			}	
		}

		// console.log( x );
		return result;
	}

	getFunction() {
		return this.fx;
	}

	getXstart() {
		return this.xStart;
	}

	getXend() {
		return this.xEnd;
	}
}
