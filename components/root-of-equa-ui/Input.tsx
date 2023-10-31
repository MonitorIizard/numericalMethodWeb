import { Card, Button, TextField } from '@mui/material';
import { InlineMath, BlockMath } from 'react-katex';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { useState } from 'react';
import InputData from '@/pages/root-of-equation/Class/InputData';

type Props = {
	isXtoEnd?: boolean;
  setInputData : (value : InputData) => void;
};

function Input({ isXtoEnd = true , setInputData }: Props) {
  const [equation, setEquation] = useState<string>("exp(-x/4)*(2-x)-1");
  const xStart = -1;
  const xEnd = 2;
  const errorTol = 0.00001;

  function onCalculate(e: any) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());
    const cleanData : InputData = {
      equation: formData.functionInput.toString(),
      xstart: Number(formData.xstart),
      xend: Number(formData.xend),
      errorTol: Number(formData.errorTol),
    };

    setInputData(cleanData);
  }
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
						{isXtoEnd ? (
							<>
								<div className="flex w-full gap-2">
									<TextField
										id="outlined-basic"
										label="X start"
										variant="outlined"
										name="xstart"
                    value={xStart}
										fullWidth
										required
									/>
									<TextField
										id="outlined-basic"
										label="X end"
										variant="outlined"
										name="xend"
                    value={xEnd}
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
                  value={errorTol}
									required
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
                    value={xStart}
										required
									/>
									<TextField
										id="outlined-basic"
										label="Tolerance"
										variant="outlined"
										name="errorTol"
										fullWidth
                    value={errorTol}
										required
									/>
								</div>
							</>
						)}
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
		</div>
	);
}

export default Input;
