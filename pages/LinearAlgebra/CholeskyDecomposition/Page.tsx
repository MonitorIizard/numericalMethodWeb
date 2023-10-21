import Matrix from "../class/Matrix";
import MatrixUi from "../Matrix";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Cholesky Decomposition</h1>
      <MatrixUi solver={Matrix.choleskyDecomposition} />
    </>
  )
}

export default Page;