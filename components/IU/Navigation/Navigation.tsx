import { FC } from "react";

import Link from "next/link";

const Navigation: FC = function () {
  return (
    <nav>
      <div>
        <span>
          <Link href="/">Robt</Link>
        </span>
        <ul>
          <li>
            <Link href="/jobs">Jobs</Link>
          </li>
          <li>
            <Link href="/salaries">Salaries</Link>
          </li>
          <li>
            <Link href="/companies">Companies</Link>
          </li>
        </ul>
      </div>
      <div>
        <span>Sign in</span>
        <Link href="/candidate/login">Candidate</Link>
        <Link href="/employeer/login">Employeer</Link>
      </div>
    </nav>
  );
};

export default Navigation;
