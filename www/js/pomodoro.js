define(["jquery"], function (jQuery) {
    return jQuery.extend(this, {
        startStop: function () {
            if(this.oInterval){
                //then we are underway and need to quit for some reason
                clearInterval(this.oInterval);
                this.oInterval = false;
                jQuery(this).find("img").attr('src', "images/Twemoji_1f345_yellow.svg");
                jQuery(this).find("span").html("slide to resume");
            }else{
                //then we are starting a new pomodoro
                var nTotalTime = 1000 * 60 * 25;
                jQuery(this).find("img").attr('src', "images/Twemoji_1f345.svg");
                jQuery(this).find("span").html(Math.floor((nTotalTime)/(1000*60)) + ":" + Math.ceil((nTotalTime)/(1000))%60 + " slide to quit");

                this.nStartTime = new Date().getTime();

                //function to be called each interval
                this.interval = function () {
                    var nTimeElapsed = new Date().getTime() - this.nStartTime;
                    if (nTimeElapsed > nTotalTime) {
                        //then we have just finished a pomodoro
                        clearInterval(this.oInterval);
                        this.oInterval = false;
                        var snd = new Audio("sounds/DING.mp3");
                        snd.play();
                        jQuery(this).find("img").attr('src', "images/Twemoji_1f345_yellow.svg");
                        jQuery(this).find("span").html("slide to resume");
                    } else {
                        // another second has elapsed
                        var snd = new Audio("sounds/alarm_clock_tick.mp3");
                        jQuery(this).find("span").html(Math.floor((nTotalTime - nTimeElapsed)/(1000*60)) + ":" + Math.ceil((nTotalTime - nTimeElapsed)/(1000))%60 + " slide to quit");
                        snd.play();
                    }
                }
                this.oInterval = setInterval(jQuery.proxy(this.interval, this), 1000);
            }
            return this;

        }
    });
});
