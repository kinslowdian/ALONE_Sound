// DEBUG
var trace = function(msg){ console.log(msg); };

var timer;
var soundList;
var displayList;

function pageLoad_init()
{
	trace("pageLoad_init();");

	sound_init();
}

function sound_init()
{
	soundList = {};
	soundList.sfx_thunder = document.querySelector(".sfx_thunder");
	soundList.sfx_lightning = document.querySelector(".sfx_lightning");
	soundList.sfx_thunderClap = document.querySelector(".sfx_thunderClap");

	displayList = {};
	displayList.go = document.querySelector(".go");

	displayList.go.addEventListener("click", sound_test, false);


	soundList.sfx_thunderClap.addEventListener("ended", sound_event, false);
	
	// sound_test();
}

function sound_test(event)
{
	displayList.go.remove();
	timer = setTimeout(sound_play, 1 * 1000);
}


function sound_play()
{
	let delay;
	
	soundList.sfx_thunder.play();
	soundList.sfx_thunderClap.play();

	delay = setTimeout(sound_ext, 2 * 1000);
}

function sound_ext()
{
	soundList.sfx_lightning.play();
}

function sound_event(event)
{
	trace(event);
}
