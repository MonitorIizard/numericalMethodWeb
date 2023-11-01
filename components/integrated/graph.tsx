import React from 'react';
import dynamic from 'next/dynamic';
import Point from '@/class/interpolation/Point';
import { Data } from 'plotly.js';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

type GraphProps = {
  graph?: Point[];
}

export default function Graph({graph} : GraphProps) {
  const dataProps : Data[] = [];
  // const dataProps : Data[] = Array.from({length : largrangGraph?.length ? largrangGraph?.length : 0 }, (v, i) => {
  //   return { 
  //   x: largrangGraph![i].map((point) => point.x[0]),
  //   y: largrangGraph![i].map((point) => point.y),
  //   name: `f(x) = L${i+1}*f(${i+1})`,
  //   type: 'scatter',
  //   marker: {color: `${Math.floor(Math.random() * 0xffffff).toString(16)}`},
  // }
  
  return (
    <div>
       <Plot
        data={dataProps.concat([
          {
            x: graph?.map((point) => point.x[0]),
            y: graph?.map((point) => point.y),
            name: 'Graph',
            mode: 'lines',
            type: 'scatter',
            fill: 'tonexty',
            marker: {color: 'red', size : 12},
            line : {width : 6}
          }
        ])
        }

        layout={ {width: 600, height: 600, title: 'Graph🤯'} }
      />
    </div>
  )
}