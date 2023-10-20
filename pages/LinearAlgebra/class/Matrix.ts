import {det, matrix} from "mathjs";

class Matrix {
  matrix : number[][] | number[];

  constructor( matrix : number[][] | number[] ) {
    this.matrix = matrix;
  }

  public static crammerRule(matrixA : number[][], matrixB : number[]) {
    let result : number[] = [];
    let detA = 1;

    try {
      detA = det( matrixA );
    } catch ( error ) {
      // console.log("true");
      return result;
    }

    if ( detA == 0 ) {
      // console.log("truee");
      return result;
    }

    for ( let i = 0; i < matrixA.length; i++ ) {
      const detAx = det( matrixA.map((row, idx) => 
                              row.map((_, jdx) => 
                              (jdx === i ? matrixB[idx] : row[jdx]))))

      result.push( detAx / detA );
    }
    return result;
  }

  public static gaussElimination(matrixA : number[][], matrixB : number[]) {
    const result : number[] = Array.from( {length : matrixA.length}, () => 0);
    const n = matrixA.length;

    for( let i = 0; i < n; i++) {
      for( let k = i + 1; k < n; k++ ) {
        let factor = matrixA[k][i] / matrixA[i][i];
        matrixA[k][i] = factor;
    
        for( let j = 1; j < n; j++ ) {
          matrixA[k][j] = matrixA[k][j] - factor * matrixA[i][j];
        }
        matrixB[k] = matrixB[k] - factor * matrixB[i];
      }
    }

    for ( let k = 0; k < n; k++ ) {
      for ( let j = 0; j < n; j++ ) {
        if( j < k ) {
          matrixA[k][j] = 0;
        }
      }
    
      let divide = matrixA[k][k];
      for ( let x = k; x < n; x++ ) {
        matrixA[k][x] /= divide;
      }
      matrixB[k] /= divide;
    }

    for ( let k = n-1; k >= 0; k-- ) {
      let sum = 0;
      for ( let x = n-1; x >= 0; x-- ) {
        sum += matrixA[k][x] * result[x];
      }
      result[k] = (matrixB[k] - sum) / matrixA[k][k];
      console.log( result[k] );
    }

    return result;
  }
}

export default Matrix;