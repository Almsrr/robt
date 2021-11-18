import { FC } from "react";

import Link from "next/link";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../app/authSlice";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../app/hooks";
import { clearUser } from "../../../app/userSlice";

const UserMenu: FC = function () {
  const dispatch = useAppDispatch();
  const { userId, userRole } = useAppSelector((state) => state.user);
  // const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearUser());
    // router.push("/");
  };

  return (
    <ul className="border border-gray-300 rounded absolute top-100 right-0 bg-white py-4 px-3 text-lg w-80">
      <li className="w-full pb-1">
        <Link href={`/${userRole}/${userId}`}>
          <a>Profile</a>
        </Link>
      </li>
      <li className="w-full pt-1 pb-2">
        <Link href={`/${userRole}/${userId}/dashboard`}>
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
