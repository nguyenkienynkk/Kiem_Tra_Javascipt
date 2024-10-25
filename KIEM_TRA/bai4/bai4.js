const video = document.querySelector('#video');
const videoContainer = document.querySelector('#video-container');
const playPauseBtn = document.querySelector('#play-pause');
const centerPlayBtn = document.querySelector('#center-play');
const rewindBtn = document.querySelector('#rewind');
const forwardBtn = document.querySelector('#forward');
const progressBar = document.querySelector('#progress-bar');
const timeDisplay = document.querySelector('#time');
const muteUnmuteBtn = document.querySelector('#mute-unmute');
const fullscreenBtn = document.querySelector('#fullscreen');
const controls = document.querySelector('#controls');
let hideControlsTimeout;

playPauseBtn.addEventListener('click', changeEventPlayPause);
centerPlayBtn.addEventListener('click', changeEventPlayPause);
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = `<img src="svg/pause.svg" alt="">`;
        centerPlayBtn.style.display = 'none';
    } else {
        video.pause();
        playPauseBtn.innerHTML = `<img src="svg/play.svg" alt="">`;
        centerPlayBtn.style.display = 'block';
    }
})
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    document.getElementById('progress-bar').style.width = `${percent}%`;
    updateCurrentTime();
});
document.getElementById('progress-container').addEventListener('click', function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = video.duration;
    video.currentTime = (clickX / width) * duration;
});
video.addEventListener('ended', () => {
    playPauseBtn.innerHTML = `<img src="svg/play.svg" alt="">`;
    centerPlayBtn.style.display = 'block';
});

function changeEventPlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = `<img src="svg/pause.svg" alt="">`;
        centerPlayBtn.style.display = 'none';
    } else {
        video.pause();
        playPauseBtn.innerHTML = `<img src="svg/play.svg" alt="">`;
        centerPlayBtn.style.display = 'block';
    }
}

rewindBtn.addEventListener('click', () => {
    video.currentTime -= 15;
});
forwardBtn.addEventListener('click', () => {
    video.currentTime += 15;
});
video.addEventListener('timeupdate', () => {
    progressBar.value = (video.currentTime / video.duration) * 100;
    updateCurrentTime();
});
progressBar.addEventListener('input', () => {
    video.currentTime = (progressBar.value / 100) * video.duration;
});

function updateCurrentTime() {
    const currentMinutes = Math.floor(video.currentTime / 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    const durationMinutes = Math.floor(video.duration / 60);
    const durationSeconds = Math.floor(video.duration % 60);
    const formatTime = (minutes, seconds) => {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    timeDisplay.textContent = `${formatTime(currentMinutes, currentSeconds)} / ${formatTime(durationMinutes, durationSeconds)}`;
}

muteUnmuteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteUnmuteBtn.innerHTML = video.muted ? `<img src="svg/mute.svg" alt="">` : `<img src="svg/music.svg" alt="">`;
});
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
        controls.style.borderRadius = 0;
        video.style.borderRadius = 0;
    } else {
        document.exitFullscreen();
        controls.style.borderRadius = "40px";
        video.style.borderRadius = "40px";
    }

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            controls.style.borderRadius = "40px";
            video.style.borderRadius = "40px";
        } else {
            controls.style.borderRadius = 0;
            video.style.borderRadius = 0;
        }
    });
});
video.addEventListener('play', () => {
    hideControlsAfterDelay();
});
video.addEventListener('mousemove', () => {
    controls.style.opacity = 1;
    clearTimeout(hideControlsTimeout);
    hideControlsAfterDelay();
});

function hideControlsAfterDelay() {
    hideControlsTimeout = setTimeout(() => {
        controls.style.opacity = 0;
    }, 5000);
}

video.addEventListener('pause', () => {
    controls.style.opacity = 1;
    clearTimeout(hideControlsTimeout);
});
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'Space':
            changeEventPlayPause();
            break;
        case 'ArrowLeft':
            video.currentTime -= 15;
            break;
        case 'ArrowRight':
            video.currentTime += 15;
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;
    }
});