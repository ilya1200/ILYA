{
    const matix=[3][3];

    function fillMat(mat){

        for(let row=0;row<mat.length;row++){
            for(let col=0;col<mar[row].length;col++){
                mat[row][col]=prompt(`Assign a value for M[${row}][${col}] <= `);
            }
        }
    }

    function fMax(arr){
        let max =0;
        for(let i=0;i<arr.length;i++){
            if(arr[i]>arr[max]){
                max=i;
            }
        }
    }

    function findMax(mat){
        const max={
            row:0,
            col:0
        };

        for(let r=0;r<mat.length;r++){
            let localMax =findMax(mat[row]);
            if(localMax>mat[max.row][max.col]){
                max.row=r;
                max.col=localMax;
            }
        }
    }
}