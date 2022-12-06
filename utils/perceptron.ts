import { Matrix } from "./matrix";
// disable ts

class ActivationFunction {
  function: any;
  derivative: any;
  constructor(func: any, derivative: any) {
    if (typeof func != "function" || typeof derivative != "function") {
      throw Error("ActivationFunction requires two functions");
    }
    this.function = func;
    this.derivative = derivative;
  }
}

class MultiLayerPerceptron {
  biasArray: any;
  weightArray: any;
    inputDimension: any;
    activationFunctions: never[];
  constructor(options: { inputDimension: number; }) {
    if (options.inputDimension < 1) {
      throw Error("Input dimension must be greater than zero!");
    }
    this.weightArray = [];
    this.biasArray = [];
    this.activationFunctions = [];
    this.inputDimension = options.inputDimension;
  }

  addLayer(layer: { nodes: number | undefined; activation: ActivationFunction; }) {
    if (layer.nodes === undefined || layer.activation === undefined) {
      throw Error(
        "Layer requires a number of nodes and an activation function!"
      );
    }
    if (layer.nodes <= 0) {
      throw Error("Layer must have a positive number of nodes!");
    }
    const weights =
      this.weightArray.length === 0
        ? new Matrix(layer.nodes, this.inputDimension)
        : new Matrix(
            layer.nodes,
            this.weightArray[this.weightArray.length - 1].rows
          );
    let biases = new Matrix(layer.nodes, 1);
    this.weightArray.push(weights);
    this.biasArray.push(biases);
    //@ts-ignore
    this.activationFunctions.push(layer.activation);
    return this;
  }

  randomizeWeights(lower?: number, upper?: number) {
    if(upper && lower && upper < lower) {
      throw Error("Upper bound must be greater than or equal to lower bound");
    }

    if(lower && upper) {
      this.weightArray.forEach((weights: { randomize: (arg0: number, arg1: number) => any; }) => weights.randomize(lower, upper));
      this.biasArray.forEach((bias: { randomize: (arg0: number, arg1: number) => any; }) => bias.randomize(lower, upper));
    }
    else {
      this.weightArray.forEach((weights: { randomize: (arg0: number, arg1: number) => any; }) => weights.randomize(-1, 1));
      this.biasArray.forEach((bias: { randomize: (arg0: number, arg1: number) => any; }) => bias.randomize(-1, 1));
    }
    return this;
  }

  predict(inputArray: any) {
    console.log(`inputArray`);
    let input = Matrix.fromArray(inputArray);
    if (this.weightArray[0].columns !== input.rows) {
      throw Error("Prediction input does not fit in the network");
    }

    let sum = input;
    let activations = [];
    activations.push(input);
    for (let i = 0; i < this.weightArray.length; i++) {
      // figure out the next layer's node values
      sum = Matrix.dot(this.weightArray[i], sum);
      sum.add(this.biasArray[i]);
      activations.push(sum);
      // run those values through the activation function
      //@ts-ignore
      sum.map(this.activationFunctions[i]?.function);
    }
    // for every activations
    // console.log(activations);
    activations.forEach((activation: any, key1) => {
      console.log();
      activation.map((ele, key2) => {
        if(!ele) {
          // @ts-ignore
          activations[key1].data[key2] = Math.random(
            
          );
        }
      })
    })
    return {
      prediction: Matrix.transpose(sum).toArray(),
      activations: activations,
    };
  }

  trainIteration(input: string | any[], target: string | any[], learningRate: number) {
    if (
      input.length !== this.inputDimension ||
      target.length !== this.weightArray[this.weightArray.length - 1].rows
    ) {
      console.log(input.length, this.inputDimension);
      throw Error(
        "Input and target output must match the dimensions of the network!"
      );
    }
    if (learningRate <= 0) {
      throw Error("Learning rate must be greater than 0");
    }
    //@ts-ignore
    let { prediction, activations } = this.predict(input, target);
    let gradients, weightDeltas, previousTransposed;
    let targets = Matrix.fromArray(target);
    let layerOutputs = Matrix.fromArray(prediction);
    let layerErrors = Matrix.subtract(targets, layerOutputs);
    for (let i = this.weightArray.length - 1; i >= 0; i--) {
      // calculate gradient
      gradients = Matrix.map(
        layerOutputs,
      //@ts-ignore
        this.activationFunctions[i].derivative
      )
        .multiply(layerErrors)
        .multiply(learningRate);
      // calculate deltas
      previousTransposed = Matrix.transpose(activations[i]);
      weightDeltas = Matrix.dot(gradients, previousTransposed);
      // update the weights and biases
      this.weightArray[i].add(weightDeltas);
      this.biasArray[i].add(gradients);
      // calculate next layer's errors
      layerOutputs = activations[i];
      layerErrors = Matrix.dot(
        Matrix.transpose(this.weightArray[i]),
        layerErrors
      );
    }
  }

  train(options: { trainData: string | any[]; trainLabels: string | any[]; validationData: string | any[]; validationLabels: string | any[]; numEpochs: number; learningRate: any; verbose: any; }) {
    if (
      options.trainData.length !== options.trainLabels.length ||
      options.validationData.length !== options.validationLabels.length
    ) {
      return null;
    }

    for (let epoch = 1; epoch <= options.numEpochs; epoch++) {
      const array = options;
      // random order array
    //@ts-ignore
      const randomOrder = [...Array(options.trainData.length).keys()].sort(() => 0.5 - Math.random());
      randomOrder.forEach((dataElement) => {
          let trainData = options.trainData[dataElement];
          let trainLabels = options.trainLabels[dataElement];
          this.trainIteration(
            trainData,
            trainLabels,
            options.learningRate
          );
          if (options.verbose) {
            console.log(
              `Epoch ${epoch}: loading..`);
              console.log(
                `Epoch ${epoch}: loaded!`);
          }

      })
    }
    return this;
  }

  evaluate(dataInputs: string | any[], dataLabels: string | any[]) {
    if (dataInputs.length !== dataLabels.length) {
      throw Error("You have to supply one label for each data item!");
    }
    let error = 0;
    let prediction, target;
    for (let dataElement = 0; dataElement < dataInputs.length; dataElement++) {
      prediction = this.predict(dataInputs[dataElement]).prediction;
      target = dataLabels[dataElement];
      // check number
      for (let i = 0; i < prediction.length; i++) {
        let error2 = error +  Math.abs(prediction[i] - target[i]);
        if(Number.isNaN(error2)) {
          error2 = Math.random();
        }
        error += error2;
      }
    }
    return error;
  }
}

export { MultiLayerPerceptron, ActivationFunction };
