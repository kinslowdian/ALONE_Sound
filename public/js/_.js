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
		this.playing		= false;

		this.main.addEventListener("ended", this.event_sound.bind(this), false);

		trace(this.main);
	}

	playSound()
	{
		if(!this.playing)
		{
			this.playing = true;

			this.main.currentTime = 0;
			this.main.play();
		}
	}

	stopSound()
	{
		this.main.pause();
		
		if(this.delayTimer)
		{
			clearTimeout(this.delayTimer);
		}
	}

	muteSound(apply)
	{
		if(apply)
		{
			this.main.muted = true;
		}

		else
		{
			this.main.muted = false;
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
			
			this.playing = false;

			if(this.loop)
			{
				this.playCount ++;

				if(this.playCount < this.playMax)
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

	killSound()
	{
		this.main.removeEventListener("ended", this.event_sound.bind(this), false);
	}
}

var timer;
var soundList;
var displayList;

var soundMuted = false;
var soundUse = false;

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
	displayList.more = document.querySelector(".more");

	displayList.go.addEventListener("click", sound_test_go, false);
	displayList.end.addEventListener("click", sound_test_end, false);
	displayList.more.addEventListener("click", sound_test_mute, false);
}

function sound_test_go(event)
{
	// displayList.go.remove();

	sound_add();
}

function sound_add()
{
	if(!soundUse)
	{
		soundUse = true;

		soundList = {};

		sound_build({instanceClass: "sfx_thunder"});
		sound_build({instanceClass: "sfx_lightning"});
		sound_build({instanceClass: "sfx_thunderClap", loop: true, playMax: 3, randomPlay: true, onEndFunct: sound_test_d});

		soundList.sfx_thunderClap.setRandDelay(6, 3);

		sound_start();
	}
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
		soundList[i].killSound();
		delete soundList[i];
	}

	soundUse = false;
}

function sound_test_d()
{
	trace("fire");
	soundList.sfx_lightning.playSound();
}

function sound_test_mute(event)
{
	for(var i in soundList)
	{
		if(soundMuted)
		{
			soundMuted = false;
			soundList[i].muteSound(false);
		}

		else
		{
			soundMuted = true;
			soundList[i].muteSound(true);
		}
	}
}




