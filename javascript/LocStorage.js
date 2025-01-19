import { Consumption } from "./Consumption.js";

export class LocStorage{

    #main;

    constructor(main){
        this.#main = main;
    }

    addConsumption(cons){

        localStorage.setItem(this.getAndCreateConsumptionKey(cons), this.consumptionToJSON(cons));
        console.log("added to loc storage");
    }

    removeConsumption(cons){
        localStorage.removeItem(this.getAndCreateConsumptionKey(cons));
    }

    consumptionToJSON(cons){
        const consumptionObj = {
            alkoholhalt: cons.getAlko(),
            time: cons.getTid(),
            volym: cons.getVolym(),
            namn: cons.getNamn(),
            dryckestid: cons.getDryckestid()
        }

        return JSON.stringify(consumptionObj);

    }

    getAndCreateConsumptionKey(cons){
        let str = "";
        str +=  cons.getTid() + cons.getVolym() + cons.getNamn() + cons.getDryckestid() + cons.getAlko() ;
        return str;
    }

    returnArrOfConsumptionsFromLocStorage(){
        let arr = [];
        const regexTest = /^\d{2}:\d{2}.+/; // Regex pattern to match xx:xx+++

        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(regexTest.test(key)){
                const consJSON = localStorage.getItem(localStorage.key(i));
                const consObj = JSON.parse(consJSON);
                console.log(consJSON);
                console.log("-------------alkoholhalt: " + consObj.alkoholhalt + "   time: " + consObj.time + "   volym: " + consObj.volym + "   namn: " + consObj.namn + "   dryckestid: " + consObj.dryckestid);
                arr.push(new Consumption(consObj.alkoholhalt, consObj.volym, consObj.time, consObj.namn, consObj.dryckestid, this.#main.allmanInfo, this.#main));
            }
        }

        return arr;
    }

    removeConsumptionsFromLocStorage(){
        const regexTest = /^\d{2}:\d{2}.+/; // Regex pattern to match xx:xx+++

        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(regexTest.test(key)){
                localStorage.removeItem(localStorage.key(i));
            }
        }

    }

    saveVikt(vikt){
        localStorage.setItem("vikt", vikt);
    }

    locStorageGetVikt(){
        return localStorage.getItem("vikt");
    }
}