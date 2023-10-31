import CalculateIcon from '@mui/icons-material/Calculate';
import { Button, Card, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from 'react';
import InputData from '../../class/derivative-class/InputData';

class Direction {
  label: string;
  value: string;
  accuracy: string[];

  constructor(label: string, value: string, accuracy: string[]) {
    this.label = label;
    this.value = value;
    this.accuracy = accuracy;
  }
};

type Props = {
  setInputData: (value : InputData ) => void;
}

export default function Page( {setInputData} : Props ) {
	const derivativeOrder = [
		{ label: 'First', value: 'first-derivative' },
		{ label: 'Second', value: 'second-derivative' },
		{ label: 'Third', value: 'third-derivative' },
		{ label: 'Fourth', value: 'fourth-derivative' }
	];
	const directions = [
		{ label: 'Forward', value: 'forward_finite-divided-difference', accuracy : ['h', 'h^2'] },
		{ label: 'Backward', value: 'backward_finite-divided-difference', accuracy : ['h', 'h^2']},
		{ label: 'Central', value: 'centered_finite-divided-difference', accuracy : ['h^2', 'h^4'] }
	];

	const [xToFind, setXToFind] = useState<string>('');
  const [h, setH] = useState<string>('');
	const [equation, setEquation] = useState<string>('');
	const [accuracyValue, setAccuracyValue] = useState<string>('');
	const [directionValue, setDirectionValue] = useState<Direction>(new Direction('', '', []));
	const [derivativeOrderValue, setDerivativeOrderValue] = useState<string>('');

  const inputData = {
    xToFind : Number(xToFind),
    equation,
    accuracy : accuracyValue,
    direction : directionValue.value,
    order : derivativeOrderValue,
    h : Number(h)
  }

	const handleChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;

		if (name == 'order') {
			setDerivativeOrderValue(value as string);
		}

		if (name == 'direction') {
      let index = directions.findIndex((direction) => direction.label == value);
			setDirectionValue(directions[index]);
		}

		if (name == 'accuracy') {
			setAccuracyValue(value as string);
		}
	};

  function sendData() {
    setInputData(inputData);
  };

	return (
		<Card className="flex w-11/12 max-w-xl flex-col gap-4 p-4 text-black">
			<div className="text-bold text-xl">
				<InlineMath>{`f(x) = ${equation}`}</InlineMath>
			</div>

			<div className="flex">
				<TextField
					fullWidth
					label="Eqution"
					name="equation"
					value={equation}
					onChange={(e) => setEquation(e.target.value)}
				/>
				<TextField
					className="w-32"
					fullWidth
					label="x to find"
					name="equation"
					onChange={(e) => setXToFind(e.target.value)}
				/>
        <TextField
					className="w-32"
					fullWidth
					label="step"
					name="step"
					onChange={(e) => setH(e.target.value)}
				/>
			</div>

			<div className="flex">
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Derivative Order</InputLabel>
					<Select
						fullWidth
						id="derivateOrder"
						label="Derivative Order"
						labelId="Derivative Order"
						value={derivativeOrderValue}
						onChange={handleChange}
						name="order"
						required
					>
						{derivativeOrder.map((element, index) => (
							<MenuItem key={index} value={element.value}>
								{element.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth disabled={derivativeOrderValue == ''}>
					<InputLabel id="demo-simple-select-label">Direction</InputLabel>
					<Select
						fullWidth
						id="derivateOrder"
						label="Derivative Order"
						labelId="Derivative Order"
						value={directionValue.label}
						name="direction"
						onChange={handleChange}
						required
					>
						{directions.map((direction, index) => (
							<MenuItem key={index} value={direction.label}>
								{direction.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth disabled={directionValue.value == ''}>
					<InputLabel id="demo-simple-select-label">Accuracy</InputLabel>
					<Select
						fullWidth
						id="derivateOrder"
						label="Derivative Order"
						labelId="Derivative Order"
						value={accuracyValue}
						name="accuracy"
						onChange={handleChange}
						required
					>
						{directionValue.accuracy.map((acc, index) => (
							<MenuItem key={index} value={acc}>
								{' '}
								<InlineMath>{acc}</InlineMath>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			<Button className="bg-green-500 text-white hover:bg-green-600" type="submit" onClick={sendData}>
				Calculate <CalculateIcon />
			</Button>
		</Card>
	);
}
