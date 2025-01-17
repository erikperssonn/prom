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

    fixTime(time){
        return this.roundToNearest5(this.getCleanTime());
    }

    fixDryckesTid(dryckesTid){
        return this.roundToNearest5(dryckesTid);
    }


    functionen(){
        this.#values = [];
        this.#finalValues = [];
        this.fixStartDate();
        const totAlcoWeight = this.#alkoholhalt * this.#volym * this.#alcoholWeight * 0.01;

        
        const dryckesTidDivider = this.fixDryckesTid(this.#dryckestid) / 5;
        const absorbtionDivider = (this.#allmanInfo.getScale() *15 +5) /5;

        //const startTime = this.fixTime(this.#tid);

        const dividedAlco = totAlcoWeight / dryckesTidDivider;

        let totalAlco = 0;

        for(let i = 0; i < dryckesTidDivider; i++){
            const time = new Date(this.#date);
            time.setMinutes(time.getMinutes() + i * 5);
            let mostRecentInsert = null;
            for(let j = 0; j < absorbtionDivider; j ++){
                const time2 = new Date(time);
                time2.setMinutes(time.getMinutes() + j * 5);
                
                const alco = dividedAlco/(absorbtionDivider);
                const bac = alco / (this.#allmanInfo.getVikt() * this.#allmanInfo.getGenderVal());

                totalAlco += alco;
                
                const insertObj = {
                    time: time2,
                    bac: bac
                }

                console.log("bac: " + bac);

                if (mostRecentInsert !== null) {
                    insertObj.bac += mostRecentInsert.bac;
                }

                mostRecentInsert = insertObj;

                this.#values.push(insertObj);
            }
            
        }

        const timeSet = new Set();

        this.#values.forEach(value => {
            timeSet.add(value.time);
        });

        let k = 1;
        timeSet.forEach(time => {
            const timeValues = this.#values.filter(value => value.time === time);
            let totalBac = 0;
            timeValues.forEach(value => {
                totalBac += value.bac;
            });

            
            const finalValue = {
                time: time,
                bac: totalBac,
                displayTime: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
            }

            console.log("totalBac: " + totalBac + "   "  + `${k}`);
            this.#finalValues.push(finalValue);
            k++;
        });
        
        
        
        this.#finalValues.sort((a, b) => a.time - b.time);
        console.log(this.#finalValues[0].time);
        console.log(this.#finalValues[this.#finalValues.length - 1].time);
        console.log(this.#finalValues.length);

        while(this.#finalValues[this.#finalValues.length -1].value > 0.0000000){
            const insertObj = this.#finalValues[this.#finalValues.length - 1];
            const newTime = new Date(insertObj.time);
            newTime.setMinutes(insertObj.time.getMinutes() + 5);
            const bac = insertObj.bac - 0.015 * 1/12;
            const newBac = bac  > 0 ? bac : 0;
            console.log("newBac: " + newBac);
            const newObj = {
                time: newTime,
                bac: newBac
            }

            this.#finalValues.push(newObj);

        }
        console.log(this.#finalValues.length);

        console.log("totalAlco: " + totalAlco);


    }

    roundToNearest5(num) {
        return Math.round(num / 5) * 5;
    }

    getFinalValues(){
        return this.#finalValues;
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
            totalAlco += alco;
            let bac = alco / (this.#allmanInfo.getVikt() * this.#allmanInfo.getGenderVal());
            if(this.#values.length > 0){
                bac += this.#values[this.#values.length - 1].bac - 0.015 * 1/(60*nbrOfDrinks);
                totalAdd = this.#values[this.#values.length - 1].bac;
            }
            const insertObj = {
                time: time,
                bac: bac,
                displayTime: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
            }
            //console.log("bac: " + bac + "   " + time);

            this.#values.push(insertObj);
        }

        while(this.#values[this.#values.length -1].bac > 0.0000000){
                
            const insertObj = this.#values[this.#values.length - 1];
            const [hours, minutes] = insertObj.displayTime.split(':').map(Number);
            const newTime = new Date();
            newTime.setHours(hours, minutes+1, 0, 0);
            //newTime.setMinutes(newTime.getMinutes() + 1);
            //timeSet.add(`${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`);
            const bac = insertObj.bac - 0.015 * 1/(60*nbrOfDrinks);
            const newBac = bac  > 0 ? bac : 0;
            const newObj = {
                time: newTime,
                bac: newBac,
                displayTime: `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`
            }
            this.#values.push(newObj);
        }

        console.log("totalAlco: " + totalAlco);
        console.log("totalAdd: " + totalAdd);
    }

    getValues2(){
        return this.#values;
    }
}