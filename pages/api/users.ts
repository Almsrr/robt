import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";

const someUsers = [
  new User("123s", "Alam", "Sierra", "almsrr", "almsrr@domain.com"),
  new User("321s", "Marcelo", "Erizo", "mclerz", "mclerz@domain.com"),
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = req.body.userId;

    const foundUser = someUsers.find((user) => (user.id = userId));
    res.status(200).json(foundUser);
  }
}
