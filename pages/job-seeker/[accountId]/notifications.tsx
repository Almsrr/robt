import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";

const NotificationsPage: NextPageWithLayout = function () {
  return (
    <>
      <h1>Notifications</h1>
    </>
  );
};

NotificationsPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default NotificationsPage;
