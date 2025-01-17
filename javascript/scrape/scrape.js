export class Scrape{
    username;

    constructor(username){
        this.username = username;
    }

    scrape(){
        console.log("scrape");
        const url = `https://untappd.com/user/${this.username}/`;
        fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
    }
}