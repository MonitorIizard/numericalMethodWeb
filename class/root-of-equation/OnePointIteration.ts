import { evaluate } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";
import InputData from "./InputData";

interface ConstructorInterface {
	xStart: number;
	tolerance: number;
	fx: string;
}

class OnePointIteration extends RootOfEquation {

	constructor(inputData : InputData) {
		super(inputData.equation, inputData.xstart, inputData.errorTol);
	}

	f(x: number): any {
		return evaluate(this.equation, { x });
	}

	solve() {
		let xNew;
		let i = 0;
		let result : SetOfResult[] = [];
		let xOld = this.xStart;
		let es = this.es;

		while (i < 1000) {
			xNew = this.f(xOld);
			let tol = Math.abs((xNew - xOld) / xNew) * 100;
			result.push(new SetOfResult(i, xNew, tol));
			xOld = xNew;

			if (tol < es) {
				break;
			}

			i++;
		}
		return result;
	}

	getXStart() {
		return this.xStart;
	}

	setXstart(xStart:number) {
		this.xStart = xStart;
	}

	setFx(fx:string) {
		this.equation = fx;
	}

	setTolerance(tol:number) {
		this.es = tol;
	}
}

export default OnePointIteration;