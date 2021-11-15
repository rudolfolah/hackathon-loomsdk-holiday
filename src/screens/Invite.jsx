import {useState} from "react";
import {useParams} from "react-router-dom";

import loomSettings from "../loom-settings.png";
import LoomRecord from "../components/LoomRecord";
import {Prompt} from "../components/Prompt";

const Invite = () => {
  const { companyId } = useParams();
  const [showPrompt, setShowPrompt] = useState();
  const handleStart = () => {
    console.log("started recording");
    setShowPrompt(true);
  };
  const handleComplete = () => {
    console.log("finished recording");
  };
  if (showPrompt) {
    return (<Prompt />);
  }

  return (
    <div>
      <h2>Welcome to Trivia Town!</h2>
      <p>Trivia Town is a fun way for your organization to interact remotely. It is powered by Loom.</p>
      <p>You have been invited by someone at your organization to record a video!</p>
      <p>Below is a prompt for a question or answer in the trivia game</p>
      <ol>
        <li>Click here to start recording: <LoomRecord label={"Start"} onStart={handleStart} onComplete={handleComplete} /></li>
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

export default Invite;
