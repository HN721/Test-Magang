import React from 'react'

export default function Progress({i,numQuestion,points,max}) {
  return (
    <header className='progress'>
        <progress max={numQuestion} value={i}/>
        <p> Questions <strong>{i+1}</strong>/ <strong>{numQuestion}</strong></p>
        <p><strong>{points}</strong>/{max}</p>
    </header>
  )
}
