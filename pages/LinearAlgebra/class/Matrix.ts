import {det} from "mathjs";

class Matrix {
  matrix : number[][] | number[];

  constructor( matrix : number[][] | number[] ) {
    this.matrix = matrix;
  }

  // public static determinant(matrix: number[][]): number {
  //   if (matrix.length === 1) {
  //     return matrix[0][0];
  //   }

  //   let det = 0;

  //   for (let i = 0; i < matrix.length; i++) {
  //     const subMatrix = matrix
  //       .slice(1)
  //       .map((row) => row.filter((_, idx) => idx !== i));

  //     det += Math.pow(-1, i) * matrix[0][i] * Matrix.determinant(subMatrix);
  //   }

  //   return det;
  // }

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
}

export default Matrix;