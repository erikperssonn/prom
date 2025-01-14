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

    fixEverything(){
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






}