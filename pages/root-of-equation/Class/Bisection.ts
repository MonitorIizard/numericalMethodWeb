import { evaluate } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";

class BisectionMethod extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; xEnd: number; es: number; fx: string }) {
		super(props.xStart, props.xEnd, props.es);
		this.fx = props.fx;
	}

	f(x: number) {
		return evaluate(this.fx, {x});
		// return x - 5;
	}

	findXm(xl: number, xr: number) {
		return (xl + xr) / 2;
	}

	solve() {
		let xl = this.xStart;
		let xr = this.xEnd;
		let xm;
		let temp = xl;
		let iteration = 0;
		let maxIteration = 1000;
		let result = [];

		while (true && iteration < maxIteration) {
			xm = this.findXm(xl, xr);
			
			let tolerance = Math.abs( (xm - temp) / temp) * 100;

			result.push(new SetOfResult(iteration, xm, tolerance));

			if (this.f(xm) == 0 || tolerance < this.es) {
				break;
			}

			if (this.f(xl) * this.f(xm) <= 0) {
				xr = xm;
			}

			if (this.f(xr) * this.f(xm) <= 0) {
				xl = xm;
			}
			temp = xm;
			iteration += 1;
		}

		return result;
	}
}

export default BisectionMethod;