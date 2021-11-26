import {useEffect} from "react";
import mixpanel from "mixpanel-browser";

export function useTrackTriviaPartyId(triviaPartyId, eventName, ...mixpanelTrackArgs) {
  useEffect(() => {
    mixpanel.set_group('trivia_party', triviaPartyId);
    mixpanel.track(eventName, ...mixpanelTrackArgs);
  });
}
