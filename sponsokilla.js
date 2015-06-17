// ==UserScript==
// @name        SponsoKilla
// @namespace   By Dédé Lateur (@delateuranonyme)
// @description Enlève les tweets sponsorisés et autres trucs pénibles de Twitter
// @include     https://twitter.com/*
// @version     1.09
// @grant       none
// ==/UserScript==
// Sélectionnez ici les éléments à supprimer
var promoted=0; // tweets sponsorisés : 0 off, 1 on
var trends=0; // tendances 0 off, 1 on
var suggest=0; // suggestions
var videos=0; // videos (marche pas encore)

// Blacklist : enlève les tweets des pénibles. Une sorte de mute, en gros
// C'est un tableau, mettez donc le login du relou sans le @
// Ex: blacklist = ["penible1","cassebonbons2","troll","jpney"]

var blacklist = [];

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
	// alert("OUHLALA IL SE PASSE UN TRUC !!! Y'A QUELQU'UN QUI TOUCHE A MON BODY ! han le sale pervers !");
	var divs = document.getElementsByTagName('div');
	for (i = 0; i < divs.length; i++)
	{
		// tweets sponsos
		if(promoted==0)
		{
			if (divs[i].getAttribute('data-promoted'))
			{
				// alert("promoted "+i);
				divs[i].style.display = 'none';
				// divs[i].scrollIntoView();
				// divs[i].style = 'background-color: rgba(255, 0, 0, 0.5);'; // ça c'est si tu veux voir ce que je vais dégager
			}
		}
    
		// suppression des tendances (trends)
		if (trends == 0)
		{
			if (divs[i].className == 'Trends module trends')
			{
				// alert("trends "+i);
				divs[i].style.display = 'none';
			}
		}

		// suppression des suggestions
		if (suggest == 0)
		{
			if (divs[i].className == 'flex-module' || divs[i].className == 'flex-module import-prompt' || divs[i].className == 'WhoToFollow  is-visible')
			{
				
				divs[i].style.display = 'none';
			}
		}
		
		// Blacklist
		if(blacklist.indexOf(divs[i].getAttribute('data-screen-name'))!=-1)
		{
			console.log('Blocked '+divs[i].getAttribute('data-screen-name'));
			divs[i].style.display = 'none';
		}
		
	}
});
