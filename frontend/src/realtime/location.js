import io from 'socket.io-client';

let locationSocket = null;

export const trackPosition = (user_id) => {
  if (navigator.geolocation) {
    const socketIoUrl = `${window.location.origin}`;
    locationSocket = io.connect(`${socketIoUrl}/location`, {
      path: `${process.env.PUBLIC_URL}/api/socket.io`,
    });
    locationSocket.emit('subscribe', { user_id });
    const successCallback = ({ coords }) => {
      const { latitude, longitude } = coords;
      console.log({ latitude, longitude });
      locationSocket.emit('new_position', {
        user_id,
        position: {
          lat: latitude,
          lng: longitude,
        },
      });
    };
    const errorCallback = (error) => {
      alert('Error !');
    };
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy: true,
      },
    );
    return () => {
      locationSocket.emit('unsubscribe', { user_id });
      navigator.geolocation.clearWatch(watchId);
      return locationSocket.removeAllListeners();
    };
  } else {
    alert('Geolocation API not supported, use a different browser !');
  }
};
