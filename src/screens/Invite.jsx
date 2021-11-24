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
          <p>Thank you for using Loom, Trivia Town’s official Partner platform!</p>
        </div>
      </div>
    );
  }

  if (showPrompt) {
    return (<Prompt question={companyData[questionId].text} />);
  }

  return (
    <div>
      <h1>Welcome to Trivia Town Party! Howdy!</h1>
      <h2>You have received an Invitation to Record your Trivia Town Question.</h2>
      <h3>First things first - what is Trivia Town?</h3>
      <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends!</p>
      <p>What makes this game different? <strong>You do!</strong></p>
      <p>Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you!</p>
      <p>All the recorded questions are added to your party, Trivia Party! </p>
      <div className="Invite--section-heading">
        Let’s get busy recording your Trivia Town question!
        <br/>
        It’s easy, just follow the steps below!
      </div>
      <div className="Invite--steps-container">
        <div className="Invite--step">
          <div className="Invite--step-label">
            Step 1
          </div>
          <div className="Invite--step-description">
            <p>Click Start Trivia Town to configure the Loom settings for ‘Camera Only’. <img alt="Settings to use for Loom recording" src={loomSettings} style={{ float: "right"}} /></p>
            <p>Now is the time to check your microphone settings as well.</p>
            <p>All done? Great! Now onto the fun part!</p>
          </div>
        </div>
        <div className="Invite--step">
          <div className="Invite--step-label">
            Step 2
          </div>
          <div className="Invite--step-description">
            <p>Once you have configured Loom and are ready to record, you can press ‘Start Recording’.</p>
            <p>A new page will appear with your unique trivia question. We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap! We dare you to make it as fun as you can!</p>
          </div>
        </div>
        <div className="Invite--step">
          <div className="Invite--step-label">
            Step 3
          </div>
          <div className="Invite--step-description">
            <p>You’re done! Once enough of your party folks record their individual videos using Loom, you will receive an invite to  Play Trivia Town Party Game from the party host.</p>
            <p>Next stop? Trivia Town!</p>
          </div>
        </div>
      </div>
      <button className={"Invite--button-start"}>
        Start Trivia Town
        <br/>
        Get Loom-ing!
      </button>
      <LoomRecord
        label={"Start"}
        onCancel={handleRecordingCanceled}
        onComplete={handleRecordingCompleted}
        onStart={handleRecordingStarted}
      />
    </div>
  );
}
