import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCompanyData} from "../firebase";

export function Play() {
  const { companyId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [companyData, setCompanyData] = useState();
  useEffect(() => {
    if (currentQuestion === 0) {
      return;
    }
    async function retrieveQuestion() {
      const companyData = await getCompanyData(companyId);
      console.log(companyData);
      setCompanyData(companyData);
    }
    retrieveQuestion();
  }, [currentQuestion, companyId]);
  const handleStart = () => {
    setCurrentQuestion(1);
  };
  if (companyData && currentQuestion > 0) {
    return (
      <div>
        <div>
          <h3>{companyData[`question-${currentQuestion}`].text}</h3>
        </div>
      </div>
    )
  }
  return (
    <div>
      <p>Welcome to Trivia Town! Compete with your coworkers in a fun trivia game!</p>
      <p>Click <button onClick={handleStart}>Start</button> to begin!</p>
    </div>
  );
}
