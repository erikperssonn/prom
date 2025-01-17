"use strict"



export class ConsList{
    #list;
    #allmanInfo;
    #values;
    #times;
    

    constructor(allmanInfo){
        this.#list = [];
        this.#allmanInfo = allmanInfo;
        this.#values = [];

    }

    addItem(item){
        this.#list.push(item);
    }

    getList(){
        return this.#list;
    }

    sortByTime() {
        this.#list.sort((a, b) => a.getCleanTime() - b.getCleanTime());
    }

    removeItem(item) {
        this.#list = this.#list.filter(i => i !== item);
    }

    getMaxTime(){
        let max = 0;
        this.#list.forEach(item => {
            if(item.getCleanTime() > max){
                max = item.getCleanTime();
            }
        });
        return max;
    }

    getMinTime(){
        let min = 100000;
        this.#list.forEach(item => {
            if(item.getCleanTime() < min){
                min = item.getCleanTime();
            }
        });
        return min;
    }

    fixEverythingdalig(){
        let allValues = [];
        this.#values = [];
        this.#times = [];
        const timeSet = new Set();

        this.#list.forEach(item => {
            item.functionen();
            item.getFinalValues().forEach(value => {
                timeSet.add(value.displayTime);
                allValues.push(value);
            });
        });

        console.log(allValues.length + "   All values" );   
        allValues.forEach(value => {
            console.log("BAC: " + value.bac + "   " + value.displayTime);
        });

        timeSet.forEach(time => {
            const timeValues = allValues.filter(value => value.displayTime === time);
            let totalBac = 0;
            timeValues.forEach(value => {
                totalBac += value.bac;
            });
            totalBac = totalBac -0.015 * 1/12;
            const finalValue = {
                time: time,
                bac: totalBac
            }
            this.#values.push(finalValue);
        });

        this.#times = Array.from(timeSet);

        console.log(this.#values.length);
        this.#values.forEach(value => {
            console.log("BACC: " + value.bac + "   " + value.time);
        });


    }

    getValues(){
        return this.#values.map(value => value.bac);
    }

    getTimes(){
        //return this.#values.map(value => value.displayTime);
        return this.#times;
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

        timeSet.forEach(time => {
                const timeValues = allValues.filter(value => value.displayTime === time);
                let totalBac = 0;
                timeValues.forEach(value => {
                    totalBac += value.bac;
                    console.log("added");
                });
                //if(this.#values.length > 0){
                //    totalBac = totalBac + this.#values[this.#values.length - 1].bac;
                //}
                totalBac = totalBac - 0.015 * 1/60;
                const finalValue = {
                    time: time,
                    bac: totalBac
                    
                }
                k = k + 1;
                this.#values.push(finalValue);
                //console.log("BAC: " + finalValue.bac +  "   " + finalValue.time);
            });

            console.log(this.#values.length + "   All values2" +  "   k = " + k);

            //while(this.#values[this.#values.length -1].bac > 0.0000000){
            //    
            //    const insertObj = this.#values[this.#values.length - 1];
            //    const [hours, minutes] = insertObj.time.split(':').map(Number);
            //    const newTime = new Date();
            //    newTime.setHours(hours, minutes+1, 0, 0);
            //    //newTime.setMinutes(newTime.getMinutes() + 1);
            //    timeSet.add(`${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`);
            //    const bac = insertObj.bac - 0.015 * 1/60;
            //    const newBac = bac  > 0 ? bac : 0;
            //    const newObj = {
            //        time: `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`,
            //        bac: newBac,
            //        
            //    }
            //    this.#values.push(newObj);
            //}
//
            
            console.log(this.#values.length + "   All values3" );
            this.#times = Array.from(timeSet);
    }



}