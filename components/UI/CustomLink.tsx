import { FC } from "react";

import Link from "next/link";

interface CustomLinkProps {
  class?: string;
  to?: string;
}

const CustomLink: FC<CustomLinkProps> = function (props) {
  let link = "#";
  let customClasses = "link";

  if (props.to) link = props.to;
  if (props.class) customClasses = customClasses + " " + props.class;

  return (
    <Link href={link}>
      <a className={customClasses}>{props.children}</a>
    </Link>
  );
};

export default CustomLink;
