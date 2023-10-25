abstract class RootOfEquation {
	xStart: number;
	es: number;
	xEnd: number;

	constructor(xStart: number, xEnd: number, es: number) {
		this.xStart = xStart;
		this.es = es;
		this.xEnd = xEnd;
	}

	abstract f(x: number): number;
}

export default RootOfEquation ;
