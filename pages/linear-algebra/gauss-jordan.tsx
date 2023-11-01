import Matrix from "../../class/linear-algebra/Matrix";
import MatrixUi from "../../components/linear-algebra/app";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">GaussJordan</h1>
      <MatrixUi solver={Matrix.rowEcholonForm} />
    </>
  )
}

export default Page;