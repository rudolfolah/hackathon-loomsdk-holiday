import { setup, isSupported } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

const API_KEY = "639a4278-5bdb-456a-b4dc-b7e48cfccaa3";
const BUTTON_ID = "loom-sdk-button";

export default function LoomRecord({ label, onStart, onComplete }) {
  const [videoHTML, setVideoHTML] = useState("");

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      const button = document.getElementById(BUTTON_ID);

      if (!button) {
        return;
      }

      const { configureButton } = await setup({
        apiKey: API_KEY
      });

      const sdkButton = configureButton({ element: button });

      sdkButton.on("insert-click", async video => {
        const { html } = await oembed(video.sharedUrl, { width: 400 });
        setVideoHTML(html);
      });

      sdkButton.on("start", () => { onStart(); });
      sdkButton.on("complete", () => { onComplete() });
    }

    setupLoom();
  }, [onStart, onComplete]);

  return (
    <>
      <button id={BUTTON_ID}>{label}</button>
      <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
    </>
  );
}
