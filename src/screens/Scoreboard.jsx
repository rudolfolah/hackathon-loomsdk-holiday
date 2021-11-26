import Leaderboard from "../components/Leaderboard";
import {useParams} from "react-router-dom";
import {useTrackTriviaPartyId} from "../useTrackTriviaPartyId";

export function Scoreboard() {
  const { companyId } = useParams();
  useTrackTriviaPartyId(companyId, "Scoreboard page");
  return (<Leaderboard companyId={companyId} />);
}
