const EventEmitter = require('events');

class Notification extends EventEmitter {
    constructor(channelName) {
        super();
        this.channelName = channelName;
        this.on(this.channelName, (message) => {
            console.log(`[${channelName}] ${message}`)
        })
    }

    send(message) {
        this.emit(this.channelName, message);
    }
}

const myTwitchChat = new Notification('twitch');
myTwitchChat.send('Hello, World!')

const myYoutubeChat = new Notification('youtube');
myYoutubeChat.send('Hello, world!')