# SponsoKilla
A Greasemonkey module to get rid of those annoying things like promoted tweets, trends or suggestions on twitter.com

This thing is probably the worst piece of code you'll ever see BUT it works, yeeeha !

INSTALL INSTRUCTIONS 
1) download and install GreaseMonkey from Firefox
2) download sponsokilla.user.js
3) edit sponsokilla.js, and tweak it a bit :

var promoted=0; // promoted tweets : 0 off, 1 on (off means that SK won't show promoted tweets)
var trends=0; // trends 0 off, 1 on
var suggest=0; // suggestions

var blacklist=["putnamehere","putanothernamehere"];

blacklist is an array. Specify the Twitter usernames (without the @) you don't want to see anymore (yeah, that's similar to mute)

4) save it
5) open Firefox, click on the Greasemonkey icon (the monkey), select Manage scripts.
6) click the "gear" icon on the top of the screen then "Install module from file" (or something like this)
7) browse and open sponsokilla.js
8) open a new tab, and enjoy Twitter !

See ya,
@delateuranonyme
