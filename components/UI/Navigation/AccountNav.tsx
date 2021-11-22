import { FC, useEffect, useState } from "react";

import Link from "next/link";
import AccountMenu from "./AccountMenu";
import useAppSelector from "../../../hooks/useAppSelector";

const AccountNav: FC = function () {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { id, role } = useAppSelector((state) => state.account);

  const toggleAccountMenu = () => {
    setShowAccountMenu((prevState) => !prevState);
  };

  return (
    <ul className="flex">
      <li>
        <button>
          <Link href={`/${role}/${id}/messages`}>
            <a className="px-3 text-lg">
              <i className="fas fa-comment-alt"></i>
            </a>
          </Link>
        </button>
      </li>
      <li>
        <button>
          <Link href={`/${role}/${id}/notifications`}>
            <a className="px-3 text-xl">
              <i className="fas fa-bell"></i>
            </a>
          </Link>
        </button>
      </li>
      <li className="relative">
        <button
          className="px-3 text-xl"
          type="button"
          onClick={toggleAccountMenu}
        >
          <i className="fas fa-user"></i>
        </button>
        {showAccountMenu && <AccountMenu onCloseMenu={toggleAccountMenu} />}
      </li>
    </ul>
  );
};

export default AccountNav;
