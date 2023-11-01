import MatrixUI from "../../components/linear-algebra/app";
import Matrix from "../../class/linear-algebra/Matrix";

function Page() {

  return(
    <>
			<h1 className="my-8 text-center text-3xl font-bold">Gauss Elimination</h1>
      <MatrixUI solver={Matrix.gaussElimination}/>
    </>
  ) 
}

export default Page;

