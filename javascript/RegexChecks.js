export class RegexChecks{

    static checkVolymRegex(volym){
        const volymRegex = /^\d+$/;
        return volymRegex.test(volym);
    }
    
    static checkAlkoRegex(alkoholhalt){
        const alkoRegex = /^\d+([.,]\d+)?$/;
        return alkoRegex.test(alkoholhalt);
    }
    
    static  checkTidRegex(tid){
        const tidRegex = /^\d{2}[:.]\d{2}$/;
        return tidRegex.test(tid);
    }
    
    static  checkNamnRegex(namn){
        const namnRegex = /^[a-zA-Z0-9\s]+$/;
        return namnRegex.test(namn);
    }
    
    static  checkDryckesTidRegex(dryckestid){
        const dryckesTidRegex = /^\d+$/;
        return dryckesTidRegex.test(dryckestid);
    }
    
    static  checkConsRegex(alkoholhalt, volym, tid, namn, dryckestid){
        let errorStr = [];
    
        if (!checkAlkoRegex(alkoholhalt)) {
            errorStr.push("Fel i inskrivning av alkoholhalt, följ formatet: tal.tal");
        }
        if (!checkTidRegex(tid)) {
            errorStr.push("Fel i inskrivning av tid, följ formatet: hh:mm");
        }
        if (!checkVolymRegex(volym)) {
            errorStr.push("Fel i inskrivning av volym, följ formatet: tal");
        }
        if (namn !== "" && !checkNamnRegex(namn)) {
            errorStr.push("Fel i inskrivning av namn, följ formatet: ord eller siffor, blandat går");
        }
        if (dryckestid !== "" && !checkDryckesTidRegex(dryckestid)) {
            errorStr.push("Fel i inskrivning av dryckestid, följ format: tal");
        }
    
        console.log(errorStr);
        return errorStr;
    }
}