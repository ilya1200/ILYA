{
    /* Row Operations*/
    const rowSum= (row)=>{
        let rSum=0;

        for(let col=0;col<row.length;col++){
            rSum+=row[col];
        }
        return rSum;
    };

    const rowAvg= (row)=>{
        const rowSize=row.length;
        const rSum=rowSum(row);
        const rAvg= rSum/rowSize;

        return rAvg;
    };

    const appeareInRow=(row,x)=>{
        let cnt=0;
        for(let col=0;col<row.length;col++){
            if(row[col]===x){
                cnt+=1;
            }
        }
        return cnt;
    };

    const findMaxInRow=(row)=>{
        let maxIndex=0;
        for(let i=0;i<row.length;i++){
            if(row[i]>row[maxIndex]){
                maxIndex=i;
            }
        }
        return maxIndex;
    };

    /* Mat Operations*/
    function matOp(mat,rowOp){
        const rowsResult=[];

        for(let row=0;row<mat.length;row++){
            const rowResult= rowOp(mat[row]);
            rowsResult.push(rowResult);
        }

        return rowsResult;
    }




    function matOp2(mat,rowOp,x){
        const rowsResult=[];

        for(let row=0;row<mat.length;row++){
            const rowResult= rowOp(mat[row],x);
            rowsResult.push(rowResult);
        }

        return rowsResult;
    }



    /* HW EXERCISE*/

    //Returns the average of mat
    function exercise1(mat){ // AVG[Sum(x)]= Sum(Avg[x]). 
        const rowsAverages= matOp(mat,rowAvg);
        return rowSum(rowsAverages);
    }

    //Returns hw many times x appearce in mat
    function exercise2(mat,x){
        const xAppernces=matOp2(mat,appeareInRow,x);
        return rowSum(xAppernces);
    }

    //Returns hw many times x appearce in mat
    function exercise3(mat){
        const sumsArr=matOp(mat,rowSum);
        return findMaxInRow(sumsArr);
    }



}