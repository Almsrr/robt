import { FC, useEffect } from "react";

import { useRouter } from "next/router";

const IndexPage: FC = function () {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${router.pathname}/login`);
  }, [router]);

  return <div></div>;
};

export default IndexPage;
