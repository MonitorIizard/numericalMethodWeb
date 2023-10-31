import { Card } from '@mui/material';
import Link from 'next/link';

function Page() {
	let RootOfEquationLink = [
		{id:"1", name: 'Graphical Method', link: './root-of-equation/graphical-method/graphical-method'},
		{id:"2", name: 'Bisection Method', link: './root-of-equation/bisection-method'},
		{id:"3", name: 'False Position', link: './root-of-equation/false-position-method'},
		{id:"4", name: 'One Point Iteration', link: './root-of-equation/one-point-iteration-method'},
		{id:"5", name: 'Newton Raphson', link: './root-of-equation/newton-rophson-method'},
		{id:"6", name: 'Secant', link: './root-of-equation/secant-method'},];

	let LinerAlgebra = [
		{id:"1L", name: 'Crammer Rule', link: './LinearAlgebra/CrammerRule/Page'},
		{id:"2L", name: 'Gauss Elimination', link: './LinearAlgebra/GaussElimination/Page'},
		{id:"3L", name: 'Gauss Jordan', link: './LinearAlgebra/GaussJordan/Page'},
		{id:"4L", name: 'Matrix Inversion', link: './LinearAlgebra/MatrixInversion/Page'},
		{id:"5L", name: 'LU Decomposition', link: './LinearAlgebra/LUDecomposition/Page'},
		{id:"6L", name: 'Cholesky Decomposition', link: './LinearAlgebra/CholeskyDecomposition/Page'},
		{id:"7L", name: 'Jacobi Iteration', link: './LinearAlgebra/JacobiIterationMethod/Page'},
		{id:"8L", name: 'GaussSeide lIteration', link: './LinearAlgebra/GaussSeidelIteration/Page'},
		{id:"9L", name: 'ConjugateGradient', link: './LinearAlgebra/ConjugateGradient/Page'},
	]
	return (
		<div className='text-black '>
			<Card className='w-11/12 max-w-xl mx-auto'>
				<div className='flex flex-col'>
					<h1 className='my-8 text-3xl font-bold'>Root of Equation</h1>

					<ul className='list-disc ml-10'>
						{
							RootOfEquationLink.map((component, index) => {
								return (
									<li key={component.id}> 
										<Link  href={component.link} className='underline text-blue-400 hover:text-blue-300'>{component.name}</Link>
									</li>
								)
							}
							)
						}
					</ul>

				</div>

				<div className='flex flex-col'>
					<h1 className='my-8 text-3xl font-bold'>Linear Algebra</h1>

					<ul className='list-disc ml-10'>
						{
							LinerAlgebra.map((component, index) => {
								return (
									<li key={component.id}> 
										<Link  href={component.link} className='underline text-blue-400 hover:text-blue-300'>{component.name}</Link>
									</li>
								)
							}
							)
						}
					</ul>

				</div>

			</Card>
		</div>
	);
}

export default Page;
