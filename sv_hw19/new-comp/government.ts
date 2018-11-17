import {Miflaga} from './miflaga';

export class Government{
    private miflagot:Miflaga[];
    private biggestMiflaga:number;
    private primeMinisterId:number;

    constructor(miflagot:Miflaga[]){
        this.miflagot=miflagot;
        this.biggetMiflaga();
    }

    public biggetMiflaga():void{
        let biggestMiflaga=this.miflagot[0];
        for(let i=0;i<this.miflagot.length && this.miflagot[i] ;i++){
            if(this.miflagot[i].getNumberOfConferenceMembers()>biggestMiflaga.getNumberOfConferenceMembers()){
                biggestMiflaga=this.miflagot[i];
            }
        }

        this.biggestMiflaga=biggestMiflaga.getId();
        this.primeMinisterId=biggestMiflaga.getIdOfManager();
    }

    public getMiflagot():Miflaga[]{
        return this.miflagot;
    }

    public getBiggestMiflaga():number{
        return this.biggestMiflaga;
    }

    public getPrimeMinisterId():number{
        return this.primeMinisterId;
    }

    public getPartyById(partyId:number):Miflaga{

        for(let i:number=0;i<this.miflagot.length && this.miflagot[i] ;i++){
            if(partyId===this.miflagot[i].getId()){
                return this.miflagot[i];
            }
        }

        return null;
    }
}