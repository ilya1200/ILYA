
export class Citizen{
    protected vote:number;

    constructor(){
        this.vote= Math.floor( Math.random()*3 )+1;
    }

    public getVote():number{
        return this.vote;
    }
}