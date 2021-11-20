import { useRouter } from "next/router";

import { useEffect } from "react";

const IndexPage = function () {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account/login");
  });

  return <></>;
};

export default IndexPage;
