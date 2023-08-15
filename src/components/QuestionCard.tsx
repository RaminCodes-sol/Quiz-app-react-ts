
type AnswerType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

type Props = {
  questionNr: number;
  totalQuestions: number;
  question: string;
  answers: string[];
  userAnswer: AnswerType | undefined;
  answerQuestion: (e:React.MouseEvent<HTMLButtonElement>) => void
}



const QuestionCard:React.FC<Props> = ({ questionNr, totalQuestions, question, answers, userAnswer, answerQuestion }) => {

  return (
    <section className="w-[700px]">
      
      {/*-------QuestionNumber-------*/}
      <p className="text-lg pb-4">Question: {questionNr}/{totalQuestions}</p>

      {/*-------Question-------*/}
      <p dangerouslySetInnerHTML={{ __html:question}} className="p-1 mb-2 text-orange-500"></p>

      {/*-------Answers-------*/}
      <div className="flex flex-col gap-4">
        {
          answers.map(answer => {
            const correct = userAnswer?.correctAnswer === answer
            const userClicked = userAnswer?.answer === answer

            return(
              <button key={answer} disabled={userAnswer ? true : false} onClick={answerQuestion} value={answer} className={`${correct ? 'bg-green-500' : !correct && userClicked ? 'bg-red-500' : 'bg-gray-600' } p-2`}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>
              </button>
            )
          })
        }
      </div>

    </section>
  )
}

export default QuestionCard

























// type AnswerObject = {
//   question: string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// }


// type Props = {
//   questionNr: number;
//   totalQuestions: number;
//   question: string;
//   answers: string[];
//   userAnswer: AnswerObject  | undefined;
//   callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
// }



// const QuestionCard:React.FC<Props> = ({ questionNr, totalQuestions, question, answers, userAnswer, callback }) => {
//   return (
//     <div>

//       {/*-------Question-Number-------*/}
//       <p>Question: {questionNr} / {totalQuestions}</p>

//       {/*-------Question-------*/}
//       <p dangerouslySetInnerHTML={{__html: question}}></p>

//       {/*-------Answers-------*/}
//       <div>
//         {
//           answers?.map(answer => (
//             <div key={answer} >
//               <button onClick={callback} value={answer} disabled={userAnswer ? true : false}>
//                 <span dangerouslySetInnerHTML={{__html: answer}}></span>
//               </button>
//             </div>
//           ))
//         }
//       </div>

//     </div>
//   )
// }

// export default QuestionCard