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
}