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

    constructor(alkoholhalt, volym, tid, namn, dryckestid, allmanInfo){
        this.#alkoholhalt = alkoholhalt;
        this.#volym = volym;
        this.#tid = tid;
        this.#namn = namn;
        this.#dryckestid = dryckestid !== "" ? dryckestid : 20;
        this.#allmanInfo = allmanInfo;
        this.#values = [];
        this.#finalValues = [];


    }

    getCleanTime(){
        return this.#tid.replace(":", "");
    }

    fixStartDate(){
        let date = new Date();
        date.setHours(this.#tid.split(":")[0]);
        date.setMinutes(this.#tid.split(":")[1]);
        this.#date = date;
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

    fixAbsorption(){
        return this.#allmanInfo.getAbsorption();
    }

    functionen(){
        this.#values = [];
        this.#finalValues = [];
        this.fixStartDate();
        const totAlcoWeight = this.#alkoholhalt * this.#volym * this.#alcoholWeight * 0.01;

        
        const dryckesTidDivider = this.fixDryckesTid(this.#dryckestid) / 5;
        const absorbtionDivider = (this.#allmanInfo.getScale() *15 +5) /5;

        const startTime = this.fixTime(this.#tid);

        const dividedAlco = totAlcoWeight / dryckesTidDivider;

        

        for(let i = 0; i < dryckesTidDivider; i++){
            const time = new Date(this.#date);
            time.setMinutes(time.getMinutes() + i * 5);
            let mostRecentInsert = null;
            for(let j = 0; j < absorbtionDivider; j ++){
                const time2 = new Date(time);
                time2.setMinutes(time.getMinutes() + j * 5);
                
                const alco = totAlcoWeight/(absorbtionDivider * dryckesTidDivider);
                const bac = alco / (this.#allmanInfo.getVikt() * this.#allmanInfo.getGenderVal());
                
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




    }

    roundToNearest5(num) {
        return Math.round(num / 5) * 5;
    }

    getFinalValues(){
        return this.#finalValues;
    }

}