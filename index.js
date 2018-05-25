var oStartBtn = document.getElementsByClassName('startBtn')[0],
    oBox = document.getElementsByClassName('box')[0],
    oBongCount = document.getElementsByClassName('bong-count')[0],
    oClose = document.getElementsByClassName('close')[0],
    oEndPage = document.getElementsByClassName('end-page')[0],
    oCount = document.getElementsByClassName('count')[0],
    oEasy = document.getElementsByClassName('easy')[0],
    oMedium = document.getElementsByClassName('medium')[0],
    oDiff = document.getElementsByClassName('diff')[0];
var minesNum,
    mineOver,
    block,
    uesrname;
var mineMap = [];
var seconds = '00',
    minutes = '00',
    time,
    flag = true;
isPC();
function isPC(){
    var userAgentInfo = navigator.userAgent;
    console.log(userAgentInfo);
    bindEvent();
}

// bindEvent();

function bindEvent(){
    oStartBtn.onclick = function(){
        oBox.style.display = 'block';
        oBongCount.style.display = 'block';
        oCount.innerHTML = '尊敬的' + username + '您当前用时：' +
            minutes + ':' + seconds;
        time = setInterval(function(){
            if(seconds < 9){
                seconds++;
                seconds = '0' + seconds;
            }else if(seconds < 59){
                seconds++;
            }else{
                seconds = 0;
                minutes++;
                if(minutes < 10){
                    minutes = '0' +minutes;
                } 
            }
            
            oCount.innerHTML = '尊敬的' + username + '您当前用时：'
            +minutes + ':' + seconds;
        },1000);
    
    }
    oBox.oncontextmenu = function (){
        return false;
    }
    oBox.onmousedown = function (e){
        var event = e.target;
        if(e.which == 1){
            leftClick(event);
        }else if(e.which == 3){
            rightClick(event);
        }
    }
    oEasy.onclick = function(){
        oEndPage.style.display = 'none';
        oBongCount.style.display = 'none';
        oBox.style.display = 'none';
        oBox.innerHTML = '';
        alert("游戏已重新加载,请单击开始按钮开始游戏😀");
        init(10);
    }
    oMedium.onclick = function () {
        oEndPage.style.display = 'none';
        oBongCount.style.display = 'none';
        oBox.style.display = 'none';
        oBox.innerHTML = '';
        alert("游戏已重新加载,请单击开始按钮开始游戏😀");
        init(20);
        

    }
    oDiff.onclick = function () {
        console.log('diff')
        oEndPage.style.display = 'none';
        oBongCount.style.display = 'none';
        oBox.style.display = 'none';
        oBox.innerHTML = '';
        alert("游戏已重新加载,请单击开始按钮开始游戏😀");
        init(30);
    }
    oClose.onclick = function(){
        oEndPage.style.display = 'none';
        oBongCount.style.display = 'none';
        oBox.style.display = 'none';
        oBox.innerHTML = '';
        init(10);
    }
    init(10);
}

function init(count){
    if(flag){
        username = prompt('请输入您的游戏昵称：', '例如：二狗');
        flag = false;
        alert('您的游戏昵称为：' + username);
    }
    minesNum = mineOver = count;
    
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            oBox.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    var block = document.getElementsByClassName('block');
    while(minesNum){
        var bongIndex = Math.floor(Math.random()*100);
        if(!mineMap[bongIndex].mine){
            mineMap[bongIndex].mine = 1;
            block[bongIndex].classList.add('bong');
            minesNum--;
        }
    }
    // oCount.innerHTML = mineOver;
}

function leftClick (event){
    var bong = document.getElementsByClassName('bong');
    if(event && event.classList.contains('bong')){
        bong.forEach = Array.prototype.forEach;
        bong.forEach(function(ele, index){
            ele.classList.add('show');
        })
        setTimeout(() => {
            oEndPage.classList.add('over');
            oEndPage.style.display = 'block';
        }, 800);
        clearInterval(time);
        seconds = '00';
        minutes = '00';

    }else{
        var n = 0;
        var posArr = event && event.getAttribute('id').split('-');
        var posX = posArr && parseInt(posArr[0]);
        var posY = posArr && parseInt(posArr[1]);
        event && event.classList.add('num');
        for(var i = posX - 1; i <= posX + 1; i++){
            for(var j = posY - 1; j <= posY + 1; j++){
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('bong')){
                    n++;
                }
            }
        }
        event && (event.innerHTML = n);
        if(n == 0){
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if(!nearBox.classList.contains('check')){
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    if(dom.classList.contains('flag')){
        dom.classList.remove('flag');
        if(dom.classList.contains('bong')){
            mineOver++;
        }
    }else{
        dom.classList.add('flag');
        if (dom.classList.contains('bong')) {
            mineOver--;
        }
    }
    if(mineOver == 0){
        oEndPage.classList.remove('over');
        oEndPage.style.display = 'block';
    }
    // oCount.innerHTML = mineOver;
}