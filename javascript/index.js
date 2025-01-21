"use strict"


import { ConsList } from "./ConsList.js";
import { AllmanInfo } from "./allmanInfo.js";
import { ButtonFunctions } from "./ButtonFunctions.js";
import { LaggTill } from "./LaggTill.js";
import { RegexChecks } from "./RegexChecks.js";
import { LocStorage } from "./LocStorage.js";


class Main{
    document;

    allmanInfo;
    consList;
    buttonFunctions;
    laggTillClass;
    regexChecks;
    locStorage;

    haveGivenInfo;

    h1;
    add;
    addpanel;
    addButton;
    closeBtn;
    popup;
    popupContent;
    laggTill;
    avbryt;
    consListElement;
    vikt;
    scale;
    removeAllButton;

    ctx;
    myChart;

    //färdig
    constructor(document){
        this.haveGivenInfo = localStorage.getItem("vikt") !== null ? true : false;

        this.allmanInfo = this.haveGivenInfo ? new AllmanInfo(localStorage.getItem("vikt"), 3, "und") : new AllmanInfo(1, 3, "und");
        this.consList = new ConsList(this.allmanInfo, this);
        this.buttonFunctions = new ButtonFunctions(this); 
        this.laggTillClass = new LaggTill(this);
        this.regexChecks = new RegexChecks();
        this.document = document;
        this.locStorage = new LocStorage(this);
        
        console.log("constructor completed");

    }
    //färdig
    initElements(){
        this.document.addEventListener("DOMContentLoaded", () => {
            console.log("DOMContentLoaded");
            this.h1 = this.document.querySelector("h1");
            //this.add = this.h1.querySelector("#add");
            this.addpanel = this.document.querySelector("#addpanel");
            this.addButton = this.document.querySelector("#addButton");
            this.closeBtn = this.document.querySelector(".close");
            this.popup = this.document.getElementById("popup");
            this.popupContent = this.document.querySelector("#popup-content");
            this.laggTill = this.document.querySelector("#laggTill");
            this.avbryt = this.document.querySelector("#avbryt");
            this.consListElement = this.document.querySelector("#consList");
            this.vikt = this.document.querySelector("#vikt");
            this.scale = this.document.querySelector("#scale");
            this.removeAllButton = this.document.querySelector("#tabortAllt");

            this.vikt.value = localStorage.getItem("vikt") !== null ? localStorage.getItem("vikt") : null;

            console.log("initElements completed");
            this.addFunctionsToButtons();
            
        });
    }

    //färdig
    initChart(){
        this.ctx = this.document.getElementById('myChart').getContext('2d');
        this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Promille nivå',
                data: [],
                backgroundColor: [
                    
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    
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
        console.log("initChart completed");

        this.consList.addEntireList(this.locStorage.returnArrOfConsumptionsFromLocStorage());
        this.fixConsListElementIfEmpty();
    }

    //färdig
     createParagraphAndAppendText(text, input, altTrailer){
        const p = this.document.createElement("p");
        p.className = "consText";
        //p.textContent = `${text} ${input}`;
        
        const inputDescription = this.document.createElement("strong");
        inputDescription.textContent = text;

        const inputText = this.document.createTextNode(` ${input}`);

        p.appendChild(inputDescription);
        p.appendChild(inputText);

        if(altTrailer){
            const trailer = this.document.createTextNode(altTrailer);
            p.appendChild(trailer);
        }
    
        return p;
    
    } 
    
    //färdig
     createNameParagraphAndAppendText(text, input){
        const p = this.document.createElement("p");
        p.className = "consNameText";
        p.textContent = `${text} ${input}`;

        return p;
    
    }

    //färdig
    updateChart(consList, myChart){
        if(consList.getList().length > 0){
            consList.fixEverything();
            myChart.data.labels = consList.getTimes();
            myChart.data.datasets[0].data = consList.getValues();
            myChart.update();
        }
    }

    //färdig
    clearContent(element) {
        element.innerHTML = "";
    }

    addFunctionsToButtons(){
        
        const genderInputs = this.document.querySelectorAll('input[name="gender"]');
        genderInputs.forEach(input => {
            input.addEventListener('change', () => this.buttonFunctions.genderChange(input));
        });
    
        this.vikt.addEventListener('input', () => this.buttonFunctions.viktChange());
        this.scale.addEventListener('input', () => this.buttonFunctions.scaleChange());
    
        this.addButton.addEventListener('click', () => this.buttonFunctions.addConsButton_FromMainScreen());
        this.closeBtn.addEventListener('click', () => this.buttonFunctions.closePopupX_OnAddPopUp());
    
        this.laggTill.addEventListener('click', () => this.laggTillClass.laggTill_FromPopUp());
        this.avbryt.addEventListener('click', () => this.buttonFunctions.avbrytBtn_OnAddPopUp());

        this.removeAllButton.addEventListener('click', () => this.buttonFunctions.removeAllButton());
    
        console.log("finished adding functions to buttons");

        this.initChart();
    }

    fixConsListElementIfEmpty(){
        if(this.consListElement.children.length === 0){
            
            const diven = this.document.createElement("div");
            diven.className = "consItem";

            const p = this.document.createElement("p");
            p.className = "consNameTextEmpty";
            p.textContent = "Ingen konsumtion tillagd.";
            diven.appendChild(p);

            this.consListElement.appendChild(diven);

            const emptyArr = [];
            this.myChart.data.labels = emptyArr;
            this.myChart.data.datasets[0].data = emptyArr;
            this.myChart.update();
            console.log("emptyArr: " + emptyArr);
        }
    }

    run(){
        this.initElements();        
        console.log("run completed");
    }
}

const main = new Main(document);

main.run();


