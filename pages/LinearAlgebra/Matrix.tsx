import { Button, Card, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { InlineMath } from 'react-katex';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import 'katex/dist/katex.min.css';
import ShowSolution from '../../components/ui/ShowSolutionMatrix';
import { det } from 'mathjs';

type Props = {
	solver?: (Ax: number[][], B: number[]) => number[];
	iterator?: (Ax: number[][], B: number[], x: number[]) => number[];
};

function Matrix({ solver, iterator }: Readonly<Props>) {
	const [dimension, setDimension] = useState<number>(2);
	const [result, setResult] = useState<number[]>([]);
	const [matrixB, setMatrixB] = useState<number[]>([0, 0]);
	const [matrixX, setMatrixX] = useState<number[]>([]);
	const [ax, setAx] = useState<number[][]>([
		[0, 0],
		[0, 0]
	]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		if (name.includes('B')) {
			const i = Number(name[1]);

			setMatrixB((prev) => {
				const next = [...prev];
				next[i] = Number(value);
				return next;
			});
		}

		if (name.includes('A')) {
			const i = Number(name[1]);
			const j = Number(name[2]);

			setAx((prev) => {
				const next = [...prev];
				next[i][j] = Number(value);
				return next;
			});
		}
	}

	function resize(value: number) {
		if (value <= 0) {
			return;
		}
		setDimension(value);
		setAx((prev) => 
			Array.from({length : value}, (_, i) => 
				Array.from({length : value}, (_, j) => {
					if (i >= prev.length || j >= prev.length) {
            return 0;
          }

					return prev[i][j];
				}))
		);

		setMatrixB((prev) => {
			const newMatrix = [...prev];

			if (value > newMatrix.length) {
				for (let i = prev.length; i < value; i++) {
					newMatrix.push(0);
				}
			} else {
				newMatrix.splice(value);
			}

			return newMatrix;
		});

		setMatrixX((prev) => {
			const newMatrix = [...prev];

			if (value > newMatrix.length) {
				for (let i = prev.length; i < value; i++) {
					newMatrix.push(0);
				}
			} else {
				newMatrix.splice(value);
			}

			return newMatrix;
		});
	}

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		const Ax = ax.map((row) => row.map(Number));
		const B = matrixB.map(Number);

		if (solver) {
			setResult(solver(Ax, B));
			setMatrixX(solver(Ax, B));
		}

		if (iterator) {
			setResult(iterator(Ax, B, B.map(Number)));
		}
	}

	return (
		<>
			<div className="mx-auto flex w-11/12 max-w-xl flex-col justify-center gap-4">

				<form action="">
					<Card className="flex flex-col overflow-scroll p-8 gap-4">
						
					<div className='mx-auto flex gap-4'>
						<div className='my-auto'>
							<InlineMath>Dimension = </InlineMath>
						</div>
						<div className='w-20'>
							<TextField
									id="outlined-basic"
									label="I"
									variant="outlined"
									name="dimension"
									value={dimension}
									fullWidth
									size="medium"
									required
									type="number"
									onChange={(e) => resize(Number(e.target.value))}
								/>
						</div>
						<div className='my-auto'>
							<InlineMath>*</InlineMath>
						</div>
						<div className='w-20'>
							<TextField
									id="outlined-basic"
									label="J"
									variant="outlined"
									name="dimension"
									value={dimension}
									fullWidth
									size="medium"
									required
									type="number"
									onChange={(e) => resize(Number(e.target.value))}
								/>
						</div>
					</div>

						<div className="flex justify-center gap-2">
							<div className="flex flex-col gap-2">
								{Array.from({ length: dimension }, (_, i) => (
									<div className="flex gap-2" key={`A${i}`}>
										{Array.from({ length: dimension }, (_, j) => (
											<div className="w-20" key={`A${i}${j}`}>
												<TextField
													key={`A${i}${j}_`}
													id="outlined-basic"
													label={`A${i}${j}`}
													variant="outlined"
													name={`A${i}${j}`}
													size="medium"
													fullWidth
													required
													type="number"
													value={ax[i][j]}
													onChange={handleChange}
												/>
											</div>
										))}
										<div className="w-20" key={`x${i}`}>
											<TextField
												key={`x${i}_`}
												id="outlined-basic"
												variant="outlined"
												name="dimension"
												size="medium"
												fullWidth
												disabled
												value={ result.length == 0? `x${i}` : result[i]}
												onChange={handleChange}
											/>
										</div>
									</div>
								))}
							</div>
							<div className="my-auto">
								<InlineMath>{`=`}</InlineMath>
							</div>
							<div className="flex flex-col gap-2">
								{Array.from({ length: dimension }, (_, i) => (
									<div className="w-20" key={`B${i}`}>
										<TextField
											key={`B${i}_`}
											id="outlined-basic"
											label={`B${i}`}
											variant="outlined"
											name={`B${i}`}
											value={matrixB[i]}
											size="medium"
											fullWidth
											required
											type="number"
											onChange={handleChange}
										/>
									</div>
								))}
							</div>
						</div>

						<Button
							variant="contained"
							type="submit"
							className="mx-auto mt-4 w-1/2 bg-black
                             hover:bg-green-600"
							startIcon={<CalculateRoundedIcon />}
							size="large"
							fullWidth
							onClick={(e) => handleSubmit(e)}
						>
							Calculate 😉
						</Button>
					</Card>
				</form>

				<Card>
					<ShowSolution results={result} isSolution={result.length == 0 ? false : true}/>
				</Card>
			</div>
		</>
	);
}

export default Matrix;
