import { FC, useEffect, useState } from "react";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../../app/hooks";

const RightUserMenu: FC = function () {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const username = useAppSelector((state) => state.user.username);

  const toggleUserMenu = () => {
    setShowUserMenu((prevState) => !prevState);
  };

  return (
    <div className="flex items-center">
      <Link href={`/candidate/${username}/messages`}>
        <a className="px-3 text-lg">
          <i className="fas fa-comment-alt"></i>
        </a>
      </Link>
      <Link href={`/candidate/${username}/notifications`}>
        <a className="px-3 text-xl">
          <i className="fas fa-bell"></i>
        </a>
      </Link>
      <div className="relative">
        <button className="px-3 text-xl" type="button" onClick={toggleUserMenu}>
          <i className="fas fa-user"></i>
        </button>
        {showUserMenu && <UserMenu username={username} />}
      </div>
    </div>
  );
};

export default RightUserMenu;
