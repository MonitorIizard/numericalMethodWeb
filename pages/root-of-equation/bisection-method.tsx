import App from "./app";
import BisectionMethod from "../../class/root-of-equation-class/Bisection";
import InputData from "../../class/root-of-equation-class/InputData";

export default function Page() {
	const solver = new BisectionMethod(InputData.createInputData('', 0, 0, 0));

	return (
		<div>
			<h1 className="my-8 text-center text-3xl font-bold text-black">Bisection</h1>
			<App closeEndSolver={solver}></App>
		</div>
	)
}