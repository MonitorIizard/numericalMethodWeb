export default class inputData {
  xToFind : number;
  equation : string;
  accuracy : string;
  direction : string;
  order : string;
  h : number;

  constructor(xToFind : number, equation : string, accuracy : string, direction : string, order : string, h : number) {
    this.xToFind = xToFind;
    this.equation = equation;
    this.accuracy = accuracy;
    this.direction = direction;
    this.order = order;
    this.h = h;
  }
}
