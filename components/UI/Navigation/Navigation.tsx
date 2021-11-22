import { FC } from "react";

import Link from "next/link";
import NavLink from "./NavLink";
import AccountNav from "./AccountNav";
import useAppSelector from "../../../hooks/useAppSelector";

const Navigation: FC = function () {
  const { isAuth } = useAppSelector((state) => state.auth);

  let customNav = (
    <Link href="/account/login">
      <a className="inline-block py-2 px-3 border border-gray-400 rounded-lg font-bold">
        Sign in
      </a>
    </Link>
  );

  if (isAuth) {
    customNav = <AccountNav />;
  }

  return (
    <nav className="border-b border-gray-200 h-16">
      <div className="container h-full">
        <div className="flex items-center h-full">
          <span className="logo">
            <Link href="/">
              <a>Robt</a>
            </Link>
          </span>
          <ul className="inline-flex items-center">
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/salaries">Salaries</NavLink>
            </li>
            <li>
              <NavLink to="/companies">Companies</NavLink>
            </li>
          </ul>
          <div className="ml-auto">{customNav}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
