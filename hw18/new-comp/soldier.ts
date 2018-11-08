
export  class Soldier{
    protected id:string;
    protected isCombat:boolean;
    protected corps:number;

    constructor(id:string,isCombat:boolean){
        this.id=id;
        this.isCombat=isCombat;
        this.corps=Math.floor( Math.random()*3 )+1;
    }

    public  getId():string{
        return this.id;
    }

    public getIsCombat():boolean{
        return this.isCombat;
    }

    public getCorps():number{
        return this.corps;
    }

    public setIsCombat(isCombat:boolean):void{
        this.isCombat=isCombat;
    }

    public setCorps(corps:number):void{
        this.corps=corps;
    }
    
}