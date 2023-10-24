class Record{
  iterationNo : number;
  value : number;
  x : string;
  tolerance : number;
  id : string;

  constructor(iterationNo : number,  x : string, value : number, tolerance : number) {
    this.id = `${x}-${iterationNo}`;
    this.iterationNo = iterationNo;
    this.x = x;
    this.value = value;
    this.tolerance = tolerance;
  }
}

export default Record;