import { FC } from "react";

import Link from "next/link";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../app/authSlice";

const UserMenu: FC<{ username: string | null }> = function (props) {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <ul className="border border-gray-300 rounded absolute top-100 right-0 bg-white py-4 px-3 text-lg w-80">
      <li className="w-full pb-1">
        <Link href={`/candidate/${props.username}`}>
          <a>Profile</a>
        </Link>
      </li>
      <li className="w-full pt-1 pb-2">
        <Link href={`/candidate/${props.username}/dashboard`}>
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
};

export default UserMenu;
