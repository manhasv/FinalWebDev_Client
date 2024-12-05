import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation(); // Get the current location
  const { pathname } = useLocation();
  const links = [
    { path: "/Kanbas/Account/Signin", label: "Signin" },
    { path: "/Kanbas/Account/Signup", label: "Signup" },
    ...(currentUser ? [{ path: "/Kanbas/Account/Profile", label: "Profile" }] : []),
  ];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item border border-0 ${
            location.pathname === link.path ? "active" : "text-danger"}`}>
          {link.label}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item border border-0 ${active("Users")}`}> Users </Link> )}
    </div>
  );
}