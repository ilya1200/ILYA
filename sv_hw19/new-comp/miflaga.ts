import {PartyMember} from './partyMember';

export class Miflaga{
    private id:number;
    private conferenceMembers:PartyMember[];
    private idOfManager:number;

    constructor(id:number,conferenceMembers:PartyMember[],idOfManager:number){
 
        this.id=id;
        this.conferenceMembers=conferenceMembers;
        this.idOfManager=idOfManager;

        (this.conferenceMembers).forEach(member=>{
            if(member.getId()===this.idOfManager){
                member.setManager(true);
            }else{
                member.setManager(false);
            }
        });
    }


    public getId():number{
        return this.id;
    }

    public getConferenceMembers():PartyMember[]{
        return this.conferenceMembers;
    }

    public getIdOfManager():number{
        return this.idOfManager;
    }

    public setIdOfManager(idOfManager:number):void{
        this.idOfManager=idOfManager;
    }

    
    public getNumberOfConferenceMembers():number{
        let count=0;
        for(let i=0;i<this.conferenceMembers.length && this.conferenceMembers[i];i++){
            count++;
        }
        return count;
    }

    public whoIsTheNewManager():void{
        const newManger=Math.floor( Math.random()*5 )+1;

        this.idOfManager=newManger;
        (this.conferenceMembers).forEach(member=>{
            if(member.getId()===newManger){
                member.setManager(true);
            }else{
                member.setManager(false);
            }
        });
    }


    public getMemberById(memberId:number):PartyMember{

        for(let i:number=0;i<this.conferenceMembers.length && this.conferenceMembers[i] ;i++){
            if(memberId===this.conferenceMembers[i].getId()){
                return this.conferenceMembers[i];
            }
        }

        return null;
    }
    
}