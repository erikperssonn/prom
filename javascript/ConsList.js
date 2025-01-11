"use strict"

export class ConsList{
    #list;
    

    constructor(){
        this.#list = [];

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




}