$(function(){
	
	setInterval(function(){
		let w = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		// console.log(height);
		$('.box').css({'height': h +'px','width':'100%'})
	},1)
	
	


	
});	