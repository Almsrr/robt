import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

import { useRouter } from "next/router";
interface NavLinkProps {
  to: string;
  fontWeight?: number;
  fontSize?: number;
}

export const NavLink: FC<NavLinkProps> = ({
  to,
  children,
  fontWeight,
  fontSize,
}) => {
  const router = useRouter();

  const isActive = (path: string): boolean => {
    const currentPath = router.asPath;
    if (path === currentPath) {
      return true;
    }
    return false;
  };

  return (
    <Link href={to} passHref>
      <Anchor active={isActive(to)} fontWeight={fontWeight} fontSize={fontSize}>
        {children}
      </Anchor>
    </Link>
  );
};

const Anchor = styled.a<{
  active?: boolean;
  fontWeight?: number;
  fontSize?: number;
}>`
  display: inline-block;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  line-height: 1;
  padding: 2rem 0 1rem;
  border-bottom-color: ${props => (props.active ? "#1f1c22" : "transparent")};
  font-weight: ${props => props.fontWeight || 400};
  font-size: ${props => props.fontSize || 16}px;

  &:hover {
    border-bottom-color: #1f1c22;
  }
`;
