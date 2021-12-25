import type { NextApiRequest, NextApiResponse } from "next";
import type Job from "../../../models/Job";
import { getJobs, getJobsBy } from "../../../app/db-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { what, where, datePosted } = req.query;

    //By date posted
    if (what && where && datePosted) {
      const keyword = what.toString();
      const location = where.toString();
      console.log("BY DATE");

      let loadedJobs: Job[] = [];
      const jobs = await getJobsBy(
        keyword,
        location,
        "publication_date",
        "2021-12-14"
      );
      if (jobs) {
        loadedJobs = jobs.slice();
      }
      return res.status(200).json(loadedJobs);
    }
    //All jobs in desc order
    if (what && where) {
      const keyword = what.toString();
      const location = where.toString();

      let loadedJobs: Job[] = [];
      const jobs = await getJobs(keyword, location);
      if (jobs) {
        loadedJobs = jobs.slice();
      }
      res.status(200).json(loadedJobs);
    }
    res.status(400).end();
  }
}
