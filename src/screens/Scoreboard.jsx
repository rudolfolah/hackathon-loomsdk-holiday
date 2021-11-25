import Leaderboard from "../components/Leaderboard";
import {useParams} from "react-router-dom";

export function Scoreboard() {
  const { companyId } = useParams();
  return (<Leaderboard companyId={companyId} />);
}
