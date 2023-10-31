import SetOfResult from "@/class/root-of-equation-class/SetOfResult";
import math, {abs, det, re} from "mathjs";
import Record from "@/class/linear-algebra-class/Record"

class Matrix { 
  public static crammerRule(matrixA : number[][], matrixB : number[]) {
    let result : number[] = [];
    let detA = 1;
    let n = matrixA.length;
    console.log(matrixA);

    try {
      detA = det( matrixA );
    } catch ( error ) {
      console.log( result );
      return result;
    }

    if ( detA == 0 ) {
      console.log( result );
      return result;
    }

    for ( let i = 0; i < n; i++ ) {
      const detAx = det( matrixA.map((row, idx) => 
                              row.map((_, jdx) => 
                              (jdx === i ? matrixB[idx] : row[jdx]))))

      result.push( detAx / detA );
    }
    console.log( result );
    return result;
  }

  static pivotization(matrixA : number[][], matrixB : number[], ip : number) : {A : number[][], B : number[]} {
    let A = [...matrixA];
    let B = [...matrixB];
    let max = abs( A[ip][ip] );
    let numofColumnThatBiggest = ip;
    let n = A.length;
    
    for(let i = ip+1 ; i < n ; i++) {
      // console.log(`amax = ${abs( A[i][ip] )}`)
      if( max < abs( A[i][ip] ) ) {
        max = abs( A[i][ip]);
        numofColumnThatBiggest = i;
      }
    }
    
    // console.log(`max is ${max} ip = ${ip} numOfBiggestColumn = ${numofColumnThatBiggest}` );

    if ( numofColumnThatBiggest > ip ) {
      let temp = [...A[ip]];
      console.log("temp is")
      console.log(temp);
      A[ip] = [...A[numofColumnThatBiggest]];
      A[numofColumnThatBiggest] = [...temp];

      let tempB = B[ip];
      B[ip] = B[numofColumnThatBiggest];
      B[numofColumnThatBiggest] = tempB;
    }


    console.log(A);

    return {A, B};
  }

  public static gaussElimination(matrixA : number[][], matrixB : number[]) {
    const n = matrixA.length;
    const result : number[] = Array.from( {length : n}, () => 0);
    let A = [...matrixA]; 
    let B = [...matrixB];

    console.log(A);

    for( let i = 0; i < n; i++) {
      // let pivot = this.pivotization(A, B, i);
      // A = pivot.A.map(row => [...row]);
      // B = [...pivot.B]

      for( let k = i + 1; k < n; k++ ) {
        let factor = A[k][i] / A[i][i];
        A[k][i] = factor;
    
        for( let j = 1; j < n; j++ ) {
          A[k][j] = A[k][j] - factor * A[i][j];
        }
        B[k] = B[k] - factor * B[i];
      }
    }

    for ( let k = n-1; k >= 0; k-- ) {
      let sum = 0;
      for ( let x = n-1; x >= 0; x-- ) {
        sum += A[k][x] * result[x];
      }
      result[k] = (B[k] - sum) / A[k][k];
    }

    return result;
  }

  public static matrixInversion(matrixA : number[][], matrixB : number[]) : number[] {
    const result : number[] = [];
    const matrix = [...matrixA];
    const n = matrix.length;
        const iden = Array.from({ length: n }, (_, i) => 
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        );

        for (let i = 0; i < n; i++) {
            let max = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(matrix[max][i])) {
                    max = j;
                }
            }

            [matrix[i], matrix[max]] = [matrix[max], matrix[i]];
            [iden[i], iden[max]] = [iden[max], iden[i]];

            const pivot = matrix[i][i];
            if (Math.abs(pivot) === 0) {
                // Matrix is singular and not invertible
                break;
            }

            for (let j = 0; j < n; j++) {
                matrix[i][j] /= pivot;
                iden[i][j] /= pivot;
            }

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    const factor = matrix[j][i];
                    for (let k = 0; k < n; k++) {
                        matrix[j][k] -= factor * matrix[i][k];
                        iden[j][k] -= factor * iden[i][k];
                    }
                }
            }
        }

        for ( let i = 0; i < n; i++ ) {
          let sum = 0;
          for ( let j = 0; j < matrixA.length; j++ ) {
            sum += iden[i][j] * matrixB[j];
          }
          result.push(sum);
        }
    return result;
  }

  public static gaussJordan(matrixA : number[][], matrixB : number[] ) : number[] {
    let result : number[] = Array.from( {length : matrixA.length}, () => 0); 
    const matrix = matrixA.map((row, idx) => row.concat(matrixB[idx]));

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let col = 0; col < numCols - 1; col++) {
        // Find the pivot row for this column
        let maxRow = col;
        for (let i = col + 1; i < numRows; i++) {
            if (Math.abs(matrix[i][col]) > Math.abs(matrix[maxRow][col])) {
                maxRow = i;
            }
        }

        // Swap the current row and the pivot row
        [matrix[col], matrix[maxRow]] = [matrix[maxRow], matrix[col]];

        // Make the diagonal element 1
        let pivot = matrix[col][col];
        for (let j = col; j < numCols; j++) {
            matrix[col][j] /= pivot;
        }

        // Make the other rows 0 in this column
        for (let i = 0; i < numRows; i++) {
            if (i !== col) {
                let factor = matrix[i][col];
                for (let j = col; j < numCols; j++) {
                    matrix[i][j] -= factor * matrix[col][j];
                }
            }
        }
    }
    
    result = matrix.map(row => row[numCols - 1]);

    return result;
  }

  public static LUdecomposition(matrixA : number[][], matrixB : number[]) : number[] { 
    let result : number[] = Array.from( {length : matrixA.length}, () => 0);
    const A = [...matrixA];
    const B = [...matrixB];
    const U = Array.from( {length : matrixA.length}, () =>
            Array.from( {length : matrixA.length}, () => 0)
    )

    const L = Array.from( {length : matrixA.length}, () => 
            Array.from( {length : matrixA.length}, () => 0)
    )
    const n = matrixA.length;

    for (let i = 0; i < n; i++) {
      L[i][i] = 1; // Diagonal of L is set to 1

      for (let j = i; j < n; j++) {
          let sum = 0;
          for (let k = 0; k < i; k++) {
              sum += L[i][k] * U[k][j];
          }
          U[i][j] = A[i][j] - sum;
      }

      for (let j = i; j < n; j++) {
          let sum = 0;
          for (let k = 0; k < i; k++) {
              sum += L[j][k] * U[k][i];
          }
          L[j][i] = (A[j][i] - sum) / U[i][i];
      }
  }

    const Y = Array.from( {length : matrixA.length}, () => 0);

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * Y[j];
      }
      Y[i] = (B[i] - sum) / L[i][i];
    }
    // r1
    // n = 2
    // i = 1
    // r2
    // i = 0
    for ( let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += U[i][j] * result[j];
        console.log(`sum = ${sum}`)
      }
      result[i] = (Y[i] - sum) / U[i][i];
    }
    
    return result;
  }

  public static jacobiIteration(matrixA : number[][], matrixB : number[], errorTol : number) {
    let A = [...matrixA];
    let B = [...matrixB];
    let X = Array.from( {length : matrixA.length}, () => 0);
    let Xold = Array.from( {length : matrixA.length}, () => 0);
    let tolerance = errorTol;
    let n = A.length;
    let result : Record[] = Array.from( {length : n}, (_,idx) => new Record(0,`x${idx}`, 0, 0));

    function calError ( x : number, tempX : number ) {
      return Math.abs( (x - tempX) / x ) * 100;
    }

    let i = 1;
    while ( i < 1000 ) {
      // console.log(`iteration = ${i}`);
      for ( let j = 0; j < n; j++) {
        // result.push( new Record(i, X[j], calError(X[j], Xold[j])));
        // console.log( result );
        Xold[j] = X[j];
        // console.log(`Xold[${j}] = ${Xold[j]}`)
      }

      console.log();
      
      for ( let j = 0; j < n; j++) {
        let sum = B[j];
        for ( let k = 0; k < n; k++) {
          if ( k != j ) {
            sum -= A[j][k] * Xold[k];
          }
        }
        X[j] = sum / A[j][j];
        result.push( new Record(i, `x${j}`, X[j], calError(X[j], Xold[j])));
      }
      
      

      for ( let j = 0; j < n; j++) {
        if ( calError( X[j], Xold[j]) < tolerance && j == n - 1) {
          return result;
        }

        if ( calError( X[j], Xold[j]) < tolerance ) {
          continue;
        } else {
          break;
        }
      }

      i++;
    }

    console.log( result );

    return result;
  }

  public static cholesky( matrixA : number[][], matrixB : number[] ) {

    const n = matrixA.length;

    const L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let k = 0; k < i; k++) {
        sum += Math.pow(L[i][k], 2);
      }

      L[i][i] = Math.sqrt(matrixA[i][i] - sum);

      for (let j = i + 1; j < n; j++) {
        let sum = 0;

        for (let k = 0; k < i; k++) {
          sum += L[i][k] * L[j][k];
        }

        L[j][i] = (matrixA[j][i] - sum) / L[i][i];
      }
    }

    console.log(L);

    const y: number[] = new Array(n);

    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let j = 0; j < i; j++) {
        sum += L[i][j] * y[j];
      }

      y[i] = (matrixB[i] - sum) / L[i][i];
    }

    const x: number[] = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;

      for (let j = i + 1; j < n; j++) {
        sum += L[j][i] * x[j];
      }

      x[i] = (y[i] - sum) / L[i][i];
    }

    console.log(x);

    return x;
  }

  public static gaussSeidelIteration(matrixA : number[][], matrixB : number[], errorTol : number) : Record[] {
    let n = matrixA.length;
    let result : Record[] = Array.from( {length : n}, (_, idx) => new Record(0, `x${idx}`, 0, 0));
    let A = [...matrixA];
    let B = [...matrixB];
    let X = Array.from({length : n}, () => 0);
    let Xold = Array.from({length : n}, () => 0);
    let tol = errorTol;

    function calError ( x : number, oldX : number ) {
      return Math.abs( (x - oldX) / x ) * 100;
    }

    let f = 1;

    while ( f < 1000 ) {
      for( let i = 0; i < Xold.length; i++ ) {
        Xold[i] = X[i];
      }
    
      for ( let j = 0; j < n; j++ ) {
        let sum = B[j];
        
        for ( let i = 0; i < n; i++ ) {
          if( i == j ) continue;
          
          sum -= (A[j][i] * X[i]);
        }
        
        sum /= A[j][j];
        
        X[j] = sum;
        result.push( new Record(f, `x${f}`, X[j], calError(X[j], Xold[j])) );
      }

      for ( let j = 0; j < n; j++) {
        if ( calError( X[j], Xold[j]) < tol && j == n - 1) {
          return result;
        }

        if ( calError( X[j], Xold[j]) < tol ) {
          continue;
        } else {
          break;
        }
      }

      f++;
    }


    return result;
  }

  public static conjugateGradient(matrixA : number[][], matrixB : number[], errorTol : number) : Record[] {
    let result : Record[] = [];
    let A = [...matrixA];
    let B = [...matrixB];
    let n = A.length;
    let D = Array.from( {length : n}, () => 0);
    let X = Array.from( {length : n}, () => 0);
    let R = Array.from( {length : n}, () => 0);
    let tol = errorTol;

    //Step1
    //Initialize R0 and D0
    for ( let i = 0; i < n; i++ ) {
      let sum = 0;
      for ( let j = 0; j < n; j++ ) {
        sum += A[i][j] * X[j];
      }
      R[i] = sum - B[i];
      D[i] = R[i] * -1;
    }

    //Step2
    //WHile Loops
    let lambda;
    let i = 1;

    while ( i < 10 ) {
      lambda = 0;
      // Lambda = - ([D]k * {R}k) /[D]k * [A] * [D]k
      for ( let k = 0; k < D.length; k++ ) {
        lambda += D[k] * R[k];
      }

      let tempSum = 0;
      for ( let k = 0; k < n; k++ ) {
        let sum = 0;

        for ( let j = 0; j < A[k].length; j++ ) {
          sum += A[j][k] * D[j];
        }
        sum *= D[k];
        tempSum += sum;
      }

      lambda /= ( -1 * tempSum);

      // {X}k+1 = [X]k + lambda * [D]k
      for ( let k = 0; k < X.length; k++ ) {
        X[k] = X[k] + lambda * D[k];
      }
      
      // find residual, {R}k+1 = [A]{X}k+1 + [B]
      for ( let k = 0; k < n; k++ ) {
        let sum = 0;
        for ( let j = 0; j < A[k].length; j++ ) {
          sum += A[j][k] * X[j];
        }
        
        R[k] = sum - B[k];
      }
      
      // find Error 
      let error = 0;
      let sum = 0;
      for ( let k = 0; k < R.length; k++ ) {
        sum += R[k] * R[k];
      }
      error = Math.sqrt(sum);

      for (let k = 0; k < X.length; k++) {
        result.push( new Record(i, `x${k}`, X[k], error));
      }
      
      if ( error < tol ) {
        return result;
      }

      // Find Alpha
      let numeratorTemp = 0;
      let denominatorTemp = 0;
      for ( let k = 0; k < n; k++ ) {
        let numerator = 0;
        let denominator = 0;
        for ( let j = 0; j < A[k].length; j++ ) {
          numerator += R[j] * A[j][k];
          denominator += D[j] * A[j][k] ;
        }
        denominator *= D[k]; 
        denominatorTemp += denominator;
        numerator *= D[k];
        numeratorTemp += numerator;
      }
      let alpha = numeratorTemp / denominatorTemp;

      // Set new D[k]
      for ( let k = 0; k < D.length; k++ ) {
        D[k] = (-1 * R[k]) + alpha * D[k];
      }

      i++;
    }

    return result;
  }

  public static rowEcholonForm(matrixA : number[][], matrixB : number[]) : number[] {
    matrixA = matrixA.map((row, idx) => row.concat(matrixB[idx]));
    function rref(mat: number[][]) {
      let lead = 0;
      for (let r = 0; r < mat.length; r++) {
          if (mat[0].length <= lead) {
              return;
          }
          let i = r;
          while (mat[i][lead] == 0) {
              i++;
              if (mat.length == i) {
                  i = r;
                  lead++;
                  if (mat[0].length == lead) {
                      return;
                  }
              }
          }
  
          const tmp = mat[i];
          mat[i] = mat[r];
          mat[r] = tmp;
  
          let val = mat[r][lead];
          for (let j = 0; j < mat[0].length; j++) {
              mat[r][j] = mat[r][j] / val;
          }
  
          for (let i = 0; i < mat.length; i++) {
              if (i == r) continue;
              val = mat[i][lead];
              for (let j = 0; j < mat[0].length; j++) {
                  mat[i][j] = mat[i][j] - val * mat[r][j];
              }
          }
          lead++;
      }
      return mat;
  }
  let answer = rref(matrixA)?.map(row => row[row.length - 1])
  return answer!;
  }
}

export default Matrix;