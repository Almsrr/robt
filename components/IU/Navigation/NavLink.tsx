import { FC } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

const NavLink: FC<{ to: string; classes?: string }> = function (props) {
  const router = useRouter();

  const classes = `nav-link ${
    props.classes ? props.classes : router.pathname === props.to ? "active" : ""
  }`;

  return (
    <Link href={props.to}>
      <a className={classes}>{props.children}</a>
    </Link>
  );
};

export default NavLink;
