import { evaluate } from "mathjs";
import Integration from "./Integration";

export default class Trapezoidal extends Integration {

  f(x:number) {
    try {
      return evaluate(this.inputData.equation, {x});
    } catch (e) {
      // console.log(e);
      //console.log( this.inputData.equation + " is not a valid equation.")
      return 0;
    }
  }

  solve() {
    if (null == this.inputData) { return 0;}
    let n = this.inputData.n;
    let range = { xStart : this.inputData.xStart, xEnd : this.inputData.xEnd };
    let h = (range.xEnd - range.xStart) / n;
    this.approximation = 0;

    for ( let i = 0; i < n; i++ ) {
      let xStart = range.xStart + i * h;
      let xEnd = xStart + h;
      let a = this.f(xStart);
      let b = this.f(xEnd);
      this.approximation += ((a + b) / 2 ) * h;
    }

    return this.approximation;
  }

}