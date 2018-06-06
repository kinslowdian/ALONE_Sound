// DEBUG
var trace = function(msg){ console.log(msg); };

class SoundFX
{
	constructor(main)
	{
		this.main = main;
	}

	create(params)
	{
		this.instanceClass 	= params.instanceClass;
		this.loop 			= params.loop;
		this.playCount 		= params.playCount;
		this.playMax 		= params.playMax;
	}

	playSound()
	{
		this.main.play();
	}
}

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

	soundList.sfx_thunder = new SoundFX(document.querySelector(".sfx_thunder"));
	soundList.sfx_thunder.create({instanceClass: "sfx_thunder", loop: false, playCount: 0, playMax: 1});

	soundList.sfx_lightning = new SoundFX(document.querySelector(".sfx_lightning"));
	soundList.sfx_lightning.create({instanceClass: "sfx_lightning", loop: false, playCount: 0, playMax: 1});

	soundList.sfx_thunderClap = new SoundFX(document.querySelector(".sfx_thunderClap"));
	soundList.sfx_thunderClap.create({instanceClass: "sfx_thunderClap", loop: true, playCount: 0, playMax: 3});

	displayList = {};
	displayList.go = document.querySelector(".go");

	displayList.go.addEventListener("click", sound_test, false);


	soundList.sfx_thunderClap.main.addEventListener("ended", sound_event, false);
}

function sound_test(event)
{
	displayList.go.remove();
	timer = setTimeout(sound_test_a, 0.5 * 1000);
}


function sound_test_a()
{
	let delay;

	soundList.sfx_thunder.playSound();

	delay = setTimeout(sound_test_b, 4 * 1000);
}

function sound_test_b()
{
	let delay;

	soundList.sfx_lightning.playSound();

	delay = setTimeout(sound_test_c, 4 * 1000);
}

function sound_test_c()
{
	soundList.sfx_thunderClap.playSound();
}

function sound_event(event)
{
	let soundTarget = event.target.className;
	let soundObject;

	
	for(let i in soundList)
	{
		if(soundTarget === soundList[i].instanceClass)
		{
			soundObject = soundList[i];
		}
	}

	if(soundObject.loop)
	{
		soundObject.playCount ++;

		if(soundObject.playCount <= soundObject.playMax)
		{
			soundObject.playSound();

			trace(soundObject.playCount + " " + soundObject.playMax);
		}

		else
		{
			soundObject.loop = false;

			alert("LOOP COMPLETE");
		}
	}
}
