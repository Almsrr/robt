import { FC, Fragment, useState } from "react";

import Link from "next/link";

import NavLink from "./NavLink";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../app/authSlice";

const Navigation: FC = function () {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userIsAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const toggleUserMenu = () => setShowUserMenu((prevState) => !prevState);

  const logoutHandler = () => dispatch(logout());

  let rightMenu = (
    <Fragment>
      <span>Sign in</span>
      <span className="inline-block bg-black w-px h-5 mx-3"></span>
      <Link href="/candidate/login">
        <a className="font-bold">Candidate</a>
      </Link>
      <span className="px-2">or</span>
      <Link href="/employeer/login">
        <a className="font-bold">Employeer</a>
      </Link>
    </Fragment>
  );

  const userMenu = (
    <ul className="border border-gray-300 rounded absolute top-100 right-0 bg-white py-4 px-3 text-lg w-80">
      <li className="w-full pb-1">
        <Link href={`/candidate/---`}>
          <a>Profile</a>
        </Link>
      </li>
      <li className="w-full pt-1 pb-2">
        <Link href={`/candidate/---/dashboard`}>
          <a>Dashboard</a>
        </Link>
      </li>
      <li className="w-full pt-1 border-t border-black">
        <button className="w-full font-bold pt-1" onClick={logoutHandler}>
          Log out
        </button>
      </li>
    </ul>
  );

  if (userIsAuth) {
    rightMenu = (
      <Fragment>
        <Link href={`/candidate/---/messages`}>
          <a className="px-3 text-lg">
            <i className="fas fa-comment-alt"></i>
          </a>
        </Link>
        <Link href={`/candidate/---/notifications`}>
          <a className="px-3 text-xl">
            <i className="fas fa-bell"></i>
          </a>
        </Link>
        <div className="relative">
          <button
            className="px-3 text-xl"
            type="button"
            onClick={toggleUserMenu}
          >
            <i className="fas fa-user"></i>
          </button>
          {showUserMenu && userMenu}
        </div>
      </Fragment>
    );
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
          <div className="w-auto ml-auto flex items-center">{rightMenu}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
