import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";

const Salaries: NextPageWithLayout = function () {
  return <h1>Salaries</h1>;
};

Salaries.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Salaries;
