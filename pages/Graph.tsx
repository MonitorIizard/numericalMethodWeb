import { Card } from '@mui/material';
import { Mafs, Coordinates, Text, Plot, Theme, Point } from 'mafs';
import { evaluate } from 'mathjs';
import { useEffect } from 'react';

interface PlotEquation {
	step: number;
	domain: number[];
	range: number[];
	equation: string[];
	point: { x: number; y: number };
}

function PlotGraph({ step, domain, range, equation, point }: PlotEquation) {
	// const step = 10;
	// const domain: number[] = [-100, 100];
	// const range = [-100, 100];
	// const equation = (x: number) => {
	// 	return x + 100;
	// };]

	return (
		<>
			<Card>
				<Mafs
					viewBox={{ x: [domain[0], domain[1]], y: [range[0], range[1]] }}
					preserveAspectRatio={false}
				>
					<Coordinates.Cartesian
						xAxis={{
							lines: step,
							labels: (n) => (n % step == 0 ? n : '')
						}}
						yAxis={{
							lines: step,
							labels: (n) => (n % step == 0 ? n : '')
						}}
					/>
					//* props here
					{
						equation.map( element => {
							return <Plot.OfX y={(x: number) => evaluate(element, { x })} color={Theme.pink} key={element}/>
						 })
					}
					
					<Text x={point.x} y={point.y} attach="n" size={20}>
						{(!Number.isNaN(Number(point.x)) ? Number(point.x) : 0).toFixed(3)},{(!Number.isNaN(Number(point.y)) ? Number(point.y) : 0).toFixed(3)}
						{/* {point.x}, {point.y} */}
					</Text>
					<Point x={point.x} y={point.y} />
				</Mafs>
			</Card>
		</>
	);
}

export default PlotGraph;
