"use strict"


export class Consumption{
    #alkoholhalt;
    #volym;
    #tid;
    #namn;
    #dryckestid;
    #alcoholWeight = 0.79;
    #allmanInfo;
    #values;
    #finalValues;
    #date;
    #main;

    constructor(alkoholhalt, volym, tid, namn, dryckestid, allmanInfo, main){
        this.#alkoholhalt = alkoholhalt;
        this.#volym = volym;
        this.#tid = tid;
        this.#namn = namn;
        this.#dryckestid = dryckestid !== "" ? dryckestid : 20;
        this.#allmanInfo = allmanInfo;
        this.#values = [];
        this.#finalValues = [];
        this.#main = main;


    }

    getCleanTime(){
        console.log(this.#tid);
        return this.#tid.replace(":", "");
    }

    fixStartDate(){
        let datee = new Date();
        datee.setHours(this.#tid.split(":")[0]);
        datee.setMinutes(this.#tid.split(":")[1]);
        this.#date = datee;
    }

    getAlko(){
        return this.#alkoholhalt;
    }

    getVolym(){
        return this.#volym;
    }

    getTid(){
        return this.#tid;
    }

    getDryckestid(){
        return this.#dryckestid;
    }

    getNamn(){
        return this.#namn;
    }


    functionen2(){
        const nbrOfDrinks = this.#main.consList.getList().length;

        this.#values = [];

        this.fixStartDate();

        const totAlcoWeight = this.#alkoholhalt * this.#volym * this.#alcoholWeight * 0.01;

        let nbrIndelningar = 0;

        
        nbrIndelningar = Number(this.#dryckestid) + Number(this.#allmanInfo.getScale() * 15 );
        console.log(this.#dryckestid  + this.#allmanInfo.getScale() * 15);
       

        let totalAlco = 0;
        let totalAdd = 0;
        const startTime = new Date(this.#date);
        console.log("startTime: -------------------------------------------- " + startTime);
        for(let i = 0; i < nbrIndelningar; i++){
            
            const time = new Date(startTime);
            time.setMinutes(time.getMinutes() + i);
            const alco = totAlcoWeight / nbrIndelningar;
            
            const insertObj = {
                time: time,
                alco: alco,
                displayTime: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
            }
            

            this.#values.push(insertObj);
        }

        

        console.log("totalAlco: " + totalAlco);
        console.log("totalAdd: " + totalAdd);
    }

    getValues2(){
        return this.#values;
    }
}