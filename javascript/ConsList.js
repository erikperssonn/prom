"use strict"

export class ConsList{
    #list;
    #allmanInfo;
    #values;
    #times;
    #main;
    

    constructor(allmanInfo, main){
        this.#list = [];
        this.#allmanInfo = allmanInfo;
        this.#values = [];
        this.#main = main;

    }

    addItem(item){
        this.#list.push(item);
    }

    getList(){
        return this.#list;
    }

    addEntireList(list){
        this.#list = list;
        this.#main.laggTillClass.consListFix_MainPage(this, this.#main.consListElement, this.#main.myChart);
    }


    removeItem(item) {
        this.#list = this.#list.filter(i => i !== item);
        this.#main.locStorage.removeConsumption(item);
    }

    
    getValues(){
        return this.#values.map(value => value.displayBac);
    }

    getTimes(){
        //return this.#values.map(value => value.displayTime);
        return this.#times;
    }

    sortByTime() {
        this.#list.sort((a, b) => a.getCleanTime() - b.getCleanTime());
    }

    fixEverything(){
        this.#values = [];
        this.#times = [];
        let allValues = [];

        let timeSet = new Set();

        this.#list.forEach(item => {
            item.functionen2();
            for(const value of item.getValues2()){
                timeSet.add(value.displayTime);
                allValues.push(value);
            }
        });

        console.log(this.#values.length + "   All values1" );

        let k = 0;

        let timeSetArray = Array.from(timeSet);
        timeSetArray.sort((a, b) => {
            let [hoursA, minutesA] = a.split(':');
            let [hoursB, minutesB] = b.split(':');
            
            if(hoursA[0] === "0"){
                hoursA = 1 + hoursA;
            }
            if(hoursB[0] === "0"){
                hoursB = 1 + hoursB;
            }
            const A =hoursA + minutesA;
            const B = hoursB + minutesB;
            //console.log("A: " + A + "   B: " + B);
            return A - B;
        
        });
        //console.log()
        let newTimeSetArray = this.fillTimeSetArray(timeSetArray);

        for(let i = 0; i < timeSetArray.length; i++){
            console.log(timeSetArray[i] + "   " + i);
        }
        let totalAlco = 0;
        newTimeSetArray.forEach(time => {
                const timeValues = allValues.filter(value => value.displayTime === time);
                //let totalBac = 0;
                console.log(timeValues.length + "   TimeValues" +  "    tmie: " + time);
                let alco = 0;
                timeValues.forEach(value => {
                    alco = alco + Number(value.alco);
                    //console.log("added");
                });
                
                totalAlco += alco;

                console.log("Vikt: " + this.#allmanInfo.getVikt() + "  " + "Alco: " + alco + "  " + "Gender: " + this.#allmanInfo.getGender() + "  " + "k: " + k);
                let resultBac = totalAlco /(Number(this.#allmanInfo.getVikt()) * Number(this.#allmanInfo.getGenderVal())) - 0.015 * 1/60 * k;
                resultBac = resultBac > 0 ? resultBac : 0;
                console.log("BAC: " + resultBac);
                const displayBac = resultBac * 10;
                const finalValue = {
                    time: time,
                    bac: resultBac,
                    displayBac: displayBac
                    
                }
                
                if((resultBac > 0)){ 
                    k = k + 1;
                }
                this.#values.push(finalValue);
            });

            for(let i = 0; i < this.#values.length; i++){
                console.log("BAC: " + this.#values[i].bac +  "   " + this.#values[i].time);
            }

            console.log(this.#values.length + "   All values2" +  "   k = " + k);

            while(this.#values[this.#values.length -1].bac > 0.0000000){
                console.log("final loop");
                const insertObj = this.#values[this.#values.length - 1];
                const [hours, minutes] = insertObj.time.split(':').map(Number);
                const newTime = new Date();
                newTime.setHours(hours, minutes+1, 0, 0);
                const timeStr = `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`
                const bac = insertObj.bac - 0.015 * 1/60;
                const newBac = bac  > 0 ? bac : 0;
                const displayBac = newBac *10;
                const newObj = {
                    time: timeStr,
                    bac: newBac,
                    displayBac: displayBac
                }
                console.log("BAC: " + newObj.bac +  "   " + newObj.time);
                this.#values.push(newObj);
                timeSetArray.push(timeStr);
            }
//
            
            console.log(this.#values.length + "   All values3" );
            this.#times = timeSetArray;
    }

    fillTimeSetArray(timeSetArray){
       
        const [hoursErl, minutesErl] = timeSetArray[0].split(':');
        const [hoursLate, minutesLate] = timeSetArray[timeSetArray.length - 1].split(':');
        const earliestDate = new Date();
        const latestDate = new Date();
        

        earliestDate.setHours(hoursErl, minutesErl, 0, 0);
        latestDate.setHours(hoursLate, minutesLate, 0, 0);

        if(hoursErl[0] === "0"){
            earliestDate.setDate(earliestDate.getDate() + 1);
        }
        if(hoursLate[0] === "0"){
            latestDate.setDate(latestDate.getDate() + 1);
        }

        console.log(latestDate + "   latestDate");
        console.log(earliestDate + "   earliestDate");
        let newTimeSet = new Set();
        newTimeSet.add(earliestDate);
        newTimeSet.add(latestDate);

        for(let i = 0; i < timeSetArray.length; i++){
            const [hours, minutes] = timeSetArray[i].split(':').map(Number);
            const newTime = new Date();

            if(hours[0] === "0"){
                newTime.setDate(newTime.getDate() + 1);
                newTime.setHours(hours, minutes, 0, 0);
            } else{
                newTime.setHours(hours, minutes, 0, 0);
            }
            
            console.log(newTime + "   newTime");
            newTimeSet.add(newTime);
        }

        let currentTime = earliestDate;
        let newTimeSetArray = [];

        while(currentTime < latestDate){
            console.log(currentTime + "   currentTime");
            const newTimeStr = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
            if(!this.haveSameTime(newTimeStr, timeSetArray)){
                timeSetArray.push(newTimeStr);
                console.log(currentTime + "   currentTime1");
            }
            currentTime.setMinutes(currentTime.getMinutes() + 1);
            
        }
        
        

        timeSetArray.sort((a, b) => {
            let [hoursA, minutesA] = a.split(':');
            let [hoursB, minutesB] = b.split(':');
            
            if(hoursA[0] === "0"){
                hoursA = 1 + hoursA;
            }
            if(hoursB[0] === "0"){
                hoursB = 1 + hoursB;
            }
            const A =hoursA + minutesA;
            const B = hoursB + minutesB;
            //console.log("A: " + A + "   B: " + B);
            return A - B;
        
        });
        return timeSetArray;
    }

    haveSameTime(newTimeStr, timeSetArray){
        for(const time of timeSetArray){
            if(newTimeStr === time){
                return true;
            }
        }
        return false;

    }


}