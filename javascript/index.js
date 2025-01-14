"use strict"


import { ConsList } from "./ConsList.js";
import { Consumption } from "./Consumption.js";
import { AllmanInfo } from "./allmanInfo.js";
import { RegexChecks } from "./RegexChecks.js";




const allmanInfo = new AllmanInfo(1, 3, "und");

const consList = new ConsList(allmanInfo);

let haveGivenInfo = false;

document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector("h1");
    const add = h1.querySelector("#add");
    const addpanel = add.querySelector("#addpanel");
    const addButton = addpanel.querySelector("#addButton");
    const closeBtn = document.querySelector(".close");
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector("#popup-content");
    const laggTill = document.querySelector("#laggTill");
    const avbryt = document.querySelector("#avbryt");
    const consListElement = document.querySelector("#consList");
    const vikt = document.querySelector("#vikt");
    const scale = document.querySelector("#scale");

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

    const genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (input.checked) {
                allmanInfo.setGender(input.value);
                console.log(allmanInfo.getGender());
            }

            updateChart(consList, myChart);
        });
    });

    vikt.addEventListener('input', function() {
        allmanInfo.setVikt(vikt.value);
        haveGivenInfo = true;
        console.log(allmanInfo.getVikt());
        updateChart(consList, myChart);
    });

    scale.addEventListener('input', function() {
        allmanInfo.setScale(scale.value);
        console.log(allmanInfo.getScale());
        updateChart(consList, myChart);
    });


    addButton.addEventListener('click', function() {
        console.log("click");
    });

    add.addEventListener('click', function() {
        console.log("click");
    });

    addButton.addEventListener('click', function() {
        if(haveGivenInfo === false){ 
            console.log("Du måste fylla i din vikt först");
            alert("Du måste fylla i din vikt först");
        } else {
            popup.style.display = "block";
        }
    });

    closeBtn.addEventListener('click', function() {
        const errorPopup = document.querySelector('.errorPopup');
        if (errorPopup) {
            errorPopup.remove();
        }
        
        popup.style.display = "none";
    });

    avbryt.addEventListener('click', function() {
        popup.style.display = "none";
        console.log("avbryt");
        const errorPopup = document.querySelector('.errorPopup');
        if (errorPopup) {
            errorPopup.remove();
        }
    });

    laggTill.addEventListener('click', function(){
        
        
            console.log("lägg till");
            const alkoholhalt = document.querySelector("#alkoholhalt").value;
            const tid = document.querySelector("#tid").value;
            const volym = document.querySelector("#volym").value;
            const namn = document.querySelector("#namn").value;
            const dryckestid = document.querySelector("#dryckestid").value;
            
            const errorStr = checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid);
            
            if(errorStr.length > 0){
                console.log("fel inputs");
                const errorPopUp = createErrorPopup(errorStr);
                popupContent.appendChild(errorPopUp);
            } 
            
            else {
                consList.addItem(new Consumption(alkoholhalt, volym, tid, namn, dryckestid, allmanInfo));
                consListFix(consList, consListElement, myChart);
                
                const errorPopup = document.querySelector('.errorPopup');
                if (errorPopup) {
                    errorPopup.remove();
                }
                popup.style.display = "none";

                

                //console.log(myChart.datasets[0].data);
                console.log(consList.getValues() + "values");
            
            }
        
    });     
    

    

    
});





function clearContent(element) {
    element.innerHTML = "";
}


function createConsItem(cons, consListElement, myChart){
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
    

    const dryckNbrP = createNameParagraphAndAppendText(drycknamn, `(${index})`);
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

    const removePtext = document.createElement("p");
    removePtext.className = "removeConText";
    removePtext.textContent = "Ta bort";
    removeButton.appendChild(removePtext);
   
    removeButton.addEventListener('click', function(){
        consList.removeItem(cons);
        consListFix(consList, consListElement, myChart);
    })

    consDiv.appendChild(removeButton);

    const editButton = document.createElement("div");
    editButton.className = "editCon";

    const editPtext = document.createElement("p");
    editPtext.className = "removeConText";
    editPtext.textContent = "Ändra";
    editButton.appendChild(editPtext);
   
    editButton.addEventListener('click', function(){
        editCon(cons);
        consListFix(consList, consListElement, myChart);
    })

    consDiv.appendChild(removeButton);



    return consDiv;


}

function createParagraphAndAppendText(text, input){
    const p = document.createElement("p");
    p.className = "consText";
    p.textContent = `${text} ${input}`;

    return p;

}

function createNameParagraphAndAppendText(text, input){
    const p = document.createElement("p");
    p.className = "consNameText";
    p.textContent = `${text} ${input}`;

    return p;

}

function consListFix(consList, consListElement, myChart){
    consList.sortByTime();

    if (consListElement) {
        clearContent(consListElement);
    }

    for(const cons of consList.getList()){
        const item = createConsItem(cons, consListElement, myChart);
        consListElement.appendChild(item);
    }
    console.log("added item");

    updateChart(consList, myChart);

}


function createErrorPopup(errorStr){
    const errorPopup = document.createElement("div");
    errorPopup.className = "errorPopup";

    const closeButton = document.createElement("span");
    closeButton.className = "closeButtonPopUp";
    closeButton.textContent = "X";

    errorPopup.appendChild(closeButton);

    errorStr.forEach(error => {
        const errorText = document.createElement("p");
        errorText.className = "errorText";
        errorText.textContent = error;
        errorPopup.appendChild(errorText);
    });

    

    closeButton.addEventListener("click", () => {
        errorPopup.remove();
    });

    
    

    

    return errorPopup;
}

function updateChart(consList, myChart){
    if(consList.getList().length > 0){
        consList.fixEverything();
        myChart.data.labels = consList.getTimes();
        myChart.data.datasets[0].data = consList.getValues();
        myChart.update();
    }
}

function editCon(cons){