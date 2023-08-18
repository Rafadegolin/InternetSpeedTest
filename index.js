let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let testCompleted = 0;

// imagem aleatória
let imageApi = "https://source.unsplash.com/random?topic=nature";

// quando a imagem carerga
image.onload = async function () {
    endTime = new Date().getTime();

    // pega o tamanho da imagem
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// função pra calcular a velocidade
function calculateSpeed() {
    // tempo em segundos
    let timeDuration = (endTime - startTime) / 1000;
    // total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // se todo os testes completos (pegamo 5 imagens e faz a média)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // mostra velocidade media
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Teste Completo!";
    } else {
        // roda o próximo teste
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// função inicial para começar o teste
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// roda teste quando a janela carrega
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};