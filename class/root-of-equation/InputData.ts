export default class InputData {
	equation : string;
	xstart : number;
	xend? : number | null;
	errorTol : number;

	constructor( inputData : InputData) {
		this.equation = inputData.equation;
		this.xstart = inputData.xstart;
		this.xend = inputData.xend;
		this.errorTol = inputData.errorTol;
	}

	public static createInputData( equation : string, xstart : number, errorTol : number, xend? : number ) : InputData {
		return new InputData({
			equation,
			xstart,
			xend,
			errorTol
		});
	}

}