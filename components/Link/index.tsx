import NextLink from "next/link";
import { FC } from "react";
import styled from "styled-components";

interface LinkProps {
  to: string;
  color?: string;
}

export const Link: FC<LinkProps> = ({ to, color, children }) => {
  return (
    <NextLink href={to} passHref>
      <Anchor color={color}>{children}</Anchor>
    </NextLink>
  );
};

const Anchor = styled.a<{ color?: string }>`
  color: ${props => props.color || "#2563eb"};
`;
