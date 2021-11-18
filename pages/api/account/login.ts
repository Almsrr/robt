import type { NextApiRequest, NextApiResponse } from "next";
import { getAccount, getAccountId, getAccountPassword } from "./db-functions";

interface LoginReponse {
  token: string | null;
  success: boolean;
  id: string | null;
  role: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginReponse>
) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;
    const storedPassword = await getAccountPassword("email", email);

    if (password === storedPassword) {
      const id = await getAccountId("email", email);
      const account = await getAccount(id);

      res
        .status(200)
        .json({ token: "123", success: true, id, role: account!.role });
    } else {
      res
        .status(200)
        .json({ token: null, success: false, id: null, role: null });
    }
  }
}
