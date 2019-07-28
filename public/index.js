const imageInputBox = document.getElementById(`imageInput`);
const uploadDataButton = document.getElementById(`uploadData`);

let img64;

function readImageInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (theFile) => {

        console.log(reader.result);

        img64 = reader.result;

        document.getElementById(`preview`).src = img64;
    }

    reader.readAsDataURL(file);

    console.log(img64);
}

async function uploadData() {
    const name = document.getElementById(`nameInput`).value;
    const platform = navigator.platform;
    
    const ipifyResponse = await fetch(`https://api.ipify.org`);
    const ip = await ipifyResponse.text();

    const outData = { 
        name: name,
        platform: navigator.platform,
        ip: ip,
        image64: img64
    };
    if (outData.name == "") {
        alert("No name given!!!");
        return;
    }
    if (outData.image64 == "") {
        alert(`No image given!!!`);
        return;
    }

    const options = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(outData)
    }
    
    document.getElementById(`platformTag`).textContent = `Platform: ${outData.platform}`; 
    
    const response = await fetch('/api', options);
    const inData = await response.json();
    console.log(inData);
}

document.getElementById("seeData").onclick = () => {
    location.href = "/data.html";
};

//imageInputBox.addEventListener(`change`, readImageInput);
imageInputBox.onchange = readImageInput;
uploadDataButton.onclick = uploadData;