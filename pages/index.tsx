import { useEffect } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = function () {
  const router = useRouter();

  useEffect(() => {
    router.replace("/jobs");
  }, [router]);

  return <div></div>;
};

export default Home;
