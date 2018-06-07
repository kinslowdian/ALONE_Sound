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
	}

	playSound()
	{
		this.main.addEventListener("ended", this.event_sound.bind(this), false);
		this.main.play();
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
	soundList = {};

	sound_build({instanceClass: "sfx_thunder"});
	sound_build({instanceClass: "sfx_lightning"});
	sound_build({instanceClass: "sfx_thunderClap", loop: true, playMax: 3, randomPlay: true, onEndFunct: sound_test_d});

	displayList = {};
	displayList.go = document.querySelector(".go");

	displayList.go.addEventListener("click", sound_test, false);

	soundList.sfx_thunderClap.setRandDelay(6, 3);
}

function sound_build(params)
{
	soundList[params.instanceClass] = new SoundFX(document.querySelector("." + params.instanceClass));
	soundList[params.instanceClass].create(params);
}

function sound_test(event)
{
	displayList.go.remove();
	// timer = setTimeout(sound_test_a, 0.5 * 1000);

	soundList.sfx_thunderClap.playSoundRandDelay();
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

function sound_test_d()
{
	trace("fire");
	soundList.sfx_lightning.playSound();
}




