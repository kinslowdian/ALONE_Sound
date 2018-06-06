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

	// sfx_thunder.instanceClass = "sfx_thunder";
	// sfx_thunder.loop = false;
	// sfx_thunder.playCount = 0;
	// sfx_thunder.playMax = 1;
	// sfx_thunder.main = document.querySelector("." + sfx_thunder.instanceClass);

	// soundList.push(sfx_thunder);

	soundList.sfx_lightning = new SoundFX(document.querySelector(".sfx_lightning"));
	soundList.sfx_lightning.create({instanceClass: "sfx_lightning", loop: false, playCount: 0, playMax: 1});

	// sfx_lightning = {};
	// sfx_lightning.instanceClass = "sfx_lightning";
	// sfx_lightning.loop = false;
	// sfx_thunder.playCount = 0;
	// sfx_thunder.playMax = 1;
	// sfx_lightning.main = document.querySelector("." + sfx_lightning.instanceClass);

	// soundList.push(sfx_lightning);

	soundList.sfx_thunderClap = new SoundFX(document.querySelector(".sfx_thunderClap"));
	soundList.sfx_thunderClap.create({instanceClass: "sfx_thunderClap", loop: true, playCount: 0, playMax: 3});

	// sfx_thunderClap = {};
	// sfx_thunderClap.instanceClass = "sfx_thunderClap";
	// sfx_thunderClap.loop = true;
	// sfx_thunder.playCount = 0;
	// sfx_thunder.playMax = 3;
	// sfx_thunderClap.main = document.querySelector("." + sfx_thunderClap.instanceClass);

	// soundList.push(sfx_thunderClap);

	displayList = {};
	displayList.go = document.querySelector(".go");

	displayList.go.addEventListener("click", sound_test, false);


	soundList.sfx_thunderClap.main.addEventListener("ended", sound_event, false);
	
	// sound_test();
}

function sound_test(event)
{
	displayList.go.remove();
	timer = setTimeout(sound_play, 0.5 * 1000);
}


function sound_play()
{
	let delay;
	
	// sfx_thunder.main.play();

	soundList.sfx_thunder.playSound();

	delay = setTimeout(sound_ext, 4 * 1000);
}

function sound_ext()
{
	soundList.sfx_lightning.playSound();

	soundList.sfx_thunderClap.playSound();
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
		if(soundObject.playCount < soundObject.playMax)
		{
			soundObject.playSound();
			soundObject.playCount ++;
		}

		else
		{
			soundObject.loop = false;
		}
	}
}
