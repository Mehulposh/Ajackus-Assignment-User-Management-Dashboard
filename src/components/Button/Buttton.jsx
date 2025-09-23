import React from 'react'

const Buttton = ({children,...props}) => {
  return (
    <button {...props}>
        {children}
    </button>
  )
}

export default Buttton