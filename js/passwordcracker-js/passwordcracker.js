
var CurrentRound = 0;   
var NightmareMode = false;   



$( "body" ).on( "click", ".nextround", function() {
CurrentRound++; //Update the global
NextRound(CurrentRound);
});
$( "body" ).on( "click", ".retry", function() {
$("html").removeClass();
NextRound(CurrentRound);
});
$( "body" ).on( "click", ".nightmare", function() {
CurrentRound=5; //Update the global
NightmareMode=true;
NextRound(CurrentRound);
});

/*===================================================== */


function NextRound(CurrentRoundArg){
$('#roundcheck').html(CurrentRound);
CurrentRoundArg +=5; //start on 3 letters
var Fakers = CurrentRoundArg*5;
$('#terminal').hide().html(BuildPasswords(makeid(CurrentRoundArg), Fakers)).fadeIn();
}

function Shuffle(o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

function makeid(leength) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //abcdefghijklmnopqrstuvwxyz0123456789";
  if(NightmareMode==true){var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";}
  for (var i = 0; i < leength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


function IsChar(charr, Haystack) {
  if (Haystack.indexOf(charr) === -1) {
    return false;
  } else {
    return true;
  }
}

function MatchWords(Needle, Haystack) {
  var Counter = 0;
  for (var i = 0, len = Needle.length; i < len; i++) { //for each letter in needle
    if (IsChar(Needle[i], Haystack)) { //is the letter in haystack?
      Counter++; //letter is in haystack
    }
  }
  return Counter;
}

function CreatePasswords(Actual, Fakes) {
  var OutArray = [Actual]
  var leength = Actual.length;
  for (var i = 0; i < Fakes; i++) { //for amount of fakes
	var Faker = makeid(leength);
	if(MatchWords(Actual, Faker) == leength){i--;}//Uh oh, all the letters match, can't have
	else {OutArray.push(Faker);} //Add a fake
  }
  return Shuffle(OutArray); //shuffle the deck
}

function MakeHTML(input, Actual) {
  var AreaID = makeid(10);
  var Output = '<b><span id="' + AreaID + '-attempts">[#] [#] [#] [#] [#]</span> ATTEMPTS REMAIN BEFORE TERMINAL LOCK OUT</b>' +
    '<br><b id="' + AreaID + '-matches"></b>' +
    '<br><br> !# System.Root.$~admin -access passwords:<br>'; //insert any foreword you want here.
  var Matches = 0;
  var AddHtml = 'href="javascript:void(0)"'; // Additional HTML to throw in there, eg. Any onclick events & Stuff
  for (var i = 0; i < input.length; i++) {
    Matches = MatchWords(Actual, input[i]);
    Output+='<a '+AddHtml+' data-string="'+input[i]+'" data-actual="'+Actual+'" data-matches="'+Matches+'" data-areaid="'+AreaID+'" class="password_link" rel="'+Matches+'">'+input[i]+'</a> ';
//onclick="CheckPassword(\''+input[i]+'\',\''+Actual+'\',\''+Matches+'\',\''+AreaID+'\');"

  }
  Output += ''; //insert any afterword you want here
  return Output;
}

function BuildPasswords(Actual, Fakes) {
  var Array = CreatePasswords(Actual, Fakes);
  return MakeHTML(Array, Actual);
}

function CheckPassword(Given, Actual, Matches, AreaID) {
  var attempts = $('#' + AreaID + '-attempts');
  var matchess = $('#' + AreaID + '-matches');
  if (Given == Actual) {
	StingPage('green', 250);
    matchess.hide().html(matchess.html() + '<br><span>' + Matches + '</span> / ' + Actual.length + '  Matched [' + Given + '] ' + 'SUCCESS!<br>Next Screen loading in 3 seconds..').fadeIn();
    setTimeout(function(){
      CurrentRound++; //Update the global
      NextRound(CurrentRound);}, 2500);
	return 'Success!';
  } else {
    attempts.hide().html(attempts.text().substr(4)).fadeIn();
    if (attempts.text().length == 0) {StingPage('red', 'forever'); $('#terminal').hide().html('<h3 style="display: inline-block;">TERMINAL LOCKED</h3> <div class="modal"><a href="#YouFailure" class="retry">Retry Screen: '+CurrentRound+'</a></div>').fadeIn();}
	else {StingPage('red', 250); matchess.hide().html(matchess.html() + '<br><span>' + Matches + '</span> / ' + Actual.length + '  Matched [' + Given + ']').fadeIn();}
    return false;
  }
}

function StingPage(color, time){
    $('html').addClass('sting-'+color+' sting'); // class must exist, eg. .sting-red
	if(time != 'forever'){
    setTimeout(function(){
      $('html').removeClass('sting-'+color);}, time);}
}

$( "body" ).on( "click", ".password_link", function() {
CheckPassword($(this).data('string'),$(this).data('actual'),$(this).data('matches'),$(this).data('areaid'));
});

/*-------------*/
var cnvs = document.getElementById('blondebrunetteredhead');
var cntxt = cnvs.getContext('2d');

var chars = 'Ku5hep5UtresY8beYusWU8raspeB7ekUpa3Ad4QAjazeD4amG4pUju'; // om
chars = chars.split(''); // make array
var font_size = 14;

function resizeCanvas() {
  cnvs.width = window.innerWidth;
  setTimeout(function() {
    cnvs.height = window.innerHeight;
  }, 0);
};
window.onresize = resizeCanvas();
resizeCanvas();


var columns = cnvs.width/font_size;
var drops = [];
for(var x=0;x<columns;x++){
  drops[x]=1;
}

function draw(){
  
  cntxt.fillStyle = 'rgba(0,0,0,0.05)';
  cntxt.fillRect(0,0,cnvs.width,cnvs.height);
  cntxt.fillStyle = '#0F0';
  cntxt.font = font_size + 'px fixedsys';
  
  for(var i=0;i<drops.length;i++){
    var txt = chars[Math.floor(Math.random()*chars.length)];
    cntxt.fillText(txt,i*font_size, drops[i]*font_size);
    
    if(drops[i]*font_size>cnvs.height&&Math.random()>0.975){
      drops[i] = 0; // back to the top!   
    }
    drops[i]++;
  }
}

setInterval(draw, 60);