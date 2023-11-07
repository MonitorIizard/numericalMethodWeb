import { Button, Card, Checkbox, TextField } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Point from '@/class/interpolation/Point';
import { useState, useEffect, useRef } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Data from '@/class/interpolation/Data';
import History from './history';
import HistoryIcon from '@mui/icons-material/History';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';

type Props = {
	setInputData?: (value: { data: Data[]; target: number[] }) => void;
};

export default function Input({ setInputData }: Props) {
	const [numberOfPoint, setNumberOfPoint] = useState<number>(4);
	const numberOfPointRef = React.useRef<number>(4);
	const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
	const isCheckAllRef = useRef<boolean>(false);
	const [xToFind, setXToFind] = useState<number[]>(Array.from({ length: 2 }, () => NaN));
	const [numberOfx, setNumberOfx] = useState<number>(2);
	const [data, setData] = useState<Data[]>( () => {
		return Array.from({ length: numberOfPoint }, () => {
			let boxOfX = Array.from({ length: numberOfx }, () => NaN);
			return new Data(false, new Point(boxOfX, NaN))
		}
		)
		}	
	);
	const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

	function resize(value: number) {
		setNumberOfPoint((prev) => {
			if (value <= 0) {
				return prev;
			}
			numberOfPointRef.current = value;
			return value;
		});

		setData((prev) => {
			if (prev.length < value) {
				const next = [...prev];
				for (let i = prev.length; i < value; i++) {
					let boxOfX = Array.from({ length: numberOfx }, () => NaN);
					next.push(new Data(false, new Point(boxOfX, NaN)));
				}
				return next;
			}
			return prev;
		});
	}

	function resizeX(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		let numberOfNewX = Number(e.target.value);

		if (numberOfNewX < 1) {
			return;
		}

		setNumberOfx(numberOfNewX);

		setData((prev) => {
			let next = [...prev];
			let prevXLength = prev[0].point.x.length;

			if (prevXLength < numberOfNewX) {
				for (let i = 0; i < prev.length; i++) {
					next[i].point.x = next[i].point.x.concat(
						Array.from({ length: numberOfNewX - prevXLength }, () => NaN)
					);
				}
			} else {
				next.forEach((data) => {
					data.point.x = data.point.x.slice(0, numberOfNewX);
				});
			}

			return next;
		});
		
		setXToFind((prev) => {
			let next = [...prev];
			if (prev.length < numberOfNewX) {
				next = next.concat(Array.from({ length: numberOfNewX - prev.length }, () => NaN));
			} else {
				next = next.slice(0, numberOfNewX);
			}
			return next;
		});
	}

	function onChangeHandle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		// console.log(value);

		if (name.includes('Find')) {
			const i = Number(name.split("-")[1]);
			setXToFind((prev) => {
				const next = [...prev];
				next[i] = Number(value);
				return next;
			}
			);
		}

		if (name.includes('x')) {
			const i = Number(name.split("-")[1]);
			const j = Number(name.split("-")[2]);

			setData((prev) => {
				const next = [...prev];
				// console.log(next[i].point.x[j]);
				next[i].point.x[j] = Number(value);
				// console.log(next[0].point.x[0]);

				return next;

			});
		}

		if (name.includes('y')) {
			const i = Number(name.split("-")[1]);
			setData((prev) => {
				const next = [...prev];
				next[i].point.y = Number(value);
				return next;
			});
		}

		if (name.includes('check')) {
			const i = Number(name.split("-")[1]);
			setData((prev) => {
				const next = [...prev];
				next[i].isChecked = !next[i].isChecked;
				return next;
			});
		}
	}

	function markAll( e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, SET? : boolean) {
		let temp = false;

		if ( SET != undefined ) {
			temp = !SET;
			isCheckAllRef.current = SET;

		} else {
			temp = isCheckAllRef.current;
			isCheckAllRef.current = !isCheckAllRef.current;
		}

		setData((prev) => {
			const next = [...prev];
			next.forEach((data, index) => {
				data.isChecked = !temp;
			});
			return next.splice(0, numberOfPointRef.current);
		});

		setIsCheckAll((prev) => { 
			// isCheckAllRef.current = prev; 
			return !temp;
		});
	}

	function submitData() {
		setInputData && setInputData({ data: data.filter((row) => row.isChecked), target: xToFind });
	}

	async function fetchSolution() {
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const res = await fetch(
			'http://localhost:3000/api/regression/get?' +
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
		const id = new URLSearchParams(window.location.search).get('id');

		if (id === null) return;

		const setResourceData = async () => {

			const data = await fetchSolution();
      let xToFind = data.xToFind;
			let numberOfPoint = data.numberOfPoint;
			let x = data.x;
			let y = data.y;

			let structureDataFetch = Array.from({length : numberOfPoint}, (_,idx) => new Data(true, new Point(x[idx], y[idx])));

      setXToFind(xToFind);
			setData(structureDataFetch);

			markAll(undefined, true);

			// setInputData({structureDataFetch, target, 0});
		};

		setResourceData();
	}, [typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '']);

	return (
		<Card className="w-11/12 max-w-xl p-4 flex flex-col gap-4">
			<div className="sticky flex">
			<div
					className=" absolute right-0 top-0 z-50 -translate-y-1/2"
					onClick={() => setIsHistoryOpen((prev) => !prev)}
				>
					<HistoryIcon className="fill-black " />
				</div>
				<TextField
					className=""
					label="number of X"
					type="number"
					name="numberOfX"
					required
					value={numberOfx}
					onChange={(e) => resizeX(e)}
					fullWidth
				/>

				<TextField
					className=""
					label="Number of Point"
					required
					type={'number'}
					name="numberOfPoint"
					value={numberOfPoint}
					fullWidth
					onChange={(e) => resize(Number(e.target.value))}
				/>
			</div>

			<div className='flex overflow-scroll py-2'>
				{Array.from({ length: numberOfx }, (_, idx) => {
						return (
							<TextField
								key={`xToFind${idx}`}
								className={`min-w-[8rem]`}
								label={`X target ${idx}`}
								type="number"
								name={`Find-${idx}`}
								required
								value={Number.isNaN(xToFind[idx]) ? '' : xToFind[idx]}
								onChange={(e) => onChangeHandle(e)}
								fullWidth
							/>
						);
					})}
			</div>

			<div className="flex items-center justify-center">
				<TableContainer className="overflow-scroll">
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
								{Array.from({ length: numberOfx }, (_, idx) => {
									return (
										<TableCell key={`numberOfx${idx}`} size="small" align="center">
											<InlineMath>{`X_${idx}`}</InlineMath>
										</TableCell>
									);
								})}
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
										key={`row-${index}`}
									>
										<TableCell size="small" align="center" className="w-10">
											<Checkbox
												onChange={(e) => onChangeHandle(e)}
												checked={row.isChecked}
												name={`check-${index}`}
											/>
										</TableCell>

										<TableCell size="small" align="center">
											{index + 1}
										</TableCell>

										{Array.from({ length: numberOfx }, (_, idx) => {
											return (
												<TableCell size="small" align="center" key={`numberOfx-${idx}`}>
													<TextField
														className="w-20"
														fullWidth
														label={`x${index + 1}${idx + 1}`}
														name={`x-${index}-${idx}`}
														value={Number.isNaN(row.point.x[idx]) ? '' : row.point.x[idx]}
														required
														type="number"
														onChange={(e) => onChangeHandle(e)}
													/>
												</TableCell>
											);
										})}

										<TableCell size="small" align="center">
											<TextField
												className="w-20"
												label={`y${index + 1}`}
												value={Number.isNaN(row.point.y) ? '' : row.point.y}
												name={`y-${index}`}
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
