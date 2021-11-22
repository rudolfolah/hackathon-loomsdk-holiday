import {useParams} from "react-router-dom";
import Leaderboard from "../components/Leaderboard";

export function Manage({ baseUrl }) {
  const { companyId } = useParams();
  return (
    <div className={"Manage--container"}>
      <div className={"Setup--links"}>
        <div>Invite URL: http://{baseUrl}/invite/{companyId}</div>
        <div>Play URL: http://{baseUrl}/play/{companyId}</div>
      </div>
      <Leaderboard companyId={companyId} />
    </div>
  );
}
