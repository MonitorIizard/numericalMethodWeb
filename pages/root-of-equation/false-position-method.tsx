import App from "../../components/root-of-equation/app";
import FalsePosition from "../../class/root-of-equation/FalsePosition";
import InputData from "../../class/root-of-equation/InputData";

export default function Page() {
	const solver = new FalsePosition(InputData.createInputData('', 0, 0, 0));

	return (
		<div>
			<h1 className="my-8 text-center text-3xl font-bold text-black">False Position Method</h1>
			<App closeEndSolver={solver}></App>
		</div>
	)
}