import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
  name: string;
  username: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setTimeout(() => {
    res.status(200).json({
      token: "123s",
      name: "Alam Sierra",
      username: "almsrr",
    });
  }, 1500);
}
