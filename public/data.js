GetData();

async function GetData() {
    const response = await fetch(`/api`);
    const data = await response.json();

    console.log(data);

    for(obj of data) {
        const element = document.createElement(`div`);
        const txt = document.createElement(`p`);
        const img = document.createElement(`img`);
        
        txt.textContent = `${obj.name} is running on ${obj.platform} at ${obj.ip}`;
        
        if (obj.image64 != null) {
            img.src = obj.image64;
            img.size = 150;
            img.alt = `${obj.name}'s picture`;
        }
        else {
            img.size = 0;
            img.alt = `${obj.name} didn't provide a picture...`;
        }

        element.appendChild(txt);   
        element.appendChild(img);   
        
        document.body.append(element);
    }
}