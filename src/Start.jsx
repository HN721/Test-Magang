import React from 'react'

export default function ({num,dispatch}) {
  return (
    //Karena disini Typenya start berarti di fungsi reducernya
    // nge pass status active dan terloadlah komponen sQuestion
    <div className='start'>
        <h2>Welcome To the React Quiz</h2>
        <h3>{num} Question Test Your React Mastery</h3>
    
        <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Lets Start</button>
    </div>
  )
}
