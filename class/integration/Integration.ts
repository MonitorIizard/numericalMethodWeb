import InputData from "./InputData";
import nerdamer from'nerdamer'
import 'nerdamer/Algebra.js'
import 'nerdamer/Calculus.js'
import 'nerdamer/Solve.js'

export default abstract class Integration {
  inputData : InputData;
  approximation : number;

  constructor(inputData : InputData ) {
    this.inputData = inputData;
    this.approximation = NaN;
  }

  abstract f(x : number) : number  

  abstract solve() : number;

  calError() : {error : number, realValue : number } {
    if (null == this.inputData) { return {error : 0, realValue : 0};}
    if ( Number.isNaN(this.approximation) ) { 
      this.solve();
    }

    let integral = nerdamer(`defint(${this.inputData.equation}, ${this.inputData.xStart}, ${this.inputData.xEnd})`);
    let realValue = Number(integral.text());
    let error = Math.abs((realValue - this.approximation) / realValue) * 100;
    
    return {error, realValue};
  }
}