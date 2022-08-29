const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";
const apiKey = {
    headers : {
        "x-apikey" : "600ec2fb1346a1524ff12de4",
    }
}

let retter;
let filter = "alle";

async function hentRetter(){
const response = await fetch(endpoint, apiKey);
retter = await response.json();   
visRetter(retter)
}

hentRetter();

function visRetter(retter){
const template = document.querySelector("template").content;
const alleRetter = document.querySelector("#indhold");

alleRetter.innerHTML = "";

retter.forEach(ret => {

    if(filter == ret.kategori || filter == "alle"){
        const klon = template.cloneNode(true);
        klon.querySelector("h3").textContent = ret.navn;
        klon.querySelector("img").src = "images/medium/" + ret.billednavn + "-md.jpg";
        klon.querySelector("#beskrivelse").textContent = ret.kortbeskrivelse;
        klon.querySelector("#pris").textContent = `Pris ${ret.pris},-`;
        alleRetter.appendChild(klon);
    }
});    
}

const hverKnap = document.querySelectorAll("button"); 

function knapFunktionalitet(){
    hverKnap.forEach(element => {
    element.addEventListener("click", vaelg);        
    });
}

knapFunktionalitet();

function vaelg(){
filter = this.dataset.kategori;     
document.querySelector(".valgt").classList.remove("valgt");
this.classList.add("valgt");
visRetter(retter);
}
