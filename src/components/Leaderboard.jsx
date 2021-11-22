import {useEffect, useState} from "react";

import * as firebaseApi from "../firebase";
import "./Leaderboard.css";

export default function Leaderboard({ companyId }) {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    async function retrieveScores() {
      const scores = await firebaseApi.getPlayerScores(companyId);
      setScores(scores);
    }
    retrieveScores();
  }, [companyId]);
  return (
    <div className="Leaderboard--container">
      <header className="Leaderboard--header">
        <h3>Leaderboard</h3>
      </header>
      <section className="Leaderboard--content">
        {scores.map((line, index) => {
          return (
            <div
              key={`line-${index}`}
              className="Leaderboard--line"
            >
              <div className={`Leaderboard--line-place Leaderboard--line-place-${line.place}`}>
                #{line.place}
              </div>
              <div className="Leaderboard--line-name">
                {line.name}
              </div>
              <div className="Leaderboard--line-score">
                {line.score} points
              </div>
            </div>
          )
        })}
      </section>
    </div>
  );
}
