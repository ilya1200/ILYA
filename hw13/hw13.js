$(document).ready(function(){

    $("#btn").click(()=>{
        debugger;
        function isNumeric(str){
            let i=0;
            if(str.length===0){
                return false;
            }

            while(i<str.length && str.charAt(i)>='0' && str.charAt(i)<='9'){
                i++;
            }

            if(!(i<str.length)){
                return true;
            }else{
                return false;
            }
        }

        const animator={
            animator: function(inId,outId){
                const value=$(inId).val();
                if(isNumeric(value)){
                    const size=`${value}px`;
                    $(outId).animate({width:size});
                }else{
                    console.log(`Input with ${inId} is not numeric`);
                }

            }
        };
        
        animator.animator("#in1","#out1");
        animator.animator("#in2","#out2");
        animator.animator("#in3","#out3");
        
    });
    
 
 });