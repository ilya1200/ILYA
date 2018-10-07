{
    let history=["abc"];
    let historyFlag=0;
    let hstr=``;

    function insert(num){
        if(num==='C'){
            document.getElementById("textview").value='';
            history=[];
            hstr=``;
        }else if(num==='H'){
            if(historyFlag%2===0){
                showHistory();
                historyFlag++;
            }else{
                hideHistory();
                historyFlag++;
            }
        }else if(num==='='){
            hstr=hstr+document.getElementById("textview").value+`=`+eval(document.getElementById("textview").value);
            document.getElementById("textview").value=eval(document.getElementById("textview").value);
            logHistory(hstr);
        }else{
            hstr=hstr+document.getElementById("textview").value+' '+num;
            document.getElementById("textview").value+=num;
        }
    }

    function logHistory(expression){
        history.push(expression);
    }


    function showHistory(){
        const body=document.getElementsByTagName('body')[0];
        const hstr=document.getElementsByClassName('history')[0];

        hstr.innerHTML= history.join("<br>");
    }
   
    function hideHistory(){
        const body=document.getElementsByTagName('body')[0];
        const hstr=document.getElementsByClassName('history')[0];

        hstr.style.display='none';
    }

}