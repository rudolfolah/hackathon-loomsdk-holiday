import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { shuffle } from "lodash";
import {getCompanyData} from "../firebase";
import {LoomVideo} from "../components/LoomVideo";

import "./Play.css";

export function Play() {
  const { companyId } = useParams();
  const [unconfirmedPlayerName, setUnconfirmedPlayerName] = useState("");
  const [playerName, setPlayerName] = useState();
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    async function retrieveQuestion() {
      const companyData = await getCompanyData(companyId);
      console.log(companyData);
      let questionsAndAnswersData = [];
      for (let key of Object.keys(companyData)) {
        if (companyData[key].loomVideoId !== null) {
          questionsAndAnswersData.push({
            question: { id: key, ...companyData[key] },
            answer: null
          });
        }
      }
      questionsAndAnswersData = shuffle(questionsAndAnswersData);
      setCurrentQuestionIndex(0);
      setQuestionsAndAnswers(questionsAndAnswersData);
    }
    retrieveQuestion();
  }, [companyId]);
  useEffect(() => {
    if (playerName === undefined || playerName === null) {
      return;
    }
    for (let i = 0; i < 4; i += 1) {
      setTimeout(() => {
        document.getElementsByClassName(
          "Play--answer-item"
        )[i].className = "Play--answer-item animate__animated animate__pulse";
      }, 500 + (i * 300));
    }
  }, [playerName]);

  const handleAnswerClick = (question, answer) => {
  };

  const handleChangeUnconfirmedPlayerName = (event) => {
    setUnconfirmedPlayerName(event.target.value);
  };

  const savePlayerName = () => {
    setPlayerName(unconfirmedPlayerName);
    setUnconfirmedPlayerName("");
  };

  if (questionsAndAnswers.length === 0) {
    return (<span>Loading...</span>);
  }

  if (playerName === null || playerName === undefined) {
    return (
      <div className="Play--container">
        <div className="Play--header">
          <p>Welcome to Trivia Town! Compete with your coworkers in a fun trivia game!</p>
        </div>
        <div className="Play--player-prompt">
          <label className="animate__animated animate__pulse">
            Enter your name:
          </label>
          <input
            className="animate__animated animate__pulse"
            type={"text"}
            value={unconfirmedPlayerName}
            onChange={handleChangeUnconfirmedPlayerName}
          />
          <button
            disabled={unconfirmedPlayerName.trim().length === 0}
            onClick={savePlayerName}
          >
            Start the Game!
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questionsAndAnswers[currentQuestionIndex].question;
  const answers = shuffle(currentQuestion.incorrectAnswers.concat([currentQuestion.correctAnswer]));

  return (
    <div className="Play--container">
      <div className="Play--header">
        <p>Welcome to Trivia Town! Compete with your coworkers in a fun trivia game!</p>
      </div>
      <div className="Play--question">
        <div className="Play--video">
          <LoomVideo
            height={300}
            loomVideoSharedUrl={currentQuestion.loomVideoId}
            width={400}
          />
        </div>
        <p className="animate__animated animate__fadeIn">{currentQuestion.text}</p>
        <div className="Play--answers">
          {answers.map(answer => (
            <div
              className="Play--answer-item"
              key={`answer-${answer}`}
              onClick={() => handleAnswerClick(currentQuestion, answer)}
            >
              {answer}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
