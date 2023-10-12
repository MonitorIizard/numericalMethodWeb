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

	solve({ setAnswer, setResult }: solveArguement) {

		// if ( this.f(5) === null  ) return;

		let answer: string[] = [];
		let result: SetOfResult[] = [];


		for (let i = 0; i < 5; i++) {
			result.push(new SetOfResult(i, i, i));
		}

		setResult(result);
		setAnswer(answer);
	}
}
