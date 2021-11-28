import {useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { shuffle } from "lodash";
import mixpanel from "mixpanel-browser";

import * as firebaseApi from "../firebase";
import {LoomVideo} from "../components/LoomVideo";
import Leaderboard from "../components/Leaderboard";
import {useTrackTriviaPartyId} from "../useTrackTriviaPartyId";

import "./Play.css";
import {PageHeader} from "../components/PageHeader";

export function Play() {
  const { companyId } = useParams();
  useTrackTriviaPartyId(companyId, "Play page");
  const [unconfirmedPlayerName, setUnconfirmedPlayerName] = useState("");
  const [playerName, setPlayerName] = useState();
  const [playerId, setPlayerId] = useState();
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    async function retrieveQuestion() {
      const companyData = await firebaseApi.getCompanyData(companyId);
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

  useLayoutEffect(() => {
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

  const handleAnswerClick = (answer) => {
    mixpanel.track("Selected answer");
    const updatedQuestionsAndAnswers = [...questionsAndAnswers];
    updatedQuestionsAndAnswers[currentQuestionIndex].answer = answer;
    firebaseApi.setPlayerAnswer(
      playerId,
      questionsAndAnswers[currentQuestionIndex].question.id,
      questionsAndAnswers[currentQuestionIndex].question.correctAnswer === answer
    ).then(() => {
      setQuestionsAndAnswers(updatedQuestionsAndAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    });
  };

  const handleChangeUnconfirmedPlayerName = (event) => {
    setUnconfirmedPlayerName(event.target.value);
  };

  const savePlayerName = () => {
    firebaseApi.createPlayerData(companyId, unconfirmedPlayerName).then(playerId => {
      setPlayerName(unconfirmedPlayerName);
      setUnconfirmedPlayerName("");
      setPlayerId(playerId);
      mixpanel.track("Player name is set");
    });
  };

  if (questionsAndAnswers.length === 0) {
    return (<span>Loading...</span>);
  }

  if (playerName === null || playerName === undefined) {
    return (
      <div className="Play--container">
        <PageHeader>
          <h2>You have received an Invitation to Play Trivia Town!</h2>
          <p>Please enter your name and press "Start the Game" button<br/>to join your Trivia Town Party!</p>
        </PageHeader>
        <div className="Play--player-prompt">
          <div className="Play--player-prompt-left">
            <label className="animate__animated animate__pulse">
              Enter your name:
            </label>
          </div>
          <div className="Play--player-prompt-right">
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
      </div>
    )
  }

  if (currentQuestionIndex === questionsAndAnswers.length) {
    return (
      <div className="Play--container">
        <div className="Play--header">
          <p>Thanks for playing Trivia Town!</p>
        </div>
        <Leaderboard companyId={companyId} />
      </div>
    );
  }

  const currentQuestion = questionsAndAnswers[currentQuestionIndex].question;
  const answers = shuffle(currentQuestion.incorrectAnswers.concat([currentQuestion.correctAnswer]));

  return (
    <div className="Play--container">
      <div className="Play--header">
        <h3>Press Play to watch the video question.</h3>
        <h3>Next, select the answer using the buttons below! Have Fun!</h3>
      </div>
      <div className="Play--question">
        <div className="Play--video">
          <LoomVideo
            height={300}
            loomVideoSharedUrl={currentQuestion.loomVideoId}
            width={400}
          />
        </div>
        <p className="Play--question-text animate__animated animate__fadeIn">{currentQuestion.text}</p>
        <div className="Play--answers">
          {answers.map(answer => (
            <div
              className="Play--answer-item"
              key={`answer-${answer}`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
