import { FC } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../../components/UI/Layout";
// import { loadUser } from "../../../app/db-functions";

const someUsers = [
  {
    id: "123s",
    username: "almsrr",
    name: "Alam Sierra",
    email: "almsrr@domain.com",
  },
  {
    id: "321s",
    username: "mclerz",
    name: "Marcelo Erizo",
    email: "mclerz@domain.com",
  },
];

interface IParams extends ParsedUrlQuery {
  username: string;
}

const UserDashboard: FC = function ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="container">
        <h1 className="font-bold text-4xl">{user.firstName}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { username } = context.params as IParams;
  // const user = await loadUser(username);

  const user = {};

  return {
    props: { user },
  };
};

export default UserDashboard;
