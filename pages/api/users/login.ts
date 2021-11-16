import type { NextApiRequest, NextApiResponse } from "next";
import { getUserPassword } from "../../../app/db-functions";

interface Data {
  token: string | null;
  success: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userEmail = req.body.email;
  const incomingUserPassword = req.body.password;
  const storedPassword = await getUserPassword("email", userEmail);

  if (incomingUserPassword === storedPassword) {
    res.status(200).json({ token: "123", success: true });
  } else {
    res.status(200).json({ token: null, success: false });
  }
}
