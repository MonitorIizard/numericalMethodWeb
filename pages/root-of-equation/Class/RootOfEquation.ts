import InputData from "./InputData";

abstract class RootOfEquation {
	xStart: number = 0;
	es: number = 0;
	xEnd?: number = 0;
	equation: string = "";

	constructor(equation : string, xStart: number, xEnd: number, es: number) {
		this.equation = equation;
		this.xStart = xStart;
		this.es = es;
		this.xEnd = xEnd;
	}

	abstract f(x: number): number;

	abstract solve(): any;

	setNewValue(inputData : InputData) {
		this.equation = inputData.equation;
		this.xStart = inputData.xstart;
		this.xEnd = inputData.xend;
		this.es = inputData.errorTol;
	}
}

export default RootOfEquation ;
