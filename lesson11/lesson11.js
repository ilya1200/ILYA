{
    const charArr=[];

    function h(value){
        return value-97;
    }

    function resetArr(arr){
        for(let i=1;i<=26;i++){
            charArr.push(0);
        }
    }

    function isAnagram(a1,a2){
        debugger;
        resetArr(charArr);

        for(let i=0;i<a1.length;i++){
            charArr[h(a1[i])]++;
        }

        for(let j=0;j<a2.length;j++){
            charArr[h(a2[j])]--;
        }

        return isZero(arr);

    }

}