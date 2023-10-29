import Matrix from "@/pages/linear-algebra/class/Matrix";
import { number } from "mathjs";

export default class Interpolation {
  public static newtonDividedDifference(x : number[], y : number[], xToFind : number) : {sum : number, answerOfC : number[]} {
    // console.log(xToFind);
    
    if ( x.length == 0 ) {
      return {sum : NaN, answerOfC : []};
    }

    let cache  : number[] = [];
    let n = x.length;

    let givenData : {x : number, y : number}[] = Array.from({length : n}, (element, idx) => {
      return { x : x[idx], y : y[idx]}
    });

    function findC(givenData : {x : number, y : number}[] , start : number , end : number ) : number {
      let key = Number(`${start}${end}`);
    
      if ( key in cache ) {
        return cache[key];
      }
      
      if( Math.abs(start - end) == 1 ) {
        let deltaY = givenData[start].y - givenData[end].y;
        return deltaY;
      }
    
      let LeftNode = findC( givenData, start + 1, end) / ( givenData[start + 1].x - givenData[end].x );
      let RightNode = findC( givenData, start, end - 1 ) / ( givenData[start].x - givenData[end - 1].x );
    
      cache[key] = RightNode;
      cache[key] = LeftNode;
    
      return RightNode - LeftNode;
    }

    function approximateX ( givenData : {x : number, y: number}[], xToFind : number ) {
      let answerOfC = [ givenData[0].y ];
      
      for( let i = 1; i < givenData.length; i++ ) {
        let currentData = givenData.slice(0, i+1);
        answerOfC[i] = findC( currentData, 0, currentData.length - 1) / (currentData[0].x - currentData[currentData.length-1].x);
        // console.log( currentData );
      }
      // console.log( answerOfC );
      let sum = answerOfC[0];
      for ( let i = 1; i < answerOfC.length; i++ ) {
        let currentSumThisTerm = 1;
        let coefficient = answerOfC[i];
          
        for ( let j = 0; j < i; j++ ) {
          currentSumThisTerm *= (xToFind - givenData[j].x);
          // console.log( `${coefficient} * (${xToFind} - ${ givenData[j].x })` );
        }   
        sum += currentSumThisTerm * coefficient;
      }
    
      return {sum, answerOfC};
    }

    return approximateX( givenData, xToFind );
  }

  public static largrange(x : number[], y : number[], xToFind:number) {
    let Llist = [];
    let n = x.length;
    let fx = 0;
    for ( let i = 0; i < n; i++ ) {
      let l = 1;
      for ( let j = 0; j < n; j++ ) {
    
        if ( j == i ) continue;
    
        l *= (xToFind - x[j]) / ( x[i] - x[j] );
      }
      fx += l * y[i];
    
      Llist[i] = l;
    }
    return { fx, Llist };
  }

  public static linearSpline(x : number[], y : number[], xToFind : number ) {
    let prevCoordinate = { x : x[0] , y : y[0] };
    let answer = 0;
    let n = x.length;

    for ( let i = 1; i < n; i++ ) {
      let currentCoordinate = { x : x[i], y : y[i] };
      if ( xToFind <= currentCoordinate.x ) {
        let m = (currentCoordinate.y - prevCoordinate.y) / (currentCoordinate.x - prevCoordinate.x);
        let c = prevCoordinate.y;
        let deltaX = xToFind - prevCoordinate.x;
        answer = m * deltaX + c;
        break;
      }
      
      prevCoordinate = currentCoordinate;
    }

    return answer;
  }

  public static quadraticSpline(x : number[], y : number[], xToFind : number ) {

    if ( x.length == 2 ) {
      let b = (y[1] - y[0]) / (x[1] - x[0]);
      return {answer : this.linearSpline(x, y, xToFind), matrixX : [b, y[0]]};
    }

    function initializeMatrixB( y : number[] ) {
      let matrixB = [];
      let n = y.length;
      for ( let i = 1; i < n - 1; i++ ) {
        matrixB.push(y[i]);
        matrixB.push(y[i]);
      }
      
      matrixB.push(y[0]);
      matrixB.push(y[n - 1]);
      
      for ( let i = 1; i < n - 1; i++ ) {
        matrixB.push(0);
      }
      // n - 1 condition

      return matrixB;
    } 

    function initializeMatrixA( setOfx : number[] ) {
      let MatrixA : number[][] = [];
      let n = setOfx.length - 1;
      let lastIndexOfsetOfx = n - 1;
      for ( let i = 0; i < 3*n - 1; i++ ) {
        MatrixA.push([]);
        
        for ( let j = 0; j < 3*n - 1; j++ ) {
          MatrixA[i].push(0);
        }
      }
    
      let lastIndexOfM = MatrixA.length - 1;
      
      let coorBetweenStart_End = setOfx.slice( 1, n );
      let x = 1;
      let currentLevel = 0;
      
      // between condition 
      let k = 0;
      for ( currentLevel = 0; currentLevel < 2*(n - 1); currentLevel++ ) {
        if ( x == 2 ) {
          k++;
          x = 0;
        }
    
        let j = (Math.ceil((currentLevel) / 2) * 3 ) - 1;
        k =  Math.floor(currentLevel/2);
        
        if ( currentLevel == 0 ) {
          MatrixA[currentLevel][0] = coorBetweenStart_End[ k ];
          MatrixA[currentLevel][1] = 1;
          continue;
        }
    
        // console.log( j );
        MatrixA[currentLevel][j] = Math.pow(coorBetweenStart_End[k], 2);
        MatrixA[currentLevel][j+1] = coorBetweenStart_End[k], 2;
        MatrixA[currentLevel][j+2] = 1;
      }

      currentLevel--;

      // 2 close and end condition
      MatrixA[++currentLevel][0] = setOfx[0];
      MatrixA[currentLevel][1] = 1;
    
      MatrixA[++currentLevel][lastIndexOfM - 2] = Math.pow(setOfx[n], 2);
      MatrixA[currentLevel][lastIndexOfM - 1] = setOfx[n];
      MatrixA[currentLevel++][lastIndexOfM] = 1;
    
      // console.log( currentLevel, lastIndexOfM - 2 );
    
      // console.log( coorBetweenStart_End );
      //slope 
      let offSet = -1;
      for ( let f = 0; f < MatrixA.length - currentLevel; f++ ) {
        if ( f == 0 ) {
          MatrixA[currentLevel + f][0] = 1;
          MatrixA[currentLevel + f][2] = -2 * coorBetweenStart_End[f];
          MatrixA[currentLevel + f][3] = -1;
        } else {
          offSet += 3;
          MatrixA[currentLevel + f][offSet] = 2 * coorBetweenStart_End[f];
          MatrixA[currentLevel + f][offSet + 1] = 1;
          MatrixA[currentLevel + f][offSet + 3] = -2 * coorBetweenStart_End[f];
          MatrixA[currentLevel + f][offSet + 4] = -1;
        }
        // console.log(f);
      }
      //   // console.log(f);

      currentLevel++;

      return MatrixA;
    }

    let matrixA = initializeMatrixA( x );
    let matrixB = initializeMatrixB( y );

    let matrixX = Matrix.rowEcholonForm(matrixA, matrixB);

    let answer : number = 0;

    let matrixX2 : number[][] = [];
    for ( let i = 0, j = 0; i < matrixX.length; ) {
          
      if ( i < 2 ) {
        matrixX2.push([]);
        matrixX2[j].push(matrixX[0]);
        matrixX2[j].push(matrixX[1]);
        j++;
        i+= 2;
      }

      if ( i >= 2 ) {
        matrixX2.push([]);
        matrixX2[j].push(matrixX[i]);
        matrixX2[j].push(matrixX[i+1]);
        matrixX2[j].push(matrixX[i+2]);
        j++;
        i+=3;
      }
    }

    for ( let i = 1; i < x.length; i++ ) {
      if ( xToFind < x[i] && i <= 1) {
        let Bx = matrixX[0] * xToFind;
        let C = matrixX[1];
        answer = Bx + C;
        break;
      }

      if ( xToFind < x[i] && i >= 2) {
        let Ax2 = matrixX2[i-1][0] * Math.pow(xToFind, 2);
        let Bx = matrixX2[i-1][1] * xToFind;
        let C = matrixX2[i-1][2];
        answer = Ax2 + Bx + C;
        break;
      }
    }

    return {answer, matrixX};
  }

  public static cubricSpline(setOfx:number[], setOfy : number[], xToFind : number ) {
    const matrixA = [];
		const matrixB = [];
    let n = setOfx.length - 1;
		// value of interior knots (n - 1 knots)
		// each knots have 2 functions
		for (let i = 1; i < n; i++) {
			const rowMatrix: number[] = [];
			const x = setOfx[i];
			const y = setOfy[i];

			for (let j = 0; j < 4 * (i - 1); j++) rowMatrix.push(0);
			rowMatrix.push(x * x * x);
			rowMatrix.push(x * x);
			rowMatrix.push(x);
			rowMatrix.push(1);
			for (let j = 0; j < 4 * (n - i); j++) rowMatrix.push(0);
			matrixA.push(rowMatrix);
			matrixB.push(y);

			const rowMatrix2: number[] = [];
			for (let j = 0; j < 4 * (i - 1) + 4; j++) rowMatrix2.push(0);
			rowMatrix2.push(x * x * x);
			rowMatrix2.push(x * x);
			rowMatrix2.push(x);
			rowMatrix2.push(1);
			for (let j = 0; j < 4 * (n - i - 1); j++) rowMatrix2.push(0);
			matrixA.push(rowMatrix2);
			matrixB.push(y);
		}

		// value of end knots (2 knots)
		{
			const rowMatrix: number[] = [];
			const x = setOfx[0];
			const y = setOfy[0];
			rowMatrix.push(x * x * x);
			rowMatrix.push(x * x);
			rowMatrix.push(x);
			rowMatrix.push(1);
			for (let j = 0; j < 4 * (n - 1); j++) rowMatrix.push(0);
			matrixA.push(rowMatrix);
			matrixB.push(y);

			const rowMatrix2: number[] = [];
			for (let j = 0; j < 4 * (n - 1); j++) rowMatrix2.push(0);
			const x2 = setOfx[n];
			const y2 = setOfy[n];
			rowMatrix2.push(x2 * x2 * x2);
			rowMatrix2.push(x2 * x2);
			rowMatrix2.push(x2);
			rowMatrix2.push(1);
			matrixA.push(rowMatrix2);
			matrixB.push(y2);
		}

		// first derivative of interior knots (n - 1 knots)
		for (let i = 1; i < n; i++) {
			const rowMatrix: number[] = [];
			const x = setOfx[i];

			for (let j = 0; j < 4 * (i - 1); j++) rowMatrix.push(0);
			rowMatrix.push(3 * x * x);
			rowMatrix.push(2 * x);
			rowMatrix.push(1);
			rowMatrix.push(0);
			rowMatrix.push(-3 * x * x);
			rowMatrix.push(-2 * x);
			rowMatrix.push(-1);
			rowMatrix.push(0);
			for (let j = 0; j < 4 * (n - i - 1); j++) rowMatrix.push(0);
			matrixA.push(rowMatrix);
			matrixB.push(0);
		}

		// second derivative of interior knots (n - 1 knots)
		for (let i = 1; i < n; i++) {
			const rowMatrix: number[] = [];
			const x = setOfx[i];

			for (let j = 0; j < 4 * (i - 1); j++) rowMatrix.push(0);
			rowMatrix.push(6 * x);
			rowMatrix.push(2);
			rowMatrix.push(0);
			rowMatrix.push(0);
			rowMatrix.push(-6 * x);
			rowMatrix.push(-2);
			rowMatrix.push(0);
			rowMatrix.push(0);
			for (let j = 0; j < 4 * (n - i - 1); j++) rowMatrix.push(0);
			matrixA.push(rowMatrix);
			matrixB.push(0);
		}

		// second derivative of end knots equals zero (2 knots)
		{
			const rowMatrix: number[] = [];
			rowMatrix.push(6 * setOfx[0]);
			rowMatrix.push(2);
			rowMatrix.push(0);
			rowMatrix.push(0);
			for (let j = 0; j < 4 * (n - 1); j++) rowMatrix.push(0);
			matrixA.push(rowMatrix);
			matrixB.push(0);

			const rowMatrix2: number[] = [];
			for (let j = 0; j < 4 * (n - 1); j++) rowMatrix2.push(0);
			rowMatrix2.push(6 * setOfx[n]);
			rowMatrix2.push(2);
			rowMatrix2.push(0);
			rowMatrix2.push(0);
			matrixA.push(rowMatrix2);
			matrixB.push(0);
		}

		const matrixX : number[] = Matrix.rowEcholonForm(matrixA, matrixB);
    let  answer = 0;
    for ( let i = 0; i < n; i++ ) {
      const a = matrixX[4*i];
      const b = matrixX[4*i + 1];
      const c = matrixX[4*i + 2];
      const d = matrixX[4*i + 3];
      if ( xToFind <= setOfx[i+1] ) {
        answer = a * Math.pow(xToFind, 3) + b * Math.pow(xToFind, 2) + c * xToFind + d;
        break;
      }
    }
    return {answer, matrixX};
  }

}