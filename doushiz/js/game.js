$(function(){
	// 零、初始化系统中必要的数据
	let all_poker = [];      // 代表总牌组的数据
	/*let player1={nane:'小明' , integral:1000 , role:0 , poker:[]}  // 玩家1数据
	let player2={nane:'小红' , integral:1000 , role:0 , poker:[]}  // 玩家2数据
	let player3={nane:'小紫' , integral:1000 , role:0 , poker:[]}  // 玩家3数据*/
	let ss;  //保存抢地主的计时器
	let sss;  //保存出牌的计时器
	let feng ;

	let player = [
		{name:'小明', integral:1000, poker:[], role: 0},
		{name:'小红', integral:1000, poker:[], role: 0},
		{name:'小紫', integral:1000, poker:[], role: 0}
	]

	// 用于保存当前游戏具体情况的数据
	let game = {
		boss:null,		// 当前游戏的地主角色
		select_poker:{
			poker:[],		// 选中牌组的具体数组数据
			type:0,			// 选中牌组的牌型
			max: 0 			// 牌型中的对比值
		},	// 当前玩家选择中选择牌组数据
		desktop_poker:{
			poker:[],		// 桌面牌组的具体数组数据
			type:0,			// 桌面牌组的牌型
			max: 0 			// 牌型中的对比值
		},	// 当前桌面上的牌组数据

	}
	//一、生成初始牌堆
	let poker_str ='';
	for(let i=0; i<54; i++){
		poker_str += '<li class="back" style="top:-'+i*0.5+'px;"></li>';
	}
	$('.all_poker').append(poker_str);


	for(let i=1 ; i<=13;i++){
		for(let j=0; j<4; j++){
			all_poker.push({num:i ,color:j})
		}
	}
	all_poker.push({num:14 ,color:0})
	all_poker.push({num:14 ,color:1})

	// console.log(all_poker);


	//绑定洗牌事件
	$('#riffle').click(function(){
		$('#riffle').css({display:'none'})
		clearPoker();
	})

	//绑定发牌事件
	$('#deal').click(function(){
		$('#deal').css({display:'none'})

		deal();
	})



	//封装洗牌函数
	function clearPoker(){
		//0 把牌组数据进行打乱
		for(let i=0; i<3; i++){
			all_poker.sort(function(x,y){
				return Math.random()-0.5;
			})
		}
			// console.log(all_poker)	

		//开始洗牌
		//1.1、保存原牌组
		let $all =$('.all_poker');
		//1.2、删除原牌组
		$('.all_poker').remove();
		//2、生成三个新的临时牌堆用于洗牌动画
		let temp_html ='';
		for(let i=0; i<54;i++){
			temp_html +='<ul class="all_poker" style="top:-'+i*1+'px" >';
			temp_html += '<li class="back" style="top:-0px;"></li> ';
			temp_html +='</ul>';
		}
		$('.mid_top').append(temp_html);

		//3、开始动画
		
		for(let i=0;i<54 ; i++){
			if(i % 4 == 0){
				$('.all_poker').eq(i).animate({top:-1*i + 7000+'px'},1000).animate({top:-1*i +'px'},500);
			}else if(i % 4 == 1){
				$('.all_poker').eq(i).animate({top:-1*i + 7000+'px',left:'-50px'},1000).animate({top:-1*i +'px',left:'0px'},500);
			}else if(i % 4 == 2){
				$('.all_poker').eq(i).animate({top:-1*i + 7000+'px',left:'50px'},1000).animate({top:-1*i +'px',left:'0px'},500);
			}else if(i % 4 == 3){
				$('.all_poker').eq(i).animate({top:-1*i + 7000+'px'},1000).animate({top:-1*i +'px'},500);
			}
		}
		
		for(let i=0;i<54 ; i++){
			if(i % 4 == 0){
					$('.all_poker').eq(i).css({'transform':'rotateZ('+720*i+'deg)','transition':'3s'}).css({'width':'500px','marginLeft':'400px'},500);
				}else if(i % 4 == 1){ 
					$('.all_poker').eq(i).css({'transform':'rotateZ('+720*i+'deg)','transition':'3s'}).css({'width':'500px','marginLeft':'400px'},500);
				}else if(i % 4 == 2){ 
					$('.all_poker').eq(i).css({'transform':'rotateZ('+720*i+'deg)','transition':'3s'}).css({'width':'500px','marginLeft':'400px'},500);
				}else if(i % 4 == 3){ 
					$('.all_poker').eq(i).css({'transform':'rotateZ('+720*i+'deg)','transition':'3s'}).css({'width':'500px','marginLeft':'400px'},500);
				}
		}
		setTimeout(function(){
			for(let i=0;i<54 ; i++){
				if(i % 4 == 0){
					$('.all_poker').eq(i).animate({top:-1*i + 100+'px',left:'-500px'},1500);
				}else if(i % 4 == 1){
					$('.all_poker').eq(i).animate({top:-1*i + 800+'px',left:'500px'},1500);
				}else if(i % 4 == 2){
					$('.all_poker').eq(i).animate({top:-1*i + 800+'px',left:'-500px'},1500);
				}else if(i % 4 == 3){
					$('.all_poker').eq(i).animate({top:-1*i + 100+'px',left:'500px'},1500);
				}
			}
		},3000)

		setTimeout(function(){
			for(let i=0;i<54 ; i++){
				if(i % 4 == 0){
					setTimeout(function(){
						$('.all_poker').eq(i).animate({left:'0px'},10);
					},100*i);
				}else if(i % 4 == 1){
					setTimeout(function(){
						$('.all_poker').eq(i).animate({top:-1*i + 800+'px',left:'0px'},10);
					},100*i);
				}else if(i % 4 == 2){
					setTimeout(function(){
						$('.all_poker').eq(i).animate({top:-1*i + 400+'px',left:'-500px'},10);
					},100*i);
				}else if(i % 4 == 3){
					setTimeout(function(){
						$('.all_poker').eq(i).animate({top:-1*i+400+'px',left:'500px'},10);
					},100*i);
				}
			}
		},6000)
		setTimeout(function(){
			for(let i=0;i<54 ; i++){
				if(i % 4 == 0){
					setTimeout(function(){
					$('.all_poker').eq(i).animate({top:-1*i+400+'px',left:'0px'},20);
					},200*i);
				}else if(i % 4 == 1){
					setTimeout(function(){
					$('.all_poker').eq(i).animate({top:-1*i + 400+'px',left:'0px'},20);
					},200*i);
				}else if(i % 4 == 2){
					setTimeout(function(){
					$('.all_poker').eq(i).animate({top:-1*i + 400+'px',left:'0px'},20);
					},200*i);
				}else if(i % 4 == 3){
					setTimeout(function(){
					$('.all_poker').eq(i).animate({top:-1*i + 400+'px',left:'0px'},20);
					},200*i);
				}
			}
		},6000)

		setTimeout(function(){
			//4、删除三组临时牌堆
			$('.all_poker').remove();
			//5、恢复原来牌组
			$('.mid_top').html($all);

			$('#deal').css({display:'block'})
		},19500);
	}


	// 封装发牌函数
	
	function deal(num){
		num = num || 0;
		let poker_html ='';
		if(num <17){
			// 发牌给左边玩家
			$('.all_poker li:last').animate({left:'-500',top:'300px'},30);
			setTimeout(function(){
				player[0].poker.push(all_poker.pop()); // 把总牌组数据中的最后个元素添加到玩家1，并且删除
				poker_html =makePoker(player[0].poker[player[0].poker.length-1]);
				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({'transform':'rotateZ(90deg)','top':num*20+'px'});
				$('.play_1').css({top:-10*num+400 +'px'});
				$('.all_poker li:last').remove();
			},22);

			//发牌给中间玩家
			setTimeout(function(){
				$('.all_poker li:last').animate({top:'600px'},30);
				setTimeout(function(){
					player[1].poker.push(all_poker.pop()); // 把总牌组数据中的最后个元素添加到玩家2，并且删除
					poker_html =makePoker(player[1].poker[player[1].poker.length-1]);
					$('.play_2').append(poker_html);
					$('.play_2 li:last').css({left:num*20+'px'});
					$('.play_2').css({left:-10*num+'px'});
					// console.log(poker_html);
					$('.all_poker li:last').remove();
				},22);
			},24);
		
			//发牌给右边玩家
			setTimeout(function(){
				$('.all_poker li:last').animate({left:'500px',top:'300px'},30);
				setTimeout(function(){
					player[2].poker.push(all_poker.pop()); // 把总牌组数据中的最后个元素添加到玩家3，并且删除
					poker_html =makePoker(player[2].poker[player[2].poker.length-1]);
					$('.play_3').append(poker_html);
					$('.play_3 li:last').css({'transform':'rotateZ(-90deg)','top':-num*20+'px'});
					$('.play_3').css({top:10*num+400 +'px' });
					$('.all_poker li:last').remove();
					deal(num+1)
				},32);
			},48);	
		}else{
			setTimeout(function(){
				all_play_sort()
			},100)
		}
		
	} 

	//生成牌面HTML代码的函数
	
	function makePoker( poker_data){
		let color_arr =[
			[-17,-225],
			[-17,-5],
			[-160,-5],
			[-160,-225]
		]
		let x,y;
		// 判断是否为大小王
		if(poker_data.num<14){
			// 生成本牌花色坐标
			x =color_arr[poker_data.color][0];
			y =color_arr[poker_data.color][1];
		}else{
			if(poker_data.color ==0){
				x = -160;
				y= -5;
			}else{
				x = -17;
				y = -5;
			}
		}
		poker_html = '<li style="width: 125px; height: 175px; background: url(./images/'+poker_data.num+'.png) '+x+'px '+y+'px;" data-num="'+poker_data.num+'" data-color="'+poker_data.color+'"></li>';

		return poker_html;
	}

	// 发牌完成后所有玩家的牌进行排序
	
	function all_play_sort(){
		// 调用牌组排序方法让玩家的手牌数据进行排序
		pokerSort(player[0].poker);
		pokerSort(player[1].poker);
		pokerSort(player[2].poker);

		// 使用动画效果让牌组看起进行了自动排序
		$('.play_2 li').remove();
		$('.play_1 li').remove();
		$('.play_3 li').remove();
		for(let i=0;i<17;i++){
			$('.play_2').append('<li class="back"></li>');
			$('.play_2 li:last').css({left:20*i+'px'});

			$('.play_1').append('<li class="back"></li>');
			$('.play_1 li:last').css({top:20*i+'px',transform:'rotateZ(90deg)'});

			$('.play_3').append('<li class="back"></li>');
			$('.play_3 li:last').css({top:-20*i+'px',transform:'rotateZ(-90deg)'});

		}
		let poker_html='';
		setTimeout(function(){
			$('.play_2 li').remove();
			$('.play_1 li').remove();
			$('.play_3 li').remove();
			for(let i=0; i<17;i++){
				poker_html=makePoker(player[1].poker[i]);
				$('.play_2').append(poker_html);
				$('.play_2 li:last').css({left:20*i+'px'});

				poker_html=makePoker(player[0].poker[i]);
				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({top:20*i+'px',transform:'rotateZ(90deg)'});

				poker_html=makePoker(player[2].poker[i]);
				$('.play_3').append(poker_html);
				$('.play_3 li:last').css({top:-20*i+'px',transform:'rotateZ(-90deg)'});
			}

			getBoss();
		},500);
	} 
	
	function pokerSort(poker_arr){
		poker_arr.sort(function(x,y){
			if(x.num != y.num){
				return y.num -x.num;
			}else{
				return y.color -x.color;
			}
		});
	}

	//抢地主函数
	function getBoss(get_play,cancelNum){

		// let getPlay = Math.floor(Math.random()*3);
		if(cancelNum === undefined){
			cancelNum = 0;
		}
		// console.log(cancelNum);

		if(get_play === undefined){
			get_play = Math.floor(Math.random()*3);
		}
		countDown(get_play,cancelNum)//抢地主调用倒计时函数
		// console.log(get_play);
		// 把对应的玩家抢地主的按钮显示
		$('.play_btn').eq(get_play).css({'display':'block'});

		//绑定抢地主事件
		$('.play_btn').eq(get_play).on('click','.get',function(){
			// alert('抢')
			$('#keyplay').attr('src','./media/audio/抢地主.mp3')  //抢地主音频
			clearInterval(ss);//停止抢地主倒计时
			$('.time').eq(get_play).css({display:'none'})// 隐藏计时器
			$('.pass').eq(get_play).attr('disabled', true);// 禁掉地主的pass按钮
			$('.pass').eq(get_play).css('background', '#ccc');
			$('.Head_portrait').css({'background-image':'url(./images/农民.png)'});
			$('.Head_portrait').eq(get_play).css({'background-image':'url(./images/地主.png)'});


			// 隐藏当前的按钮组
			$('.play_btn').css({'display':'none'});
			player[get_play].role=1; //设置玩家为地主角色

			// 地主牌开牌动画
			poker_html ='';
			$('.all_poker li').remove();// 删除（表面）发剩的牌
			//把最后三张牌的数据发给地主角色玩家
			for(let i=0; i<all_poker.length; i++){
				poker_html =makePoker(all_poker[i]);
				//地主牌生成
				$('.all_poker').append(poker_html);

				//地主牌放入玩家牌组
				$('.play').eq(get_play).append(poker_html);
				//中间玩家放牌的方式
				if(get_play ==1){
					$('.play').eq(get_play).find('li:last').css({left:(17+i)*20+'px'});

				}else{//两边玩家放牌的方式
						if(get_play == 0){
							$('.play').eq(get_play).find('li:last').css({top:(17+i)*20+'px',transform:'rotateZ(90deg)'});
						}else{
							$('.play').eq(get_play).find('li:last').css({top:-(17+i)*20+'px',transform:'rotateZ(-90deg)'});
						}

				}
			
				//把总牌组中的最后三张牌数据添加到地主玩家数据中
				player[get_play].poker.push(all_poker[i]);
			}

			$('.all_poker li').eq(0).animate({left:'0px'},500).animate({top:'-30px'},200);
			$('.all_poker li').eq(1).animate({left:'-200px'},500).animate({top:'-30px'},200);
			$('.all_poker li').eq(2).animate({left:'200px'},500).animate({top:'-30px'},200);

			//地主玩家牌重新排序
			setTimeout(function(){
				//删除原牌组
				$('.play').eq(get_play).find('li').remove();
				//生成背面的牌组
				$('.play').eq(get_play).append('<li class="back"></li>');

		
				switch(get_play){
					case 0:
						//生成背面的牌组
						for(let i=0;i<20;i++){
							$('.play').eq(get_play).find('li:last').css({ top:20*i+'px',transform:'rotateZ(90deg)'});
							$('.play').eq(get_play).css({top:-10*i+400+'px'});
						}
						setTimeout(function(){
							//地主牌数据重新排序
							pokerSort(player[get_play].poker);
							//删除原牌组
							$('.play').eq(get_play).find('li').remove();
							let poker_html='';
							for(let i=0;i<player[get_play].poker.length;i++){
								poker_html =makePoker(player[get_play].poker[i]);
								$('.play').eq(get_play).append(poker_html);
								$('.play').eq(get_play).find('li:last').css({top:20*i+'px',transform:'rotateZ(90deg)'});
								$('.play').eq(get_play).css({top:-10*i+400+'px'});
								// 开始出牌阶段
								
							}
							playPoker(get_play, 0);
						},200)

					break;
					case 1:
						//生成背面的牌组
						for(let i=0;i<20;i++){
							$('.play').eq(get_play).find('li:last').css({ left:20*i+'px'});
							$('.play').eq(get_play).css({left:-10*i+'px'});
						}
						setTimeout(function(){
							//地主牌数据重新排序
							pokerSort(player[get_play].poker);
							//删除原牌组
							$('.play').eq(get_play).find('li').remove();
							let poker_html='';
							for(let i=0;i<player[get_play].poker.length;i++){
								poker_html =makePoker(player[get_play].poker[i]);
								$('.play').eq(get_play).append(poker_html);
								$('.play').eq(get_play).find('li:last').css({left:20*i+'px'});
								$('.play').eq(get_play).css({left:-10*i+'px'});
								// 开始出牌阶段
								
							}
							playPoker(get_play, 0);
						},200)
					break;
					case 2:
						//生成背面的牌组
						for(let i=0;i<20;i++){
							$('.play').eq(get_play).find('li:last').css({ top:-20*i+'px',transform:'rotateZ(-90deg)'});
							$('.play').eq(get_play).css({top:10*i+400+'px'});
						}
						setTimeout(function(){
							//地主牌数据重新排序
							pokerSort(player[get_play].poker);
							//删除原牌组
							$('.play').eq(get_play).find('li').remove();
							let poker_html='';
							for(let i=0;i<player[get_play].poker.length;i++){
								poker_html =makePoker(player[get_play].poker[i]);
								$('.play').eq(get_play).append(poker_html);
								$('.play').eq(get_play).find('li:last').css({top:-20*i+'px',transform:'rotateZ(-90deg)'});
								$('.play').eq(get_play).css({top:10*i+400+'px'});
								// 开始出牌阶段
							}
							playPoker(get_play, 0);

						},200)
					break;
				}
				
			},600)
		})

		//绑定不抢地主事件
		$('.play_btn').eq(get_play).on('click','.cancel',function(){
			// alert('不抢')
			$('#keyplay').attr('src','./media/audio/不抢地主.mp3')
			 
			clearInterval(ss);
			$('.time').eq(get_play).css({display:'none'})
			cancelNum++;
			if(cancelNum ==3){
				pointOut('没有玩家抢地主，本局流局！');
				setTimeout(function(){
					window.location.href =window.location.href;
				},800)
				
			}
			// 隐藏当前的按钮组
			$('.play_btn').css({'display':'none'});

			//移除本按钮组绑定的事件，防止重复绑定
			$('.play_btn').eq(get_play).find('.get').off('click');
			$('.play_btn').eq(get_play).find('.cancel').off('click');

			get_play = ++get_play > 2 ? 0 : get_play;
			getBoss(get_play,cancelNum);
		})

	}
	//封装抢地主倒计时函数------------------------------------------------------------------------------------------
	function countDown(get_play ,cancelNum){
		let s = 10;
		// console.log(cancelNum);
		$('.time').eq(get_play).css({display:'block'}).text(s)
		ss = setInterval(function(){
		    	$('.time').eq(get_play).text(s--)
		    if( s <= -2 ){
				clearInterval(ss);
				$('.time').eq(get_play).css({display:'none'})
				cancelNum++;
				if(cancelNum == 3){
					pointOut('没有玩家抢地主，本局流局！');
					setTimeout(function(){
						window.location.href =window.location.href;
					},800)
				}
				// console.log(cancelNum);
				$('.play_btn').eq(get_play).find('.cancel').click();
			}
   		 },500)	
		
	}
	//封装出牌倒计时函数
	function countDown2(get_play ,cancelNum){
		let s = 20;
		// console.log(cancelNum);
		$('.time').eq(get_play).css({display:'block'}).text(s)
		sss = setInterval(function(){
		    	$('.time').eq(get_play).text(s--)
		    	if(s <= -2){				
						clearInterval(sss);
		    			$('.time').eq(get_play).css({display:'none'})
		    			// $('.play_btn2').eq(get_play).find('.pass').click();

		 				 $('.play_btn2').eq(get_play ).find('.tips').click();
		    			console.log(game.select_poker.poker.length);	    			
						if(game.select_poker.poker.length != 0 ){
							console.log(game.select_poker.poker.length);
							$('.play_btn2').eq(get_play ).find('.play_out').click();
						}else{
							 $('.play_btn2').eq(get_play).find('.pass').click();
						}


		    	}
		    },2000)

	}

	//出牌阶段
	function playPoker(index, cancelNum ){
		//0、初始化所有页面元素与事件
		$('.play_btn2').css({'display':'none'});
		//解绑选派事件
		$('.play').off('click','li')
		//解绑出牌事件
	
		$('.play_btn2').off('click','.play_out');
		//解绑过牌事件
		$('.play_btn2').off('click','.pass');

		//解绑提示事件
		$('.play_btn2').off('click','.tips');

		// 1、先让出牌玩家对应的按钮组显示
		$('.play_btn2').eq(index).css({'display':'block'});

		countDown2(index ,cancelNum)// 调用出牌倒计时
		// 2、绑定选牌事件
		$('.play').eq(index).on('click', 'li', function(){
			let poker = {};
			poker.num = $(this).attr('data-num');
			poker.color = $(this).attr('data-color');
			// console.log(111);

			if($(this).attr('class') == 'select'){
				// 删除玩家选中牌组的数据
				
				$(this).removeClass('select');
				// 调用删除对应牌的数据方法
				delSelect(poker);
			}else{
				// 添加玩家选中的牌到牌组数据
				game.select_poker.poker.push(poker);
				// console.log(game.select_poker.poker);
				$(this).addClass('select');
			}

		});

		// 3、绑定出牌事件 
		$('.play_btn2').eq(index).on('click', '.play_out', function(){
			// alert('出牌');
			// 调用检查牌型方法
			checkPoker(game.select_poker);
			if(game.select_poker.type == 0){
				pointOut('对不起，您出的牌不符合规则');
				setTimeout(function(){
					$('.pointOut').remove();
				},800)
			}else{
				// 调用选中牌与桌面牌组进行对比的函数
				if(vsPoker()){
					$('.time').eq(index).css({display:'none'})
					clearInterval(sss);
					cancelNum =0;//重置过牌次数
					let  type = game.select_poker.type*1;
					let  num =game.select_poker.max*1;
					// console.log(game.select_poker.max);
					$('.pass').attr('disabled', false);//解开pass按钮的封印
					$('.pass').css('background', 'orange');
					playCardSound(type,num); // 调用出的音频
					// 1、删除玩家手牌的数据
					delPlayerPoker(index);
					game.desktop_poker.type = game.select_poker.type;
					game.desktop_poker.max = game.select_poker.max;
					//将选择手牌数据转移到桌面中
					// 执行对应的桌面面效果，桌面出现新牌，玩家手牌消失
					game.desktop_poker.poker.splice(0);
					$('.desktop li').remove();

					let select_li = game.select_poker.poker.length;
					for(let i = 0; i < select_li; i++) {
						game.desktop_poker.poker.push(game.select_poker.poker.pop());
						poker_data = game.desktop_poker.poker[i];
						poker_html = makePoker(poker_data);
						$('.desktop').append(poker_html);
						$('.desktop li:last').css('left', i * 30 + 'px');
						$('.desktop').css('left', -i * 15 + 'px');
					}
					// console.log(game.desktop_poker.poker);
					//判断剩一张或两张
					if(player[index].poker.length == 1){
						$('#keyplay').attr('src','./media/audio/只剩一张.mp3')
					}else if(player[index].poker.length == 2){
						$('#keyplay').attr('src','./media/audio/只剩2张.mp3')
					}
					
					// 2、先判断是否已经胜出
					if(player[index].poker.length == 0){
						setTimeout(function(){
							// pointOut('你赢了！');
							integration(index);
						},500)
							
					}else{// 3、准备让下一个玩家出牌
						index = ++index > 2? 0: index;
						setTimeout(function(){
							playPoker(index, cancelNum);
							feng = 0
						},feng);
							
						
					}

				} else{
					pointOut('对不起，您出的牌不符合规则');
					setTimeout(function(){
						$('.pointOut').remove();
					},800)
				}

			}
			

		});

		// 3、绑定过牌事件
		$('.play_btn2').eq(index).on('click', '.pass', function(){
			// alert('过');
			$('.time').eq(index).css({display:'none'})
			clearInterval(sss);
			$('#keyplay').attr('src','./media/audio/pass.mp3');//过牌音频
			game.select_poker.poker=[];
			$('.play li').removeClass('select')
			index = ++index > 2 ? 0 : index;
			cancelNum++;
			// console.log(cancelNum);
			if(cancelNum== 2){
				$('.pass').attr('disabled', true); //封印pass按钮
				$('.pass').css('background','#ccc')
				//1、清空桌面牌型数据
				game.desktop_poker.type =0;
				game.desktop_poker.max =0;
				game.desktop_poker.poker=[];
				//2、重置过牌次数
				cancelNum =0;


			}

			playPoker(index,cancelNum);
		});

		//绑定提示事件----------------------------------------------------------------------------------------------
		$('.play_btn2').eq(index).on('click', '.tips', function(){
			promptPoker(index);
			// console.log(index);
		});
	}
	// 删除选中牌组中的指定牌方法
	function delSelect(poker){
		let index = null;
		for(let i=0; i<game.select_poker.poker.length; i++){
			if(game.select_poker.poker[i].num == poker.num && game.select_poker.poker[i].color == poker.color){
				index = i;
				break;
			}
		}
		game.select_poker.poker.splice(index, 1);
		console.log(game.select_poker.poker);
	}
	
	/**
	 * 检查牌型的方法
	 * @param  object poker_data 需要检查牌型的数据对象
	 * @return {[type]}            [description]
	 *
	 * 牌型代号：
	 * 0：无效
	 * 1：单张
	 * 2：对子
	 * 3：三张
	 * 4：三带一
	 * 5：三带二
	 * 7：四带二
	 * 6: 顺子
	 * 8：连对
	 * 9：双飞机带单
	 * 10：双飞机带双
	 * 12：三飞机带单
	 * 15：三飞机带双
	 * 16：四飞机带单
	 * 19：四飞机带双
	 * 20：五飞机带单
	 * 911：普通炸弹
	 * 110：王炸
	 */

	function checkPoker(poker_data){
		// 初始化牌型与判断值
		poker_data.type = 0;
		poker_data.max = 0;

		let poker = poker_data.poker;
		// 1、 为了方便牌型的判断，需要先把选中的牌进行排序
		pokerSort(poker_data.poker);

		// 2、通过牌的张数来行各牌的判断
		switch(poker.length){
			// 判断1张牌的情况
			case 1:
				poker_data.type = 1;		// 设置牌型为单张

				// 判断普通单张的判断值
				if(poker[0].num < 14){
					poker_data.max = poker[0].num;
				}else{
					// 判断大小王
					if(poker[0].color == 0){
						poker_data.max = 14;	// 小王的判断值
					}else{
						poker_data.max = 15;	// 大王的判断值
					}
				}
			break;
			// 判断两张牌的情况
			case 2:
				// 判断两张牌的点数是否一样
				if(poker[0].num == poker[1].num){
					// 是否是普通对子还是王炸
					if(poker[0].num < 14){
						poker_data.type = 2;		// 设置牌型为对子
						poker_data.max = poker[0].num;
					}else{
						poker_data.type = 110;		// 设置牌型为王炸
						poker_data.max = poker[0].num;
					}
				}
			break;
			// 判断三张牌的情况
			case 3:
				// 判断三张牌的点数是否相等
				if(poker[0].num == poker[2].num){
					poker_data.type = 3;		// 设置牌型为三张
					poker_data.max = poker[0].num;	// 判断值
				}
			break;
			// 判断四张牌的情况
			case 4:
				// 判断四张牌的点数是否相等
				if(poker[0].num == poker[3].num){
					poker_data.type = 911;		// 设置牌型为普通炸弹
					poker_data.max = poker[0].num;	// 判断值
				}else if(poker[0].num == poker[2].num || poker[1].num == poker[3].num ){
					poker_data.type = 4;		// 设置牌型为三带一
					poker_data.max = poker[1].num;	// 判断值
				}
			break;
			// 判断五张牌的情况
			case 5:
				// 判断三带二
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num || poker[0].num == poker[1].num && poker[2].num == poker[4].num){
					poker_data.type = 5;		// 设置牌型为三带二
					poker_data.max = poker[2].num;	// 判断值
				}else if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;
			// 判断六张牌的情况
			case 6:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(poker[0].num == poker[3].num || poker[1].num == poker[4].num || poker[2].num == poker[5].num){		// 判断四带二
					poker_data.type = 7;		// 四带二
					poker_data.max = poker[4].num;	// 判断值
				}
			break;

			// 判断七张牌的情况
			case 7:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			// 判断八张牌的情况
			case 8:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightFull(poker)){
					poker_data.type = 9;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);	// 判断值
				}
				// alert(poker[poker.length-6].num);
			break;

			case 9 :
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			case 10 :
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightFulls(poker)){
					poker_data.type = 10;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);

				}
				// console.log(poker_data.max);
			break;

			case 11 :
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			case 12 :
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightFull(poker)){
					poker_data.type = 12;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);
					//------------------------------------------
				}
			break;

			case 13 :
				
			break;

			case 14 :
				if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			case 15 :
				if(checkStraightFullss(poker)){
					poker_data.type = 15;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);
					//------------------------------------------
				}
				// console.log('123');
			break;

			case 16 :
				if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}if(checkStraightFull(poker)){
					poker_data.type = 16;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);//------------------------------------------
				}
			break;

			case 17 :
				
			break;

			case 18 :
				if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			case 19 :
				
			break;

			case 20 :
				if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightFull(poker)){
					poker_data.type = 20;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);//------------------------------------------
				}else if(checkStraightFullsss(poker)){
					poker_data.type = 19;		// 设置牌型飞机
					poker_data.max = checkStraightFullsMax(poker);//------------------------------------------
				}
			break;
		}

		/**
		 * 判断牌型是否为顺子
		 * break	用于跳出当前循环（语句）
		 * continue 用于跳过当前循环（语句）
		 * return 直接返回出当前函数的结果，也可以认为是结束函数。如果写在函数外部，可以认为结束程序
		 * 
		 * @param Array poker 牌组的具体数据，用于判断是不是顺子
		 * @return boolean 如果检查的数据是顺子，返回true,否则返回false
		 */
		function checkStraight(poker){
			for(let i=0; i<poker.length-1; i++){
				if((poker[i].num*1) - 1 != poker[i+1].num || poker[i].num ==13 || poker[i].num ==14 ){
					return false;
				}
			}
			return true;
		}

		/**
		 * 检查牌型是否为连对
		 * @param  Array poker 牌组的具体数据
		 * @return Boolean      如果检查的数据是连对，返回true,否则返回false
		 */
		function checkStraightPairs(poker){
			// 3344556677
			for(let i=0; i<poker.length-3; i+=2){
				if( poker[i].num*1 - 1 != poker[i+3].num || poker[i+1].num*1 - 1 != poker[i+2].num || poker[i].num == 13){
					return false;
				}
				return true;
			}
		}
		//66655543
		//65554443
		//65444333
		function checkStraightFull(poker){
			if(poker.length == 8){
				for(let i=0 ; i<poker.length-7 ; i++){
					if( (poker[i].num != poker[i+3].num*1 + 1 || poker[i].num != poker[i+2].num || poker[i+3].num != poker[i+5].num) &&
						(poker[i+1].num != poker[i+4].num*1 + 1 || poker[i+1].num != poker[i+3].num || poker[i+4].num != poker[i+6].num)&&
						(poker[i+2].num != poker[i+5].num*1 + 1 || poker[i+2].num != poker[i+4].num || poker[i+5].num != poker[i+7].num)
						){
							return false;
						}
					return true;
				}
			}else if(poker.length == 12){
				if( (poker[0].num != poker[2].num || poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[2].num  != poker[3].num*1 + 1 || poker[5].num*1 - 1 != poker[6].num) &&
					(poker[1].num != poker[3].num || poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[3].num  != poker[4].num*1 + 1 || poker[6].num*1 - 1 != poker[7].num) &&
					(poker[2].num != poker[4].num || poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[4].num != poker[5].num*1 + 1 || poker[7].num*1 - 1 != poker[8].num) &&
					(poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[5].num != poker[6].num*1 + 1 || poker[8].num*1 - 1 != poker[9].num)
					){
					return false;
				}
				return true;
			}else if(poker.length == 16){
				if( (poker[0].num != poker[2].num || poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[2].num  != poker[3].num*1 + 1 || poker[5].num*1 - 1 != poker[6].num || poker[8].num*1 - 1 != poker[9].num) &&
					(poker[1].num != poker[3].num || poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[10].num != poker[12].num || poker[3].num  != poker[4].num*1 + 1 || poker[6].num*1 - 1 != poker[7].num || poker[9].num*1 - 1 != poker[10].num) &&
					(poker[2].num != poker[4].num || poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[11].num != poker[13].num || poker[4].num != poker[5].num*1 + 1 || poker[7].num*1 - 1 != poker[8].num || poker[10].num*1 - 1 != poker[11].num) &&
					(poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[12].num != poker[14].num || poker[5].num != poker[6].num*1 + 1 || poker[8].num*1 - 1 != poker[9].num || poker[11].num*1 - 1 != poker[12].num) &&
					(poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[10].num != poker[12].num || poker[13].num != poker[15].num || poker[6].num != poker[7].num*1 + 1 || poker[9].num*1 - 1 != poker[10].num || poker[12].num*1 - 1 != poker[13].num)
					){
					return false;
				}
				return true;
			//1112229998887776543
			}else if(poker.length == 20){
				if( (poker[0].num != poker[2].num || poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[12].num != poker[14].num || poker[2].num != poker[3].num*1 + 1 || poker[5].num != poker[6].num*1 + 1 || poker[8].num != poker[9].num*1 + 1 || poker[11].num != poker[12].num*1 + 1) &&
					(poker[1].num != poker[3].num || poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[10].num != poker[12].num || poker[13].num != poker[15].num || poker[3].num != poker[4].num*1 + 1 || poker[6].num != poker[7].num*1 + 1 || poker[9].num != poker[10].num*1 + 1 || poker[12].num != poker[13].num*1 + 1) &&
					(poker[2].num != poker[4].num || poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[11].num != poker[13].num || poker[14].num != poker[16].num || poker[4].num != poker[5].num*1 + 1 || poker[7].num != poker[8].num*1 + 1 || poker[10].num != poker[11].num*1 + 1 || poker[13].num != poker[14].num*1 + 1) &&
					(poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[12].num != poker[14].num || poker[15].num != poker[17].num || poker[5].num != poker[6].num*1 + 1 || poker[8].num != poker[9].num*1 + 1 || poker[11].num != poker[12].num*1 + 1 || poker[14].num != poker[15].num*1 + 1) &&
					(poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[10].num != poker[12].num || poker[13].num != poker[15].num || poker[16].num != poker[18].num || poker[6].num != poker[7].num*1 + 1 || poker[9].num != poker[10].num*1 + 1 || poker[12].num != poker[13].num*1 + 1 || poker[15].num != poker[16].num*1 + 1) &&
					(poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[11].num != poker[13].num || poker[14].num != poker[16].num || poker[17].num != poker[19].num || poker[7].num != poker[8].num*1 + 1 || poker[10].num != poker[11].num*1 + 1 || poker[13].num != poker[14].num*1 + 1 || poker[16].num != poker[17].num*1 + 1)
					){
					return false;
				}
				return true;
			}
		}


		//8887776655
		//8877766655
		//8877666555
		function checkStraightFulls(poker){
			if(poker.length == 10){
				if( (poker[0].num != poker[2].num && poker[3].num != poker[5] && poker[6].num != poker[7].num && poker[8].num != poker[9].num && poker[2].num != poker[3].num*1 + 1) ||
					(poker[2].num != poker[4].num && poker[5].num != poker[7] && poker[0].num != poker[1].num && poker[8].num != poker[9].num && poker[4].num != poker[5].num*1 + 1) ||
					(poker[4].num != poker[6].num && poker[7].num != poker[9] && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[6].num != poker[7].num*1 + 1) 
					){
					return false;
				}
				return true;
			
			}
			
		}
		//999888777665544
		//998887776665544
		//998877766655544
		//998877666555444
		function checkStraightFullss(poker){
			if(poker.length == 15){
				if( (poker[0].num != poker[2].num && poker[3].num != poker[5].num && poker[6].num != poker[8].num && poker[9].num != poker[10].num && poker[11].num != poker[12].num && poker[13].num != poker[14].num && poker[2].num != poker[3].num*1 + 1 && poker[5].num != poker[6].num*1 + 1 ) ||
					(poker[2].num != poker[4].num && poker[5].num != poker[7].num && poker[8].num != poker[10].num && poker[0].num != poker[1].num && poker[11].num != poker[12].num && poker[13].num != poker[14].num && poker[4].num != poker[5].num*1 + 1 && poker[7].num != poker[8].num*1 + 1 ) ||
					(poker[4].num != poker[6].num && poker[7].num != poker[9].num && poker[10].num != poker[12].num && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[13].num != poker[14].num && poker[6].num != poker[7].num*1 + 1 && poker[9].num != poker[10].num*1 + 1 ) ||
					(poker[6].num != poker[8].num && poker[9].num != poker[11].num && poker[12].num != poker[14].num && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[4].num != poker[5].num && poker[8].num != poker[9].num*1 + 1 && poker[11].num != poker[12].num*1 + 1 )
					){
					return false;
				}
				return true;
			}
		}
		function checkStraightFullsss(poker){
			if(poker.length == 20){
				if( (poker[0].num != poker[2].num && poker[3].num != poker[5].num && poker[6].num != poker[8].num && poker[9].num != poker[11].num && poker[12].num != poker[13].num && poker[14].num != poker[15].num && poker[16].num != poker[17].num && poker[18].num != poker[19].num && poker[2].num != poker[3].num*1 + 1 && poker[5].num != poker[6].num*1 + 1 && poker[8].num != poker[9].num*1 + 1 ) ||
					(poker[2].num != poker[4].num && poker[5].num != poker[7].num && poker[8].num != poker[10].num && poker[11].num != poker[13].num && poker[0].num != poker[1].num && poker[14].num != poker[15].num && poker[16].num != poker[17].num && poker[18].num != poker[19].num && poker[4].num != poker[5].num*1 + 1 && poker[7].num != poker[8].num*1 + 1 && poker[10].num != poker[11].num*1 + 1) ||
					(poker[4].num != poker[6].num && poker[7].num != poker[9].num && poker[10].num != poker[12].num && poker[13].num != poker[15].num && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[16].num != poker[17].num && poker[18].num != poker[19].num && poker[6].num != poker[7].num*1 + 1 && poker[9].num != poker[10].num*1 + 1 && poker[12].num != poker[13].num*1 + 1) ||
					(poker[6].num != poker[8].num && poker[9].num != poker[11].num && poker[12].num != poker[14].num && poker[15].num != poker[17].num && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[4].num != poker[5].num && poker[18].num != poker[19].num && poker[8].num != poker[9].num*1 + 1 && poker[11].num != poker[12].num*1 + 1 && poker[14].num != poker[15].num*1 + 1) ||
					(poker[8].num != poker[10].num && poker[11].num != poker[13].num && poker[14].num != poker[16].num && poker[17].num != poker[19].num && poker[0].num != poker[1].num && poker[2].num != poker[3].num && poker[4].num != poker[5].num && poker[6].num != poker[7].num && poker[10].num != poker[11].num*1 + 1 && poker[13].num != poker[14].num*1 + 1 && poker[16].num != poker[17].num*1 + 1)
					){
					return false;
				}
				return true;
			}
		}

		//5554443333
		// let Numarr =[];
		// let Numarr2 =[];
		function checkStraightFullsMax(poker){
			let Numarr =[];
			let Numarr2 =[];
			// console.log(poker[0].num);
			for(let i = 0 ;i<poker.length ; i++){
				if(Numarr[poker[i].num] == undefined){
					// console.log(Numarr[poker[i].num] == undefined);
					Numarr[poker[i].num] = 1 ;
				}else{
					// console.log(Numarr[poker[i].num]);
					Numarr[poker[i].num]++;
					if(Numarr[poker[i].num] == 3){
						Numarr2.push(poker[i].num);
					}

				}
			}
			let Max = '';
			Max = Numarr2[0];
			return Max;
		}
	}



	/**
	 * 用于对比选中的牌型与桌面牌型
	 * @return Boolean  如果选中牌型大于桌面牌型，返回true,否则返回false
	 */
	function vsPoker(){

		// console.log(game.desktop_poker);
		// console.log(game.select_poker);

		// 判断桌面没牌肯定可以打出去
		if(game.desktop_poker.poker.length == 0){
			return true;
		}

		// 判断打出去的是王炸
		if(game.select_poker.type == 110){
			return true;
		}

		// 判断桌面上的牌是王炸
		if(game.desktop_poker.type == 110){
			return false;
		}

		// 判断如果桌面上的不是炸弹，选中是炸弹
		if(game.select_poker.type == 911 && game.desktop_poker.type != 911){
			return true;
		}

		// 判断普通牌型
		if(game.select_poker.type == game.desktop_poker.type && 
			game.desktop_poker.poker.length == game.select_poker.poker.length &&
			game.select_poker.max*1 > game.desktop_poker.max*1
			){
			return true;
		}

		return false;
	}
	 
	/**
	 * 玩家出牌成功后，删除对应玩家手牌数据
	 */
	function delPlayerPoker(index){
		let select_poker = game.select_poker.poker;
		let player_poker = player[index].poker;

		for(let i=0; i<select_poker.length; i++){
			for(let j=0; j<player_poker.length; j++){
				if(select_poker[i].num == player_poker[j].num && select_poker[i].color == player_poker[j].color){
					player_poker.splice(j, 1);
				}
			}
		}
		//重新生成手牌
		$('.play').eq(index).find('li').remove();
		for(let i=0 ;i<player_poker.length;i++){
			poker_data =player_poker[i];
			poker_html = makePoker(poker_data);
			$('.play').eq(index).append(poker_html);
			if(index==1){
				$('.play').eq(index).find('li:last').css('left', i * 20 + 'px');
				$('.play').eq(index).css('left', -i * 10 + 'px');
			}else if(index==2){
				$('.play').eq(index).find('li:last').css({top:-20*i+'px',transform:'rotateZ(-90deg)'});
				$('.play').eq(index).css('top', i * 10 + 400 + 'px');
			} else if(index==0){
				$('.play').eq(index).find('li:last').css({top:20*i+'px',transform:'rotateZ(90deg)'});
				$('.play').eq(index).css('top', -i * 10 + 400 + 'px');
			}
		}
	}

	/**
	 * 封装 出牌的音频/视频
	 */
	function playCardSound(type,num){
		let f = [9, 10, 12, 15, 16, 19, 20];
	 	let index = f.indexOf(type);
	 	// console.log(index);
	 	if(index>=0){
	 		type=9;
	 	}
		switch(type){
			case 1:
				$('#keyplay').attr('src','./media/audio/'+num+'.mp3')
				// feng = false;
				// animate_play(110);
				// feng = 3000
				// setTimeout(function(){
				// 	$('object').remove();
				// 	$('.box_mov').css({'z-index':'0'});
				// 	// feng = false;
				// 	game.select_poker.poker= [];
				// 	$('.play').find('li').removeClass('select');
				// 	$('.play_out').attr('disabled', false);
				// 	$('.pass').attr('disabled', false);

					
				// },3000)
			break;
			case 2:
				$('#keyplay').attr('src','./media/audio/'+num+'_'+num+'.mp3')
			break;
			case 3:
				$('#keyplay').attr('src','./media/audio/'+num+'_'+num+'_'+num+'.mp3')
			break;
			case 4:
				$('#keyplay').attr('src','./media/audio/'+type+type+type+'.mp3')
			break;
			case 5:
				$('#keyplay').attr('src','./media/audio/'+type+type+type+'.mp3')
			break;
			case 6:
				$('#keyplay').attr('src','./media/audio/'+type+type+type+'.mp3')
				animate_play(6);
				feng = 2000;
				setTimeout(function(){
					$('object').remove();
					$('.box_mov').css({'z-index':'0'});
					game.select_poker.poker= [];
					$('.play').find('li').removeClass('select');
					$('.play_out').attr('disabled', false);
					$('.pass').attr('disabled', false);

				},2000)
			break;
			case 7:
				$('#keyplay').attr('src','./media/audio/'+type+type+type+'.mp3')
			break;
			case 8:
				$('#keyplay').attr('src','./media/audio/'+type+type+type+'.mp3')
			break;
			case 9:
				$('#keyplay').attr('src','./media/audio/男子飞机.mp3')
				animate_play(9);
				feng = 7000;
				setTimeout(function(){
					$('object').remove();
					$('.box_mov').css({'z-index':'0'});
					game.select_poker.poker= [];
					$('.play').find('li').removeClass('select');
					$('.play_out').attr('disabled', false);
					$('.pass').attr('disabled', false);

				},7000)
			break; 
			case 911:
				$('#keyplay').attr('src','./media/audio/911.mp3')
				
				animate_play(911);
				feng = 2500;
				setTimeout(function(){
					$('object').remove();
					$('.box_mov').css({'z-index':'0'});
					game.select_poker.poker= [];
					$('.play').find('li').removeClass('select');
					$('.play_out').attr('disabled', false);
					$('.pass').attr('disabled', false);

				},2500)
				
			break;
			case 110:

				$('#keyplay').attr('src','./media/audio/110.mp3')
				animate_play(110);

				feng = 3500;
				setTimeout(function(){
					$('object').remove();
					$('.box_mov').css({'z-index':'0'});
					game.select_poker.poker= [];
					$('.play').find('li').removeClass('select');
					$('.play_out').attr('disabled', false);
					$('.pass').attr('disabled', false);


				},3500)
				
			break;

		}
	}

// 视频动画函数封装
	function animate_play(play_num){
		let poker_html = '';
			poker_html += '<object class="mov" height="100%" width="100%" ><param name = "movie" value ="./mov/'+play_num+'.swf" loop=1> '
			poker_html += 	'<param name ="quality" value ="high">'
			poker_html += 	'<param name ="wmode" value ="transparent"> '
			poker_html += 	'<embed src ="./mov/爆炸.swf" quality ="high" wmode ="transparent" width ="300px" height ="300px"> </embed>	'
			poker_html += '</object>'
		$('.box_mov').append(poker_html).css({'z-index':'100'});
		$('.play_out').attr('disabled', true);//执行动画时禁止再出牌 封印出牌按钮
		$('.pass').attr('disabled', true);//封印过牌按钮
		console.log(poker_html);
		
	}
	/**
	 * 封装提示alert弹框
	*/

	function pointOut(msg){
		let $bg = $('<div />');
		$bg.attr('class','pointOut')
		$bg.css({width:'100%', height:'100%', 'background':'#000','opacity':'0.6', 'position':'absolute','z-index':'20'});
		let msg_div = '<div style="width:auto; height:30px; line-height:30px; font-size:25px; color:#cff;text-align:center; position:absolute; top:50%; left:40%;  ">'+msg+'</div>';
		$bg.append(msg_div);
		$('.box').append($bg);
	}

	// ==================================================================最后一步     strat=====================================================================
	// 定义计算积分函数
	function integration(index){
		if(player[index].role == 1 && player[index].poker.length == 0 ){	// 判断出牌那个为地主且手牌长度为0时
			player[index].integral += 200;			
			// console.log(player[index].integral);
			alertWin('landlord');
			// player[index-1].integral -= 1 * 100;
			if(index == 0){
				player[1].integral -= 100;
				player[2].integral -= 100;
			}else if(index == 1){
				player[0].integral -= 100;
				player[2].integral -= 100;
			}else if(index == 2){
				player[0].integral -= 100;
				player[1].integral -= 100;
			}
		}else if(player[index].role == 0 && player[index].poker.length == 0){	// 判断出牌那个为平民且手牌长度为0时
			player[index].integral += 100;
			// console.log(player[index].integral);			
			alertWin('peasant');
			if(index == 0){
				if(player[1].role == 1){
					player[1].integral -= 200;
					player[2].integral += 100;
				}else if(player[2].role == 1){
					player[2].integral -= 200;
					player[1].integral += 100;
				}
			}else if(index == 1){
				if(player[0].role == 1){
					player[0].integral -= 200;
					player[2].integral += 100;
				}else if(player[2].role == 1){
					player[2].integral -= 200;
					player[0].integral += 100;
				}
			}else if(index == 2){
				if(player[0].role == 1){
					player[0].integral -= 200;
					player[1].integral += 100;
				}else if(player[1].role == 1){
					player[1].integral -= 200;
					player[0].integral += 100;
				}
			}
		}
		// 判断出牌那个玩家的手牌长度为0时，输出名字和积分
		if(player[index].poker.length == 0){
			for(let i=0; i<player.length; i++){
				let $bg = $('<p style="margin: 65px 0 0 0;color: cyan;font-size: 24px;">'+player[i].name+'：<span>'+player[i].integral+'</span>'+'</p >');
				$('.win_back').css({'display':'block'}).append($bg);
			}
		}
		$('#btn_end').click(function(){
			window.location.href = window.location.href;
		});
	}
	// 胜利时弹框
	function alertWin(msg){
		let $bg = $('<div></div>');
		let $bg1 = $('<div></div>');
		let $btn = $('#btn_end').css({'display':'block'});
		$bg.css({width:'100%', height:'100%', 'background':'#000', 'opacity':'0.5','position': 'absolute'});
		let $img = $('<img src="./images/'+msg+'.png" style="position: absolute; left: 50%; margin: 0 0 0 -400px; top: 20%;">');
		$('.box').append($bg);
		$('.box').append($img)
		$('.box').append($btn);
	}
	
	// 用定时器调用时间事件
	setInterval(function(){
		time();
	},1000);
	// 定义时间事件
	function time(){
		let div = document.getElementById('time');
		let time = new Date();
		hours = time.getHours();
		min = time.getMinutes();
		sec = time.getSeconds();						
		div.innerHTML = Time(hours) + ':' + Time(min) + ':' + Time(sec);
	}
	function Time(str){
		let num;
		str>=10 ? (num=str) : (num='0'+str);
		return num;
	}
	// 调用时间事件
	time();

	// 开幕式函数
	function opening(){
		$('.open').on('click',function(){
			$('.welcome').css({'display':'none'})
			$('.open').css({'background':'none'});
			$('.open img').css({'display':'block'});
			$('.img_top').animate({'margin-top':'-800px'},2000);
			$('.img_btm').animate({'margin-top':'1500px'},2000);
			setTimeout(function(){
				$('.open').remove();
			},2000);
		})
	}
	opening();
	// ==================================================================最后一步    end=====================================================================

	//提示
	function promptPoker(index){
		let all ;
		let str = [];
		let min;
		let type = game.desktop_poker.type;
		function minPoker(index){
			if(game.desktop_poker.poker.length!=0){
				min = game.desktop_poker.poker[game.desktop_poker.poker.length-1].num;
				color = game.desktop_poker.poker[game.desktop_poker.poker.length-1].color;

				for(let i = 0 ; i <=player[index].poker.length-1;i++){
					if(player[index].poker[i].num > min){
						str.push(player[index].poker[i]);
					}else if(player[index].poker[i].num == 14 && player[index].poker[i].color >color){
						str.push(player[index].poker[i]);
					}

				}
			}
		}
		console.log(str);
		minPoker(index);
		switch(type){
			case 0 :
				$('.play').eq(index).find('li:last').trigger('click');
			break;
			case 1 :
				for(let i =  str.length-1;i>=0;i--){
						if(min == 14){
							if(str[i].color>color){
								$('.play').eq(index).find('li:eq('+ i +')').trigger('click');
							}
						}else {
							if(str[i].num>min){
								for(let j = 0; j<type;j++){
									$('.play').eq(index).find('li:eq('+ (i-j) +')').trigger('click');
									console.log(i-j);
								}
							break;
							}
						}
				}
				if(game.select_poker.poker.length==0){
					bomb(index);
				}
			break;
			case 2 :
				for(let i = str.length-1;i>=1;i--){
					if(str[i].num>min && str[i].num == str[i-1].num){
						for(let j = 0; j<type; j++){
							$('.play').eq(index).find('li:eq('+ (i-j) +')').trigger('click');
						}
						break;
					}
				}
				if(game.select_poker.poker.length==0){
					bomb(index);
				}
			break;
			case 3 :

				for(let i = str.length-1;i>=2;i--){
					if(str[i].num>min && str[i].num == str[i-2].num){
						for(let j = 0; j<type;j++){
							$('.play').eq(index).find('li:eq('+ (i-j) +')').trigger('click');
						}
						break;
					}
				}
				if(game.select_poker.poker.length==0){
					bomb(index);
				}
			break;
			case 4 :
				for(let i = str.length-1;i>=3;i--){
					if(str[i].num>min && str[i].num == str[i-2].num && str[i].num !=str[i-3]){
						for(let j = 0; j<4;j++){
							$('.play').eq(index).find('li:eq('+ (i-j) +')').trigger('click');
						}
						break;
					}else if(str[i-1].num>min && str[i-1].num == str[i-3].num && str[i].num !=str[i-1]){
						for(let j = 1; j<4;j++){
							$('.play').eq(index).find('li:eq('+ (i-j) +')').trigger('click');
							$('.play').eq(index).find('li:eq('+ i +')').trigger('click');
						}
						break;
					}
				}
				if(game.select_poker.poker.length==0){
					bomb(index);
				}
			break;

		

		}

	}

	//炸弹提示
	function  bomb(index){
		console.log(1111);
		let  players  = player[index].poker;
		console.log(players);
		for(let i=players.length-1; i>= players.length-4; i-- ){
			if(players[i].num == players[i-3].num){
				$('.play').eq(index).find('li:eq('+ (i) +')').trigger('click');
				$('.play').eq(index).find('li:eq('+ (i-1) +')').trigger('click');
				$('.play').eq(index).find('li:eq('+ (i-2) +')').trigger('click');
				$('.play').eq(index).find('li:eq('+ (i-3) +')').trigger('click');
				break;
			}else{
					for(let j=players.length-1; j>= players.length-2; j-- ){
						if((players[j].num ==14)&& (players[j].num == players[j-1].num))
							$('.play').eq(index).find('li:eq('+ (j) +')').trigger('click');
							$('.play').eq(index).find('li:eq('+ (j-1) +')').trigger('click');
							break;
					}
				}	
			}
	}	
							


});