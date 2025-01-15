"use strict"


import { ConsList } from "./ConsList.js";
import { AllmanInfo } from "./allmanInfo.js";
import { ButtonFunctions } from "./ButtonFunctions.js";
import { LaggTill } from "./LaggTill.js";
import { RegexChecks } from "./RegexChecks.js";


class Main{
    document;

    allmanInfo;
    consList;
    buttonFunctions;
    laggTillClass;
    regexChecks;

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

    ctx;
    myChart;

    //färdig
    constructor(document){
        this.allmanInfo = new AllmanInfo(1, 3, "und");
        this.consList = new ConsList(this.allmanInfo);
        this.haveGivenInfo = false;
        this.buttonFunctions = new ButtonFunctions(this); 
        this.laggTillClass = new LaggTill(this);
        this.regexChecks = new RegexChecks();
        this.document = document;
        
        console.log("constructor completed");

    }
    //färdig
    initElements(){
        this.document.addEventListener("DOMContentLoaded", () => {
            console.log("DOMContentLoaded");
            this.h1 = this.document.querySelector("h1");
            this.add = this.h1.querySelector("#add");
            this.addpanel = this.add.querySelector("#addpanel");
            this.addButton = this.addpanel.querySelector("#addButton");
            this.closeBtn = this.document.querySelector(".close");
            this.popup = this.document.getElementById("popup");
            this.popupContent = this.document.querySelector("#popup-content");
            this.laggTill = this.document.querySelector("#laggTill");
            this.avbryt = this.document.querySelector("#avbryt");
            this.consListElement = this.document.querySelector("#consList");
            this.vikt = this.document.querySelector("#vikt");
            this.scale = this.document.querySelector("#scale");

            console.log("initElements completed");
            this.addFunctionsToButtons();
            this.initChart();
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
        console.log("initChart completed");
    }

    //färdig
     createParagraphAndAppendText(text, input){
        const p = this.document.createElement("p");
        p.className = "consText";
        p.textContent = `${text} ${input}`;
    
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
    
        console.log("finished adding functions to buttons");
    }

    run(){
        this.initElements();
        console.log("run completed");
    }
}

const main = new Main(document);

main.run();


