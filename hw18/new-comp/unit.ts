import { Soldier } from './soldier';
import { Commander } from './commander';

export class Unit{
    private name:string;
    private chefCommanderId:string;
    private sodiers:Soldier[];
    private commanders:Commander[];

    constructor(name:string,chefCommanderId:string,sodiers:Soldier[],commanders:Commander[]){
        this.name=name;
        this.chefCommanderId=chefCommanderId;
        this.sodiers=sodiers;
        this.commanders=commanders;
    }

    public getChefCommanderId():string{
        return this.chefCommanderId;
    }

    public setChefCommanderId(chefCommanderId:string){
        this.chefCommanderId=chefCommanderId;
    }
}