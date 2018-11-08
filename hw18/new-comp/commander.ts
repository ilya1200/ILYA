import { Soldier } from './soldier';

export class Commander extends Soldier{
    private mySoldiers:Soldier[];

    constructor(id:string,isCombat:boolean,soldiers:Soldier[]){
        super(id,isCombat);
        this.mySoldiers=soldiers;
    }

    public getSoldiers():Soldier[]{
        return this.mySoldiers;
    }

    public setSoldiers(soldiers:Soldier[]):void{
        this.mySoldiers=soldiers;
    }

    public howManyCombats():number{
        let combats=0;
        (this.mySoldiers).forEach(soldier=>{
            if(soldier.getIsCombat()){
                combats++;
            }
        });
        return combats;
    }
}