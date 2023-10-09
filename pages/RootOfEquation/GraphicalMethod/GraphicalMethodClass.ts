import { RootOfEquation, SetOfResult } from "../class";

interface solveArguement {
  setAnswer: ( value : string[] ) => void;
  setResult :  (value : SetOfResult[]) => void;
}

export default class GraphicalMethod extends RootOfEquation {
  fx: string;

  constructor(props: { xStart: number; xEnd : number; es: number; fx: string }) {
    super(props.xStart, props.xEnd, props.es);
    this.fx = props.fx;
  }

  f(x: number) {
    return eval(this.fx);
  }

  solve( {setAnswer, setResult} : solveArguement ) {
    let answer:string[] = [];
    let result:SetOfResult[] = [];
    let p = 1;
    let x = this.xStart;
    let temp = x;
    let temp1 = x;
    let i = 0;

    while (true && i < 1000) {

      if ( x < this.xStart || x > this.xEnd ) 
        { 
          if ( answer.length == 0 ) {
            answer.push("root of equation is out of index");
          }

          break; 
        }

      let tol = Math.abs(this.f(x) - this.f(temp) / this.f(x));

      if ( this.f(x) == 0 || tol < this.es) {
          console.log( x );
          console.log("found x ");
          answer.push(x.toString());
          break;
        }

      // if (this.f(temp) / this.f(x) < 0) {
      //   x = temp;
      //   temp = temp1;
      //   p /= 10;
      // } else {
      //   temp = x;
      // }

      result.push( new SetOfResult( i, x, tol ) );

      temp1 = temp;
      
      x += p;
      i++;
    }

    setResult( result );
    setAnswer( answer );
  }
}