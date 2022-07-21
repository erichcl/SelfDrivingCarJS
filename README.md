# SelfDrivingCarJS

Self driving car with plain JS

I've followed this tutorial on youtube:
https://www.youtube.com/watch?v=Rs_rAxEsAvI

Uses html5 canvas to render everything, from the 'cars' to the road.
The sensors in front of the car detects the proximity with both NPCs cars and the edge of the road and developed collision detection to check if the car crashed or not.

Using a simple neural network it should learn to dodge the cars in front of it and follow the road.

Currently the traffic cars (NPCs) is fixed and the only validation on which car is best is who moved vertically the longest way ( y axis is the smallest).

To execute it, just download the code and open the index.html on the browser.
