import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import loomSettings from "../loom-settings.png";
import LoomRecord from "../components/LoomRecord";
import {Prompt} from "../components/Prompt";
import {getCompanyData, setCompanyQuestionLoomVideoSharedUrl} from "../firebase";

import "./Invite.css";

const QUESTIONS_NOT_LOADED = 0;
const ALL_QUESTIONS_RECORDED = -1;

export function Invite() {
  const { companyId } = useParams();
  const [questionId, setQuestionId] = useState(QUESTIONS_NOT_LOADED);
  const [companyData, setCompanyData] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCompletedMessage, setShowCompletedMessage] = useState(false);

  useEffect(() => {
    async function retrieveQuestion() {
      const companyData = await getCompanyData(companyId);
      setCompanyData(companyData);
      for (let key of Object.keys(companyData)) {
        if (companyData[key].loomVideoId === null) {
          setQuestionId(key);
          return;
        }
      }
      setQuestionId(ALL_QUESTIONS_RECORDED);
    }
    retrieveQuestion();
  }, [questionId, companyId]);

  const handleRecordingStarted = () => {
    console.log("started recording");
    setShowPrompt(true);
  };

  const handleRecordingCanceled = () => {
    console.log("canceled recording");
    setShowPrompt(false);
  }

  const handleRecordingCompleted = (loomVideoSharedUrl) => {
    console.log("finished recording");
    setCompanyQuestionLoomVideoSharedUrl(
      companyId,
      questionId,
      loomVideoSharedUrl
    ).then(() => {
      setShowCompletedMessage(true);
    });
  };

  if (companyData && questionId === ALL_QUESTIONS_RECORDED) {
    return (
      <div>
        <div>
          <h3>Sorry!</h3>
          <p>All questions have been recorded already, thank you!</p>
        </div>
      </div>
    );
  }

  if (showCompletedMessage) {
    return (
      <div>
        <div>
          <h3>Thank you!</h3>
          <p>Thank you so much for recording a video for the Trivia Town game!</p>
        </div>
      </div>
    );
  }

  if (showPrompt) {
    return (<Prompt question={companyData[questionId].text} />);
  }

  return (
    <div>
      <h2>Welcome to Trivia Town!</h2>
      <p>Trivia Town is a fun way for your organization to interact remotely. It is powered by Loom.</p>
      <p>You have been invited by someone at your organization to record a video!</p>
      <p>Below is a prompt for a question or answer in the trivia game</p>
      <div className="Invite--section-heading">
        Get Busy Recording!
      </div>
      <div className="Invite--steps-container">
        <div className="Invite--step">
          <div className="Invite--step-label">
            Step 1
          </div>
          <div className="Invite--step-description">
            <p>Click here to start recording:</p>
            <p>
              <LoomRecord
                label={"Start"}
                onCancel={handleRecordingCanceled}
                onComplete={handleRecordingCompleted}
                onStart={handleRecordingStarted}
              />
            </p>
          </div>
        </div>
        <div className="Invite--step">
          <div className="Invite--step-label">
            Step 2
          </div>
          <div className="Invite--step-description">
            <p>Configure the recording settings to <em>capture the camera only</em></p>
            <p>
              <img alt="Settings to use for Loom recording" src={loomSettings} />
            </p>
          </div>
        </div>
      </div>
      <ol>
        <li>
          Click here to start recording:
          <LoomRecord
            label={"Start"}
            onCancel={handleRecordingCanceled}
            onComplete={handleRecordingCompleted}
            onStart={handleRecordingStarted}
          />
        </li>
        <li>
          Configure the recording settings to <em>capture the camera only</em>
          <img alt="Settings to use for Loom recording" src={loomSettings} />
        </li>
        <li>Press record</li>
        <li>Read the prompt</li>
      </ol>
    </div>
  );
}
