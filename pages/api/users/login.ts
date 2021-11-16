import type { NextApiRequest, NextApiResponse } from "next";
import { getUserId, getUserPassword } from "./db-functions";

interface Data {
  token: string | null;
  success: boolean;
  id: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const incomingUserPassword = req.body.password;
    const storedPassword = await getUserPassword("email", userEmail);

    if (incomingUserPassword === storedPassword) {
      const id = await getUserId("email", userEmail);

      res.status(200).json({ token: "123", success: true, id });
    } else {
      res.status(200).json({ token: null, success: false, id: null });
    }
  }
}
