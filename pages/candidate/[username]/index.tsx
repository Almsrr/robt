import { FC } from "react";

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

import Layout from "../../../components/UI/Layout";

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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="container">
        <h1 className="font-bold text-4xl">{user.name}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = someUsers.map((user) => ({
    params: { username: user.username },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async function (context) {
  const { username } = context.params as IParams;

  const user = someUsers.find((user) => user.username === username);

  return {
    props: { user },
  };
};

export default UserDashboard;
