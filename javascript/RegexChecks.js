export class RegexChecks{

    checkVolymRegex(volym){
        const volymRegex = /^\d+$/;
        return volymRegex.test(volym);
    }
    
    checkAlkoRegex(alkoholhalt){
        const alkoRegex = /^\d+([.,]\d+)?$/;
        return alkoRegex.test(alkoholhalt);
    }
    
    checkTidRegex(tid){
        const tidRegex = /^\d{2}[:.]\d{2}$/;
        return tidRegex.test(tid);
    }
    
    checkNamnRegex(namn){
        const namnRegex = /^[a-zA-Z0-9\s]+$/;
        return namnRegex.test(namn);
    }
    
    checkDryckesTidRegex(dryckestid){
        const dryckesTidRegex = /^\d+$/;
        return dryckesTidRegex.test(dryckestid);
    }
    
    checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid){
        let errorStr = [];
    
        if (!this.checkAlkoRegex(alkoholhalt)) {
            errorStr.push("Fel i inskrivning av alkoholhalt, följ formatet: tal.tal");
        }
        if (!this.checkTidRegex(tid)) {
            errorStr.push("Fel i inskrivning av tid, följ formatet: hh:mm");
        }
        if (!this.checkVolymRegex(volym)) {
            errorStr.push("Fel i inskrivning av volym, följ formatet: tal");
        }
        if (namn !== "" && !this.checkNamnRegex(namn)) {
            errorStr.push("Fel i inskrivning av namn, följ formatet: ord eller siffor, blandat går");
        }
        if (dryckestid !== "" && !this.checkDryckesTidRegex(dryckestid)) {
            errorStr.push("Fel i inskrivning av dryckestid, följ format: tal");
        }
    
        console.log(errorStr);
        return errorStr;
    }
}