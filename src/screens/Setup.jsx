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
      <div className={"Setup--instructions"}>
        <button
          className={"Setup--button animate__animated animate__heartBeat animate__delay-3s"}
          onClick={handleClick}
        >
          Set up new company
        </button>
      </div>
    </div>
  );
}
