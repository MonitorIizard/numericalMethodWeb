import 'katex/dist/katex.min.css';
import Column from './Class/Column';
import SetOfResult from './Class/SetOfResult';
import { InlineMath, BlockMath } from 'react-katex';
import { Button, Card, TextField } from '@mui/material';
import StickyHeadTable from '@/components/ui/DataTable';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import dynamic from 'next/dynamic';
import Modal from '@/components/ui/Modal'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface Page {
	answer: string[];
	equation: string;
	columns: Column[];
	result: SetOfResult[];
	numberOfIteration: number;
	content: { header: string };
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
	content,
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
				<h1 className="text-center text-3xl font-bold my-8">{content.header}</h1>

				<div className="mx-auto w-11/12 max-w-xl text-xl gap-4 flex flex-col">
					<Card variant="outlined" className=" p-8">
						<InlineMath math={`f(x) = ${equation}`} />
					</Card>

					<Card variant="outlined" className=" p-8">
						<div>
							<form
								className="flex flex-wrap  gap-2"
								action=""
								onSubmit={(e) => {
									eventHandler(e);
								}}
							>
								<TextField
									id="outlined-basic"
									label="f(x) = "
									variant="outlined"
									name="functionInput"
									fullWidth
									size="medium"
									onChange={(e) => {
										setEquation(e.currentTarget.value);
									}}
									required
								/>

								<div className="flex w-full gap-2">
									<TextField
										id="outlined-basic"
										label="X start"
										variant="outlined"
										name="Xstart"
										fullWidth
										required
									/>
									<TextField
										id="outlined-basic"
										label="X end"
										variant="outlined"
										name="Xend"
										fullWidth
										required
									/>
								</div>

								<TextField
									id="outlined-basic"
									label="Tolerance"
									variant="outlined"
									name="errorTol"
									fullWidth
									required
								/>

								<Button
									variant="contained"
									type="submit"
									className="mx-auto mt-4 w-1/2 bg-black"
									startIcon={<CalculateRoundedIcon />}
									size="large"
								>
									Calculate 😉
								</Button>
							</form>
						</div>
					</Card>

					
					<StickyHeadTable result={result} attributes={columns} />

					<Card>
						<div className='flex justify-center'>
							<Plot
								data={[
									{
										x: xCoor,
										y: yCoor,
										type: 'scatter',
										mode: 'lines',
										marker: { color: 'red' }
									}
								]}
								layout={{title: 'Graph' , width: 500, height: 500 }}
							/>
						</div>
					</Card>
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
