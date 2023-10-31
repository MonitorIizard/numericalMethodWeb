import Matrix from "../../class/linear-algebra-class/Matrix";
import MatrixUi from "./matrix-inversion";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Matrix Inversion</h1>
      <MatrixUi solver={Matrix.matrixInversion} />
    </>
  )
}

export default Page;