import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";

const MessagesPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Messages</h1>
    </>
  );
};

MessagesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default MessagesPage;
