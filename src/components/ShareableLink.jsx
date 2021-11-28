import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { FcCheckmark, FcSurvey } from 'react-icons/fc';

import "./ShareableLink.css";

export function ShareableLink({ fullUrl, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
  };

  return (
    <div className={"ShareableLink"}>
      <div className={"ShareableLink--link-container"}>
        <a
          href={fullUrl}
          rel="noreferrer"
          target="_blank"
          className={"ShareableLink--link"}
        >
          {children}
        </a>
      </div>
      <div className={"ShareableLink--button-container"}>
        <CopyToClipboard text={fullUrl} onCopy={handleCopied}>
          <button className={"ShareableLink--button"}>
            {!copied && <FcSurvey size={40} />}
            {copied && <FcCheckmark size={40} />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}