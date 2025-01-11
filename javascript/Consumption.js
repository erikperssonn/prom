"use strict"

export class Consumption{
    #alkoholhalt;
    #volym;
    #tid;
    #namn;
    #dryckestid;

    constructor(alkoholhalt, volym, tid, namn, dryckestid){
        this.#alkoholhalt = alkoholhalt;
        this.#volym = volym;
        this.#tid = tid;
        this.#namn = namn;
        this.#dryckestid = dryckestid !== "" ? dryckestid : 20;


    }

    getCleanTime(){
        return this.#tid.replace(":", "");
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

}