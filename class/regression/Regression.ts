import Matrix from "@/class/linear-algebra/Matrix";

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

    let matrixX = Matrix.rowEcholonForm(initialMatrixA(), initialMatrixB());

    return matrixX;
  }

  public static  polynomialRegression(x: number[], y: number[], m : number) {
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

    let matrixX = Matrix.rowEcholonForm(initialMatrixA(), initialMatrixB());

    return matrixX;
  }

  public static multipleLinearRegression(x: number[][], y: number[], xToFind: number[]) {
    let n = x.length;

    x = x.map( ( row ) => [1, ...row]);
    xToFind = [1, ...xToFind];

    function initialMatrixA () {
      let matrixA : number[][] = [];
      let numberOfEquation = x[0].length; //3
    
      for ( let i = 0; i < numberOfEquation; i++ ) {
        matrixA.push([]);
        for ( let j = 0; j < numberOfEquation; j++ ) {
          if ( i == 0 && j == 0 ) {
            matrixA[i].push( n );
            continue;
          }
    
          //symmetric matrix
          if ( j < i ) {
            matrixA[i][j] = matrixA[j][i];
            continue;
          }
          
          let sum = 0;
          for ( let k = 0; k < n; k++ ) {
            sum += x[k][i] * x[k][j];
            // iteration ++;
          }
    
          matrixA[i].push( sum );
        }
      }
    
      return matrixA;
    }
    
    function initialMatrixB (  ) {
      let matrixB = [];
      let numberOfEquation = x[0].length;
    
      for( let i = 0; i < numberOfEquation; i++ ) {
        let sum = 0;
        for ( let j = 0; j < n; j++ ) {
            sum += y[j] * x[j][i];
          }
          matrixB.push( sum );
        }
    
        return matrixB;
    }
    
    
    let matrixA = initialMatrixA(  );
    let matrixB = initialMatrixB(  );
    let matrixX = Matrix.rowEcholonForm( matrixA, matrixB );
     
    let answer = matrixX.reduce( (sum, currentValue, index) => sum + (currentValue * xToFind[index]), 0);
    return answer;
  }
}

export default Regression;