import Input from "../../components/interpolation-ui/input"
import ShowSolution from "@/components/interpolation-ui/show-solution"
import { useState } from "react";

export default function Page() {
  const [answer, setAnswer] = useState<number[]>([10]);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="my-8 text-center text-3xl font-bold">Newton Divided Difference</h1>
      <Input/>
      <ShowSolution answer={answer}/>

    </div>
  )
}

