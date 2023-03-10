const change_losses = framework => {
    const loss_selector = document.getElementById("loss-function-selector");
    if(framework == "TensorFlow"){
        loss_selector.innerHTML = `
            <option value="mean_squared_error">Mean Squared Error</option>
            <option value="mean_squared_logarithmic_error">Mean Squared Logarithmic Error</option>
            <option value="mean_absolute_error">Mean Absolute Error</option>
            <option value="binary_crossentropy">Binary Cross Entropy</option>
            <option value="hinge">Hinge</option>
            <option value="squared_hinge">Squared Hinge</option>
            <option value="categorical_crossentropy">Categorical Cross Entropy</option>
            <option value="sparse_categorical_crossentropy">Sparse Categorical Cross Entropy</option>
            <option value="kullback_leibler_divergence">Kullback Leibler Divergence</option>`
    }
    else if(framework == "PyTorch"){
        loss_selector.innerHTML = `
            <option value="BCELoss">Binary Cross Entropy</option>
            <option value="BCEWithLogitsLoss">Binary Cross Entropy with Logits</option>
            <option value="CTCLoss">Connectionist Temporal Classification</option>
            <option value="CosineEmbeddingLoss">Cosine Embedding</option>
            <option value="CrossEntropyLoss">Cross Entropy</option>
            <option value="HingeEmbeddingLoss">Hinge Embedding</option>
            <option value="KLDivLoss">Kullback Leibler Divergence</option>
            <option value="L1Loss">L1</option>
            <option value="MarginRankingLoss">Margin Ranking</option>
            <option value="MSELoss">Mean Squared Error</option>
            <option value="MultiLabelMarginLoss">Multi Label Margin</option>
            <option value="MultiLabelSoftMarginLoss">Multi Label Soft Margin</option>
            <option value="MultiMarginLoss">Multi Margin</option>
            <option value="NLLLoss">Negative Log Likelihood</option>
            <option value="PoissonNLLLoss">Negative Log Likelihood with Poisson Distribution</option>
            <option value="SmoothL1Loss">Smooth L1</option>
            <option value="SoftMarginLoss">Soft Margin</option>
            <option value="TripletMarginLoss">Triple Margin</option>
            `
    }
}

const change_optimizers = framework => {
    const optim_selector = document.getElementById("optimizer-selector");
    if (framework == "TensorFlow"){
        optim_selector.innerHTML = `
        <option value="Adam">Adam</option>
        <option value="Adadelta">Adadelta</option>
        <option value="Adagrad">Adagrad</option>
        <option value="Adamax">Adamax</option>
        <option value="Ftrl">Ftrl</option>
        <option value="Nadam">Nadam</option>
        <option value="RMSProp">RMSProp</option>
        <option value="SGD">SGD</option>
        `
    }
    else if(framework == "PyTorch"){
        optim_selector.innerHTML = `
        <option value="Adam">Adam</option>
        <option value="AdamW">Adam W</option>
        <option value="Adadelta">Adadelta</option>
        <option value="Adagrad">Adagrad</option>
        <option value="Adamax">Adamax</option>
        <option value="ASGD">ASGD</option>
        <option value="LBFGS">LBFGS</option>
        <option value="RMSProp">RMSProp</option>
        <option value="Rprop">Rprop</option>
        <option value="SGD">SGD</option>
        <option value="SparseAdam">SparseAdam</option>
        `
    }
}

const change_layers = (framework, prev_layers) => {
    const new_layers = [];

    //PyToch Case
    if(framework === "PyTorch"){

        for(layer of prev_layers){

            if(['Flatten', 'Max Pool 1D', 'Max Pool 2D', 'Max Pool 3D', 'Avg Pool 1D', 'Avg Pool 2D', 'Avg Pool 3D', 'Dropout'].indexOf(layer.name) >= 0){
                //Do Nothing with these layers
                new_layers.push(layer);
            }

            else if(['RNN', 'LSTM', 'GRU', 'Batch Normalization'].indexOf(layer.name) >= 0){
                //Delete these layers
                document.getElementById("layers-panel").removeChild(document.getElementById(layer.id));
            }

            //Convolutions
            else if (['Convolution 1D', 'Convolution 2D', 'Convolution 3D'].indexOf(layer.name) >= 0){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                layer.padding = 0;
                infos[4].innerHTML = "Padding: 0";
                switch(layer.activation){
                    case "relu":
                        layer.activation = "ReLU";
                        break;
                    case "tanh":
                        layer.activation = "Tanh";
                        break;
                    case "sigmoid":
                        layer.activation = "Sigmoid";
                        break;
                    case "linear":
                        layer.activation = "Linear";
                        break;
                }
                infos[3].innerHTML = `Activation: ${layer.activation}`;
                new_layers.push(layer);
            }

            //Linear (or Dense)
            else if(layer.name === "Linear"){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                switch(layer.activation){
                    case "tanh":
                        layer.activation = "Tanh";
                        break;
                    case "sigmoid":
                        layer.activation = "Sigmoid";
                        break;
                    case "linear":
                        layer.activation = "Linear";
                        break;
                    case "elu":
                        layer.activation = "ELU";
                        break;
                    case "softmax":
                        layer.activation = "Softmax";
                        break;
                    default:
                        layer.activation = "ReLU";
                        break;
                    
                }
                infos[1].innerHTML = `Activation: ${layer.activation}`;
                new_layers.push(layer);
            }

            //Activation Layer
            else if(layer.name === "Activation"){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                switch(layer.type){
                    case "ELU":
                    case "ReLU":
                    case "PReLU":
                    case "LeakyReLU":
                    case "Softmax":
                        break;
                    case "tanh":
                        layer.type = "Tanh";
                        break;
                    case "sigmoid":
                        layer.type = "Sigmoid";
                        break;
                    case "selu":
                        layer.type = "SELU";
                        break;
                    case "softplus":
                        layer.type = "Softplus";
                        break;
                    case "softsign":
                        layer.type = "Softsign";
                        break;    
                    default:
                        layer.type = "ReLU";
                        break;
                }
                infos[0].innerHTML = `Type: ${layer.type}`;
                new_layers.push(layer);
            }

            //Embedding Layer
            else if(layer.name === "Embedding"){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                infos[2].parentNode.removeChild(infos[2]);
                new_layers.push(layer);
            }

        }

    }

    //TensorFlow Case
    else if (framework === "TensorFlow"){

        for(layer of prev_layers){

            if(['Flatten', 'Max Pool 1D', 'Max Pool 2D', 'Max Pool 3D', 'Avg Pool 1D', 'Avg Pool 2D', 'Avg Pool 3D', 'Dropout'].indexOf(layer.name) >= 0){
                //Do Nothing with these layers
                new_layers.push(layer);
            }

            //Convolutions
            else if (['Convolution 1D', 'Convolution 2D', 'Convolution 3D'].indexOf(layer.name) >= 0){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                layer.padding = "valid";
                infos[4].innerHTML = "Padding: valid";
                switch(layer.activation){
                    case "ReLU":
                        layer.activation = "relu";
                        break;
                    case "Tanh":
                        layer.activation = "tanh";
                        break;
                    case "Sigmoid":
                        layer.activation = "sigmoid";
                        break;
                    case "Linear":
                        layer.activation = "linear";
                        break;
                }
                infos[3].innerHTML = `Activation: ${layer.activation}`;
                new_layers.push(layer);
            }

            //Linear (or Dense)
            else if(layer.name === "Linear"){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                switch(layer.activation){
                    case "Tanh":
                        layer.activation = "tanh";
                        break;
                    case "Sigmoid":
                        layer.activation = "sigmoid";
                        break;
                    case "Linear":
                        layer.activation = "linear";
                        break;
                    case "ELU":
                        layer.activation = "elu";
                        break;
                    case "Softmax":
                        layer.activation = "softmax";
                        break;
                    default:
                        layer.activation = "relu";
                        break;
                    
                }
                infos[1].innerHTML = `Activation: ${layer.activation}`;
                new_layers.push(layer);
            }

            //Activation Layer
            else if(layer.name === "Activation"){
                const infos = document.getElementById(layer.id).getElementsByClassName("info");
                switch(layer.type){
                    case "ELU":
                    case "ReLU":
                    case "PReLU":
                    case "LeakyReLU":
                    case "Softmax":
                        break;
                    case "Tanh":
                        layer.type = "tanh";
                        break;
                    case "Sigmoid":
                        layer.type = "sigmoid";
                        break;
                    case "SELU":
                        layer.type = "selu";
                        break;
                    case "Softplus":
                        layer.type = "softplus";
                        break;
                    case "Softsign":
                        layer.type = "softsign";
                        break;    
                    default:
                        layer.type = "ReLU";
                        break;
                }
                infos[0].innerHTML = `Type: ${layer.type}`;
                new_layers.push(layer);
            }

            //Embedding Layer
            else if(layer.name === "Embedding"){
                const infos = document.getElementById(layer.id);
                const new_info = document.createElement('p');
                const attr = document.createAttribute("class");
                attr.value = "info";
                new_info.setAttributeNode(attr);
                new_info.innerHTML = `Input Length: ${layer.input_length}`;
                infos.appendChild(new_info);
                new_layers.push(layer);
            }

            //Batch Normalizations
            else if(['Batch Norm 1D', 'Batch Norm 2D', 'Batch Norm 3D'].indexOf(layer.name) >= 0){
                const infos = document.getElementById(layer.id);
                infos.removeChild(infos.getElementsByClassName('info')[0]);
                infos.getElementsByClassName('cog')[0].innerHTML = "";
                infos.getElementsByClassName('cog')[0].setAttribute('class', "cog-invisible");
                infos.getElementsByClassName('main-heading-4')[0].innerHTML = "Batch Normalization";
                const new_layer = {
                    id: layer.id,
                    name: "Batch Normalization"
                };
                new_layers.push(new_layer);
            }

        }

    }
    return new_layers;
}

module.exports.change_losses = change_losses;
module.exports.change_optimizers = change_optimizers;
module.exports.change_layers = change_layers;