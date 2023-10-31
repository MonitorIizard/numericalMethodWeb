import App from "./app";
import FalsePosition from "./Class/FalsePosition";
import InputData from "./Class/InputData";

export default function Page() {
	const solver = new FalsePosition(InputData.createInputData('', 0, 0, 0));

	return (
		<div>
			<App solver={solver}></App>
		</div>
	)
}