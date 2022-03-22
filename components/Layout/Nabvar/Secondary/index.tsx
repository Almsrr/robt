import { useRouter } from "next/router";
import { FC, useState } from "react";
import styled from "styled-components";

import useAppSelector from "../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { NavLink } from "../NavLink";
import { Link } from "../../../Link";
import { logout } from "../../../../store/auth-slice";
import { clearAccount } from "../../../../store/account-slice";
import { removeLocaleAccount } from "../../../../app/browser-api";
import { toggleMenu, showMenu } from "../../../../store/menu-slice";

export const Secondary: FC = () => {
  const [showSec, setShowSecondary] = useState(false);
  const { id, role } = useAppSelector(state => state.account);
  const { menu } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showSecondary = () => {
    dispatch(showMenu());
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearAccount());
    removeLocaleAccount();
    router.push("/jobs");
  };

  return (
    <List>
      <li>
        <NavLink to={`/${role}/${id}/notifications`}>
          <Icon size={20}>
            <i className="fas fa-bell"></i>
          </Icon>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/${role}/${id}/messages`}>
          <Icon size={18}>
            <i className="fas fa-comment-alt"></i>
          </Icon>
        </NavLink>
      </li>
      <li>
        <Button type="button" onClick={showSecondary}>
          <Icon size={20}>
            <i className="fas fa-user"></i>
          </Icon>
        </Button>
        {menu && (
          <Menu onClick={showSecondary}>
            <Link to={`/${role}/${id}`}>
              <Option>Profile</Option>
            </Link>
            <Link to={`/${role}/${id}/dashboard`}>
              <Option>Dashboard</Option>
            </Link>
            <Line />
            <Option onClick={logoutHandler}>Log out</Option>
          </Menu>
        )}
      </li>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  & li {
    position: relative;
  }
`;

const Icon = styled.span<{ size?: number }>`
  font-size: ${props => props.size || 16}px;
  padding: 0 0.5rem;
`;

const Button = styled.button`
  display: inline-block;
  line-height: 1;
  padding: 2rem 0 1rem;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90%;
  right: 0;
  z-index: 99;
  width: 250px;
  height: auto;
  padding: 0.5rem;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
`;

const Option = styled.button<{ logout?: boolean }>`
  width: 100%;
  padding: 0.5rem 0.5rem;
  text-align: left;
  color: #000;
  border-radius: 0.25rem;

  &:hover {
    background-color: #fff;
  }
`;

const Line = styled.li`
  height: 1px;
  width: auto;
  background-color: #000;
  margin: 0.5rem;
`;
