export default class InputData {
  equation : string;
  xStart : number;
  xEnd : number;
  n : number;
  constructor(equation : string, xStart : number, xEnd : number, n : number) {
    this.equation = equation;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.n = n;
  }
}