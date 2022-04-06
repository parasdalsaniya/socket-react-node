import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const FeedSection = () => {


	const socket = io("ws://localhost:9000");

	socket.on('latest_quakes', data => {
	  if (data) {
	  	console.log(data);
	  }
	});

  	return (
	    <section id='section-feed'>
	    	<h1>Feed</h1>
	    </section>
  	);
}

export default FeedSection;