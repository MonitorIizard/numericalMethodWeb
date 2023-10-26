import React from 'react';
import dynamic from 'next/dynamic';
import Point from '@/pages/interpolation/class/Point';
import { Data, Datum, PlotMarker, PlotType } from 'plotly.js';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

type GraphProps = {
  graph?: Point[];
  points?: Point[];
  answerPoint? : Point;
  largrangGraph? : Point[][];
}

// type DataProps = {
//   x?: Datum[];
//   y?: Datum[];
//   name?: string;
//   type?: PlotType;
//   marker?: Partial<PlotMarker>;
// }

export default function Graph({graph, points, answerPoint, largrangGraph} : GraphProps) {

  const dataProps : Data[] = Array.from({length : largrangGraph?.length ? largrangGraph?.length : 0 }, (v, i) => {
    return { 
    x: largrangGraph![i].map((point) => point.x[0]),
    y: largrangGraph![i].map((point) => point.y),
    name: `f(x) = L${i+1}*f(${i+1})`,
    type: 'scatter',
    marker: {color: `${Math.floor(Math.random() * 0xffffff).toString(16)}`},
  }
  
})
  return (
    <div>
       <Plot
        data={dataProps.concat([
          {
            x: graph?.map((point) => point.x[0]),
            y: graph?.map((point) => point.y),
            name: 'Largrange Graph',
            mode: 'lines',
            type: 'scatter',
            marker: {color: 'red', size : 12},
            line : {width : 6}
          }
          ,
          {
            x : points?.map((point) => point.x[0]),
            y : points?.map((point) => point.y),
            type: 'scatter',
            mode: 'text+markers',
            name : 'Given Data',
            marker : {size : 12 },
            text: points?.map((point) => `(${point.x[0]}, ${point.y})`),
            textposition: 'top center',
          },
          {
            x : [answerPoint?.x[0] ? answerPoint?.x[0] : 0],
            y : [answerPoint?.y? answerPoint?.y : 0],
            type: 'scatter',
            mode: 'text+markers',
            name : 'Answer',
            marker : {size : 12, color: 'green' },
            text: [`(${answerPoint?.x}, ${answerPoint?.y})`],
            textposition: 'top center',
          }
        ])}

        // data={[
        //   {
        //     x: graph?.map((point) => point.x[0]),
        //     y: graph?.map((point) => point.y),
        //     name: 'Graph',
        //     type: 'scatter',
        //     marker: {color: 'red'},
        //   }
        //   ,
        //   {
        //     x : points?.map((point) => point.x[0]),
        //     y : points?.map((point) => point.y),
        //     type: 'scatter',
        //     mode: 'text+markers',
        //     name : 'Given Data',
        //     marker : {size : 12 },
        //     text: points?.map((point) => `(${point.x[0]}, ${point.y})`),
        //     textposition: 'top center',
        //   },
        //   {
        //     x : [answerPoint?.x[0] ? answerPoint?.x[0] : 0],
        //     y : [answerPoint?.y? answerPoint?.y : 0],
        //     type: 'scatter',
        //     mode: 'text+markers',
        //     name : 'Answer',
        //     marker : {size : 12, color: 'green' },
        //     text: [`(${answerPoint?.x}, ${answerPoint?.y})`],
        //     textposition: 'top center',
        //   }
        // ]}

        layout={ {width: 600, height: 600, title: 'Graph🤯'} }
      />
    </div>
  )
}