import {useState} from "react";
import {Redirect} from "react-router-dom";

import {createCompanyData} from "../firebase";

import "./Setup.css";

export function Setup({ baseUrl }) {
  const [companyId, setCompanyId] = useState();
  if (companyId) {
    return (<Redirect to={`/setup/${companyId}`} />);
  }
  const handleClick = () => {
    createCompanyData().then(companyId => {
      setCompanyId(companyId);
    });
  };
  return (
    <div className={"Setup--container"}>
      <header>
        <h2 className="animate__animated animate__pulse">Howdy folks! Welcome to Trivia Town!</h2>
        <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends!</p>
        <p>What makes this game different? You do! Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you! All the recorded questions are added to your party, Trivia Party! </p>
        <h3 className="animate__animated animate__pulse animate__delay-1s">Setting up a New Trivia Town Party is as easy as 1, 2, 3, 4</h3>
      </header>
      <div className="Setup--steps-container">
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 1
          </div>
          <div className="Setup--step-description">
            <p className="color__purple font__bold">Set-up your unique Trivia Party ID and management page.</p>
            <p>As a party host you will have access to everything you need to plan your fun-tastic trivia party!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 2
          </div>
          <div className="Setup--step-description">
            <p><span className="color__blue font__bold">Send out the Record Video Link invite</span> to all the trivia-masterminds you want to join in.</p>
            <p>We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 3
          </div>
          <div className="Setup--step-description">
            <p>Once enough of your party folks record their individual videos using Loom, <span className="color__purple font__bold">send out the Play Trivia Town Party Link</span> to your friends and colleagues.</p>
            <p>Next stop? Trivia Town!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 4
          </div>
          <div className="Setup--step-description">
            <p><span className="color__blue font__bold">Enjoy the sweet taste of Trivia Town</span> success by watching the Party Scoreboard. Now get Looming!</p>
          </div>
        </div>
        <div className={"Setup--cta"}>
          <button
            className={"Setup--button animate__animated animate__heartBeat animate__delay-5s"}
            onClick={handleClick}
          >
            Click Here to Start
          </button>
        </div>
      </div>
    </div>
  );
}
