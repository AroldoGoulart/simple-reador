import React, { useLayoutEffect } from "react";
import CSVReader from "react-csv-reader";
import { MainSeo } from "../components/Seo";
import { json } from "../utils/types";

export default function Home() {
  const [file, setFile] = React.useState([]);

  useLayoutEffect(() => {
    const isDevMode = process.env.NODE_ENV === "development";
    if (!isDevMode) {
      console.warn = () => {};
      console.log = () => {};
      console.error = () => {};
    }
  }, []);

  const readUploadFile = (file: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (file.target.files && file.target.files.length > 0) {
      fileReader.readAsText(file.target.files[0]);
      fileReader.onload = (e) => {
        const csvData = e?.target?.result;
        const dataString = csvData?.toString();
        // chamada api
      };
    }
  };

  return (
    <main className="flex h-full max-w-screen-xl min-h-screen px-4 mx-auto sm:px-6 lg:px-8 ">
      <MainSeo />
      <div className=" flex flex-1  justify-center align-middle items-center my-10 bg-card rounded">
        <div>
          <div className="flex flex-col items-center justify-center  ">
            <h1 className="mx-2 text-3xl text-center select-none text-blue-700">
              Lançamento de CSV
            </h1>
            <h1 className="mx-2 text-xl text-center text-black select-none px-9 my-2">
              Selecione o arquivo base
            </h1>
            <label className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              (Atualmente suportando apenas .csv)
            </label>
          </div>

          <div className="flex  gap-4 my-6 flex-col justify-center align-middle items-center">
            <form className="flex flex-col items-center justify-center text-center">
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
                accept={`.csv`}
                className="items-center self-center justify-center block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
