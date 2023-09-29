export default abstract class RootOfEquation  {
  xStart : number;
  tolerance : number;

  constructor( xStart : number, tolerance : number ) {
    this.xStart = xStart;
    this.tolerance = tolerance;
  }

  abstract f( x : number ) : number;
}