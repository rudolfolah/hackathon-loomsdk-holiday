import {useParams} from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import loomSettings from "../loom-settings.png";

import "./Manage.css";

export function Manage({ baseUrl }) {
  const { companyId } = useParams();
  return (
    <div className={"Manage--container"}>
      <section>
        <h2>Welcome to your unique Trivia Town Party! Let’s get this fun-ion started!</h2>
        <p>Setting up your Trivia Town Party is easy!</p>
        <p>Just follow the 1, 2, 3, 4 steps below and make sure to save or bookmark your unique Trivia Party ID and management page URL.</p>
      </section>
      <div className="Manage--steps-container">
        <div className="Manage--step">
          <div className="Manage--step-label">
            Step 1
          </div>
          <div className="Manage--step-description">
            <h2>You’re ready to set-up your Trivia Party!</h2>
            <p>This is your unique Trivia Town Party ID and management page URL link: <a href={`/setup/${companyId}`} className={"Manage--link"}>{companyId}</a></p>
            <p>Please keep this URL link safe! As a party host you are in charge of this page so make sure not to lose it, or you will have to set-up a new Trivia Town Party. </p>
            <p>Is the link saved? Great! Let’s move on to the fun stuff!</p>
          </div>
        </div>
        <div className="Manage--step">
          <div className="Manage--step-label">
            Step 2
          </div>
          <div className="Manage--step-description">
            <h2>You’re ready to send out the Record Video invite!</h2>
            <p>Trivia Town has partnered with Loom video recording software to get everyone on your team or in your friend zone involved in the Trivia Party adventure!</p>
            <p>Send out the Record-Video Link invite below to everyone joining in the fun. The same link goes out to everyone but each trivia question will be different.</p>
            <p>Once they click the Record-Video Link, we will take them through the process of video recording their unique trivia question.</p>
            <p>And don’t forget to record one yourself! Done!</p>
            <p>Send out the <strong>Invitation to Record Video</strong>: <a href={`/invite/${companyId}`} target="_blank" className={"Manage--link"}>http://{baseUrl}/invite/{companyId}</a></p>
          </div>
        </div>
        <div className="Manage--step">
          <div className="Manage--step-label">
            Step 3
          </div>
          <div className="Manage--step-description">
            <h2>You’re ready to start the Trivia Town Party Game!</h2>
            <p>Once enough of your party folks record their individual videos using Loom, send out the Play Trivia Town Party Link.</p>
            <p>As a host you get to decide when the time is just right to send out the link, based on the number of recordings.</p>
            <p>A tracker at the top of this page can help you make that call!</p>
            <p>Send out the <strong>Play Trivia Town Party Link</strong>: <a href={`/play/${companyId}`} target="_blank" className={"Manage--link"}>http://{baseUrl}/play/{companyId}</a></p>
          </div>
        </div>
        <div className="Manage--step">
          <div className="Manage--step-label">
            Step 4
          </div>
          <div className="Manage--step-description">
            <h2>You’re ready to play the Trivia Town Party Game!</h2>
            <p>Now comes the easy part - play the game! The Trivia Town Party Scoreboard keeps track of all the brainiacs in your party!</p>
            <p><strong>Trivia Town Scoreboard</strong>: <a href={`/scoreboard/${companyId}`} target="_blank" className={"Manage--link"}>http://{baseUrl}/scoreboard/{companyId}</a></p>
          </div>
        </div>
      </div>
      <Leaderboard companyId={companyId} />
    </div>
  );
}
