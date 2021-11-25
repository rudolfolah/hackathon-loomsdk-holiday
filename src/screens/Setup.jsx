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
        <h2>Welcome to Trivia Town! Howdy folks!</h2>
        <p>Trivia Town has partnered with Loom video recording software to bring you a brand new way to play trivia games with your coworkers and friends! What makes this game different? You do! Every person that you invite to the party will have to pre-record one of the special trivia questions we randomly select for you. Keep it classy or really have fun with it - it’s up to you! All the recorded questions are added to your party, Trivia Party! </p>
      </header>
      <section>
        <h3>Setting up a New Trivia Town Party is as easy as 1, 2, 3, 4</h3>
      </section>
      <div className="Setup--steps-container">
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 1
          </div>
          <div className="Setup--step-description">
            Set-up your unique Trivia Party ID and management page. As a party host you will have access to everything you need to plan your fun-tastic trivia party!
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 2
          </div>
          <div className="Setup--step-description">
            Send out the Record Video Link invite to all the trivia-masterminds you want to join in. The same link goes out to everyone but each question will be different. We have it all, from science and Hell’s Kitchen to Beyonce and the fear of bubble-wrap!
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 3
          </div>
          <div className="Setup--step-description">
            Once enough of your party folks record their individual videos using Loom, send out the Play Trivia Town Party Link to your friends and colleagues. Next stop? Trivia Town!
          </div>
        </div>
        <div className="Setup--step">
          <div className="Setup--step-label">
            Step 4
          </div>
          <div className="Setup--step-description">
            Enjoy the sweet taste of Trivia Town success by watching the Party Scoreboard. Now get Looming!
          </div>
        </div>
      </div>
      <div className={"Setup--instructions"}>
        <button
          className={"Setup--button animate__animated animate__heartBeat animate__delay-3s"}
          onClick={handleClick}
        >
          Start a new Trivia Town Party!
          <br/>
          Go to Town!
        </button>
      </div>
    </div>
  );
}
