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
	soundList = new Array();

	sfx_thunder = {};
	sfx_thunder.instanceClass = "sfx_thunder";
	sfx_thunder.loop = false;
	sfx_thunder.playCount = 0;
	sfx_thunder.playMax = 1;
	sfx_thunder.main = document.querySelector("." + sfx_thunder.instanceClass);

	soundList.push(sfx_thunder);

	sfx_lightning = {};
	sfx_lightning.instanceClass = "sfx_lightning";
	sfx_lightning.loop = false;
	sfx_thunder.playCount = 0;
	sfx_thunder.playMax = 1;
	sfx_lightning.main = document.querySelector("." + sfx_lightning.instanceClass);

	soundList.push(sfx_lightning);

	sfx_thunderClap = {};
	sfx_thunderClap.instanceClass = "sfx_thunderClap";
	sfx_thunderClap.loop = true;
	sfx_thunder.playCount = 0;
	sfx_thunder.playMax = 3;
	sfx_thunderClap.main = document.querySelector("." + sfx_thunderClap.instanceClass);

	soundList.push(sfx_thunderClap);

	displayList = {};
	displayList.go = document.querySelector(".go");

	displayList.go.addEventListener("click", sound_test, false);


	sfx_thunderClap.main.addEventListener("ended", sound_event, false);
	
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
	
	sfx_thunder.main.play();

	delay = setTimeout(sound_ext, 2 * 1000);
}

function sound_ext()
{
	sfx_lightning.main.play();

	sfx_thunderClap.main.play();
}

function sound_event(event)
{
	let soundTarget = event.target.className;
	let soundObject;

	
	for(let i in soundList)
	{
		// trace(soundList[i]);

		if(soundTarget === soundList[i].instanceClass)
		{
			soundObject = soundList[i];
		}
	}

	if(soundObject.loop)
	{
		soundObject.main.play();
	}
}
