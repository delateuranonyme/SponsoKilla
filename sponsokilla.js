// ==UserScript==
// @name        SponsoKilla
// @namespace   By Dédé Lateur (@delateuranonyme)
// @description Removes promoted tweets and other annoying things on twitter.com
// @include     https://twitter.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

// Use SponsoKilla at your own risks. No refund (because it's free, like a free beer, and free, as in GPL v2)
// Contains code taken from stackoverflow, but sorry, I didn't keep the url :(
// Please note that you have to wait until SOMETHING happens to the document.body. I can't figure out why onClick doesn't work on the checkboxes for now (maybe the mutationobserver ?)
// This is lame code, feel free to modify it and distribute it (remember it's GPLv2...)
// And now, enjoy !       Dédé

// Default
var promoted=0; // 0 remove promoted tweets (so checkbox is CHECKED), 1 display them
var trends=0; // trends
var suggest=0; // suggestions
var list=0; // blacklist (0 remove tweets from blacklisted users, so checkbox is CHECKED, as for other settings, 1 display tweets (even from blacklisted users)) 

// Blacklist : remove tweets from annoying users.
// It's an array, so add user names between double quotes, without the @
// i.e: var blacklist = ["boring1","annoying2","troll","jpney"];
// you can leave it empty : var blacklist=[];
var blacklist = [];

// lg (language): check the 'menu' array below for available languages (en, fr...). You can add as many languages as you wish.
var lg='fr';
var menu=[];
menu['en']=["Promoted tweets","Trends","Suggestions","Blacklist"];
menu['fr']=["Tweets sponsoris&eacute;s","Tendances","Suggestions","Liste noire"];


// DO NOT CHANGE ANYTHING HERE
var status = [];
status[0]='block';
status[1]='none';

var checked=["checked",""];


// You can play with CSS attributes to make it better looking
var skDivCommonStyle = 'position: fixed;bottom: 25px;left: -100px;border: 0px;width:auto;height:auto;opacity:0.3;background:#ffa;border-radius: 0px 15px 15px 0px;display:block;font-size:10px;box-shadow: 5px 12px 12px 2px rgba(0,0,0,0.5);background-repeat: no-repeat;background-attachment: fixed;background-position: center;transition: all 0.5s linear;';


// menu div
var skDiv = document.createElement('div');
skDiv.id = 'skDiv';
skDiv.style.cssText = skDivCommonStyle;
skDiv.innerHTML = '<div style="color:white;font-size:12px;border-radius: 0px 15px 0px 0px;font-weight:bold;padding:2px;background: linear-gradient(to bottom, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C */;width:auto;padding:4px;position:relative;top: 0px;left:0px;text-align:center;"><span style="">SponsoKilla</span></div>';
skDiv.onmouseover=function(){skDiv.style.opacity='0.9';skDiv.style.left='0px';skDiv.style.backgroundColor='#fff';};
skDiv.onmouseout=function(){skDiv.style.opacity='0.3';skDiv.style.left='-100px';skDiv.style.backgroundColor='#ffa';};

var skDivIn =document.createElement('div');
skDivIn.id = 'skDivIn';
skDivIn.style.cssText = 'padding:10px;vertical-align:top;';
skDivIn.innerHTML = '<input type="checkbox" id="sk_promo" name="sk_promo" onClick="sk_cleanup();" '+checked[promoted]+'> '+menu[lg][0]+'</input><br><input type="checkbox" id="sk_trends" name="sk_trends" onclick="sk_cleanup();" '+checked[trends]+'> '+menu[lg][1]+'</input><br><input type="checkbox" id="sk_suggest" name="sk_suggest" onClick="sk_cleanup();" '+checked[suggest]+'> '+menu[lg][2]+'<br><input type="checkbox" id="sk_blacklist" name="sk_blacklist" onClick="sk_cleanup();" '+checked[list]+'> '+menu[lg][3]+'<br>';

document.getElementById('page-outer').appendChild(skDiv);
document.getElementById('skDiv').appendChild(skDivIn);

// et c'est parti mon kiki
var observeDOM = (function () {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
	eventListenerSupported = window.addEventListener;

	return function (obj, callback) {
		// alert("Yé souis prêt moun Dédé !");
		console.log('Sponsokilla by Dede Lateur is ready to kick ass (and chew bubblegum) !'); /* ouais ben ça, ça marche pas trop du tout */
		if (MutationObserver)
		{
		// on crée un nouveau MO
		var obs = new MutationObserver(function (mutations, observer) {
		if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
		{
		callback();
		}

		});
		// le MO va regarder les obj enfants
		obs.observe(obj, {childList: true, subtree: true});
		}
		else if (eventListenerSupported)
		{
		obj.addEventListener('DOMNodeInserted', callback, false);
		obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	}
}) ();
// Ensuite on se colle au body
observeDOM(document.body, function () {
	sk_cleanup();
});

function sk_cleanup()
{
	if(document.getElementById('sk_promo').checked==true)
		{
			promoted=1;
		}
	else
		{
			promoted=0;
		}
	
	if(document.getElementById('sk_trends').checked==true)
		{
			trends=1;
		}
	else
		{
			trends=0;
		}
	
		if(document.getElementById('sk_suggest').checked==true)
		{
			suggest=1;
		}
	else
		{
			suggest=0;
		}
	
		if(document.getElementById('sk_blacklist').checked==true)
		{
			list=1;
		}
	else
		{
			list=0;
		}
	
	// the main killer
	var divs = document.getElementsByTagName('div');
	for (i = 0; i < divs.length; i++)
	{
		// promoted tweets
		if (divs[i].getAttribute('data-promoted'))
			{
				divs[i].style.display = status[promoted];
				// if you don't want to hide promoted tweets but see them (they'll appear in some sort of pink), just uncomment the two following lines, and comment the previous line 
				// divs[i].scrollIntoView();
				// divs[i].style = 'background-color: rgba(255, 0, 0, 0.5);';
			}

		// trends

			if (divs[i].className == 'Trends module trends')
			{
				// alert("trends "+i);
				divs[i].style.display = status[trends];
			}

		// suggestions

			if (divs[i].className == 'flex-module' || divs[i].className == 'flex-module import-prompt' || divs[i].className == 'WhoToFollow  is-visible')
			{
				
				divs[i].style.display = status[suggest];
			}

		
		// Blacklist

		if(blacklist.indexOf(divs[i].getAttribute('data-screen-name'))!=-1)
		{
				divs[i].style.display = status[list];
		}
	}
	// attempt to force a redraw, but it doesn't work
	document.body.trigger('resize');
}
