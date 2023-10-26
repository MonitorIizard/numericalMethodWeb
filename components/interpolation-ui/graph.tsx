import React from 'react';
import dynamic from 'next/dynamic';
import Point from '@/pages/interpolation/class/Point';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

type GraphProps = {
  graph: Point[];
  points: Point[];
  answerPoint : Point;
}

export default function Graph({graph, points, answerPoint} : GraphProps) {
  return (
    <div>
       <Plot
        data={[
          {
            x: graph.map((point) => point.x[0]),
            y: graph.map((point) => point.y),
            name: 'Graph',
            type: 'scatter',
            marker: {color: 'red'},
          },
          {
            x : points.map((point) => point.x[0]),
            y : points.map((point) => point.y),
            type: 'scatter',
            mode: 'text+markers',
            name : 'Given Data',
            marker : {size : 12 },
            text: points.map((point) => `(${point.x[0]}, ${point.y})`),
            textposition: 'top center',
          },
          {
            x : [answerPoint.x[0]],
            y : [answerPoint.y],
            type: 'scatter',
            mode: 'text+markers',
            name : 'Answer',
            marker : {size : 12, color: 'green' },
            text: [`(${answerPoint.x}, ${answerPoint.y})`],
            textposition: 'top center',
          }
        ]}
        layout={ {width: 600, height: 600, title: 'Graph🤯'} }
      />
    </div>
  )
}