import Pusher from "pusher-js";
import {useState} from "react";
import Nav from "./Nav";
import store from "../store/Store";

const Notification = () => {

  const [notify, setNotify] = useState([]);

	Pusher.logToConsole = true;

    var pusher = new Pusher('08a315f0306a89de6525', {
      cluster: 'ap2'
    });
    var name = 'my-channel';

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      // alert(JSON.stringify(data));
      setNotify([...notify,data]);
      console.log(JSON.stringify(data));
    });

    let listItems = [];
    for (var i = 0; i < notify.length; i++) {
      listItems.push(
        <li key={i}> {notify[i]}</li>
      )
    }

    return(
    	<>
	    	<h1>Pusher Test</h1>
	    	<p>
  				Try publishing an event to channel <code>my-channel</code>
  				with event name <code>my-event</code>.
  			</p>
        <ul style={{'float':'left'}} >{listItems}</ul>
		</>
    );
}

export default Notification;