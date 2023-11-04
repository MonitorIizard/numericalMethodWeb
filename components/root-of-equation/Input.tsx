import { useEffect, useRef, useState } from 'react';
import { InlineMath } from 'react-katex';
import { Card, Button, TextField } from '@mui/material';
import InputData from '@/class/root-of-equation/InputData';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';

type Props = {
	isXtoEnd?: boolean;
  setInputData : (value : InputData) => void;
	isSecantMethod?: boolean;
};

type DefaultValue = {
	equation: string;
	xstart: string;
	xend: string;
	errorTol: string;
};

function Input({ isXtoEnd = true , setInputData, isSecantMethod = false }: Props) {
  const [equation, setEquation] = useState<string>("exp(-x/4)*(2-x)-1");
	const [defaultValue, setDefaultValue] = useState<DefaultValue>({equation : "", xstart : "",  xend : "", errorTol : ""});

  function onCalculate(e: any) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());
    const cleanData : InputData = {
      equation: formData.functionInput.toString(),
      xstart: Number(formData.xstart),
      xend: Number(formData.xend) || null,
      errorTol: Number(formData.errorTol),
    };

    setInputData(cleanData);
  }

	async function getRecord() {
		const queryParameters = new URLSearchParams(window.location.search);
		const id = queryParameters.get('id');

		if ( id !== null ) {
			const res = await fetch('/api/root-of-equation/get?' + new URLSearchParams({
				id : id!
			}).toString(), {
				method : "GET",
			})
	
			const json = await res.json();
			const data = json.data[0];
			setDefaultValue({
				equation : data.equation,
				xstart : data.x_start[0].toString(),
				xend : data.x_end.toString(),
				errorTol : data.tolerance.toString()
			});
			setEquation(data.equation);
		}
	}

	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		getRecord();
}, [id])

useEffect(() => {
	const queryParameters = new URLSearchParams(window.location.search);
	const id = queryParameters.get('id');
	setId(id);
})

	return (
		<div>
			<Card variant="outlined" className=" p-8">
				<InlineMath math={`f(x) = ${equation}`} />
			</Card>
			<Card variant="outlined" className=" p-8">
				<div>
					<form className="flex flex-wrap  gap-2" action="" onSubmit={(e) => {onCalculate(e)}}>
						<TextField
							id="outlined-basic"
							label="f(x) = "
							variant="outlined"
							name="functionInput"
							fullWidth
							size="medium"
              value={equation == "" ? "" : equation}
							onChange={(e) => {setEquation(e.target.value)}}
							required
						/>
						{
							isSecantMethod ?
							<>
							<div className="flex w-full gap-2">
											<TextField
												id="outlined-basic"
												label="first x start"
												variant="outlined"
												name="xstart"
												fullWidth
												required
											/>
											<TextField
												id="outlined-basic"
												label="second x start"
												variant="outlined"
												name="xend"
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
									</>
							:
							<>
								{isXtoEnd ? (
									<>
										<div className="flex w-full gap-2">
											<TextField
												id="outlined-basic"
												label="X start"
												variant="outlined"
												name="xstart"
												fullWidth
												required
												value={defaultValue.xstart}
												onChange={(e) => {setDefaultValue({...defaultValue, xstart : e.target.value})}}
											/>
											<TextField
												id="outlined-basic"
												label="X end"
												variant="outlined"
												name="xend"
												fullWidth
												required
												value={defaultValue.xend}
												onChange={(e) => {setDefaultValue({...defaultValue, xend : e.target.value})}}
											/>
										</div>
										<TextField
											id="outlined-basic"
											label="Tolerance"
											variant="outlined"
											name="errorTol"
											fullWidth
											required
											value={defaultValue.errorTol}
											onChange={(e) => {setDefaultValue({...defaultValue, errorTol : e.target.value})}}
										/>
									</>
								) : (
									<>
										<div className="flex w-full gap-2">
											<TextField
												id="outlined-basic"
												label="X start"
												variant="outlined"
												name="xstart"
												fullWidth
												required
											/>
											<TextField
												id="outlined-basic"
												label="Tolerance"
												variant="outlined"
												name="errorTol"
												fullWidth
												required
											/>
										</div>
									</>
								)}
							</>
						}
						
						<Button
							variant="contained"
							type="submit"
							className="mx-auto mt-4 w-1/2 bg-black"
							startIcon={<CalculateRoundedIcon />}
							size="large"
							fullWidth
						>
							Calculate 😉
						</Button>
					</form>
				</div>
			</Card>
		</div>
	);
}

export default Input;
