import { FC } from "react";
import styled from "styled-components";

import useAppSelector from "../../../hooks/useAppSelector";
import { Secondary } from "./Secondary";
import { NavLink } from "./NavLink";

export const Navbar: FC = () => {
  const { isAuth } = useAppSelector(state => state.auth);

  return (
    <Nav>
      <div className="container">
        <List>
          <li>
            <Brand>Robt</Brand>
          </li>
          <li>
            <NavLink to="/jobs">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/companies">Companies</NavLink>
          </li>
          <li>
            <NavLink to="/salaries">Salaries</NavLink>
          </li>
          <li className="right">
            {isAuth ? (
              <Secondary />
            ) : (
              <NavLink to="/account/login" fontWeight={700}>
                Sign in
              </NavLink>
            )}
          </li>
        </List>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  border-bottom: 1px solid #ddd;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  & .right {
    margin-left: auto;
  }
`;

const Brand = styled.a`
  display: inline-block;
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  padding-bottom: 1rem;
`;
