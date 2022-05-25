import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const lastSeconsBeforeStopIframe = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(lastSeconsBeforeStopIframe)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(function (event) {
    localStorage.setItem('videoplayer-current-time', `${event.seconds}`);
  }, 1000),
);
