import GraphicalMethod from "../Class/GraphicalMethod";
import InputData from "../Class/InputData";
import App from "../app";

export default function Page() {
	const solver = new GraphicalMethod(InputData.createInputData('', 0, 0, 0));
	return (
		<div>
				<App solver={solver}></App>
		</div>
	)
}