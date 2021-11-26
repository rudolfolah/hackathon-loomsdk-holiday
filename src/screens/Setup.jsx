import {useHistory} from "react-router-dom";
import mixpanel from "mixpanel-browser";

import {createCompanyData} from "../firebase";
import {useTrackOnce} from "../useTrackOnce";

import "./Setup.css";
import {Steps, Step} from "../components/Steps";
import {PageHeader} from "../components/PageHeader";

export function Setup() {
  useTrackOnce('Home page');
  let history = useHistory();
  const handleClick = () => {
    mixpanel.track('Created new trivia party');
    createCompanyData().then(companyId => {
      mixpanel.set_group('trivia_party', companyId);
      history.push(`/setup/${companyId}`);
    });
  };
  return (
    <div className={"Setup--container"}>
      <PageHeader>
        <h2 className="animate__animated animate__pulse">Howdy folks! Welcome to Trivia Town!</h2>
        <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends!</p>
        <p>What makes this game different? You do! Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you! All the recorded questions are added to your party, Trivia Party! </p>
        <h3 className="animate__animated animate__pulse animate__delay-1s">Setting up a New Trivia Town Party is as easy as 1, 2, 3, 4</h3>
      </PageHeader>
      <Steps>
        <Step label={"Step 1"}>
          <p className="color__purple font__bold">Set-up your unique Trivia Party ID and management page.</p>
          <p>As a party host you will have access to everything you need to plan your fun-tastic trivia party!</p>
        </Step>
        <Step label={"Step 2"}>
          <p><span className="color__blue font__bold">Send out the Record Video Link invite</span> to all the trivia-masterminds you want to join in.</p>
          <p>We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap!</p>
        </Step>
        <Step label={"Step 3"}>
          <p>Once enough of your party folks record their individual videos using Loom, <span className="color__purple font__bold">send out the Play Trivia Town Party Link</span> to your friends and colleagues.</p>
          <p>Next stop? Trivia Town!</p>
        </Step>
        <Step label={"Step 4"}>
          <p><span className="color__blue font__bold">Enjoy the sweet taste of Trivia Town</span> success by watching the Party Scoreboard. Now get Looming!</p>
        </Step>
        <div className={"Setup--cta"}>
          <button
            className={"Setup--button animate__animated animate__heartBeat animate__delay-5s"}
            onClick={handleClick}
          >
            Click Here to Start
          </button>
        </div>
      </Steps>
    </div>
  );
}
