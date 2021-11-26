import "./Steps.css";

export function Steps({ children }) {
  return (
    <div className="Step--steps-container">
      {children}
    </div>
  )
}

export function Step({ children, label }) {
  return (
    <div className="Step--step">
      <div className="Step--step-label">
        {label}
      </div>
      <div className="Step--step-description">
        {children}
      </div>
    </div>
  );
}