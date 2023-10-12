import { useState } from 'react';
import SetOfResult from '../Class/SetOfResult';
import Template from '../RootOfEquationTemplate';
import GraphicalMethod from '../Class/GraphicalMethod';
import Column from '../Class/Column';
import { evaluate } from 'mathjs';

function Page() {
	const [equation, setEquation] = useState<string>(' ');
	const [xStart, setxStart] = useState<number>(0);
	const [xEnd, setxEnd] = useState<number>(0);
	const [errorTol, setErrorTol] = useState<number>(0);
	const [answer, setAnswer] = useState<string[]>(['wait for calculate']);
	const [numberOfIteration, setNumberOfIteration] = useState<number>(0);
	const [result, setResult] = useState<SetOfResult[]>([]);
	const [xCoor, setXcoor] = useState<number[]>([]);
	const [yCoor, setYcoor] = useState<number[]>([]);
	const [open, setOpen] = useState(false);
	const [modalContent, setModalContent] = useState<{ header: string; description: string }>({
		header: 'header',
		description: 'description'
	});

	const content = {
		header: 'Graphical Method'
	};
	const columns: Column[] = [
		{ id: 'iterationNo', label: 'Iteration No.' },
		{ id: 'root', label: 'Root' },
		{ id: 'tolerance', label: 'Tolerance' }
	];

	const graphicalEquation = new GraphicalMethod({
		xStart: xStart,
		xEnd: xEnd,
		es: errorTol,
		fx: equation
	});

	const initialGraphCoor = () => {
		const xs = [];
		const ys = [];

		for (let i = xStart; i < xEnd; i += 0.001) {
			xs.push(i);
			ys.push(graphicalEquation.f(i));
		}

		setXcoor(xs);
		setYcoor(ys);
	};

	const isEquationCalculable = () => {
		let testValue = 5;
		try {
			evaluate(equation, { x: testValue });
		} catch (error) {
			return false;
		}
		return true;
	};

	const eventHandler = (e: any) => {
		e.preventDefault();

		if (!isEquationCalculable()) {
			setOpen(true);
			setModalContent( { 
				header : "Your equation is uncalculable", 
				description : "Please input new equation" });
			return;
		}

		setResult([]);

		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

		setEquation(formJson.functionInput.toString());
		setxStart(+formJson.Xstart);
		setxEnd(+formJson.Xend);
		setErrorTol(+formJson.errorTol);
		initialGraphCoor();

		graphicalEquation.solve({ setAnswer, setResult });
	};

	return (
		<>
			<Template
				eventHandler={eventHandler}
				setEquation={setEquation}
				answer={answer}
				content={content}
				numberOfIteration={numberOfIteration}
				result={result}
				columns={columns}
				equation={equation}
				coordinate={{ xCoor, yCoor }}
				modal={{ open, setOpen, modalContent }}
			/>
		</>
	);
}

export default Page;
