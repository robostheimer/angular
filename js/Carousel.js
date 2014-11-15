// JavaScript Document
resp_count.length=0;

function Next(){
		//count=0
		if(count3<zz-1)
		{
		var speed=600;
		//alert('next');
		$('#carousel ul').animate({marginLeft:'-=202px'}, speed);
		$('.fl_title_ind').slideDown(1000).delay(1500).slideUp('slow');
		//$('#fl_title').animate({marginLeft:'-=202px'}, speed);

		count3++
		//alert(count);
		}
		else if(count3>=zz-1)
		{
			
			$('#carousel ul').animate({marginLeft:'0px'}, speed);
			$('.fl_title_ind').slideDown(1000).delay(1500).slideUp('slow');
			count3=0;
		}
		}		

function Prev(){
		if(count3>0&&count3<=zz)
			{
			var speed=600;
			//alert('prev')
			$('#carousel ul').animate({marginLeft:'+=202px'}, speed);	
			$('.fl_title_ind').slideDown(1000).delay(1500).slideUp('slow');
			//$('#fl_title').animate({marginLeft:'+=202px'}, speed);
			count3--
			//alert(count);
			}
		}
		


function Next2(){
		//count=0
		if(count2<yy-1)
		{
		
		var speed=600;
		//alert('next');
		$('#carousel2 ul').animate({marginLeft:'-=200px'}, speed);
		count2++
		//alert(count);
		}
		else if(count2>=yy-1)
		{
			count2=0;
			$('#carousel2 ul').animate({marginLeft:'0px'}, speed);
			
		}
		}		

function Prev2(){
		if(count2>0&&count2<=yy)
			{
			var speed=600;
			//alert('prev')
			$('#carousel2 ul').animate({marginLeft:'+=202px'}, speed);	
			count2--
			//alert(count);
			}
		}
		
		
function Next3()
		{		
			
			resp_count.length =resp_count.length+1;
			var scroll_length = resp_count.length*resp_des_current.width;
			
			myScroll.scrollTo(-(scroll_length), 0, 200) 
			
			/*if(parseInt($('#scroller_current').css('margin-left').replace('px','')) >-((resp_count.count-1)*202))
			{
			$('#scroller_current').animate({marginLeft:'-=202px'})
			}
			
			else
			{
			$('#scroller_current').animate({marginLeft:'0px'})
			
			}*/
		}		

function Prev3(){
			
			resp_count.length =resp_count.length-1;
			var scroll_length = resp_count.length*resp_des_current.width;
			myScroll.scrollTo(-(scroll_length), 0, 200) 
			
			/*if(parseInt($('#scroller_current').css('margin-left').replace('px',''))<0)
			{
			$('#scroller_current').animate({marginLeft:'+=202px'})
			}
			else
			{
			$('#scroller_current').animate({marginLeft:-((resp_count.count-1)*202)})
			
			}*/
			
	
		}
		
		
function Next4(){
		
		
		resp_count.length =resp_count.length+1;
			var scroll_length = (resp_count.length*resp_des_tab_box_image.width);
			
		myScroll_quotes.scrollTo(-(scroll_length+50), 0, 200) 
			
		
		//alert(count);
		
		
		}		

function Prev4(){
		resp_count.length =resp_count.length-1;
		var scroll_length = resp_count.length*resp_des_tab_box_image.width;
		myScroll_quotes.scrollTo(-(scroll_length+50), 0, 20) 
			
	
		}		