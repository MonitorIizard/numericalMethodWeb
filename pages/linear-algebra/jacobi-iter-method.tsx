import Matrix from "../../class/linear-algebra-class/Matrix";
import MatrixUi from "./matrix-inversion";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Jacobi Iteration Method</h1>
      <MatrixUi iterator={Matrix.jacobiIteration} />
    </>
  )
}

export default Page;