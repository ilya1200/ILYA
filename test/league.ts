import { Player } from './player';
import { Team } from './team';

const MAX_TEAMS:number=4;

export class League{
    private teams:Team[];

    constructor(){
        this.teams=[];
    }

    public addTeam(teamName:string):void{
        const team:Team=new Team(teamName);

        if(!(this.teams.length<MAX_TEAMS)){
            throw new Error(`ERROR: In a League may participate up to ${MAX_TEAMS}`);
        }

        if(!(this.isTeamUnique(team.getName()))){
            throw new Error(`ERROR: There is already a team with such name`);
        }

        
        this.teams.push(team);
    }

    public getTeams():Team[]{
        return this.teams;
    }

    public deleteLeague():void{
        while(this.teams.length>0){
            const toBeDeleted:Team= this.teams.pop();
            toBeDeleted.deleteAllPlayers();
        }
    }

    public howManyTeams():number{
        let count:number=0;
        for(let i=0;i<this.teams.length;i++){
            count++;
        }
        return count;
    }

    public insertPlayer(number:number,name:string,age:number){
        const lastTeam:Team=this.getLastTeam();
        if(lastTeam===null){
            throw new Error(`Error: No team in the league`);
        }

        try{
            lastTeam.addNewPlayer(number,name,age);
        }catch(err){
            throw err;
        }
        
    }

    private getLastTeam():Team{
        if(this.teams.length<1){
            return null;
        }
        return this.teams[this.teams.length-1];
    }

    private isTeamUnique(name:string){
        for(let i=0;i<this.teams.length;i++){
            if(name===this.teams[i].getName()){
                return false;
            }
        }
        return true;
    }

}