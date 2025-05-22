const resultImg = document.getElementById('resultImg')
const buttonGenerate = document.getElementById('Generate')
const inputField = document.getElementById('input');
const downloadButton = document.getElementById('downloadQr')

// making function to get Qrcode from api
async function getQr() {
    try {
        const input = inputField.value
        const valueIn = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${input}`
        const response = await fetch(valueIn);
        if(!response.ok) {
            throw new Error(`error bos ${response.status}`)
        }
        // using blob metod to make url
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        // entring data for img element
        resultImg.style.display = "block"
        resultImg.src = blobUrl

        // make system for download button and validation
        downloadButton.style.color = "black"
        downloadButton.href = blobUrl
        downloadButton.download = `QrCode${Math.floor(Math.random() * 1000 + 1)}.png`
    } 
    catch (error){
        throw new Error(`error bos ${error}`)
    }
    finally {
        console.log('procesed done')
    }
}

// making button validation for generate button
buttonGenerate.addEventListener('click', (event) => {
    event.preventDefault()
    if(inputField.value.length + 1 > 1) {
        getQr()
        inputField.value = ""
    } else {
        alert('Input is Emty 🗿')
    }
})

// making download validation
downloadButton.addEventListener('click', (event) => {
    // event.preventDefault()
    if(!resultImg.src) {
        alert('waiting load data')
    }
    return;
})

console.log(downloadButton)