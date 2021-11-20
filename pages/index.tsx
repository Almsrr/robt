import { useRouter } from "next/router";

import { useEffect } from "react";

const HomePage = function () {
  const router = useRouter();

  useEffect(() => {
    router.replace("/jobs");
  });

  return <></>;
};

export default HomePage;
