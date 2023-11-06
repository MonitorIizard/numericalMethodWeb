import { Button, Card, Checkbox, TextField } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Point from '@/class/interpolation/Point';
import { useState, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Data from '@/class/interpolation/Data';
import HistoryIcon from '@mui/icons-material/History';
import History from './history';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';

type Props = {
	setInputData?: (value: { data: Data[]; target: number; mOrder: number }) => void;
	m?: boolean;
};

export default function Input({ setInputData, m }: Props) {
	let givenData = [
		new Point([3], 2.5),
		new Point([4.5], 1),
		new Point([7], 2.5),
		new Point([9], 0.5)
	];
	const [numberOfPoint, setNumberOfPoint] = useState<number>(4);
	const [data, setData] = useState<Data[]>(
		givenData.map((element, index) => new Data(false, element))
	);
	const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
	const [xToFind, setXToFind] = useState<number>(5);
	const [mOrder, setMOrder] = useState<number>(2);
	const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
	const numberOfPointRef = React.useRef<number>(4);

	function resize(e: any) {
		const value = Number(e.target.value);

		e.preventDefault();

		setNumberOfPoint((prev) => {
			if (value <= 0) {
				numberOfPointRef.current = 0;
				return prev;
			}
			numberOfPointRef.current = value;
			return value;
		});

		setData((prev) => {
			// console.log(prev.length);
			console.log(prev);
			if (prev.length < value) {
				const next = [...prev];
				for (let i = prev.length; i < value; i++) {
					next.push(new Data(false, new Point([NaN], NaN)));
				}
				return next;
			}
			return prev;
		});
	}

	function onChangeHandle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		// console.log(value);

		if (name.includes('Find')) {
			setXToFind(Number(value));
			// console.log(name);
		}

		if (name.includes('x')) {
			const i = Number(name.slice(1));
			setData((prev) => {
				const next = [...prev];
				next[i].point.x[0] = Number(value);
				return next;
			});
		}

		if (name.includes('y')) {
			const i = Number(name.slice(1));
			setData((prev) => {
				const next = [...prev];
				next[i].point.y = Number(value);
				return next;
			});
		}

		if (name.includes('c')) {
			const i = Number(name.slice(1));
			setData((prev) => {
				const next = [...prev];
				next[i].isChecked = !next[i].isChecked;
				return next;
			});
		}

		if (name.includes('morder')) {
			if (Number(value) < 1) return;
			setMOrder(Number(value));
		}
	}

	function markAll(e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setData((prev) => {
			const next = [...prev];
			next.forEach((data) => {
				data.isChecked = !isCheckAll;
			});
			return next.splice(0, numberOfPointRef.current);
		});

		setIsCheckAll((prev) => !prev);
		// setInputData && setInputData({ data : data.filter((row) => row.isChecked), xToFind});
	}

	function submitData() {
		setInputData &&
			setInputData({ data: data.filter((row) => row.isChecked), target: xToFind, mOrder });
	}

	async function fetchSolution() {
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const res = await fetch(
			'http://localhost:3000/api/interpolation/get?' +
				new URLSearchParams({
					id: id
				}).toString(),
			{
				method: 'GET'
			}
		);

		const json = await res.json();
		const data = json.data[0];

		return data;
	}

	useEffect(() => {
		const setResourceData = async () => {
			const id = new URLSearchParams(window.location.search).get('id');

			if (id === null) return;

			const data = await fetchSolution();
			let x = data.x;
			let y = data.y;
			let numPoint = data.numberOfPoint;

			let structureDataFetch = Array.from({length : numPoint}, (_, idx) => new Data(false, new Point([x[idx]], y[idx])) );

			numberOfPointRef.current = numPoint;
			setNumberOfPoint(numPoint);
			setData(structureDataFetch);

			if ( isCheckAll !== true ) markAll();

			// setInputData({structureDataFetch, target, 0});
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

	return (
		<Card className="w-11/12 max-w-xl p-4">
			<div className="sticky flex">
				<div
					className=" absolute right-0 top-0 z-50 -translate-y-1/2"
					onClick={() => setIsHistoryOpen((prev) => !prev)}
				>
					<HistoryIcon className="fill-black " />
				</div>
				<TextField
					className=""
					label="X to Find f(x)"
					type="number"
					name="Find"
					required
					value={xToFind}
					onChange={(e) => onChangeHandle(e)}
					fullWidth
				/>
				{m && (
					<TextField
						label="m order"
						type="number"
						name="morder"
						className="w-60"
						required
						value={mOrder}
						onChange={(e) => onChangeHandle(e)}
						fullWidth
					/>
				)}
				<TextField
					className="w-60"
					label="Number of Point"
					required
					type={'number'}
					name="numberOfPoint"
					value={numberOfPointRef.current}
					onChange={(e) => resize(e)}
				/>
			</div>

			<div className="flex items-center justify-center">
				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow className="text-black">
								<TableCell size="small" align="center" className="w-10">
									<Checkbox checked={isCheckAll} onChange={(e) => markAll(e)} />
								</TableCell>
								<TableCell size="small" align="center">
									{' '}
									<InlineMath> Point </InlineMath>
								</TableCell>
								<TableCell size="small" align="center">
									<InlineMath>X</InlineMath>
								</TableCell>
								<TableCell size="small" align="center">
									<InlineMath>Y</InlineMath>
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data.slice(0, numberOfPoint).map((row, index) => {
								return (
									<TableRow
										className={row.isChecked ? 'color-white bg-slate-300' : ''}
										key={`row=${index}`}
									>
										<TableCell size="small" align="center" className="w-10">
											<Checkbox
												onChange={(e) => onChangeHandle(e)}
												checked={row.isChecked}
												name={`c${index}`}
											/>
										</TableCell>
										<TableCell size="small" align="center">
											{index + 1}
										</TableCell>
										<TableCell size="small" align="center">
											<TextField
												className=""
												label={`x${index + 1}`}
												name={`x${index}`}
												value={Number.isNaN(row.point.x[0]) ? '' : row.point.x[0]}
												required
												onChange={(e) => onChangeHandle(e)}
											/>
										</TableCell>
										<TableCell size="small" align="center">
											<TextField
												className=""
												label={`y${index + 1}`}
												value={Number.isNaN(row.point.y) ? '' : row.point.y}
												name={`y${index}`}
												required
												onChange={(e) => onChangeHandle(e)}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<Button
				variant="contained"
				type="submit"
				className="mx-auto mt-4 bg-black"
				startIcon={<CalculateRoundedIcon />}
				size="large"
				onClick={() => submitData()}
				fullWidth
			>
				Calculate 😉
			</Button>

			<History isOpen={isHistoryOpen} setOpen={setIsHistoryOpen} />
		</Card>
	);
}
