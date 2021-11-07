import { FC, useState } from "react";

import Link from "next/link";

import UserMenu from "./UserMenu";

const RightUserMenu: FC<{}> = function (props) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu((prevState) => !prevState);
  };

  return (
    <div className="flex items-center">
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
        <button className="px-3 text-xl" type="button" onClick={toggleUserMenu}>
          <i className="fas fa-user"></i>
        </button>
        {showUserMenu && <UserMenu />}
      </div>
    </div>
  );
};

export default RightUserMenu;
