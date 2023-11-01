import { evaluate } from "mathjs";
import InputData from "./InputData";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";

export default class FalsePositionMethod extends RootOfEquation {

	constructor(inputData : InputData) {
		super(inputData.equation, inputData.xstart, inputData.xend || 0 , inputData.errorTol || 0);
	}

	f(x: number) {
		return evaluate(this.equation, {x});
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
		let xr = this.xEnd!;
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
			// console.log(x1 + ' ' + tol + ' ' + es);
			// console.log(xOld + ' ' + x1 + ' ' + this.f(xOld) + ' ' + this.f(x1));
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
		this.equation = equation;
	}

	setES( es : number ) {
		this.es = es;
	}
}