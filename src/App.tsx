import { useState } from "react"
import { Difficulty, QuestionsState, fetchQuizData } from "./api/api"
import QuestionCard from "./components/QuestionCard"



type AnswersType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10


const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswersType[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [isGameEnd, setIsGameEnd] = useState(true)



  /*-------StartQuiz-------*/
  const startQuiz = async () => {
    setLoading(true)
    setIsGameEnd(false)

    const questions = await fetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(questions)
    setNumber(0)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }


  /*-------NextQuestion-------*/
  const nextQuestion = () => {
    const nextQ =  number + 1
    
    if (nextQ === TOTAL_QUESTIONS) {
      setIsGameEnd(true)
    } else {
      setNumber(nextQ)
    }
  }


  /*-------AnswerQuestion-------*/
  const answerQuestion = (e:any) => {
    if (!isGameEnd) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prevScore => prevScore + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer 
      }

      setUserAnswers(prev => [...prev, answerObject])
    }
  }



  return (
    <main className="w-full flex flex-col items-center p-3 text-white">

      {/*-------Title-------*/}
      <div>
        <h1 className="text-3xl my-4">Quiz app</h1>
      </div>

      {/*-------Body-------*/}
      <div className="mt-4 flex flex-col gap-4">
        
        {/*----StartButton----*/}
        { isGameEnd || userAnswers.length === TOTAL_QUESTIONS ? (<button onClick={startQuiz} className="p-2 rounded  bg-green-600">Start Quiz</button>) : null }

        {/*----Score----*/}
        { !isGameEnd && (<h1>Score: {score}</h1>)}

        {/*----Loading----*/}
        { loading && (<p className="text-red-400">Loading Questions...</p>)}

        {/*----QuestionCard----*/}
        { !loading && !isGameEnd && (
            <QuestionCard 
              questionNr= {number + 1}
              totalQuestions= {TOTAL_QUESTIONS}
              question= {questions[number].question}
              answers= {questions[number].answers}
              userAnswer= {userAnswers ? userAnswers[number] : undefined}
              answerQuestion= {answerQuestion}
            />
          ) 
        }

        {/*----NextButton----*/}
        { !isGameEnd && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
            <button onClick={nextQuestion} className="p-2 bg-orange-500 transition-colors hover:bg-orange-600">Next Question</button>
          )
        }
      </div>
      
    </main>
  )
}

export default App