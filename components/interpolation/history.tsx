import { useEffect, useRef, useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Card, Modal, ThemeProvider, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { NextLinkComposed } from '../../src/Link';

type Data = {
	id: number;
	time: string;
	equation: string;
	x_start: number[];
	x_end: number;
	tolerance: number;
};

export default function Page({
	isOpen,
	setOpen
}: {
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}) {
	const [data, setData] = useState<any[]>([]);

	async function getData() {
		const type = new URLSearchParams(window.location.search).get('type');
		console.log(type);

		if ( type == null ) return;

		const res = await fetch(
			'http://localhost:3000/api/interpolation/list?' +
				new URLSearchParams({
					type: type!
				}),
			{
				method: 'GET'
			}
		);
		const json = await res.json();
		setData(json.data || []);
		// console.log(json.data);
	}

	const theme = createTheme({
		palette: {
			mode: 'dark'
		}
	});

	const count = useRef(0);
	useEffect(() => {
		if (count.current === 0) getData();
		count.current++;
	}, []);
	
	useEffect(() => {
		getData();
	}, [typeof window != 'undefined' ? new URLSearchParams(window.location.search).get('type') : ""])

	return (
		<Modal
			open={isOpen}
			onClose={() => setOpen(!isOpen)}
			aria-labelledby="child-modal-title"
			aria-describedby="child-modal-description"
			className="overflow-scroll pt-20"
		>
			<Card className={`text-md mx-auto w-11/12 max-w-5xl `}>
				<h1 className="border-2 border-solid border-black py-4 text-center text-4xl font-bold">
					History
				</h1>
				<ul>
					{data.length != 0 ? (
						data.map((record) => {
							return (
								<li
									className="relative border-2 border-t-0 border-solid border-black p-4"
									key={record.id}
								>
									<InlineMath>{`\\text{${new Date(record.time).toLocaleDateString('EN-th', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
										second: 'numeric'
									})}}`}</InlineMath>
									<br />
									<br />
									<InlineMath>{`\\text{number of point = ${record.numberOfPoint}}`}</InlineMath>
									<br />
									<br />
									<InlineMath>{`\\text{x to find = ${record.xToFind}}`}</InlineMath>
									<br />
									<br />
									<InlineMath>{`\\text{answer = ${record.answer}}`}</InlineMath>
									<br />
									<br />
									<div className="overflow-scroll">
										<InlineMath>{`\\text{x = } \\begin{bmatrix} ${JSON.stringify(record.x)
											.replace('[', '')
											.replace(']', '')
											.replaceAll(',', '&')}  \\end{bmatrix}`}</InlineMath>
										<br />
										<br />
										<InlineMath>{`\\text{y = } \\begin{bmatrix} ${JSON.stringify(record.y)
											.replace('[', '')
											.replace(']', '')
											.replaceAll(',', '&')}  \\end{bmatrix}`}</InlineMath>
									</div>

									<ThemeProvider theme={theme}>
										<Button
											variant="contained"
											component={NextLinkComposed}
											to={{
												pathname: location.protocol + '//' + location.host + location.pathname,
												query: {
													type: new URLSearchParams(window.location.search).get('type'),
													id: record.id
												}
											}}
											onClick={() => setOpen(!isOpen)}
											className="absolute right-5 top-1/2 -translate-y-1/2"
										>
											Get To
										</Button>
									</ThemeProvider>
								</li>
							);
						})
					) : (
						<li>
							<h1 className="p-4 text-center text-2xl">No History (You should make one 😉.)</h1>
						</li>
					)}
				</ul>
			</Card>
		</Modal>
	);
}
