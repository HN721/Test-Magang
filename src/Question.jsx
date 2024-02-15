import React from 'react'
import Option from './component/Option'

export default function Question({questions,dispatch,answer,points}) {
    console.log(questions)
  return (
    <div>
       <h4>
        {questions.question}
        </h4> 
       <Option questions={questions} dispatch={dispatch} answer={answer}points={points}/>
    </div>
  )
}
