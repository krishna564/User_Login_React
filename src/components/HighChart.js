import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {Redirect} from "react-router-dom";

function Charts(props) {
 	const options = {
	  chart: {
	    type: 'pie'
	  },
	  title: {
	    text: 'Performance'
	  },
	  credits: {
	  	enabled: false,
	  },
	  series: [
	    {
	      data: [
	      	{
	      		name:'Completed',
	      		y:props.completed,
	      	},
	      	{
	      		name:'In Progress',
	      		y: props.in_progress
	      	},
	      	{
	      		name:'Over Due',
	      		y: props.over_due
	      	},
	      	{
	      		name:'No action',
	      		y: props.assigned
	      	},
	      ]
	    }
	  ]
	};

	const taskRedirect = () => {
		console.log("Redirect");
		<Redirect to="/atasks" />;
	}

	return(
		<div className="highcharts" onClick={taskRedirect} >
			<div>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</div>
		</div>
	);
 } 

 export default Charts;