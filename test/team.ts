import {Player} from './player';
const MAX_PLAYERS:number=5;


export class Team{
    private name:string;
    private players:Player[];

    constructor(name:string){
        this.name=name;
        this.players=[];
    }

    public addNewPlayer(number:number,name:string,age:number):void{
        if(!(this.players.length<MAX_PLAYERS)){
            throw new Error(`ERROR: Team max capacity ${MAX_PLAYERS}`);
        }

        try{
            const player:Player=new Player(number,name,age);
            if(!(this.isPlayerNumberUnique(number))){
                throw new Error(`ERROR: The number is already assigned to the player \n ${this.getPlayerByNumber(number).toString()}`);
            }

            this.players.push(player);
        }catch(error){
            throw new Error(error);
        }
    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name=name;
    }
    
    public getPlayers():Player[]{
        const players=[];

        (this.players).forEach(player=>{
            players.push(new Player(player.getNumber(),player.getName(),player.getAge()));
        });

        return players;
    }


    public deleteAllPlayers():void{
        while(this.players.length>0){
            this.players.pop();
        }
    }

    private isPlayerNumberUnique(number:number):boolean{
        if(this.getPlayerByNumber(number)){
            return false;
        }
        return true;
    }

    private getPlayerByNumber(number:number):Player{     
        for(let i=0;i<this.players.length;i++){
            if(number === this.players[i].getNumber()){
                const player:Player=this.players[i];
                return player;
            }
        }
        return null;
    }
}