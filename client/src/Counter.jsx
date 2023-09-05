import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Store_data/counterSlice_folder/counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div style={{color:"black"}}>
        <br /><br /><br /><br /><br /><br /><br />
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
