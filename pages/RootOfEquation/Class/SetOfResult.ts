class SetOfResult {
	root: number;
	iterationNo: number;
	tolerance: number;

	constructor(iterationNo: number, root: number, tolerance: number) {
		this.iterationNo = iterationNo;
		this.root = root;
		this.tolerance = tolerance;
	}
}

export default SetOfResult;