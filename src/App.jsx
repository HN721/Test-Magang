import './index.css'
import Header from "./Header"
import Main from './component/Main'
import { useEffect } from 'react'
import { useReducer } from 'react'
import Loader from'./Loader'
import Error from'./Error'
import Start from './Start'
import Question from './Question'
import NextButton from './component/NextButton'
import Progress from './component/Progress'
//4 Buat variabe initial state untuk menyimpan data
// initalstte = state nya dan action nya itu =dispatch
const initialState= {
  question:[],
  status:'',
  //index bertujuan untuk mengetahui soal jika di next 
  index:0,
  answer:null,
  points:0,
}
//Ketiga Buat Function Reducer untuk Menghandle case case dan tye type
function reducer (state,action){
  switch(action.type){
    //State itu data awal dan Action itu yang untk memperbarui datanya
    case "dataReceive":return {
      ...state,
      question:action.payload,
      status:'ready'
    };
    case "dataFail": return {
      ...state,status:"error"
    };
    case "start":return {
      ...state,status:"active"};
    case "newAnswer":
    const questions = state.question.at(state.index)  
    return{
      ...state,
      answer:action.payload,
      points:action.payload ===  questions.correctOption ? state.points + questions.points : state.points
    };
    case "nextQuestion" : return{
      //answer null supaya jawabnya gak ketahuan
      ...state,index:state.index+1,answer:null
    }

    default: throw new Error("Action Unkn")
  }
}
export default function App() {
  //Kedua Buat hoot useReducer dan initialState itu data awalnya 
  const [{question,status,index,answer,points}, dispatch]=useReducer(reducer,initialState)
  const numQuestion =question.length;
  const maxQuestion= question.reduce((prev,cur)=>prev+cur.points,0)
  //Pertama ambil data dulu soalnya dari Fake API
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then(res=>res.json())
    //simpan data dari payload ke dispatch d
    .then(data=> dispatch({type:'dataReceive',payload:data}))
    .catch(err => dispatch({type:'dataFail'}))
  },[])
  return (
    //Passing data dispatch ke componene yang membutuhkan datanay
    <div className="app">
      <Header/>
    
      <Main>
        {status === 'loading'&& <Loader/>}
        {status === 'error'&& <Error/>}
        {status === 'ready' && <Start dispatch={dispatch}
         num={numQuestion}/>}
        {status === 'active' &&
        <>
        <Progress i={index} numQuestion={numQuestion} points={points} max={maxQuestion}/>
         <Question 
         //question[index] itu artinya nampilin soal sesuai denga index jika index nya 0 berarti nampilin soal
         //darri object question nomor 1 dan sebagaiya
        points={points} questions={question[index]} answer={answer} dispatch={dispatch} />
        <NextButton dispatch={dispatch} answer={answer}/>
        </>
        }
     
      </Main>
      

    </div>
  )
}
