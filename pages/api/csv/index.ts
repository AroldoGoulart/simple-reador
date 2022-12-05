import Cors from "cors";
import { API, APIClient } from "../../../services/api";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

// @ts-ignore
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
  // @ts-ignore
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function sendCSV(csvString: string) {
  console.log(`handle?`)
  const response = await APIClient.get(`/csv`, {
    params: {
      csv: csvString,
    }
  });

  return response.data.book
}

// @ts-ignore
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  // get params
  const { csv } = req.query;
  console.log(`csv: ${csv}`)

  const response = await API.post(`createTree`, {
    data: csv
  });

  return res.json({
    tree: `response.data?.tree,`
  });
}

