import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCompanyData} from "../firebase";
import {LoomVideo} from "../components/LoomVideo";

const QUESTIONS_NOT_LOADED = 0;

export function Play() {
  const { companyId } = useParams();
  const [questionId, setQuestionId] = useState(QUESTIONS_NOT_LOADED);
  const [companyData, setCompanyData] = useState();
  useEffect(() => {
    async function retrieveQuestion() {
      const companyData = await getCompanyData(companyId);
      console.log(companyData);
      setCompanyData(companyData);
      for (let key of Object.keys(companyData)) {
        if (companyData[key].loomVideoId !== null) {
          setQuestionId(key);
          return;
        }
      }
      setQuestionId(QUESTIONS_NOT_LOADED);
    }
    retrieveQuestion();
  }, [questionId, companyId]);

  if (questionId === QUESTIONS_NOT_LOADED) {
    return null;
  }

  return (
    <div>
      <div>
        <p>Welcome to Trivia Town! Compete with your coworkers in a fun trivia game!</p>
      </div>
      <div>
        <h3>{companyData[questionId].text}</h3>
        <div>
          <LoomVideo loomVideoSharedUrl={companyData[questionId].loomVideoId} />
        </div>
      </div>
    </div>
  )
}
