import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  const getFields = () => {
    const {reset: _, ...fieldProps } = {type,value,onChange}
    return fieldProps
  }

  return {
    type,
    value,
    onChange,
    reset,
    getFields
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}