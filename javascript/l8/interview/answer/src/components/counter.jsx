import React, { useState } from 'react'

export const Counter = ({min = 0, max = 10, onChange}) => {
  const [count, setCount] = useState(min)
  const _onChange = (_count) => {
    const sum = count + _count
    if (sum >= min && sum <= max) {
      setCount(sum)
      onChange && onChange(sum)
    }
  }

  return <div className="counter">
    <div className="btn" onClick={() => _onChange(-1)}><i className="minus" /></div>
    <div className="number">{count}</div>
    <div className="btn" onClick={() => _onChange(1)}><div className="plus" /></div>
  </div>
}
