import { Citizen } from './citizen';

export class PartyMember extends Citizen{
    private name:string;
    private id:number;
    private primeManagerVoteID:number;
    private manager:boolean;

    constructor(name:string,id:number){
        super();
        this.name=name;
        this.id=id;
        this.primeManagerVoteID=null;
        this.manager=false;
    }

    getName():string{
        return this.name;
    }

    getId():number{
        return this.id;
    }

    getManager():boolean{
        return this.manager;
    }

    setManager(manager:boolean):void{
        this.manager=manager;
    }

    changePrimeManagerVoteID():void{
        let pmVote;
        do{
            pmVote= Math.floor( Math.random()*5 )+1;
        }while(!(this.primeManagerVoteID)&& this.id===pmVote);

        this.primeManagerVoteID=pmVote;
    }
}