import { FC } from "react";

import Link from "next/link";
import NavLink from "./NavLink";
import UserNav from "./UserNav";
import { useAppSelector } from "../../../app/hooks";

const Navigation: FC = function () {
  const userIsAuth = useAppSelector((state) => state.auth.isAuth);

  let rightLinks = (
    <li className="flex items-center h-full">
      <Link href="/users/login">
        <a className="py-2 px-3 border border-gray-400 rounded-lg font-bold">
          Sign in
        </a>
      </Link>
    </li>
  );

  if (userIsAuth) {
    rightLinks = <UserNav />;
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
          <ul className="ml-auto inline-flex">{rightLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
