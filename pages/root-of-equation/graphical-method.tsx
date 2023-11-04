import GraphicalMethod from "../../class/root-of-equation/GraphicalMethod";
import InputData from "../../class/root-of-equation/InputData";
import App from "../../components/root-of-equation/app";

export default function Page() {
	const solver = new GraphicalMethod(InputData.createInputData('', 0, 0, 0));
	return (
		<div>
				<h1 className="my-8 text-center text-3xl font-bold text-black">Graphical Method</h1>
				<App closeEndSolver={solver}></App>
		</div>
	)
}