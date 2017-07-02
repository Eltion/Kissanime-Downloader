// ==UserScript==
// @name         KissAnime Multi Downloader
// @namespace    https://greasyfork.org/en/users/135934-anime-bro1
// @version      0.2
// @description  This is a userscript that will download multi episodes form KissAnime. It also can create m3u8 playlist.
// @author       AnimeBro1
// @homepage     https://github.com/Eltion/Kissanime-Downloader
// @match        http://kissanime.ru/Anime/*
// @exclude      http://kissanime.ru/Anime/*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js

// @require      https://cdn.rawgit.com/Eltion/Kissanime-Downloader/ee154d713ce5af9c031b4abdd20fae8bb7cc2dc5/css.js
// @require      https://cdn.rawgit.com/Eltion/Kissanime-Downloader/ee154d713ce5af9c031b4abdd20fae8bb7cc2dc5/vr.js

// ==/UserScript==


var images = ["","","","",""];
var words = [];
var k = "";
var eps = [];
var epsName = [];
var epsLinks = [];
var failedLinks = [];

var count = 1;
var failedCount = 0;

var start = "";
var end = "";
var isText = false;
var isHTML = false;
var isM3U8 = false;
var quality = [];
var failed = true;

var animebro;
var max = 1;


(function() {
    if(!isBasicJson()){
        getBasicJson();
    }
    max = $(".listing").find("a").toArray().length;
    createButton();
    $("#aend").attr('value',max+"");
    $("#startscript").on('click',function(){
        start = $("#astart").val();
        end = $("#aend").val();
        if($("#aquality").val().includes(",")){
            quality = $("#aquality").val().split(",");
        }else{
            alert("Wrong quality format, plese read the help");
            return;
        }
        isText = $("#atxt").get(0).checked;
        isHTML = $("#ahtml").get(0).checked;
        isM3U8 = $("#am3u8").get(0).checked;
         getAllEps();
    });
    //getEP();
    //getLinks(GM_getValue("html3"));
})();

function createButton(){
    var imgSrc = "https://assets.ubuntu.com/v1/4cd0df1c-picto-download-orange.svg";
    var html = "<div id='adownloader' style='position:fixed; bottom:10px; left:10px'><img id='startscript' style='cursor:pointer;float:left;position: relative; top:5px;margin-right:10px;' width='70px' src='https://assets.ubuntu.com/v1/4cd0df1c-picto-download-orange.svg' /><div style='background:#dd4814; position: relative;height:70px;padding:10px; border-radius: 10px; text-align:center; color: white;float: left;'><div style='display: inline-block;float: left;'>Start: <input value='1' id='astart' style='color:white; text-align:center; width: 30px; background: transparent; border:0.3px solid white; border-radius:5px;' type='text'></input>  End: <input id='aend' value='5' style='color:white; text-align:center; width: 30px; background: transparent; border:0.3px solid white; border-radius:5px;' type='text'></input><br /><br />Quality: <input id='aquality' value='720,480,360' style='color:white; text-align:center; width: 75px; background: transparent; border:0.3px solid white; border-radius:5px;' type='text'></input></div><div style='display:inline-block;float:left;'><input id='atxt' type='checkbox' />Text List <br /><input id='ahtml' type='checkbox' />html List<br /><input id='am3u8' type='checkbox' />m3u8 List</div><a style='display:block; text-align:center;' href='https://github.com/Eltion/Kissanime-Downloader' target='_blank' >Help?</a></div></div>";
    var html2 = "<div id='ainfo' style=' padding:10px; border-radius:20px;position:fixed; display: none; bottom:10px; right:10px; background:#dd4814;height:100px;width:400px;'><h3 style='text-align: center'>KissAnime Downloader</h3><p style='width:100%; word-wrap: break-word;' id='aoutput'></p><p id='aprogress'></p></div>";
    //var html3 = "<div id='ainfo2' style='background: red; padding: 10px; position: a'>"
    $('body').append(html);
    $('body').append(html2);
}

function getAllEps(){

    eps = [];
    epsName = [];
    epsLinks = [];
    var x = $(".listing").find("a").toArray();
    for(var i =0; i < x.length; i++){
        eps.push(x[i].href);
        epsName.push(x[i].innerText);
    }
  
    if(start < 0 || end < start || end > eps.length || !(isText || isHTML || isM3U8)){
        alert("Wrong Options. Max number:"+eps.length);
        return;
    }
    $("#adownloader").hide(500);
    $("#ainfo").show(500);
    eps.reverse();
    epsName.reverse();
    eps = eps.slice( parseInt(start)-1, parseInt(end));
    epsName = epsName.slice(parseInt(start)-1,parseInt(end));
    console.log(epsName);
    alert("Don't try to use the page until it's over!");
    getEP(eps[0]);
}

function getEP(url){
    console.log(url);
    words = [];
    images=["","","","",""];
    k = url + "&s=default";
    $('#aoutput').html("Grabbing: "+url+"...");
    var msg = $.ajax({type: "GET", url: url, async: false}).responseText;
    $('#aoutput').append(" <b style='color:green'>Done</b>");
    if(isCapacha(msg)){
        GetWords(msg);
        getImages(msg);
    }else{
        //alert("x");
        noCapacha(msg);
    }
   // var persentage = (epsLinks.length/eps.length)*100;
    //$('#aprogress').html(persentage+"%");
}

function isCapacha(html){
    return html.includes("formVerify");
}

function noCapacha(html){
    getLinks(html);
    if(count < eps.length){
            getEP(eps[count]);
            count++;
    }
}

function isBasicJson(){
    return GM_getValue("AnimeBro1",false);
}

function Complete() {
    var jj = 0;
    var postData = "";
    for(var j = 0; j <2; j++){
        var w1 = GM_getValue( words[j], false );
        if(w1 !== false){
            if(w1.includes(" ")){
                w1 = w1.split(" ");
            }else{
                w1 = [w1];
            }
            for(var k =0; k < w1.length; k++){
                for(var i = 0; i < images.length; i++){
                    if((images[i] === w1[k]) && postData.length < 4){
                        postData += i+",";
                    }
                }
            }
        }
    }
    if(postData.length == 4){
        postdata(postData);
        console.log("EP Grabed");
    }else{
        CaptachaNotCompleted(eps[count]);
    }
}

function CaptachaNotCompleted(url){
    console.log("Eltioni: "+ url);
    var t = url.split("?id=")[1];
    alert(t);
    var x = $.ajax({type: "POST", url:"http://kissanime.ru/Mobile/GetEpisode", data:{eID:t},async: false}).responseText;
    x = x.split("|||")[0];
    if(x.includes("rapidvideo")){
        rapidvideo(x);
    }else{
        epsLinks.push(x);
    }   
}

function postdata(answer){
    var data = {reUrl: k, answerCap: answer};
    var msg = $.ajax({type: "POST", url: "http://kissanime.ru/Special/AreYouHuman2",data: data ,async: false}).responseText;
    //console.log(msg);
    getLinks(msg);
}

function whatServer(html){
    re = /https:\/\/www.rapidvideo.com\/e\/[^"']*/g;
    if(html.includes("slcQualix")){
        return 1;
    }else if(re.exec(html)){
        return 3;
    }
}

function getLinks(html){
    //console.log(html);
    server = whatServer(html);
    //GM_setValue("html3",html);
    if(server == 1){
        var b = [];
        var $rr = $($.parseHTML(html,document,true));
        if(animebro  == null){
            //alert("xx");
            var script1 = $rr.find("script").toArray()[6].innerHTML;
            var script2 = $rr.find("script").toArray()[7].innerHTML;
            eval("animebro = 1;"+script1);
            eval("animebro = 1;"+script2);
        }
        var x = $rr.find("#slcQualix").find("option").toArray();
        for(var i = 0; i < x.length; i++){
            var c = {"file": ovelWrap(x[i].value), "label": x[i].innerText};
            b.push(c);
        }
        console.log(b);
        getLinkWithSetQuality(b);
    }else if(server == 2){
        var openload = html.match(/https:\/\/openload.co\/embed\/[^"']*/g);
        console.log(openload);
    }else if(server == 3){
        var url = html.match(/https:\/\/www.rapidvideo.com\/e\/[^"']*/g);
        rapidvideo(url);
    }

}

function rapidvideo(url){

    GM_xmlhttpRequest({
        method: "GET",
        url: ""+url,
        synchronous: true,
        onload: function(response) {
            var e = JSON.parse(response.responseText.split('"sources": ')[1].split("]")[0]+"]");
            if (e === undefined || e === null) {
                console.log(response.responseText);
            }else{
                console.log(e);
                getLinkWithSetQuality(e);
            }
        }
    });

}

function getLinkWithSetQuality(ee){
    //console.log(e);
    for(var i =0; i < quality.length; i++){
        for(var j =0; j < ee.length; j++){
            if(ee[j].label.includes(quality[i])){
                //var b = {"link":ee[j].file,"name":epsName[count-1],"quality":quality[i]};
                epsLinks.push(ee[j].file);
                console.log(ee[j].file);
                return;
            }
        }
    }
    epsLinks.push("");
    console.log("Wrong quality");
}

function getBasicJson(){
    var msg = $.ajax({type: "GET", url: "https://rawgit.com/Eltion/Kissanime-Chaptcha-Auto-Complete/master/BasicJson.json", async: false}).responseText;
    msg = JSON.parse(msg);
    for(var i = 0; i < msg.length; i++){
        GM_setValue(msg[i].n,msg[i].v);
    }
    location.reload();
}

function getImages(html){
    //console.log(html);
    var items = html.match(/CapImg\?f=[^"']*/g);
    //console.log(items);
    loader(items, loadImage, function () {
        Complete();
        //alert(count);
        console.log(failedLinks);
        if(count < eps.length){
            getEP(eps[count]);
            count++;
        }else{
            $("#ainfo").html('Done, <a href="https://github.com/Eltion/Kissanime-Downloader" target="_blank">What to do now??</a>');
            console.log("DONE");
            console.log(epsLinks);
            if(isText){
                createTxtList();
            }
            if(isHTML){
                createHTMLlist();
            }if(isM3U8){
                createM3U8();
            }
        }
    });
}

function GetWords(html){
    var form = html.split("formVerify")[1].split("</form")[0];
    var x = form.match(/(?:<span[^>]*>\s*)([^<]*)/g);
    var word1 = x[0].split(">")[1].replace(/\s\s/g,"");
    var word2 = x[1].split(">")[1].replace(/\s\s/g,"");
    words = [word1,word2];
}

function createTxtList(){
    var list ="";
    for(var i = 0; i < epsLinks.length; i++){
        list += encodeURI(epsLinks[i]) + "[" +  epsName[i].replace(/[\s:\|\[\]\{\}]+/g,"_") + ".mp4\n";
    }
    download("list.txt","text/plain",list);
}

function createHTMLlist(){
    var list ="";
    for(var i = 0; i < epsLinks.length; i++){
        list += '<a href="' + epsLinks[i] + '" download="' +  epsName[i] + '">' +  epsName[i] + '</a><br>';
    }
    download("list.html","text/html",list);
}

function createM3U8(){
    var list =" #EXTM3U\n\n";
    for(var i = 0; i < epsLinks.length; i++){
        list += '#EXTINF:-1,'+epsName[i]+"\n"+encodeURI(epsLinks[i])+"\n\n";
    }
    download("list.m3u8","text/plain",list);
}

function download(filename, datatype, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:' + datatype + ';charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	// element.setAttribute('target', '_blank');
	// ^^ problems with safari

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function loader(items, thingToDo, allDone) {
    if (!items) {
        // nothing to do.
        return;
    }

    if ("undefined" === items.length) {
        // convert single item to array.
        items = [items];
    }

    var count = items.length;

    // this callback counts down the things to do.
    var thingToDoCompleted = function (items, i) {
        count--;
        if (0 === count) {
            allDone(items);
        }
    };

    for (var i = 0; i < items.length; i++) {
        // 'do' each thing, and await callback.
        thingToDo(items, i, thingToDoCompleted);
    }
}

function loadImage(items, i, onComplete) {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL ="";
    var onLoad = function (e) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL("image/jpeg");
        images[i] = dataURL;
        e.target.removeEventListener("load", onLoad);
        onComplete(items, i);
    };
    img.addEventListener("load", onLoad, false);
    img.src = "http://kissanime.ru/Special/"+items[i];
}
