import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import mixpanel from "mixpanel-browser";

import loomSettings from "../loom-settings.png";
import loomInsertRecordingButton from "../loom-recording-button.png"
import LoomRecord from "../components/LoomRecord";
import {Prompt} from "../components/Prompt";
import {getCompanyData, setCompanyQuestionAsTaken, setCompanyQuestionLoomVideoSharedUrl} from "../firebase";

import "./Invite.css";
import {useTrackTriviaPartyId} from "../useTrackTriviaPartyId";
import {PageHeader} from "../components/PageHeader";
import {Steps, Step} from "../components/Steps";
import {LoomVideo} from "../components/LoomVideo";

const QUESTIONS_NOT_LOADED = 0;

export function Invite() {
  const { companyId } = useParams();
  useTrackTriviaPartyId(companyId, "Invite page");
  const [questionId, setQuestionId] = useState(QUESTIONS_NOT_LOADED);
  const [companyData, setCompanyData] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCompletedMessage, setShowCompletedMessage] = useState(false);
  const [showAllQuestionsRecorded, setShowAllQuestionsRecorded] = useState(false);

  useEffect(() => {
    async function retrieveQuestion() {
      if (questionId) {
        return;
      }

      const companyData = await getCompanyData(companyId);
      setCompanyData(companyData);
      let foundQuestionId;
      for (let key of Object.keys(companyData)) {
        if (foundQuestionId) {
          break;
        }
        if (!companyData[key].alreadyTaken && companyData[key].loomVideoId === null) {
          foundQuestionId = key;
        }
      }
      if (foundQuestionId === null || foundQuestionId === undefined) {
        setShowAllQuestionsRecorded(true);
        return;
      }
      await setCompanyQuestionAsTaken(companyId, foundQuestionId);
      setQuestionId(foundQuestionId);
    }
    retrieveQuestion();
  }, [questionId, companyId]);

  const handleRecordingStarted = () => {
    mixpanel.track("Recording started");
    setShowPrompt(true);
  };

  const handleRecordingCanceled = () => {
    mixpanel.track("Recording canceled");
    setShowPrompt(false);
  }

  const handleRecordingCompleted = (loomVideoSharedUrl) => {
    mixpanel.track("Recording finished");
    setCompanyQuestionLoomVideoSharedUrl(
      companyId,
      questionId,
      loomVideoSharedUrl
    ).then(() => {
      setShowCompletedMessage(true);
    });
  };

  if (companyData === null || companyData === undefined) {
    return (<div>Loading...</div>);
  }

  if (showAllQuestionsRecorded) {
    return (
      <div>
        <PageHeader>
          <h2>Sorry!</h2>
          <h3>All questions have been recorded already, thank you!</h3>
        </PageHeader>
      </div>
    );
  }

  if (showCompletedMessage) {
    return (
      <div>
        <PageHeader>
          <h2>Thank you!</h2>
          <h3>Thank you for using Loom, Trivia Town’s official Partner platform!</h3>
        </PageHeader>
      </div>
    );
  }

  if (showPrompt) {
    return (<Prompt question={companyData[questionId].text} />);
  }

  return (
    <div>
      <PageHeader>
        <h1>Welcome to Trivia Town Party! Howdy!</h1>
        <h2 className={"Invite--heading"}>You have received an Invitation to Record your Trivia Town Question.</h2>
        <h3 className={"Invite--heading"}>First things first - what is Trivia Town?</h3>
        <div className={"display__flex"}>
          <div className={"Invite--explanation"}>
            <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends!</p>
            <p>What makes this game different? <strong>You do!</strong></p>
            <p>Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you!</p>
            <p>All the recorded questions are added to your party,<br/>Trivia Party!</p>
          </div>
          <div>
            <LoomVideo height={400} width={500} loomVideoSharedUrl={"https://www.loom.com/share/765c54d0f90546fd848eb7fb34458dcc"} />
          </div>
        </div>

      </PageHeader>
      <div className="Invite--section-heading">
        Let’s get busy recording your Trivia Town question!
        <br/>
        It’s easy, just follow the steps below!
      </div>
      <Steps>
        <Step label={"Step 1"}>
          <p>Click Start Trivia Town to configure the Loom settings for ‘Camera Only’. <img alt="Settings to use for Loom recording" src={loomSettings} style={{ float: "right"}} /></p>
          <p>Now is the time to check your microphone settings as well.</p>
          <p>All done? Great! Now onto the fun part!</p>
        </Step>
        <Step label={"Step 2"}>
          <p>Once you have configured Loom and are ready to record, you can press ‘Start Recording’.</p>
          <p>A new page will appear with your unique trivia question. We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap! We dare you to make it as fun as you can!</p>
          <p>After you are finished recording, you can press 'Insert Recording'. <img alt="Loom button for inserting recording" src={loomInsertRecordingButton} style={{ float: "right"}} /></p>
        </Step>
        <Step label={"Step 3"}>
          <p>You’re done! Once enough of your party folks record their individual videos using Loom, you will receive an invite to Play Trivia Town Party Game from the party host.</p>
          <p>Next stop? Trivia Town!</p>
        </Step>
        {questionId && <div><LoomRecord
          label={"Start Trivia Town"}
          onCancel={handleRecordingCanceled}
          onComplete={handleRecordingCompleted}
          onStart={handleRecordingStarted}
        /></div>}
      </Steps>
    </div>
  );
}
