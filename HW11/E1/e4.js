{
    function e4(mat){
        const dimention=mat.length;
        for(let i=0;i<dimention;i++){
            for(let j=i+1;j<dimention;j++){
                if(mat[i][j]!=0){
                    return false;
                }
            }

        }
    }
}