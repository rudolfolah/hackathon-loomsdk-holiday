import {useEffect} from "react";
import mixpanel from "mixpanel-browser";

export function useTrackOnce(eventName, ...mixpanelTrackArgs) {
  useEffect(() => {
    mixpanel.track(eventName, ...mixpanelTrackArgs);
  });
}
