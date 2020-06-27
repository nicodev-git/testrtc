const uuid = require('uuid');
const { connect } = require('twilio-video');

async function fetchToken(user, roomName) {
    const res = await fetch('/token?identity=' + user + '&roomName=' + roomName, {
        method: 'GET',
    });
    return res.text();
}

const params = new URLSearchParams(window.location.search);
const user = params.get('user') || uuid.v4();
const roomName = params.get('room') || 'default';
fetchToken(user, roomName)
.then(async (token) => {
    console.log('token V5', token);
    const options = {
        audio: true,
        video: {width: 1280},
        preferredVideoCodecs: [
            { codec: 'VP8', simulcast: true }
        ]
    };

    const room = await connect(token, options);
    window.addEventListener('beforeunload', () => room.disconnect());
	console.log(`Successfully joined a Room: ${room}`);

    // Display local video. Docs suck.
    const localVideoContainer = document.getElementById('localVideoContainer');
    room.localParticipant.videoTracks.forEach((track) => {
        localVideoContainer.appendChild(track.track.attach());
    });

    // https://www.twilio.com/docs/video/javascript-getting-started#display-a-remote-participants-video
    room.on('participantConnected', participant => {
		console.log(`Participant "${participant.identity}" connected`);

        const container = document.createElement('div');
        container.id = participant.sid;
        document.getElementById('remotes').appendChild(container);
		participant.tracks.forEach(publication => {
			if (publication.isSubscribed) {
				const track = publication.track;
				container.appendChild(track.attach());
			}
            publication.on('unsubscribed', () => {
                if (publication.track) {
                    const mediaElements = publication.track.detach();
                    mediaElements.forEach(mediaElement => mediaElement.remove());
                }
            });
		});

		participant.on('trackSubscribed', track => {
            container.appendChild(track.attach());
		});
	});
	room.participants.forEach(participant => {
        const container = document.createElement('div');
        container.id = participant.sid;
        document.getElementById('remotes').appendChild(container);
		participant.tracks.forEach(publication => {
			if (publication.track) {
				const track = publication.track;
				container.appendChild(track.attach());
			}
            publication.on('unsubscribed', () => {
                if (publication.track) {
                    const mediaElements = publication.track.detach();
                    mediaElements.forEach(mediaElement => mediaElement.remove());
                }
            });
		});

		participant.on('trackSubscribed', track => {
            container.appendChild(track.attach());
        });
    });
    room.on('participantDisconnected', participant => {
		console.log(`Participant disconnected: ${participant.identity}`);
		participant.tracks.forEach(publication => {
            console.log('bye', publication.track);
            if (publication.track) {
                const mediaElements = publication.track.detach();
                mediaElements.forEach(mediaElement => mediaElement.remove());
            }
        });
        document.getElementById(participant.sid).remove();
	});

});
