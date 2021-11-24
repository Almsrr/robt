import { FC } from "react";

import Link from "next/link";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { logout } from "../../../store/authSlice";
import { useRouter } from "next/router";
import useAppSelector from "../../../hooks/useAppSelector";
import { clearAccount } from "../../../store/accountSlice";
import { removeLocaleAccount } from "../../../app/locale-functions";

const AccountMenu: FC<{ onCloseMenu: () => void }> = function (props) {
  const dispatch = useAppDispatch();
  const { id, role } = useAppSelector((state) => state.account);
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearAccount());
    removeLocaleAccount();

    router.push("/jobs");
  };

  return (
    <ul
      className="border border-gray-300 rounded absolute top-100 right-0 bg-white py-4 px-3 text-lg w-80"
      onClick={props.onCloseMenu}
    >
      <li>
        <Link href={`/${role}/${id}`}>
          <a className="block w-full pb-1">Profile</a>
        </Link>
      </li>
      <li>
        <Link href={`/${role}/${id}/dashboard`}>
          <a className="block w-full pt-1">Dashboard</a>
        </Link>
      </li>
      <li className="h-px bg-black my-3"></li>
      <li>
        <button className="w-full font-bold" onClick={logoutHandler}>
          Log out
        </button>
      </li>
    </ul>
  );
};

export default AccountMenu;
