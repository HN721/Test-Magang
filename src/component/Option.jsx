import React from 'react'

export default function Option({questions, answer,dispatch,}) {
    const hasAnswerd = answer !== null;
    //jadi payload:index itu disimpan di variable answer liat di appjsx jadi index === question.correct
    //itu misal answernya 1 dan correctnya 1 jadi true
  return (
    <div className='options'>
      
    {questions.options.map((option,i) => 
    //i === answer hanya memberikan class answr yang bergerak bukan warna nya
    <button className={`btn btn-option ${i === answer ? 'answer' :''}
    ${hasAnswerd ? i === questions.correctOption ? 'correct' :'wrong':''}`} 
     disabled={hasAnswerd}key={option} onClick={()=> dispatch({type:"newAnswer" ,payload:i})}>{option}</button>)}
     
    </div>
    
  )
 
}
