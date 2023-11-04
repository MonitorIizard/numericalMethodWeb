import { Card } from '@mui/material';
import Link from 'next/link';

function Page() {
	let LinerAlgebraLink = [
		{id:"1L", name: 'Crammer Rule', link: './linear-algebra/crammer-rule'},
		{id:"2L", name: 'Gauss Elimination', link: './linear-algebra/gauss-elimination'},
		{id:"3L", name: 'Gauss Jordan', link: './linear-algebra/gauss-jordan'},
		{id:"4L", name: 'Matrix Inversion', link: './linear-algebra/matrix-inversion'},
		{id:"5L", name: 'LU Decomposition', link: './linear-algebra/lu-decomposition'},
		{id:"6L", name: 'Cholesky Decomposition', link: './linear-algebra/cholesky/cholesky-decomposition'},
		{id:"7L", name: 'Jacobi Iteration', link: './linear-algebra/jacobi-iter-method'},
		{id:"8L", name: 'GaussSeide lIteration', link: './linear-algebra/gauss-seidel-iteration'},
		{id:"9L", name: 'ConjugateGradient', link: './linear-algebra/conjugate-gradient/conjugate-gradient'},
	]

	let RootOfEquationLink = [
		{id:"1", name: 'Graphical Method', link: './root-of-equation/graphical-method?type=GraphicalMethod'},
		{id:"2", name: 'Bisection Method', link: './root-of-equation/bisection-method?type=BisectionMethod'},
		{id:"3", name: 'False Position', link: './root-of-equation/false-position-method?type=FalsePositionMethod'},
		{id:"4", name: 'One Point Iteration', link: './root-of-equation/one-point-iteration-method?type=OnePointIteration'},
		{id:"5", name: 'Newton Raphson', link: './root-of-equation/newton-rophson-method?type=NewtonRaphsonMethod'},
		{id:"6", name: 'Secant', link: './root-of-equation/secant-method?type=Secant'},];

	let InterpolationLink = [
		{id:"1", name: 'Newton Divide Difference', link: './interpolation/newton-divided-difference'},
		{id:"2", name: 'Lagrange', link: './interpolation/lagrange'},
		{id:"3", name: 'Spline', link: './interpolation/spline'}
	]

	let regressionLink = [
		{id:"1", name: 'Linear Regression', link: './regression/linear-regression'},
		{id:"2", name: 'Polynomial Regression', link: './regression/polynomial-regression'},
		{id:"3", name: 'Multiple Linear Regression', link: './regression/multiple-linear-regression'},
	]

	let integrationLink = [
		{id:"1", name: 'Trapezoidal Rule', link: './integration/trapezoidal-rule'},
		{id:"2", name: 'Simpson Rule', link: './integration/simpson-rule'},
	]

	let differentiationLink = [
		{id:"1", name: 'Ordinary Derivative', link: './derivative/derivative'},
	]

	let typeOfProblem : {[key : string] : {id : string, name : string, link : string}[] } = {
		RootOfEquation : RootOfEquationLink,
		LinerAlgebra : LinerAlgebraLink,
		Interpolation : InterpolationLink,
		Regression : regressionLink,
		Integration : integrationLink,
		Differentiation : differentiationLink
	}
	

	return (
		<div className='text-black mt-24'>
			<Card className='w-11/12 max-w-5xl mx-auto p-8 '>
				<h1 className='text-3xl font-bold text-center'>Numerical Method Website</h1>
				<div className='flex flex-wrap gap-4'>
					{
						Object.keys(typeOfProblem).map((key, index) => {
							return (
							<div className='flex flex-col' key={key}>
								<h1 className='my-8 text-2xl font-bold'>{key}</h1>
								<ul className='list-disc ml-10'>
									{
										typeOfProblem[key].map((component, index) => {
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
							)
						}
						)
					}
				</div>

			</Card>
		</div>
	);
}

export default Page;
