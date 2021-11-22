import "./Leaderboard.css";

export default function Leaderboard() {
  return (
    <div className="Leaderboard--container">
      <header className="Leaderboard--header">
        <h3>Leaderboard</h3>
      </header>
      <section className="Leaderboard--content">
        <div className="Leaderboard--line">
          <div className="Leaderboard--line-place">
            1
          </div>
          <div className="Leaderboard--line-name">
            Rudolf
          </div>
          <div className="Leaderboard--line-score">
            3/3
          </div>
        </div>
      </section>
    </div>
  );
}
