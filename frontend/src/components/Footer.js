import twitterLogo from "../assets/twitter-logo.svg";
import { TWITTER } from "../shared/constants";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
      <a
        className="footer-text"
        href={TWITTER.LINK}
        target="_blank"
        rel="noreferrer"
      >{`built by @${TWITTER.HANDLE}`}</a>
    </div>
  );
}

export default Footer;
