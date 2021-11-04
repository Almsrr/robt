import { FC } from "react";

import NavLink from "./NavLink";
import Link from "next/link";

const Navigation: FC = function () {
  return (
    <nav className="border-b border-gray-200">
      <div className="container py-4">
        <div className="flex">
          <span className="text-2xl font-bold mr-5">
            <Link href="/">
              <a>Robt</a>
            </Link>
          </span>
          <ul className="inline-flex items-center w-full">
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/salaries">Salaries</NavLink>
            </li>
            <li>
              <NavLink to="/companies">Companies</NavLink>
            </li>
            <li className="ml-auto">
              <span>Sign in</span>
            </li>
            <li>
              <div className="bg-black mx-3 w-px h-5"></div>
            </li>
            <li>
              <Link href="/candidate/login">
                <a className="font-bold">Candidate</a>
              </Link>{" "}
              <span className="px-1">or</span>{" "}
              <Link href="/employeer/login">
                <a className="font-bold">Employeer</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
