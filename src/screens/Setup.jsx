import {createCompanyData} from "../firebase";
import {useState} from "react";

const Setup = ({ baseUrl }) => {
  const [companyId, setCompanyId] = useState();
  const handleClick = () => {
    createCompanyData().then(companyId => {
      setCompanyId(companyId);
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleClick}>Set up new company</button>
      </div>
      {companyId &&
       <div>
         <div>Invite URL: http://{baseUrl}/invite/{companyId}</div>
         <div>Play URL: http://{baseUrl}/play/{companyId}</div>
       </div>}
    </div>
  );
}

export default Setup;
