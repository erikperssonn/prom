//update chart



export class ButtonFunctions{

    main;

    constructor(main){
        this.main = main;
    }

    genderChange(selectedInput) {
        if (selectedInput.checked) {
            this.main.allmanInfo.setGender(selectedInput.value);
            console.log(this.main.allmanInfo.getGender());
        }
        this.main.updateChart(this.main.consList, this.main.myChart);
    }

     viktChange(){
        if(this.main.vikt.value === "") {
            this.main.allmanInfo.setVikt(50);
        } else{
            this.main.allmanInfo.setVikt(this.main.vikt.value);
            this.main.haveGivenInfo = true;
            console.log(this.main.allmanInfo.getVikt());
            this.main.updateChart(this.main.consList, this.main.myChart);
            console.log("viktChange");
            this.main.locStorage.saveVikt(this.main.allmanInfo.getVikt());
        }
    }

     scaleChange(){
        this.main.allmanInfo.setScale(this.main.scale.value);
        console.log(this.main.allmanInfo.getScale());
        this.main.updateChart(this.main.consList, this.main.myChart);
    }

     addConsButton_FromMainScreen(){
        if(this.main.haveGivenInfo === false){ 
            console.log("Du måste fylla i din vikt först");
            alert("Du måste fylla i din vikt först");
        } else {
            this.main.popup.style.display = "block";
        }

        console.log("addButton from main screen");
    }

     closePopupX_OnAddPopUp(){
        const errorPopup = this.main.document.querySelector('.errorPopup');
        if (errorPopup) {
            errorPopup.remove();
        }
        
        this.main.popup.style.display = "none";
    }


     avbrytBtn_OnAddPopUp(){
        this.main.popup.style.display = "none";
        console.log("avbryt");
        const errorPopup = this.main.document.querySelector('.errorPopup');
        if (errorPopup) {
            errorPopup.remove();
        }
    }

    removeConsItemFromList(cons){
        this.main.consList.removeItem(cons);
        this.main.laggTillClass.consListFix_MainPage(this.main.consList, this.main.consListElement, this.main.myChart);
        this.main.fixConsListElementIfEmpty();
    }

    removeAllButton(){
        this.main.locStorage.removeConsumptionsFromLocStorage();
        const emptyArr = [];
        this.main.consList.addEntireList(emptyArr);
        this.main.fixConsListElementIfEmpty();
    }

}