import {useState} from "react";

import {createCompanyData} from "../firebase";

import "./Setup.css";
import {Redirect} from "react-router-dom";

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
        <h2 className="animate__animated animate__rubberBand">Welcome to Trivia Town! Howdy folks!</h2>
        <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends!</p>
        <p>What makes this game different? You do! Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you! All the recorded questions are added to your party, Trivia Party! </p>
        <h3 className="animate__animated animate__shakeY animate__delay-2s">Setting up a New Trivia Town Party is as easy as 1, 2, 3, 4</h3>
      </header>
      <div className="Setup--steps-container">
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 1
          </div>
          <div className="Setup--step-description">
            <p>Set-up your unique Trivia Party ID and management page.</p>
            <p>As a party host you will have access to everything you need to plan your fun-tastic trivia party!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 2
          </div>
          <div className="Setup--step-description">
            <p>Send out the Record Video Link invite to all the trivia-masterminds you want to join in.</p>
            <p>The same link goes out to everyone but each question will be different.</p>
            <p>We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 3
          </div>
          <div className="Setup--step-description">
            <p>Once enough of your party folks record their individual videos using Loom, send out the Play Trivia Town Party Link to your friends and colleagues.</p>
            <p>Next stop? Trivia Town!</p>
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 4
          </div>
          <div className="Setup--step-description">
            <p>Enjoy the sweet taste of Trivia Town success by watching the Party Scoreboard. Now get Looming!</p>
          </div>
        </div>
        <div className={"Setup--cta"}>
          <button
            className={"Setup--button animate__animated animate__heartBeat animate__delay-5s"}
            onClick={handleClick}
          >
            Start a new Trivia Town Party!
            <br/>
            Go to Town!
          </button>
        </div>
      </div>
    </div>
  );
}
