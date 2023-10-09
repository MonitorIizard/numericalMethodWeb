abstract class RootOfEquation  {
  xStart : number;
  es : number;
  xEnd : number;

  constructor( xStart : number, xEnd : number, es : number ) {
    this.xStart = xStart;
    this.es = es;
    this.xEnd = xEnd;
  }

  abstract f( x : number ) : number;

}

class SetOfResult {
  root : number;
  iterationNo : number;
  tolerance : number;

  constructor ( iterationNo : number, root  : number , tolerance  : number ) {
    this.iterationNo = iterationNo;
    this.root = root;
    this.tolerance = tolerance;
  }
}

export { RootOfEquation, SetOfResult };