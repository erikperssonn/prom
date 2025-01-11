"use strict"

import { ConsList } from "./ConsList.js";
import { Consumption } from "./Consumption.js";


const consList = new ConsList();

document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector("h1");
    const add = h1.querySelector("#add");
    const addpanel = add.querySelector("#addpanel");
    const addButton = addpanel.querySelector("#addButton");
    const closeBtn = document.querySelector(".close");
    const popup = document.getElementById("popup");
    const laggTill = document.querySelector("#laggTill");
    const avbryt = document.querySelector("#avbryt");
    const consListElement = document.querySelector("#consList");

    



    addButton.addEventListener('click', function() {
        console.log("click");
    });

    add.addEventListener('click', function() {
        console.log("click");
    });

    addButton.addEventListener('click', function() {
        popup.style.display = "block";
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = "none";
    });

    avbryt.addEventListener('click', function() {
        popup.style.display = "none";
        console.log("avbryt");
    });

    laggTill.addEventListener('click', function(){
        console.log("lägg till");
        const alkoholhalt = document.querySelector("#alkoholhalt").value;
        const tid = document.querySelector("#tid").value;
        const volym = document.querySelector("#volym").value;
        const namn = document.querySelector("#namn").value;
        const dryckestid = document.querySelector("#dryckestid").value;

        const errorStr = checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid);

        if(!errorStr === ""){
            console.log("fel inputs");
        } 
        
        else {
            consList.addItem(new Consumption(alkoholhalt, volym, tid, namn, dryckestid));
            consListFix(consList, consListElement);

        }
    })


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Promille nivå',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
});



function elmGetText(element){
    const result = element.textContent;
    return result;
}

function checkVolymRegex(volym){
    const volymRegex = /^\d+$/;
    return volymRegex.test(volym);
}

function checkAlkoRegex(alkoholhalt){
    const alkoRegex = /^\d+([.,]\d+)?$/;
    return alkoRegex.test(alkoholhalt);
}

function checkTidRegex(tid){
    const tidRegex = /^\d{2}[:.]\d{2}$/;
    return tidRegex.test(tid);
}

function checkNamnRegex(namn){
    const namnRegex = /^[a-zA-Z0-9\s]+$/;
    return namnRegex.test(namn);
}

function checkDryckesTidRegex(dryckestid){
    const dryckesTidRegex = /^\d+$/;
    return dryckesTidRegex.test(dryckestid);
}

function checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid){
    let errorStr = "";

    if(!checkAlkoRegex(alkoholhalt)){
        errorStr+="Fel i inskrivning av alkoholhalt, följ formatet: tal.tal\n";
    }
    if(!checkTidRegex(tid)){
        errorStr+="Fel i inskrivning av tid, följ formatet: hh:mm\n";
    }
    if(!checkVolymRegex(volym)){
        errorStr+="Fel i inskrivning av volym, följ formatet: tal\n";
    }
    if(namn !== "" && !checkNamnRegex(namn)){
        errorStr+="Fel i inskrivning av namn, följ formatet: ord eller siffor, blandat går\n";
    }
    if(dryckestid !== "" && checkDryckesTidRegex(dryckestid)){
        errorStr += "Fel i inskrivning av dryckestid, följ format: tal\n";
    }

    return errorStr;
}

function clearContent(element) {
    element.innerHTML = "";
}


function createConsItem(cons, consListElement){
    const alkoholhalt = cons.getAlko();
    const volym = cons.getVolym();
    const tid = cons.getTid();
    const namn = cons.getNamn();
    const dryckestid = cons.getDryckestid();

    console.log(tid);
    
    const consDiv = document.createElement("div");
    consDiv.className = "consItem";
    consDiv.id = `consItem-${consList.getList().indexOf(cons)}`;

    const index = consList.getList().indexOf(cons) +1;
    const drycknamn = namn !== "" ? namn : "Dryck";
    const dryckestidTid = dryckestid !== "" ? dryckestid : "-"
    

    const dryckNbrP = createParagraphAndAppendText(drycknamn, `(${index})`);
    const alkoholP = createParagraphAndAppendText("Alkoholhalt: ", alkoholhalt);
    const volymP = createParagraphAndAppendText("Volym: ", volym);
    const tidP = createParagraphAndAppendText("Tidpunkt: ", tid);
    const dryckestidP = createParagraphAndAppendText("Dryckestid: ", dryckestidTid);

    consDiv.appendChild(dryckNbrP);
    consDiv.appendChild(alkoholP);
    consDiv.appendChild(volymP);
    consDiv.appendChild(tidP);
    consDiv.appendChild(dryckestidP)

    const removeButton = document.createElement("div");
    removeButton.className = "removeCon";

    removeButton.textContent = "Ta bort";
    removeButton.addEventListener('click', function(){
        consList.removeItem(cons);
        consListFix(consList, consListElement);
    })

    consDiv.appendChild(removeButton);

    return consDiv;


}

function createParagraphAndAppendText(text, input){
    const p = document.createElement("p");
    p.clasName = "consText";
    p.textContent = `${text} ${input}`;

    return p;

}

function consListFix(consList, consListElement){
    consList.sortByTime();

    if (consListElement) {
        clearContent(consListElement);
    }

    for(const cons of consList.getList()){
        const item = createConsItem(cons, consListElement);
        consListElement.appendChild(item);
    }
    console.log("added item");

}
