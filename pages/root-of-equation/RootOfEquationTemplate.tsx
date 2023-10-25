import 'katex/dist/katex.min.css';
import Column from './Class/Column';
import SetOfResult from './Class/SetOfResult';
import { InlineMath, BlockMath } from 'react-katex';
import { Button, Card, TextField } from '@mui/material';
import StickyHeadTable from '@/components/ui/DataTable';
import dynamic from 'next/dynamic';
import Modal from '@/components/ui/Modal'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface Page {
	answer: string[];
	equation: string;
	columns: Column[];
	result: SetOfResult[];
	numberOfIteration: number;
	setEquation: (value: string) => void;
	eventHandler: (value: any) => void;
	coordinate: { xCoor: number[]; yCoor: number[] };
	modal: { open: boolean; 
					 setOpen: (value : boolean) => void; 
					 modalContent : { header : string, 
														description : string } };
}

function Template({
	eventHandler,
	setEquation,
	result,
	columns,
	equation,
	coordinate: { xCoor, yCoor },
	modal: { open, setOpen, modalContent }
}: Page) {

	return (
		<>
			<div
				className="text-black"
			>

				<div className="mx-auto w-11/12 max-w-xl text-xl gap-4 flex flex-col">

					<StickyHeadTable result={result} attributes={columns} />

				</div>
				
			</div>

			<Modal open={ open }
						 setOpen={ setOpen }
						 modalContent={ modalContent }
						 />
		</>
	);
}

export default Template;
