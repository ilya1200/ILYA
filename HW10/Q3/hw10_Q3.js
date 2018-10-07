{
    /*
        Generates a whole random number in range [lower,upper].
    */ 
    function randNumber(lower,upper){
        return Math.floor( Math.random()*(upper-(lower)+1) )+(lower);
    }

    /*
        Fills an array with whole random numbers in range [lower,upper].
        @param arr the array to be filled.
        @param lower - the lower bound of randoms to generate
        @param upper - the upper bound of randoms to generate
        @param limit - specifies how many randoms to fill the array with.
    */ 
    function fillMyArrayWithRandoms(arr,lower,upper,limit){
        while(limit>0){
            let rand=randNumber(lower,upper);
            arr.push(rand);
            limit--;
        }
    }

    function isPrime(num){
        // By number theory enough to look for a factor till  sqrt(x)
        const upperLimit =Math.floor( Math.sqrt(num));

        if(num===1  || (num%2)===0){//filter all even factors
            return false;
        }

        for(let factor=3;factor<=upperLimit;factor+=2){
            if((num%factor)===0){
                return false;
            }
        }
        return true;
    }
    
   

    function insertionSort(arr){
        if(arr.length<=1) {
            return;
        }

        for(let j=1;j<arr.length;j++){
            let key=arr[j];
            let i=j-1;
            while(i>=0 && arr[i]>key){
                arr[i+1]=arr[i];
                i-=1;
            }
            arr[i+1]=key;
        }
   
    }

    function reomveDuplicates(arr){
        const dblFreeArray=[];
        let lastIn;

        arr.forEach(element => {
            if(dblFreeArray.length<1 || element!=lastIn){//dblFreeArray awaiting for a new value
                dblFreeArray.push(element);
                lastIn=element;
            }
        });

        return dblFreeArray;
    }

  
    const arrayFullOfRandoms=[];
    let primeArray=[];

    fillMyArrayWithRandoms(arrayFullOfRandoms,1,200,100);
    primeArray=arrayFullOfRandoms.filter(randomNumber=>isPrime(randomNumber));
    insertionSort(primeArray);
    primeArray=reomveDuplicates(primeArray);
    
    console.log("Random array:"+arrayFullOfRandoms);
    console.log("Prime Array:"+primeArray);
    

}