import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";
import { ParsedUrlQuery } from "querystring";
// import { loadUser } from "../../../app/db-functions";

//Context obj type
interface IParams extends ParsedUrlQuery {
  username: string;
}

const AccountDashboard: NextPageWithLayout<any> = function ({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="container">
        <h1 className="font-bold text-4xl">{}</h1>
        <p>Email: {}</p>
      </div>
    </>
  );
};

AccountDashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { username } = context.params as IParams;
  // const user = await loadUser(username);

  const account = {};

  return {
    props: { account },
  };
};

export default AccountDashboard;
