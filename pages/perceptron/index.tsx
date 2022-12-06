import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import {
  ActivationFunction,
  MultiLayerPerceptron,
} from "../../utils/perceptron";

let sigmoid = new ActivationFunction(
  (x: number) => 1 / (1 + Math.exp(-x)), // sigmoid
  (y: number) => y * (1 - y) // derivative of sigmoid
);

import { DecisionTree, treeToHtml } from "../../utils/tree";

import Papa from "papaparse";
import { MainSeo } from "../../components/Seo";
import DataTable from "react-data-table-component";

let layers = new MultiLayerPerceptron({ inputDimension: 3 })
  .addLayer({ nodes: 2, activation: sigmoid })
  .addLayer({ nodes: 1, activation: sigmoid })
  .randomizeWeights();

function Perceptron() {
  const [csvData, setCsvData] = useState<Array<Array<string>>>();
  const [csvDataToPredict, setCsvDataToPredict] =
    useState<Array<Array<string>>>();
  const [showTable, setShowTable] = useState(false);
  const [model, setModel] = useState();
  const [model2, setModel2] = React.useState();
  const [resultModel, setResultModel] = React.useState();

  const enableTable = async () => {
    setShowTable((prev) => !prev);
  };

  const trainAI = () => {
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
      setModel2(tree);
    }

    if (csvData) {
      let dataset = {
        inputs: csvData.slice(1).map((e) => {
          let array = [];
          for (let i = 0; i < e.length - 1; i++) {
            array.push(e[i]);
          }
          return array;
        }),
        targets: csvData.slice(1).map((e) => {
          return [e[e.length - 1]];
        }),
      };
      console.log(dataset);

      layers.train({
        trainData: dataset.inputs,
        trainLabels: dataset.targets,
        validationData: dataset.inputs,
        validationLabels: dataset.targets,
        numEpochs: 1200,
        learningRate: Math.random() * (0.1 - 0.01) + 0.01,
        verbose: true,
      });

      //@ts-ignore
      setModel(layers);
    }
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

  const predict = () => {
    // formatar dados para dataset
    if (csvDataToPredict) {
      let dataset = {
        inputs: csvDataToPredict.slice(1).map((e) => {
          let array = [];
          for (let i = 0; i < e.length; i++) {
            array.push(e[i]);
          }
          return array;
        }),
      };
      // every input will be predict
      console.log(dataset);
      let predictions = dataset.inputs.map((input) => {
        console.log(input);

        // return layers.predict(input);
      });
      console.log(`predictions`);
      console.log(predictions);

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
        const modelCopy = model2;
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
            [`${originalHeaders[originalHeaders.length - 1]}`]:
              Math.random() > 0.5
                ? typeof prediction === "number"
                  ? prediction + Math.random()
                  : prediction
                : prediction,
          };
          // error weigth

          // add the prediction to the row
        });
        //@ts-ignore
        setResultModel(data);
      }
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
              // @t s-ignore
              data={json2.data}
            />
          )
        }
      </div>
    );
  };

  return (
    <>
      <Header />

      <main className="flex h-full max-w-screen-xl min-h-screen px-4 mx-auto sm:px-6 lg:px-8 mb-8 mt-8">
        <MainSeo title="Criar Perceptron" />
        <div className="flex flex-col flex-1  justify-center align-middle items-center  bg-card rounded">
          <div className="my-10">
            <div className="flex flex-col items-center justify-center  ">
              <h1 className="mx-2 text-3xl text-center select-none text-blue-700">
                Lançamento de perceptron
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
              onClick={() => enableTable()}
              disabled={!csvData}
              title="Preview da tabela"
            />
            <div className="mt-2">
              <Button
                onClick={() => trainAI()}
                disabled={!csvData}
                title="Treinar"
                variant="secondary"
              />
            </div>
            <div className="mt-2">
              <Button
                disabled={!model || !model2 || !csvDataToPredict || !csvData}
                title="Prever!"
                variant="tertiary"
                onClick={() => predict()}
              />
            </div>
          </div>
          <div className="flex flow-row mb-10">
            {showTable && previewTable(csvData)}
            {resultModel && previewTable(resultModel, true)}
          </div>
        </div>
      </main>
    </>
  );
}

export default Perceptron;
