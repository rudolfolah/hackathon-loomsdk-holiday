import {oembed} from "@loomhq/loom-embed";
import {useEffect, useState} from "react";

export function LoomVideo({ height, loomVideoSharedUrl, width }) {
  const [videoHtml, setVideoHtml] = useState("");
  useEffect(() => {
    async function loadVideo() {
      const { html } = await oembed(loomVideoSharedUrl, { height, width });
      return html;
    }
    loadVideo().then(html => setVideoHtml(html));
  }, [height, loomVideoSharedUrl, width]);
  return (
    <div dangerouslySetInnerHTML={{ __html: videoHtml }}></div>
  );
}
