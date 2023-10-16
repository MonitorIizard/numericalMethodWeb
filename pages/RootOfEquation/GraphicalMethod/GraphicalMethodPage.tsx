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

	const isRangeReasonable = () => {
		console.log(xStart);
		console.log(xEnd);
		if (xStart > xEnd) {
			return false;
		}
		return true;
	}

	function eventHandler(e: any) {
		e.preventDefault();

		setOpen(false);

		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const inputEquation = formJson.functionInput.toString();
		const inputxStart = formJson.Xstart;
		const inputxEnd = formJson.Xend;
		const inputErrorTol = formJson.errorTol;


		if (!isEquationCalculable()) {
			setOpen(true);
			setModalContent( { 
				header : "Your equation is uncalculable 😡.", 
				description : "Please input new equation" });
			return;
		}
		
		if((Number.isNaN(+inputxStart) ||
				 (Number.isNaN(+inputxEnd)))) {
			console.log( Number.isNaN(+inputxEnd) );
			setOpen(true);
			setModalContent( { 
				header : "X start or X end is not a number 😡.", 
				description : "Please input new X start or X end" });
			return;
		}

		if(+inputxEnd < +inputxStart) {
			console.log("test");
			setOpen(true);
			setModalContent( { 
				header : "X start is Greater than X end 😡.", 
				description : "Please input new X start or X end \n X start must <= X end" });
			return;
		}

		if( Number.isNaN(+inputErrorTol) ){
			setOpen(true);
			setModalContent( { 
				header : "Tolerance is not number 😡.", 
				description : "Please input tolerance in number." });
			return;
		}

		if( +inputErrorTol < 0 ){
			setOpen(true);
			setModalContent( { 
				header : "Tolerance must greate than 0 😡.", 
				description : "Please input new tolerance." });
			return;
		}

		console.log("this function is not skip");

		setResult([]);

		setEquation(inputEquation);
		setxStart(+inputxStart);
		setxEnd(+inputxEnd);
		setErrorTol(+inputErrorTol);
		initialGraphCoor();

		graphicalEquation.solve({ setAnswer, setResult });
	};

	return (
		<>
			<div className='bg-green-100 w-full h-full'>
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
			</div>
		</>
	);
}

export default Page;
