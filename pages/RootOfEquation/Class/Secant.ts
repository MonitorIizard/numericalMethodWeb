import { derivative, evaluate } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import SetOfResult from "./SetOfResult";

class Secant extends RootOfEquation {
	fx: string;
  xStart2 : number;

	constructor(props: { xStart: number; xStart2 : number; es: number; equation: string }) {
		super(props.xStart, 0, props.es);
		this.fx = props.equation;
    this.xStart2 = props.xStart2;
	}

	f(x: number) {
		return evaluate(this.fx, { x });
		// return x - 5;
	}

	solve() {
		let xStart1 = this.xStart; //* initial start 1
    let xStart2 = this.xStart2 //* initial start 2
    // let xStart1 = 3;
    // let xStart2 = 2;
		let i = 0; //* iterative
		let es = this.es; //* stopping critetion tolerance
		let result : SetOfResult[] = []; //* records of each iteration


		while (i <= 1000) {
			// let xOld = x;
      let slope = (this.f(xStart1) - this.f(xStart2)) / (xStart1 - xStart2);
			let deltaX = -this.f(xStart2) / slope;
      xStart1 = xStart2;
			xStart2 = xStart2 + deltaX;
			let tol = Math.abs(deltaX / xStart1) * 100;

			result.push(new SetOfResult( i, xStart1, tol ));

			if (tol < es) {
				break;
			}

			i++;
		}

		return result;
	}

	setXstart1(x: number) {
		this.xStart = x;
	}

  setXstart2(x: number){
    this.xStart2 = x;
  }

	setEquation(equation: string) {
		this.fx = equation;
	}

	setES(es: number) {
		this.es = es;
	}
}

export default Secant;