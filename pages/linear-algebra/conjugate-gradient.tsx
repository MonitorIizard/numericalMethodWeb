import Matrix from "./class/Matrix";
import MatrixUi from "./Matrix";

function Page() {
  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Conjugate Gradient</h1>
      <MatrixUi iterator={Matrix.conjugateGradient} />
    </>
  )
}

export default Page;