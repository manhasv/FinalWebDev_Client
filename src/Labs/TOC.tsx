import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills" id="wd-toc">
      <li className="nav-item"><a id="wd-a1" href="#/Labs/LandingPage"
          className={`nav-link ${pathname.includes("LandingPage") ? "active" : ""}`}>LandingPage</a></li>

      <li className="nav-item"><a id="wd-k" href="#/Kanbas" className="nav-link">Kanbas</a></li>
      <li className="nav-item"><a id="wd-github" href="https://github.com/manhasv/Web_Dev"
          className="nav-link">My GitHub</a></li>
    </ul>
);}