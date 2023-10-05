export default abstract class RootOfEquation  {
  xStart : number;
  tolerance : number;
  xEnd : number;

  constructor( xStart : number, xEnd : number, tolerance : number ) {
    this.xStart = xStart;
    this.tolerance = tolerance;
    this.xEnd = xEnd;
  }

  abstract f( x : number ) : number;

  abstract solve( value : any ) : void;
}