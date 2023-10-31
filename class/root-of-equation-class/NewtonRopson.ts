import { derivative, evaluate } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";
import InputData from "./InputData";

class NewptonRophson extends RootOfEquation {
	constructor(inputData : InputData) {
		super(inputData.equation, inputData.xstart, inputData.errorTol);
	}

	f(x: number) {
		return evaluate(this.equation, { x });
		// return x - 5;
	}

	fd(x: number) {
		return derivative(this.equation, 'x').evaluate({ x });
	}

	solve() {
		let x = this.xStart; //* initial start
		let i = 0; //* iterative
		let es = this.es; //* stopping critetion tolerance
		let result : SetOfResult[] = []; //* records of each iteration

		while (true && i <= 1000) {
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
		this.equation = equation;
	}

	setES(es: number) {
		this.es = es;
	}
}

export default NewptonRophson;