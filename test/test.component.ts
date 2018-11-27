import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { Team } from './team';
import { League } from './league';
import { defaultUrlMatcher } from '@angular/router/src/shared';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private league:League;

  public pageFlag:number;


  public pg1teamName:string;
  public pg1Err:string;
  public pg1DoneButtonDisabled:boolean;

  public pg2playerNumber:number;
  public pg2playerName:string;
  public pg2playerAge:number;
  public pg2DoneButtonDisabled:boolean;

  constructor() { }

  ngOnInit() {
    this.league=new League();
    this.goToPage(1);
  }

  public pg1DoneButton():void{
    this.goToPage(3);
  }

  public pg1Exit():void{
    this.goToPage(0);
  }

  public pg1AddTeam():void{debugger;
    const teamName=this.pg1teamName;
    try{
      this.validateName(teamName);
      this.league.addTeam(teamName);
    }catch(err){
      this.pg1WriteErr(err);
      return;
    }

    this.goToPage(2);
  }

  public pg2AddPlayer():void{
    try{debugger;
      this.validateNumber(this.pg2playerNumber);
      this.validateName(this.pg2playerName);
      this.league.insertPlayer(this.pg2playerNumber, this.pg2playerName,this.pg2playerAge);
      this.pg2DoneButtonDisabled=false;
    }catch(err){
      alert(err);
    }

  }

  public pg2DoneButton():void{
    this.goToPage(1);
  }

  private validateNumber(playerNumber:number):void{
    if(typeof playerNumber != "number"){
      throw new Error('Please enter a number');
    }

    if(!(playerNumber>=1 && playerNumber<=20)){
      throw new Error('Number range [1,20]');
    }
  }

  private validateName(name:string):boolean{
    if(name.length<1){
      throw new Error('Enter a name');
    }

    let isValid:boolean=true;
    for(let i=0;i<name.length;i++){
      const currentChat:string=name.charAt(i);
      if(!(this.isAlpha(currentChat))){
        isValid=false;
        throw new Error('A name can contain letters only');
      }
    }
    return isValid;
  }

  private isAlpha(char:string):boolean{
    return (char.toLowerCase()!=char.toUpperCase());
  }

  private pg1WriteErr(str:string):void{
    this.pg1Err=str;
    this.pg1teamName=``;
  }





  private goToPage(pageNumber:number){
    switch(pageNumber){
      default:
      case 0: 
      this.pageFlag=0;
      
      this.league.deleteLeague();
      break;

      case 1: 
      this.pageFlag=1;

      this.pg1teamName=``;
      this.pg1Err=``;
      this.pg1DoneButtonDisabled=(this.league.howManyTeams()<1);
      break;

      case 2: 
      this.pageFlag=2;

      this.pg2playerNumber=undefined;
      this.pg2playerName=``;
      this.pg2playerAge=undefined;
      this.pg2DoneButtonDisabled=true;
      
      break;

      case 3: 
      this.pageFlag=3;
      break;
      
    }
  }

}
