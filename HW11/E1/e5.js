{
    /*
        Sort mat.
        Each row becomes a min-heap;
        From each min-heap extract min.
        Push the min into the sorted array.
        Convert the sorted array to a matrix
    */ 
    function e5_sortMat(mat){
        /*Utility function*/

        /*Recives A mat of min-heaps and sort it*/
        function sortMat(mat){
            
            function findMin(mat){
                /*BUG BUG BUG*/
                let minIndex=0;
                for(let row=0;row<mat.length;row++){
                    if(mat[row].length>0){
                        if(mat[row][0]<mat[minIndex][0]){
                            minIndex=row;
                        }
                    }else{
                        
                        minIndex++;
                    }
                }
        
                return minIndex;
            }


            const sortedArray=[];

            while(mat.length>0){
                const minIndex=findMin(mat);
                const currentHeap=mat[minIndex];
                const nextElement=minHeap.ExtractMin(currentHeap);
                sortedArray.push(nextElement);
            }
            return sortedArray;
        }
        /*!Utility function*/

        const innerMat=[];

        copyMat(mat,innerMat);
        

        //Sort
        for(let row=0;row<innerMat.length;row++){
            const arr=innerMat[row];
            minHeap.BuildMinHeap(arr);
        }
        debugger;
        const sortedArray=sortMat(innerMat);
        
        //Produce output
        copyArrayToMat(sortedArray,innerMat);
        return innerMat;
    }

    /*Copy mat into targetMat*/
    function copyMat(mat,targetMat){
        for(let row=0;row<mat.length;row++){
            const targetRow=[];
            for(let col=0;col<mat[row].length;col++){
                targetRow.push(mat[row][col]);
            }
            targetMat.push(targetRow);
        }
    }

    /*Copy an array into mat*/
    function copyArrayToMat(array,mat){
        let i=0;

        for(let row=0;row<mat.length;row++){
            for(let col=0;col<mat[row].length;col++){
                const index= row*col;
                mat[row][col]=array[index];
            }
        }
    }

    //Heap
    const minHeap={

        //Methodes
        Left: i=>2*i+1,
        Right: i=>2*(i+1),
        Exchange: (a,i,j)=>{
            const t=a[i];
            a[i]=a[j];
            a[j]=t;
        },

        HeapifyDown: (A,i)=>{
            const l=minHeap.Left(i);
            const r=minHeap.Right(i);
            const heapSize=A.length;
            let smallest=i;
    
            if( l<=heapSize && A[i]>A[l]){
                smallest=l;
            }
    
            if( r<=heapSize && A[smallest]>A[r]){
                smallest=r;
            }
    
            if(smallest!=i){
                minHeap.Exchange(A,i,smallest);
                minHeap.HeapifyDown(A,smallest);
            }
        },


        BuildMinHeap: (A) =>{
            const heapSize=A.length;
            const lastNoLeaf=Math.floor(heapSize/2)-1;

            for(let i=lastNoLeaf ;i>=0;i--){
                minHeap.HeapifyDown(A,i);
            }
        },

        ExtractMin: (A)=>{
            let heapSize=A.length;
            if(heapSize<1){
                return null;
            }

            const min=A[0];
            A[0]=A[heapSize-1];
            A.pop();
            heapSize--;
            minHeap.HeapifyDown(A,0);
            return min;
        }

    };

    
    const M1=[
        [9,5,3,1],
        [7,2,3,10],
        [4,6,11,15],
        [9,6,4,2]
    ];
    console.log("Matrix_1:\n "+M1);
    const M2= e5_sortMat(M1);
    console.log("Matrix_2:\n "+M2);
}