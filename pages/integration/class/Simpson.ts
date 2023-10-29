import { evaluate } from "mathjs";
import Integration from "./Integration";

export default class Simpson extends Integration {
  f(x: number): number {
    try {
      return evaluate(this.inputData.equation, {x});
    } catch (e) {
      // console.log(e);
      //console.log( this.inputData.equation + " is not a valid equation.")
      return 0;
    }
  }
  solve(): number {
    if (this.inputData == null ) {return 0;}

    console.log(this.inputData.equation);

    let n = this.inputData.n;
    let range = { xStart : this.inputData.xStart, xEnd : this.inputData.xEnd };
    let h = (range.xEnd - range.xStart) / (2 * n);
    this.approximation = 0;

    for ( let i = 0; i < n; i++ ) {
      this.approximation += this.f(range.xStart) + 4 * this.f(range.xStart+h) + this.f(range.xStart + 2 * h );
      range.xStart += 2*h;
    }

    this.approximation *= (h / 3);
    
    return this.approximation;
  }

}