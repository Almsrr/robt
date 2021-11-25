import type { NextApiRequest, NextApiResponse } from "next";
import { getAccountBy } from "../db-api";

interface LoginReponse {
  success: boolean;
  token: string | null;
  id: string | null;
  role: string | null;
  info: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginReponse>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const storedAccount = await getAccountBy("email", email);

    let response: LoginReponse;
    if (password === storedAccount?.password) {
      response = {
        token: "123",
        success: true,
        id: storedAccount!.id,
        role: storedAccount!.role,
        info: "USER LOGGED SUCCESSFULLY",
      };
      res.status(200).json(response);
    } else {
      response = {
        token: null,
        success: false,
        id: null,
        role: null,
        info: "VERIFY EMAIL AND PASSWORD",
      };
      res.status(200).json(response);
    }
  }
}
