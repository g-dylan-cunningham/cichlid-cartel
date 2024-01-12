import React from 'react'

const Main = ({children}) => {
  return (
    <main
      className='flex min-h-screen flex-col items-center p-5 md:p-10 lg:p-24 pt-12 relative'
    >
      {children}
    </main>
  )
}

export default Main