import App from "./app";
import BisectionMethod from "./Class/Bisection";
import InputData from "./Class/InputData";

export default function Page() {
	const solver = new BisectionMethod(InputData.createInputData('', 0, 0, 0));

	return (
		<div>
			<App solver={solver}></App>
		</div>
	)
}