{

    function mainFunc(arrLength){
        const arr=[];
        let cnt;
        const lowerLimit=1;
        const upperLimit=9;
        let mostFrequent;

        fillMyArrayWithRandoms(arr,lowerLimit,upperLimit,arrLength);
        cnt=incompleteCountingSort(arr,upperLimit);
        mostFrequent=findMax(cnt);

        return mostFrequent;
    }

    //HELPER FUNCTIONS


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

    /*
        Finds the max in the array, returns the index.
    */ 
    function findMax(array){
        let maxIndex=0;
        for(let i=0;i<array.length;i++){
            if(array[i]>array[maxIndex]){
                maxIndex=i;
            }
        }
        return maxIndex;
    }

    function incompleteCountingSort(arr,k){
        const cnt=[];
    
        //initialize
        for(let i=0;i<=k;i++){
            cnt[i]=0;
        }
    
        //Count
        for(let j=0;j<arr.length;j++){
            cnt[arr[j]]++;
        }
    
        //output
        return cnt;
    
    }

    

}