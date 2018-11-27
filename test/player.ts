const playerMinAge:number=18;
const playerMaxAge:number=30;

const playerMinNumber:number=1;
const playerMaxNumber:number=20;

export class Player{
    private number:number;
    private name:string;
    private age:number;

    constructor(number:number,name:string,age:number){
        if(!(number>=playerMinNumber && number<=playerMaxNumber)){
            throw new Error(`Players number must be in range ${playerMinNumber} to ${playerMaxNumber}`);
        }

        if(!(age>=playerMinAge && age<=playerMaxAge)){
            throw new Error(`Players age must be in range ${playerMinAge} to ${playerMaxAge}`);
        }

        this.number=number;
        this.name=name;
        this.age=age;
    }

    public getNumber():number{
        return this.number;
    }

    public getName():string{
        return this.name;
    }

    public getAge():number{
        return this.age;
    }

    public setName(name:string):void{
        this.name=name;
    }

    public setAge(age:number):void{
        if(age>=playerMinAge && age<=playerMaxAge){
            this.age=age;
        }else{
            throw new Error(`ERROR: Players age must be in range ${playerMinAge} to ${playerMaxAge}`);
        }
    }

    public toString():string{
        return `Player:: number ${this.number} \n 
                         name ${this.name} \n 
                         age ${this.age}`;
    }
}