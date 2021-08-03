import Pusher from "pusher-js";

const Notification = () => {
	Pusher.logToConsole = true;

    var pusher = new Pusher('08a315f0306a89de6525', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('my-channel');
    console.log(channel);
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });

    return(
    	<>
	    	<h1>Pusher Test</h1>
	    	<p>
				Try publishing an event to channel <code>my-channel</code>
				with event name <code>my-event</code>.
			</p>
		</>
    );
}

export default Notification;