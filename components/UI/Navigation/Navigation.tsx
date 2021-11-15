import { FC } from "react";

import Link from "next/link";
import NavLink from "./NavLink";
import UserNav from "./UserNav";
import { useAppSelector } from "../../../app/hooks";

const Navigation: FC = function () {
  const userIsAuth = useAppSelector((state) => state.auth.isAuth);

  let rightLinks = (
    <div className="flex items-center h-full">
      <span>Sign in</span>
      <span className="inline-block bg-black w-px h-5 mx-3"></span>
      <Link href="/candidate/login">
        <a className="font-bold">Candidate</a>
      </Link>
      <span className="px-2">or</span>
      <Link href="/employeer/login">
        <a className="font-bold">Employeer</a>
      </Link>
    </div>
  );

  if (userIsAuth) {
    rightLinks = <UserNav />;
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="container py-4">
        <div className="flex">
          <span className="text-2xl font-bold mr-5">
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
          <div className="ml-auto">{rightLinks}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
