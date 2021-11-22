import { setup, isSupported } from "@loomhq/loom-sdk";
import { useEffect } from "react";

import "./LoomRecord.css";

const API_KEY = "639a4278-5bdb-456a-b4dc-b7e48cfccaa3";
const BUTTON_ID = "loom-sdk-button";

export default function LoomRecord({ label, onCancel, onComplete, onStart }) {
  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      if (!document.getElementById(BUTTON_ID)) {
        return;
      }

      const { configureButton } = await setup({
        apiKey: API_KEY
      });

      return configureButton;
    }

    setupLoom().then(configureButton => {
      const sdkButton = configureButton({ element: document.getElementById(BUTTON_ID) });

      sdkButton.on("insert-click", async video => {
        onComplete(video.sharedUrl);
      });

      // see: https://dev.loom.com/docs/record-sdk/api#buttonemitterevents
      sdkButton.on("cancel", () => { onCancel(); });
      sdkButton.on("start", () => { onStart(); });
    });
  }, [onCancel, onComplete, onStart]);

  return (
    <button id={BUTTON_ID} className={"LoomRecord--button animate__animated animate__flip"}>
      {label}
    </button>
  );
}
