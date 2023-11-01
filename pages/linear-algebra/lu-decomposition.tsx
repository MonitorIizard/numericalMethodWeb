import Matrix from "../../class/linear-algebra/Matrix"
import MatrixUi from "../../components/linear-algebra/app"

function Page() {
  return (
    <div>
      <h1 className="my-8 text-center text-3xl font-bold">LU Decomposition</h1>
      <MatrixUi solver={Matrix.LUdecomposition}/>
    </div>
  )
}

export default Page;