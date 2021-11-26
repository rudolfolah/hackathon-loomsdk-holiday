import Leaderboard from "../components/Leaderboard";
import {useParams} from "react-router-dom";
import {useTrackTriviaPartyId} from "../useTrackTriviaPartyId";
import {PageHeader} from "../components/PageHeader";

export function Scoreboard() {
  const { companyId } = useParams();
  useTrackTriviaPartyId(companyId, "Scoreboard page");
  return (
    <div>
      <PageHeader>
        <h2>Scoreboard</h2>
      </PageHeader>
      <Leaderboard companyId={companyId} />
    </div>
  );
}
