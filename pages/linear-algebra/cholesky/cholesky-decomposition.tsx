import Matrix from "../../../class/linear-algebra-class/Matrix";
import Typography from '@mui/material/Typography';
import { Button, Modal} from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from "react";
import { BlockMath, InlineMath } from 'react-katex';
import CholeskyUi from "./cholesky-ui";

function Page() {
  const [openNotify, setOpenNotify] = useState<boolean>(true);

  const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 500,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	};

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Cholesky Decomposition</h1>
      <CholeskyUi solver={Matrix.cholesky}/>
      <Modal
					open={openNotify}
					onClose={(e) => setOpenNotify(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							className="text-1xl text-center font-bold text-black"
						>
							Before use Cholesky Decomposition
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black">
							You need to ensure that matrix is sysmestric <span>
							</span>  <br />
							<div className="my-4 flex justify-center">
                <InlineMath>{`A =`}</InlineMath>
                <InlineMath>{`\\begin{bmatrix}
                                a & b & c \\\\
                                d & e & f \\\\
                                g & h & i
                                \\end{bmatrix}`}</InlineMath>
                <InlineMath>{`=`}</InlineMath>
                <InlineMath>{`A^{-1} =`}</InlineMath>
                <InlineMath>{`\\begin{bmatrix}
                                a & d & g \\\\
                                b & e & h \\\\
                                c & f & i
                                \\end{bmatrix}`}</InlineMath>
              </div>
						</Typography>
						<div
							className="flex w-full
                              justify-center pt-4"
						>
							<Button
								onClick={(e) => setOpenNotify(false)}
								className="bg-green-600 text-white
                                    hover:bg-green-300"
							>
								Understood
							</Button>
						</div>
					</Box>
				</Modal>
    </>
  )
}

export default Page;