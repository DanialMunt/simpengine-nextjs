"use client"

import { useEffect } from "react"
import { useCounterStore } from "./store"


const setCount = () => {
    useCounterStore.setState({count: 1})
    
}


export default function Zustand() {
  const count = useCounterStore((state) => state.count)
  return (
    <OtherComponent count={count} />
  )
}
const OtherComponent = ({count} : {count: number}) => {
    const incrementAsync = useCounterStore((state) => state.incrementAsync)
    const decrement = useCounterStore((state) => state.decrement)

    useEffect(() => {
        setCount()
    }, [])


  return <div>{count}
  
  <div>
    <button onClick={incrementAsync}>incrementAsync</button>
     <button onClick={decrement}>Decrement</button>
  </div>
  </div>
}


// redirect("/dashboard")