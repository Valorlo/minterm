var data;

function loadData(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');

    xhr.send();
    xhr.onload=function(){
        data=JSON.parse(xhr.responseText);
        callback();
    }
}

function init(){
    var localname={};
    for(var i=0;i<data.length;i++){
        var content=data[i].ZipName_;
        if(localname[content]==undefined){
            localname[content]=1;
        }
    }
    var aa = document.querySelector(".area");
    var stra='';
    stra+='<option value="all"> 請選擇地區 </option>';
    for(var j in localname){
        stra+='<option value="'+ j +'">' + j + '</option>';
    }
    aa.innerHTML=stra;

    aa.addEventListener("change",update);

    var status={};
    for(var i=0;i<data.length;i++){
        var content=data[i].StatusName_;
        if(status[content]==undefined){
            status[content]=1;
        }
    }
    var bb = document.querySelector(".status");
    var strb='';
    strb+='<option value="all"> 請選擇狀態 </option>';
    for(var j in status){
        strb+='<option value="'+ j +'">' + j + '</option>';
    }
    bb.innerHTML=strb;

    bb.addEventListener("change",update);
}
function update(){
    var aa = document.querySelector(".area");
    var bb = document.querySelector(".status");
    var cc = document.querySelector(".ct");
    var strc='';
    var h22=document.querySelector(".ti");
    var total=0;
    for(var k=0;k<data.length;k++){
        //
        //console.log(aa.value);
        //console.log(bb.value);
        if(data[k].ZipName_ == aa.value){
            if(data[k].StatusName_==bb.value){
                var content=data[k].BeforeDesc_;
                total+=1;
                strc+= '<li>'+content+'</li>';
            }
        }
    }
    h22.textContent = aa.value+"有"+total+"筆資料";
    cc.innerHTML=strc;
}

loadData(init);