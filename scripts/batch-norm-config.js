const { ipcRenderer } = require('electron');
let layer;

document.getElementById('cancle').addEventListener('click', () => {
    ipcRenderer.send('close-small');
});

document.getElementById('done').addEventListener('click', () => {
    let complete = true;
    if (document.getElementById("param_num").value < 1) { complete = false }
    if (document.getElementById("param_num").value == "") { complete = false }
    if (complete === false) {
        return;
    }
    layer.param_num = document.getElementById("param_num").value;
    ipcRenderer.send("layer-config-finish", layer);
});

ipcRenderer.on("layer-config", (event, arg) => {
    layer_config = arg.layer;
    document.getElementById("param_num").value = layer_config.param_num;
    layer = layer_config;
});

(function () {
    ipcRenderer.send('ready-layer-config');
})();