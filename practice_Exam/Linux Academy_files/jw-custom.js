var jwCustom;

$(document).ready(function () {
    if (typeof jwCustom === 'undefined') {
        if (typeof playerId !== 'undefined') {
            jwCustom = new JWCustom(playerId);
        } else {
            jwCustom = new JWCustom('player0');
        }
    }
});

var JWCustom = function (playerId) {

    var self = this;
    this.playerId = playerId;
    this.playerInstance = jwplayer(this.playerId);
    this.playerContainer = document.querySelector('#' + this.playerId);
    this.videoTag = null;
    this.controlsAdded = false;

    this.apply = function () {
        if (this.controlsAdded === false) {
            jwplayer().on('ready', function () {
                self.setupControls();
            });

            jwplayer().on('playlistItem', function(){
                //console.log('Firing On PlaylistItem');
                self.playerInstance.off('playbackRateChanged');
            });

            jwplayer().on('firstFrame', function() {
                self.videoTag = $('#' + playerId).find('video').get(0);
                self.setPlaybackRate();
                self.setupControlBarFading();
                jwplayer().on("playbackRateChanged", function () {
                    //console.log('Firing PlaybackRateChanged');
                    self.storePlaybackRate();
                });
                return true;
            });

        } else {
            return false;
        }

    };

    this.setupControls = function () {
        this.addSkipButtons();
        this.controlsAdded = true;
    }

    this.addSkipButtons = function () {
        rewindDiv = '<div aria-label="Rewind 10s" role="button" tabindex="0" class="jw-icon-tooltip jw-icon-custom-rewind jw-button-color jw-reset jw-selection-menu"><div class="jw-selection-menu-icon-container"><div class="jw-menu-selection-icon jw-reset"><svg viewBox="-200 0 1300 1050"><g><path d="M302.304 508.42v191.168h55.68v-276.544h-45.472c0 2.784-0.928 6.496-1.856 11.136-2.784 8.352-5.568 14.848-10.208 19.488-6.496 7.424-15.776 12.064-26.912 14.848-6.496 1.856-18.56 2.784-36.192 3.712v37.12h64.96z"></path><path d="M112.064 359.94c-34.336 59.392-54.752 128.064-54.752 201.376 0 219.936 175.392 398.112 390.688 398.112 216.224 0 390.688-178.176 390.688-398.112s-175.392-398.112-390.688-398.112v-131.776l-325.728 180.032 325.728 184.672v-132.704c161.472 0 293.248 133.632 293.248 297.888 0 165.184-130.848 297.888-293.248 297.888s-293.248-132.704-293.248-297.888c0-56.608 15.776-108.576 41.76-153.12l-84.448-48.256z"></path><path d="M495.328 564.1c0-33.408 2.784-58.464 7.424-74.24 5.568-15.776 15.776-24.128 32.48-24.128s26.912 8.352 31.552 24.128c4.64 15.776 7.424 40.832 7.424 74.24 0 31.552-2.784 55.68-7.424 73.312-4.64 16.704-15.776 25.056-31.552 25.056s-26.912-8.352-32.48-25.056c-5.568-17.632-7.424-41.76-7.424-73.312v0zM534.304 421.188c-35.264 0-60.32 12.064-74.24 37.12s-21.344 60.32-21.344 105.792 7.424 80.736 21.344 105.792c13.92 25.056 38.976 37.12 74.24 37.12s60.32-12.064 74.24-37.12c13.92-25.056 21.344-59.392 21.344-105.792s-6.496-80.736-21.344-105.792c-13.92-25.056-38.976-37.12-74.24-37.12v0z"></path></g></svg></div></div></div>';
        fastforwardDiv = '<div aria-label="Fast Forward 10s" role="button" tabindex="0" class="jw-icon-tooltip jw-icon-custom-fastforward jw-button-color jw-reset jw-selection-menu"><div class="jw-selection-menu-icon-container"><div class="jw-menu-selection-icon jw-reset"><svg viewBox="-200 0 1300 1050"><g><path d="M302.304 508.42v191.168h55.68v-276.544h-45.472c0 2.784-0.928 6.496-1.856 11.136-2.784 8.352-5.568 14.848-10.208 19.488-6.496 7.424-15.776 12.064-26.912 14.848-6.496 1.856-18.56 2.784-36.192 3.712v37.12h64.96z"></path><path d="M783.936 359.94c34.336 59.392 54.752 128.064 54.752 201.376 0 219.936-175.392 398.112-390.688 398.112-216.224 0-390.688-178.176-390.688-398.112s175.392-398.112 390.688-398.112v-131.776l325.728 180.032-325.728 184.672v-132.704c-161.472 0-293.248 133.632-293.248 297.888 0 165.184 130.848 297.888 293.248 297.888s293.248-132.704 293.248-297.888c0-56.608-15.776-108.576-41.76-153.12l84.448-48.256z"></path><path d="M495.328 564.1c0-33.408 2.784-58.464 7.424-74.24 5.568-15.776 15.776-24.128 32.48-24.128s26.912 8.352 31.552 24.128c4.64 15.776 7.424 40.832 7.424 74.24 0 31.552-2.784 55.68-7.424 73.312-4.64 16.704-15.776 25.056-31.552 25.056s-26.912-8.352-32.48-25.056c-5.568-17.632-7.424-41.76-7.424-73.312v0zM534.304 421.188c-35.264 0-60.32 12.064-74.24 37.12s-21.344 60.32-21.344 105.792 7.424 80.736 21.344 105.792c13.92 25.056 38.976 37.12 74.24 37.12s60.32-12.064 74.24-37.12c13.92-25.056 21.344-59.392 21.344-105.792s-6.496-80.736-21.344-105.792c-13.92-25.056-38.976-37.12-74.24-37.12v0z"></path></g></svg></div></div></div>';

        playbackButton = document.querySelector('#' + this.playerId + ' .jw-icon-playback');
        playbackButton.insertAdjacentHTML('beforebegin', rewindDiv);
        playbackButton.insertAdjacentHTML('afterend', fastforwardDiv);

        rewindButton = document.querySelector('#' + this.playerId + ' .jw-icon-custom-rewind');
        fastForwardButton = document.querySelector('#' + this.playerId + ' .jw-icon-custom-fastforward');

        rewindButton.onclick = function () {
            self.skipBySeconds(-10)
        };
        fastForwardButton.onclick = function () {
            self.skipBySeconds(10)
        };
    };

    this.setupControlBarFading = function () {
        timer = null;
        $('#' + self.playerId).on('mousemove', function (e) {
            clearTimeout(timer);
            playerControlBar = $('#' + self.playerId + ' .jw-controls');
            if (!playerControlBar.is(':visible')) {
                playerControlBar.fadeIn();
            }
            //Is the player paused?
            if (self.playerInstance.getState() === 'paused') {
                //Is the bar visible?
                if (playerControlBar.is(':visible')) {
                    //Only if the mouse is not over the control bar?
                    if ($('#' + self.playerId + ' .jw-controls:hover').length === 0) {
                        //Set a timeout to fade the bar out
                        timer = setTimeout(function () {
                            playerControlBar.fadeOut();
                        }, 800);
                    }
                }
            }
        });
    };

    this.setPlaybackRate = function () {
        // Browsers that support playbackRate
        //console.log('Setting Playback Rate');
        if (this.videoTag.playbackRate) {
            var playbackRate = localStorage.getItem('jwplayer.savedPlaybackRate');
            if (playbackRate) {
                self.videoTag.playbackRate = playbackRate;
                self.videoTag.defaultPlaybackRate = playbackRate;
            }
        }
    };

    this.storePlaybackRate = function () {
        //console.log('Storing Playback Rate');
        localStorage.setItem('jwplayer.savedPlaybackRate', this.playerInstance.getPlaybackRate());
    };

    this.skipBySeconds = function (seconds) {
        var time = this.playerInstance.getPosition() + seconds;
        if (time < 0) {
            time = 0;
        }
        this.playerInstance.seek(time);
    };

};

function initPlayer() {
    document.addEventListener('DOMContentLoaded', function () {
        jwCustom.apply();
    }, false);
}

function initDynamic(hlsUrl, preroll) {
    $(document).ready(function () {
        jwplayer(playerId).setup({
            autostart: true,
            image: "/templates/cp/img/video-placeholder.jpg",
            playlist: [{
                file: preroll
            }, {
                file: hlsUrl
            }],
            width: "100%",
            aspectratio: "16:9",
            displaytitle: 'false',
            displaydescription: 'false',
            visualplaylist: 'false',
            nextUpDisplay: 'false',
            playbackRateControls: [0.5, 0.75, 1.75, 1.25, 1.5, 2],
            preload: 'auto'
        });
        jwCustom.controlsAdded = false;
        jwCustom.apply();
    });
}