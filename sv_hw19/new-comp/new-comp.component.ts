import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';


import {Citizen}     from './citizen';
import {PartyMember} from './partyMember';
import {Miflaga}     from './miflaga';
import {Government}  from './government';




@Component({
  selector: 'app-new-comp',
  templateUrl: './new-comp.component.html',
  styleUrls: ['./new-comp.component.css']
})
export class NewCompComponent implements OnInit {
  private htmlPage:number; // switch between html pages
  private vote:number;

  private isVoted:boolean;

  private havrayMiflaga:PartyMember[]=new Array(9);
  private havrayMiflagaIndex:number;

  private havrayMiflagaA:PartyMember[]=new Array(3);
  private havrayMiflagaB:PartyMember[]=new Array(3);
  private havrayMiflagaC:PartyMember[]=new Array(3);

  private mflagot:Miflaga[]=new Array(3);
  private mflagotIndex:number;

  private government:Government;

  memberName:string; //form input
  memberId:number;   //form input

  partyId:number;    //form input
  partyManagerId:number; //form input

  //htmlPrint:string=``;
 
  //htmlPrintArr:string[]=new Array(9);
  //htmlPrintArrIndex:number=0;



  public myVote():void{
    const citizen=new Citizen();
    this.vote=citizen.getVote();
    this.isVoted=true;
    //$('#next-btn-pg1').prop('disabled', false);
  }

  public pg1Next():void{
    if(this.isVoted){
      this.htmlPage=2;
    }else{
      alert('You need to Vote, before going next');
    }
  }

  public pg4Return():void{
    this.resetAll();
    this.htmlPage=1;
  }



  public createMember():void{
    const maxMembers:number=9;
    if(this.havrayMiflagaIndex<maxMembers){
      const name:string=this.memberName;
      const id:number=this.memberId;
      

      try{
        this.validateMemberName(name);
        this.validateMemberId(id);
        this.isUniqueMember(id);
      }catch(error){
        alert(error);
        return;
      }

      const member:PartyMember=new PartyMember(name,id);
      if(this.havrayMiflagaIndex>=0 && this.havrayMiflagaIndex<=2){
        this.havrayMiflagaA[this.havrayMiflagaIndex]=member;
      }else if(this.havrayMiflagaIndex>=3 && this.havrayMiflagaIndex<=5){
        this.havrayMiflagaB[this.havrayMiflagaIndex-3]=member;
      }else{
        this.havrayMiflagaC[this.havrayMiflagaIndex-6]=member;
      }

      this.havrayMiflaga[this.havrayMiflagaIndex]=member;
      this.havrayMiflagaIndex++;

      alert(`A member with the name ${name} and id ${id} created \n 
      Create ${maxMembers-this.havrayMiflagaIndex} more members`);

    }else{
      this.htmlPage=3;
    }
  }




  public createParty():void{
    const maxParties:number=3;
    if(this.mflagotIndex<maxParties){

      const partyId:number=this.partyId;
      const managerId:number=this.partyManagerId;

      let hMiflaga:PartyMember[];
      switch(this.mflagotIndex){
        case 0: hMiflaga=this.havrayMiflagaA;
        break;
        case 1: hMiflaga=this.havrayMiflagaB;
        break;
        case 2: hMiflaga=this.havrayMiflagaC;
        break;
      }

      try{
        this.validatePartyrId(partyId);
        this.validateMemberId(managerId);
        this.isUniqueParty(partyId);
        this.checkManagerIsPartyMember(managerId,hMiflaga);

      }catch(error){
        alert(error);
        return;
      }


      const miflaga=new Miflaga(partyId,hMiflaga,managerId);
      this.mflagot[this.mflagotIndex]=miflaga;
      this.mflagotIndex++;

      alert(`A Party with the partyID ${partyId} and managerId ${managerId} created \n 
      Create ${maxParties-this.mflagotIndex} more parties`);

    }else{
      this.createGovernment();
      this.printGovernment();
      this.htmlPage=4;
    }
  }


  
  /*
    Private 
  */

  private resetAll():void{
    this.vote=undefined;
    this.isVoted=false;

    for(let i=0;i<this.havrayMiflaga.length ;i++){
      this.havrayMiflaga[i]=null;
    }
    this.havrayMiflagaIndex=0;

    for(let i=0;i<this.mflagot.length ;i++){
      this.mflagot[i]=null;
    }
    this.mflagotIndex=0;
  }

  private  isAlphaChar(char:string):boolean{
      return char.toUpperCase()!==char.toLowerCase();
  }


  private validateMemberId(memberId:number):void{
    if(typeof memberId !=="number"){
      throw new Error("Please provide a valid ID number");
    }

    if(!(memberId>=100000 && memberId<=999999)){
      throw new Error("Id number of a member is 6 digits long")
    }
  }

  private validatePartyrId(partyId:number):void{
    if(typeof partyId !=="number"){
      throw new Error("Please provide a valid party ID number");
    }

    if(!(partyId>=1000 && partyId<=9999)){
      throw new Error("Id number of a party is 4 digits long");
    }
  }

  private validateMemberName(memberName:string):void{
    if( (typeof memberName!=="string") || memberName.length<1 ){
      throw new Error("A name of a member is string with letters only");
    }

    const minLength:number=2;
    const maxLength:number=12;
    
    
    if(memberName.length>=minLength && memberName.length<=maxLength ){
        let i:number=0;
        while(i< memberName.length){
            const char:string= memberName.charAt(i);
            if(!(this.isAlphaChar(char))){
                throw new Error(`memberName should contain letters and digits only`) ;
            }
            i++;
        }
    }else{
      throw new Error(`member name length allowed ${minLength} to ${maxLength} chars`);
    }
  }

  private isUniqueMember(memberId:number):void{
    for(let i:number=0;i<this.havrayMiflaga.length && this.havrayMiflaga[i] ;i++){
      if(this.havrayMiflaga[i].getId()===memberId){
        throw new Error('There is already a member with such id');
      }
    }
  }

  private isUniqueParty(partyId:number):void{
    for(let i:number=0;i<this.mflagot.length && this.mflagot[i] ;i++){
      if(this.mflagot[i].getId()===partyId){
        throw new Error('There is already a Party with such id');
      }
    }
  }

  private checkManagerIsPartyMember(managerId:number,hMiflaga:PartyMember[]):void{
    for(let i:number=0;i<hMiflaga.length && hMiflaga[i] ;i++){
      if(managerId===hMiflaga[i].getId()){
          return;
      }
    }
    throw new Error("The Manager must be a member of his party");
  }

  private createGovernment():void{
    this.government=new Government(this.mflagot);
  }

  private printGovernment():void{
    let tupel:[number,number,string,number,string];

    for(let p:number=0;p<this.government.getMiflagot().length;p++){
      const party:Miflaga= this.government.getMiflagot()[p];
      const PartyId:number=party.getId();
      const managerId:number=party.getIdOfManager();
      const managerName:string=party.getMemberById(managerId).getName();

      for(let m:number=0;m<party.getConferenceMembers().length;m++){
        const member:PartyMember= party.getConferenceMembers()[m];
        const memberId:number=member.getId();
        const memberName:string=member.getName();

        tupel=[PartyId,managerId,managerName,memberId,memberName];
        this.printTuple(tupel);
      }
    }
  }

  private printTuple(tupel:[number,number,string,number,string]):void{
    const templet:string=
    `
      <tr>
        <th scope="row">${tupel[0]}</th>
        <td>${tupel[1]}</td>
        <td>${tupel[2]}</td>
        <td>${tupel[3]}</td>
        <td>${tupel[4]}</td>
      </tr>
    `;

    //this.htmlPrint+=templet;
    //this.htmlPrintArr[this.htmlPrintArrIndex++]=templet;
  }

  constructor() { }

  ngOnInit() {
    this.htmlPage=1;
    this.resetAll();


  }//!ngOnInit()
  

}
