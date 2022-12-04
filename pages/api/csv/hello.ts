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

export async function getBookRandom(csvString: string) {
  const random_book = await APIClient.get(`csv`, {
    params: {
      csv: csvString,
    }
  });
  
  return random_book.data.book
}

// @ts-ignore
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const response = await API.get(`csv`);

  return res.json({
    tree: response.data?.tree,
  });
}

