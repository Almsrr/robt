import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";

const CompaniesPage: NextPageWithLayout<any> = function () {
  return (
    <>
      <h1>Companies</h1>
    </>
  );
};

CompaniesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CompaniesPage;
