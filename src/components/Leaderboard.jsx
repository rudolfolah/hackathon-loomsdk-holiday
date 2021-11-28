import {useEffect, useState} from "react";

import * as firebaseApi from "../firebase";
import "./Leaderboard.css";

export default function Leaderboard({ companyId, realtime }) {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    async function retrieveScores() {
      const scores = await firebaseApi.getPlayerScores(companyId);
      setScores(scores);
    }
    if (realtime) {
      firebaseApi.realtimeGetPlayerScores(companyId, (scores) => {
        setScores(scores);
      });
    } else {
      retrieveScores();
    }
  }, [companyId, realtime]);
  return (
    <div className="Leaderboard--container">
      <section className="Leaderboard--content">
        {scores.map((line, index) => {
          return (
            <div
              key={`line-${index}`}
              className={`Leaderboard--line Leaderboard--line-place-${line.place}`}
            >
              <div className="Leaderboard--line-place">
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
        <div className="Leaderboard--line Leaderboard--line-extra">
          <div className={`Leaderboard--line-place`}>
            #100
          </div>
          <div className="Leaderboard--line-name">
            Empty
          </div>
          <div className="Leaderboard--line-score">
            0 points
          </div>
        </div>
        <div className="Leaderboard--line Leaderboard--line-extra">
          <div className={`Leaderboard--line-place`}>
            #100
          </div>
          <div className="Leaderboard--line-name">
            Empty
          </div>
          <div className="Leaderboard--line-score">
            0 points
          </div>
        </div>
      </section>
    </div>
  );
}
