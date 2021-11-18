import { FC, useEffect, useState, Fragment } from "react";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../../app/hooks";

const RightUserMenu: FC = function () {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { userId, userRole } = useAppSelector((state) => state.user);

  const toggleUserMenu = () => {
    setShowUserMenu((prevState) => !prevState);
  };

  return (
    <Fragment>
      <li>
        <Link href={`/${userRole}/${userId}/messages`}>
          <a className="px-3 text-lg">
            <i className="fas fa-comment-alt"></i>
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/${userRole}/${userId}/notifications`}>
          <a className="px-3 text-xl">
            <i className="fas fa-bell"></i>
          </a>
        </Link>
      </li>
      <li className="relative">
        <button className="px-3 text-xl" type="button" onClick={toggleUserMenu}>
          <i className="fas fa-user"></i>
        </button>
        {showUserMenu && <UserMenu />}
      </li>
    </Fragment>
  );
};

export default RightUserMenu;
