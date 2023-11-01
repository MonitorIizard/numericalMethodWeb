import Point from "./Point";

export default class Data {
  isChecked: boolean;
  point: Point;
  constructor(isChecked : boolean,point: Point) {
    this.point = point;
    this.isChecked = isChecked;
  }
}