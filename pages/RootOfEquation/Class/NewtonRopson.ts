import { derivative, evaluate } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";

class NewptonRophson extends RootOfEquation {
	fx: string;

	constructor(props: { xStart: number; es: number; equation: string }) {
		super(props.xStart, 0, props.es);
		this.fx = props.equation;
	}

	f(x: number) {
		return evaluate(this.fx, { x });
		// return x - 5;
	}

	fd(x: number) {
		return derivative(this.fx, 'x').evaluate({ x });
	}

	solve() {
		let x = 3; //* initial start
		let i = 0; //* iterative
		let es = 0.001; //* stopping critetion tolerance
		let result : SetOfResult[] = []; //* records of each iteration

		while (true && i <= 100) {
			let xOld = x;
			let deltaX = -this.f(x) / this.fd(x);
			x = xOld + deltaX;
			let tol = Math.abs((x - xOld) / x) * 100;

			result.push(new SetOfResult( i, x, tol ));

			if (tol < es) {
				break;
			}

			i++;
		}

		return result;
	}

	setXstart(xStart: number) {
		this.xStart = xStart;
	}


	setEquation(equation: string) {
		this.fx = equation;
	}

	setES(es: number) {
		this.es = es;
	}
}

export default NewptonRophson;