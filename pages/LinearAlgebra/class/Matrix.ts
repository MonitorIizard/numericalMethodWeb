import math, {abs, det} from "mathjs";

class Matrix { 
  public static crammerRule(matrixA : number[][], matrixB : number[]) {
    let result : number[] = [];
    let detA = 1;

    try {
      detA = det( matrixA );
    } catch ( error ) {
      return result;
    }

    if ( detA == 0 ) {
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

  static pivotization(matrixA : number[][], matrixB : number[], ip : number) : {A : number[][], B : number[]} {
    let A = [...matrixA];
    let B = [...matrixB];
    let max = abs( A[ip][ip] );
    // console.log(`max is ${max}` )
    let numofColumnThatBiggest = ip;
    let n = A.length;

    for(let i = ip+1 ; i < n ; i++) {
      // console.log(`amax = ${abs( A[i][ip] )}`)
      if( max < abs( A[i][ip] ) ) {
        max = abs( A[i][ip]);
        numofColumnThatBiggest = i;
      }
    }

    if ( numofColumnThatBiggest > ip ) {
      let temp = [...A[ip]];
      // console.log("temp is")
      // console.log(temp);
      A[ip] = [...A[numofColumnThatBiggest]];
      A[numofColumnThatBiggest] = [...temp];

      let tempB = B[ip];
      B[ip] = B[numofColumnThatBiggest];
      B[numofColumnThatBiggest] = tempB;
    }

    // console.log(A);

    return {A, B};
  }

  public static gaussElimination(matrixA : number[][], matrixB : number[]) {
    const result : number[] = Array.from( {length : matrixA.length}, () => 0);
    let A = [...matrixA]; 
    let B = [...matrixB];

    const n = matrixA.length;

    for( let i = 0; i < n; i++) {
      // console.log( `iteration = ${i}` );
      let pivot = Matrix.pivotization(A, B, i);
      A = [...pivot.A];
      B = [...pivot.B]

      for( let k = i + 1; k < n; k++ ) {
        let factor = A[k][i] / A[i][i];
        A[k][i] = factor;
    
        for( let j = 1; j < n; j++ ) {
          A[k][j] = A[k][j] - factor * A[i][j];
        }
        B[k] = B[k] - factor * B[i];
      }
    }

    // console.log("matrixA after gauss elimination");
    // console.log(A);
    // console.log("matrixB after gauss elimination");
    // console.log(B);

    for ( let k = n-1; k >= 0; k-- ) {
      let sum = 0;
      for ( let x = n-1; x >= 0; x-- ) {
        sum += A[k][x] * result[x];
      }
      result[k] = (B[k] - sum) / A[k][k];
      // console.log( result[k] );
    }


    return result;
  }

  public static matrixInversion(matrixA : number[][], matrixB : number[]) : number[] {
    let result : number[] = [];
    
    return result;
  }

  public static gaussJordan(matrix : number[][], matrixB : number[] ) : number[] {
    let result : number[] = Array.from( {length : matrix.length}, () => 0);
    let matrixA = matrix;

    function faceForward(matrixA : number[][], result : number[]) : {answer : number[], matrix : number[][]} {
      let answer = result;
      let matrix = matrixA;
      let length = matrixA.length;

      for( let i = 0; i < length; i++ ) {
    
        for( let k = i + 1; k < length; k++ ) {
          let factor = matrix[k][i] / matrix[i][i];
          matrix[k][i] = factor;
    
          for( let j = i + 1; j < length; j++ ) {
            matrix[k][j] =  matrix[k][j] - factor * matrix[i][j];
          }
          console.log( `k = ${k}, i = ${i}, factor = ${factor}` );
          answer[k] = answer[k] - factor * answer[i];
        }
    
      }
    
      for( let i = 0; i < length; i++ ) {
        let divide = matrix[i][i];
        for( let k = 0; k < length; k++ ) {
          if ( k < i ) {
            matrix[i][k] = 0;
          } else {
            matrix[i][k] /= divide;
          }
        }
    
        answer[i] /= divide;
      }

      console.log( `matrix inside faceforward` );
      console.log( matrix );
      return { answer, matrix};
    }

    function backSubstitution(matrixA : number[][], result : number[]) : {answer : number[], matrix : number[][]} {
      let answer = result;
      let matrix = matrixA;
      let length = matrixA.length;

      for ( let i = length - 1; i >= 0; i-- ) {
        for ( let j = i - 1; j >= 0; j-- ) {
          let factor = matrixA[j][i] / matrixA[i][i];
          matrixA[j][i] = factor;
          answer[j] = answer[j] - factor * answer[i];
        }
      } 

      return { answer, matrix};
    }
    
    const { answer : result1, matrix : matrixA1 } = faceForward(matrixA, result);

    console.log("output from faceForward")
    console.log( faceForward(matrixA, result));
    console.log("\n")
    console.log( matrixA1 )
    result = [...result1];
    matrix = [...matrixA1];

    console.log(`result from faceForward = ${result}`);
    console.log(`matrix from faceForward = ${matrix}`);

    const { answer : result2, matrix : matrixA2 } = backSubstitution(matrixA, result);  
    result = result2;
    matrix = matrixA2;
    
    console.log(`result from backSubtitution = ${result}`);

    console.log( result );

    return result;
  }

  public static LUdecomposition(matrixA : number[][], matrixB : number[]) : number[] { 
    let result : number[] = Array.from( {length : matrixA.length}, () => 0);
    const A = [...matrixA];
    const B = [...matrixB];
    const U = Array.from( {length : matrixA.length}, () => [ 
            Array.from( {length : matrixA.length}, () => 0)
    ])

    const L = Array.from( {length : matrixA.length}, () => [ 
            Array.from( {length : matrixA.length}, () => 0)
    ])
    
    return result;
  }

  public static choleskyDecomposition(matrixA : number[][], matrixB : number[]) : number[] {
    let result : number[] = [];

    return result;
  }

  public static jacobiIteration(matrixA : number[][], matrixB : number[]) : number[] {
    let result : number[] = [];

    return result;
  }

  public static gaussSeidelIteration(matrixA : number[][], matrixB : number[]) : number[] {
    let result : number[] = [];

    return result;
  }

  public static conjugateGradient(matrixA : number[][], matrixB : number[]) : number[] {
    let result : number[] = [];

    return result;
  }
}

export default Matrix;