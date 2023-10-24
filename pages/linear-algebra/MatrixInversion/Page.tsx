import Matrix from "../class/Matrix";
import MatrixUi from "../Matrix";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Matrix Inversion</h1>
      <MatrixUi solver={Matrix.matrixInversion} />
    </>
  )
}

export default Page;