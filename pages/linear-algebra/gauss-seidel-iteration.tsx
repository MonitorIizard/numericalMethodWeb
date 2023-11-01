import Matrix from "../../class/linear-algebra/Matrix";
import MatrixUi from "../../components/linear-algebra/app";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Gauss Seidel Iteration</h1>
      <MatrixUi iterator={Matrix.gaussSeidelIteration} />
    </>
  )
}

export default Page;