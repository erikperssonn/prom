"use strict";

export class AllmanInfo {
    #vikt;
    #scale;
    #gender;
    #genderVal;
    constructor(vikt, scale, gender) {
        this.#vikt = vikt;
        this.#scale = scale !== null ? scale : 3;
        this.#gender = gender !== null ? gender : "und"
        this.setGenderVal();
    }

    getVikt() {
        return Number(this.#vikt);
    }

    getScale() {
        return this.#scale;
    }

    getGender() {
        
        return this.#gender;
    }

    setVikt(vikt) {
        this.#vikt = vikt;
    }

    setScale(scale) {
        this.#scale = scale;
    }

    setGender(gender) {
        this.#gender = gender;
        this.setGenderVal();
    }

    setGenderVal() {
        if(this.#gender === "male") {
            this.#genderVal = 0.68;
        } else if(this.#gender === "female") {
            this.#genderVal = 0.55;
        } else {
            this.#genderVal = 0.61;
        }
    }

    getGenderVal() {
        return this.#genderVal;
    }


}