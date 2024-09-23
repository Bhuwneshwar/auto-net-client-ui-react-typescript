// import React from "react";
import { useGlobalContext } from "../MyRedux";
import ClipboardCopy from "../components/ClipboardCopy";
// import Facebk from "@mui/icons-material/Facebook";

import "../styles/Share.css"; // Assuming you have this CSS file for styles

const Share = () => {
  const {
    store: { MyDetails },
  } = useGlobalContext();

  const referralLink = `https://rebyb-autonet.onrender.com/signup/${MyDetails?.referCode}`;
  // const message = `Check out this amazing app! Here's my referral link: ${referralLink}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      "Check out this app! " + referralLink
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent("Check out this amazing app!")}`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      referralLink
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent("Check out this app!")}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      referralLink
    )}&description=${encodeURIComponent("Check out this amazing app!")}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(
      referralLink
    )}&title=${encodeURIComponent("Check out this app!")}`,
  };

  return (
    <div className="share-container">
      <div className="share-card">
        <h2>Invite Friends</h2>
        <p>Share your referral link and invite friends to join!</p>

        <p>if you share with referral link</p>
        <p className="income">
          Per Golden fund buy income ₹10
          <br /> and per Diamond fund buy income ₹20
        </p>

        <div className="copy-link">
          <span>{`https://rebyb-autonet.onrender.com/signup/${MyDetails?.referCode}`}</span>
          <ClipboardCopy
            code={`https://rebyb-autonet.onrender.com/signup/${MyDetails?.referCode}`}
          />
        </div>

        <div className="share-buttons">
          <h3>Share on:</h3>
          <ul>
            <li>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn whatsapp-btn">WhatsApp</button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn facebook-btn">
                  {/* <Facebk /> */}
                  Facebook
                </button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn twitter-btn">Twitter</button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn linkedin-btn">LinkedIn</button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn telegram-btn">Telegram</button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn pinterest-btn">Pinterest</button>
              </a>
            </li>
            <li>
              <a
                href={shareLinks.reddit}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="share-btn reddit-btn">Reddit</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Share;
