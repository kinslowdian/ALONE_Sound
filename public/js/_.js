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
		this.loop 			= params.loop || false;
		this.playCount 		= 0;
		this.playMax 		= params.playMax || 1;
		this.randomPlay		= params.randomPlay || false;
		this.onEndFunct		= params.onEndFunct || false;
		this.delayTimer		= false;
	}

	playSound()
	{
		this.main.addEventListener("ended", this.event_sound.bind(this), false);
		this.main.currentTime = 0;
		this.main.play();
	}

	stopSound()
	{
		this.main.removeEventListener("ended", this.event_sound.bind(this), false);
		this.main.pause();
		
		if(this.delayTimer)
		{
			clearTimeout(this.delayTimer);
		}
	}

	setRandDelay(hi, lo)
	{
		this.soundDelayHI = hi;
		this.soundDelayLO = lo;
	}

	playSoundRandDelay()
	{
		this.soundDelay = Math.round(Math.random() * (this.soundDelayHI - this.soundDelayLO) + this.soundDelayLO);

		this.delayTimer = setTimeout(this.playSound.bind(this), this.soundDelay * 1000);
	}

	event_sound(event)
	{
		if(event.type === "ended")
		{
			if(this.loop)
			{
				this.playCount ++;

				if(this.playCount <= this.playMax)
				{
					if(this.randomPlay)
					{
						this.playSoundRandDelay();
					}

					else
					{
						this.playSound();
					}

					trace(this.playCount + " " + this.playMax);
				}

				else
				{
					this.loop = false;
				}
			}

			if(this.onEndFunct)
			{
				this.onEndFunct();
			}
		}
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
	displayList = {};
	displayList.go = document.querySelector(".go");
	displayList.end = document.querySelector(".end");

	displayList.go.addEventListener("click", sound_test_go, false);
	displayList.end.addEventListener("click", sound_test_end, false);
}

function sound_test_go(event)
{
	// displayList.go.remove();

	sound_add();
}

function sound_add()
{
	soundList = {};

	sound_build({instanceClass: "sfx_thunder"});
	sound_build({instanceClass: "sfx_lightning"});
	sound_build({instanceClass: "sfx_thunderClap", loop: true, playMax: 3, randomPlay: true, onEndFunct: sound_test_d});

	soundList.sfx_thunderClap.setRandDelay(6, 3);

	sound_start();
}

function sound_build(params)
{
	soundList[params.instanceClass] = new SoundFX(document.querySelector("." + params.instanceClass));
	soundList[params.instanceClass].create(params);
}

function sound_start()
{
	soundList.sfx_thunderClap.playSoundRandDelay();

	soundList.sfx_thunder.playSound();
}

function sound_test_end(event)
{
	for(var i in soundList)
	{
		soundList[i].stopSound();
		delete soundList[i];
	}

	// EMPTY SET SOUNDS
	// soundList = {};
}

function sound_test_d()
{
	trace("fire");
	soundList.sfx_lightning.playSound();
}




