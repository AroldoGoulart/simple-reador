import { Header } from "../../components/Header";
import {
  ActivationFunction,
  MultiLayerPerceptron,
} from "../../utils/perceptron";

let sigmoid = new ActivationFunction(
  (x: number) => 1 / (1 + Math.exp(-x)), // sigmoid
  (y: number) => y * (1 - y) // derivative of sigmoid
);

let layers = new MultiLayerPerceptron({ inputDimension: 2 })
  .addLayer({ nodes: 2, activation: sigmoid })
  .addLayer({ nodes: 2, activation: sigmoid })
  .addLayer({ nodes: 1, activation: sigmoid })
  .randomizeWeights();

function Perceptron() {
  // PARA TREINAR
  /*
    layers.train({
    trainData: dataset.inputs,
    trainLabels: dataset.targets,
    validationData: validationDataset.inputs,
    validationLabels: validationDataset.targets,
    numEpochs: numberOfEpochs,
    learningRate: learningRate,
    verbose: true
    });
 */
  return (
    <>
      <Header />
      <main className="flex h-full max-w-screen-xl min-h-screen px-4 mx-auto sm:px-6 lg:px-8 "></main>
    </>
  );
}

export default Perceptron;
