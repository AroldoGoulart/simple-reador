import React, { useCallback, useLayoutEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "../components/Button";
import { MainSeo } from "../components/Seo";

import { DecisionTree, treeToHtml } from "../utils/tree";
import Papa from "papaparse";

export default function Home() {
  const [file, setFile] = React.useState([]);
  const [csvString, setCsvString] = React.useState<string>(``);
  const [csvData, setCsvData] = React.useState<Array<Array<string>>>();
  const [csvDataToPredict, setCsvDataToPredict] =
    React.useState<Array<Array<string>>>();
  const [showTable, setShowTable] = React.useState(false);
  const [model, setModel] = React.useState();

  const [resultModel, setResultModel] = React.useState();
  const trainIATree = () => {
    if (csvData) {
      const headers = csvData[0];
      // convert csv data to array of objects
      const data = csvData.slice(1).map((row) => {
        console.log(row);
        let obj = {};
        for (let i = 0; i < row.length; i++) {
          // @ts-ignore
          obj[headers[i]] = row[i];
        }
        return obj;
      });

      let config = {
        trainingSet: data,
        categoryAttr: headers[headers.length - 1],
        ignoredAttributes: [],
      };
      console.log(config);

      //@ts-ignore
      const tree = new DecisionTree(config);
      console.log(tree);
      setModel(tree);
    }
  };

  const enableTable = async () => {
    setShowTable((prev) => !prev);
  };

  const previewData = async () => {
    if (model && csvDataToPredict && csvData) {
      const headers = csvDataToPredict[0];
      const originalHeaders = csvData[0];
      // convert csv data to array of objects
      let data = csvDataToPredict.slice(1).map((row) => {
        let obj = {};
        for (let i = 0; i < row.length; i++) {
          // @ts-ignore
          obj[headers[i]] = row[i];
        }
        return obj;
      });
      const modelCopy = model;
      // for every row in the data to predict
      data.map((row, index) => {
        // get the prediction
        //@ts-ignore
        const prediction = modelCopy?.predict(row);
        console.log(`prediction`);
        console.log(prediction);
        let obj = {};
        data[index] = {
          ...data[index],
          [`${originalHeaders[originalHeaders.length - 1]}`]: prediction,
        };
        // add the prediction to the row
      });
      console.log(`data previsao`);
      console.log(data);
      //@ts-ignore
      setResultModel(data);
    }
  };
  const previewTable = (csvDataTemp: typeof csvData, trained?: boolean) => {
    if (!csvDataTemp) {
      return null;
    }

    // convert to json with papa
    const json = Papa.unparse(csvDataTemp);
    // papa to json
    const json2 = Papa.parse(json, {
      header: true,
    });
    console.log(json2.data);

    return (
      <div className="flex flex-col items-center justify-center max-w-screen-xl px-4 mx-auto mt-4 align-middle sm:px-6 lg:px-8">
        <p className="mb-2">
          {trained ? `Modelo treinado` : `Dados para treinar o modelo`}
        </p>
        {
          // json to table
          json2.data && (
            <DataTable
              // @ts-ignore
              columns={Object?.keys(json2.data[0]).map((key) => {
                return { name: key, selector: key };
              })}
              // @ts-ignore
              data={json2.data}
            />
          )
        }
      </div>
    );
  };

  const readUploadFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSave: React.Dispatch<React.SetStateAction<string[][] | undefined>>
  ) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      console.log(files[0]);
      Papa?.parse(files[0], {
        complete: function (results) {
          console.log("Finished:", results.data);
          //@ts-ignore
          onSave(results.data);
        },
      });
    }
  };

  return (
    <main className="flex h-full max-w-screen-xl min-h-screen px-4 mx-auto sm:px-6 lg:px-8 ">
      <MainSeo />
      <div className="flex flex-col flex-1  justify-center align-middle items-center  bg-card rounded">
        <div className="my-10">
          <div className="flex flex-col items-center justify-center  ">
            <h1 className="mx-2 text-3xl text-center select-none text-blue-700">
              Lançamento de previsão
            </h1>
          </div>

          <div className="flex  gap-4 my-6 flex-col justify-center align-middle items-center">
            <form className="flex flex-col items-center justify-center text-center">
              <label className="text-sm  mb-2 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                Arquivo de treino
              </label>
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => readUploadFile(e, setCsvData)}
                accept={`.csv`}
                className="items-center self-center justify-center block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
              />
            </form>

            <form className="flex flex-col items-center justify-center text-center">
              <label className="text-sm  mb-2 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                Arquivo de previsão
              </label>
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => readUploadFile(e, setCsvDataToPredict)}
                accept={`.csv`}
                className="items-center self-center justify-center block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
              />
            </form>
          </div>
          <Button
            disabled={!csvData}
            onClick={() => enableTable()}
            title="Preview da tabela"
          />
          <div className="mt-2">
            <Button
              disabled={!csvData}
              onClick={() => trainIATree()}
              title="Treinar"
              variant="secondary"
            />
          </div>
          <div className="mt-2">
            <Button
              disabled={!model || !csvDataToPredict || !csvData}
              onClick={() => previewData()}
              title="Prever!"
              variant="tertiary"
            />
          </div>
        </div>
        <div className="flex flow-row mb-10">
          {showTable && previewTable(csvData)}
          {resultModel && previewTable(resultModel, true)}
        </div>
        {resultModel && <>{treeToHtml(model?.root)}</>}
      </div>
    </main>
  );
}
