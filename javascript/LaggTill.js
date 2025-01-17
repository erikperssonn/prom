import { RegexChecks } from "./RegexChecks.js";
import { Consumption } from "./Consumption.js";


export class LaggTill{

    main;

    constructor(main){
        this.main = main;
    }

    //ok
    laggTill_FromPopUp(){
        console.log("lägg till");
        const alkoholhalt = this.main.document.querySelector("#alkoholhalt").value;
        const tid = this.main.document.querySelector("#tid").value;
        const volym = this.main.document.querySelector("#volym").value;
        const namn = this.main.document.querySelector("#namn").value;
        const dryckestid = this.main.document.querySelector("#dryckestid").value;

        console.log(tid + " " + alkoholhalt + " " + volym + " " + namn + " " + dryckestid + "------------------------------");
        
        const errorStr = this.main.regexChecks.checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid);
        
        this.createPopUpOrAdd(errorStr, alkoholhalt, volym, tid, namn, dryckestid, this.main.allmanInfo);
        
    }

    //ok
    createConsItem(cons, consListElement, myChart){
        const alkoholhalt = cons.getAlko();
        const volym = cons.getVolym();
        const tid = cons.getTid();
        const namn = cons.getNamn();
        const dryckestid = cons.getDryckestid();
    
        console.log(tid);
        
        const consDiv = this.main.document.createElement("div");
        consDiv.className = "consItem";
        consDiv.id = `consItem-${this.main.consList.getList().indexOf(cons)}`;
    
        const index = this.main.consList.getList().indexOf(cons) +1;
        const drycknamn = namn !== "" ? namn : "Dryck";
        const dryckestidTid = dryckestid !== "" ? dryckestid : "-"
        
    
        const dryckNbrP = this.main.createNameParagraphAndAppendText(drycknamn, `(${index})`);
        const alkoholP = this.main.createParagraphAndAppendText("Alkoholhalt: ", alkoholhalt);
        const volymP = this.main.createParagraphAndAppendText("Volym: ", volym);
        const tidP = this.main.createParagraphAndAppendText("Tidpunkt: ", tid);
        const dryckestidP = this.main.createParagraphAndAppendText("Dryckestid: ", dryckestidTid);
    
        consDiv.appendChild(dryckNbrP);
        consDiv.appendChild(alkoholP);
        consDiv.appendChild(volymP);
        consDiv.appendChild(tidP);
        consDiv.appendChild(dryckestidP)
    
        this.addButtonsToConsDiv(consDiv, cons);
    
        return consDiv;
    
    }

    addButtonsToConsDiv(consDiv, cons){
        const removeButton = this.main.document.createElement("div");
        removeButton.className = "removeCon";
    
        const removePtext = this.main.document.createElement("p");
        removePtext.className = "removeConText";
        removePtext.textContent = "Ta bort";
        removeButton.appendChild(removePtext);
       
        removeButton.addEventListener('click',  () => this.main.buttonFunctions.removeConsItemFromList(cons));
    
        consDiv.appendChild(removeButton);
    
        const editButton = this.main.document.createElement("div");
        editButton.className = "editCon";
    
        const editPtext = this.main.document.createElement("p");
        editPtext.className = "removeConText";
        editPtext.textContent = "Edit";
        editButton.appendChild(editPtext);
       
        editButton.addEventListener('click', () => {
            this.editCon(cons);
            this.main.consList.removeItem(cons);
        })
    
        consDiv.appendChild(editButton);
    }

    createPopUpOrAdd(errorStr, alkoholhalt, volym, tid, namn, dryckestid){
        if(errorStr.length > 0){
             console.log("fel inputs");
             const errorPopUp = this.createErrorPopup(errorStr);
             this.main.popupContent.appendChild(errorPopUp);
         } 
         else {
            const consumption = new Consumption(alkoholhalt, volym, tid, namn, dryckestid, this.main.allmanInfo, this.main)
             this.main.consList.addItem(consumption);
             this.main.locStorage.addConsumption(consumption);
             this.consListFix_MainPage(this.main.consList, this.main.consListElement, this.main.myChart);
             
             const errorPopup = this.main.document.querySelector('.errorPopup');
             if (errorPopup) {
                 errorPopup.remove();
             }
             this.main.popup.style.display = "none";
             
             //console.log(myChart.datasets[0].data);
             console.log(this.main.consList.getValues() + "values");


         
         }
    }

    //ok
     createErrorPopup(errorStr){
        const errorPopup = this.main.document.createElement("div");
        errorPopup.className = "errorPopup";
    
        const closeButton = this.main.document.createElement("span");
        closeButton.className = "closeButtonPopUp";
        closeButton.textContent = "X";
    
        errorPopup.appendChild(closeButton);
    
        errorStr.forEach(error => {
            const errorText = this.main.document.createElement("p");
            errorText.className = "errorText";
            errorText.textContent = error;
            errorPopup.appendChild(errorText);
        });
    
        
    
        closeButton.addEventListener("click", () => {
            errorPopup.remove();
        });
    
        return errorPopup;
    }

    //ok
    consListFix_MainPage(consList, consListElement, myChart){
        this.main.consList.sortByTime();
    
        if (consListElement) {
            this.main.clearContent(consListElement);
        }
        if(consList.getList().length > 0){
            for(const cons of consList.getList()){
                console.log("tid " + cons.getTid() + " alkoholhalt " + cons.getAlko() + " volym " + cons.getVolym());
                const item = this.createConsItem(cons, consListElement, myChart);
                consListElement.appendChild(item);
            }
        }
        console.log("added item");
    
        this.main.updateChart(consList, myChart);
    
    }

    editCon(cons){
        this.main.popup.style.display = "block";
        this.main.document.querySelector("#alkoholhalt").value = cons.getAlko();
        this.main.document.querySelector("#tid").value = cons.getTid();
        this.main.document.querySelector("#volym").value = cons.getVolym();
        this.main.document.querySelector("#namn").value = cons.getNamn();
        this.main.document.querySelector("#dryckestid").value = cons.getDryckestid();

    }

    
}