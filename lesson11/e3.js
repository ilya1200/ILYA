{
    function largestSum(A){
        const sums=[];

        for(let row=0;row<=A.length;row++){
            let rowSum=findSum(A[row]);
            sums.push(rowSum);
        }
        const max= fMax(sums);
        return sums[max];
    }

    function fMax(arr){
        let max =0;
        for(let i=0;i<arr.length;i++){
            if(arr[i]>arr[max]){
                max=i;
            }
        }
    }


    function findSum(a){
        let sum=0;
        for(let i=0;i<a.length;i++){
            sum+=a[i];
        }
        return sum;
    }
}