import Matrix from "@/pages/linear-algebra/class/Matrix";

class Regression {
  public static  linearRegression(x: number[], y: number[], m : number = 1) {
    let n = x.length;

    function findSetSigmaX (x:number[]) {
      let sigmaX = [ n ]; 
    
      for ( let i = 0; i < 2 * m; i++ ) {
        let sum = 0;
        
        for ( let j = 0; j < n; j++ ) {
          sum += Math.pow( x[j], i + 1);
        }
    
        sigmaX.push( sum );
      }
    
      return sigmaX;
    }

    function findSigmaY (y:number[]) {
      let n = 0;
      let sum = 0;
      for ( let i = 0; i < y.length; i++ ) {
        sum += y[i];
      }

      return sum;
    }

    function initialMatrixA() {
      let matrixA : number[][] = [];
      let setOfSigmaX = findSetSigmaX(x);
      
      for ( let i = 0; i < m + 1; i++) {
        matrixA.push([]);
        for ( let j = 0; j < m + 1; j++) {
          matrixA[i].push(setOfSigmaX[i + j]);
        }
      }

      return matrixA;
    }

    function initialMatrixB() {
      let matrixB : number[] = [];

      for ( let i = 0; i < m + 1; i++ ) {
        let sum = 0;
          for ( let j = 0; j < n; j++) {
            sum += Math.pow(x[j], i) * y[j]
          } 
        matrixB.push(sum);
      }
      
      return matrixB;
    }

    let matrixA = initialMatrixA();
    let matrixB = initialMatrixB();
    let matrixX = Matrix.rowEcholonForm(initialMatrixA(), initialMatrixB());

    return matrixX;
  }

}

export default Regression;