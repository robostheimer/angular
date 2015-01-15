/* Controllers */

angular.module('ClassPage', [])
.controller('classPage', ['$scope','$location','$routeParams','Class', function($scope, $location, $routeParams,Class )
{
	$scope.tabIndex = 108;
	$scope.bigImage=false;
	$scope.svg = 'images/US_Map.svg';
	$scope.currentStatus='yes';
	$scope.hideMapDiv=true;
	
	//TeacherDataFetch.count=0;
		
	
		
	Class.createTeacherList().then(function(data)
	{
		
		$scope.states=Class.createStateObj();
		console.log($scope.states)
		$scope.teachers=data;
		if($scope.teachers.length!=0)
		{
		$scope.dataLoaded=true;
		
			$scope.year = $scope.teachers[0].dates.slice(($scope.teachers[0].dates.length-4), $scope.teachers[0].dates.length);
		
		
		$scope.teachers[0].checkContents=true;
		$scope.bigImage=false;
		
		
		
		for(var i=0; i<$scope.teachers.length; i++)
			{
			
			for(var y=0; y<$scope.states.length; y++)
			{
				
				if($scope.states[y].abbreviation==$scope.teachers[i].state)
				{
					$scope.states[y].num = parseInt($scope.states[y].num)+1;
					
					
					
						$scope.states[y].isThere=true;
						
					
				}
				
				
			}
			
				
			if($scope.teachers[i].subjects2!=undefined)
			{
				$scope.teachers[i].subjects_num=2;
			}
			else
			{
				$scope.teachers[i].subjects_num=1;
			}
			
			
			
			var date_beg=new Date($scope.teachers[i].dates.split('-')[0]).valueOf();
			var date_end = new Date($scope.teachers[i].dates.split('-')[0]).valueOf();
			var d= new Date();
			var date_today = d.valueOf();
				if(date_beg<date_today&&date_end<date_today)
				{
					$scope.teachers[i].datesComp=0;
				}
				if(date_beg<date_today && date_end>date_today)
				{
					$scope.teachers[i].datesComp=1;
				}
				if(date_beg>date_today)
				{
					$scope.teachers[i].datesComp=2;
				}
				if($scope.teachers[i].dates.split('-')[0].match('12/30/'))
				{
					$scope.teachers[i].datesComp=3;
				}
				
			if($scope.teachers[i].ship='#')
			{
				$scope.teachers[i].shipHider=true;
			}	
			else
			{
				shipHider=$scope.teachers[i].shipHider=true;
			}
				
			}
			for(var y=0; y<$scope.states.length; y++)
			{
				
				$scope.states[y].alt_num=$scope.states[y].num
				//console.log($scope.states[y].alt_num)
				if($scope.states[y].num==0)
				{
					
					$scope.states[y].num = $scope.states[y].abbreviation
					
				}
				
			}
		}
		else{
			$scope.dataLoaded=false;
		}
			
		}
);
	$scope.rollClickState=function(id)
	{
		
		
		
		
			for(var x=0; x<$scope.states.length; x++)
			{
				if($scope.states[x].abbreviation==id && $scope.states[x].isThere==true)
				{
					runInfo(id);
					
				}
				
			}
			function runInfo(id)
			{
			$scope.teachers.forRollOver =[];
			for(var i=0; i<$scope.teachers.length; i++)
			{
			if(id==$scope.teachers[i].state )
					{
						$scope.hideMapDiv=false;
						console.log($scope.teachers[i])
						$scope.teachers.forRollOver.push($scope.teachers[i]);
						
					}
					if($scope.teachers.forRollOver.length>1)
					{
						$scope.clearer = true;
					}
					else
					{
						$scope.clearer=false;
					}
		
			};
		}
	};
				
	$scope.closeRollover=function()
	{
		$scope.hideMapDiv=true;
		$scope.showMapDiv=false;
	};
}]);	


angular.module('BaseballCardInfo', [])	
			
.controller('changeTab',['$scope','$location','Teacher','TeacherDataFetch','WPDataFetch','LessonsDataFetch','NewsDataFetch','ShipDataFetch', '$q','$routeParams','$rootScope','$sce', 'preloadImage', 'Favorites', '$q' ,function($scope, $location,Teacher, TeacherDataFetch, WPDataFetch, LessonsDataFetch, NewsDataFetch, ShipDataFetch, $q, $routeParams, $rootScope, $sce, preloadImage, Favorites, $q){
	$scope.buttons=Teacher.createObjects();
	/*$rootScope.teacherdata={};
	$rootScope.teacherdata.firstname='';
	$rootScope.teacherdata.lastname='';
	*/
	$scope.buttonsArr = [$scope.buttons.blogs, $scope.buttons.photos, $scope.buttons.videos, $scope.buttons.lessons, $scope.buttons.news,$scope.buttons.ship];
	$scope.location = $location.path().split('/')[0]+'/'+$location.path().split('/')[1]+'/'+$location.path().split('/')[2];
	$scope.bigImageHider=true;
	$scope.tab = $routeParams.tab;		
	for(var i=0; i<$scope.buttonsArr.length; i++)
			{
				
				$scope.buttonsArr[i].state='off';
				$scope.buttonsArr[i].classy='hider';
				$scope.buttonsArr[i].hidden='true';
				if($scope.tab==$scope.buttonsArr[i].name)
				{
					$scope.buttonsArr[i].state='on';
					$scope.buttonsArr[i].classy='shower';
					$scope.buttonsArr[i].hidden='false';
				}
				
			}
						
	
	$scope.teacherdatacount = TeacherDataFetch.count;
	//alert($scope.teacherdatacount)
	$scope.bigImage = false;
	
	////////////////Gets called below to initialize data-gathering services
	
	$scope.accessData=function()
	{		
			$rootScope.favorites = Favorites.addFavorites();
			//////////////checks datacount to determine data needs to be re-downloaded; if $scope.teacherdatacount==0 it loads
			if ($scope.teacherdatacount == 0)
			{
				
				$scope.number=$scope.teacherdatacount;
				$scope.loadHider=false;
				TeacherDataFetch.data().then(function(data) {
				$scope.teacher = data;
				if($scope.teacher.count!=0)
				{
				$scope.teacher.dataLoaded=true;	
				$rootScope.teacherdata = $scope.teacher;
				$scope.teacher.finalImage= $scope.teacher.image
				
				var date_beg=new Date($scope.teacher.dates.split('-')[0]).valueOf();
				var date_end = new Date($scope.teacher.dates.split('-')[0]).valueOf();
				var d= new Date();
				var date_today = d.valueOf();
					if(date_beg<date_today&&date_end<date_today)
					{
						$scope.teacher.datesComp=0;
					}
					if(date_beg<date_today && date_end>date_today)
					{
						$scope.teacher.datesComp=1;
					}
					if(date_beg>date_today)
					{
						$scope.teacher.datesComp=2;
					}
						
					if($scope.teacher.subjects2!=undefined)
					{
						$scope.teacher.subjects_num=2;
					}
					else
					{
						$scope.teacher.subjects_num=1;
					}
						var wpdatacount = WPDataFetch.count;
						
							 WPDataFetch.data($location.path().split('/')[1].split('/')[0],$scope.teacher.firstname+' '+$scope.teacher.lastname).then(function(data) {
							     
							    $scope.wp = data;
							    for(var x=0; x<$scope.wp.items.length; x++)
							    {
							    	Favorites.checkFavorites($scope.wp.items[x], 'blogs');
							    	
							    }

							    $scope.images = $scope.wp.Images;
							    
							    console.log($scope.images);
							    for(var y=0; y<$scope.images.length; y++)
							    {
							    	Favorites.checkFavorites($scope.images[y], 'images');
							    }
							    $rootScope.imagedata = $scope.images;
							   // console.log($rootScope.imagedata);
							   	$rootScope.wpdata =$scope.wp;
					       		$scope.wp.dataLoaded=true; 
					       		$scope.wp.checkVideos=false;
					       		$scope.wp.checkBlogs=false;
					       		$scope.wp.checkPhotos=false;
					       		
					      		 if($scope.wp.VMVid.length>0||$scope.wp.WPVid.length>0||$scope.wp.YT.length>0)
					      		 {
					      		 	
					      		 	$scope.wp.checkVideos=true;
					      		 }
					      		 if($scope.wp.items.length>0)
					      		 {
					      		 	
					      		 	$scope.wp.checkBlogs=true;
					      		 }
					      		 if($scope.wp.gallery_images.length>0)
					      		 {
					      		 	
					      		 	$scope.wp.checkPhotos=true;
					      		 	
					      		 	
					      		 }
							});
						
						LessonsDataFetch.data($scope.teacher.firstname+' '+$scope.teacher.lastname).then(function(data)
					 	 	{
					 	 		$scope.lessons =data;
					 	 		for(var z=0; z<$scope.lessons.length; z++)
					 	 		{
					 	 			Favorites.checkFavorites($scope.lessons[z], 'lessons');	
					 	 		}
					 	 		$scope.lessons.checkContents=false;
					 	 		$rootScope.lessonsdata =$scope.lessons;
					 	 		if($scope.lessons[0].description!="")
					 	 		{
					 	 			$scope.lessons.checkContents=true;
					 	 		}
					 	 		
					 	 	});
						NewsDataFetch.data($scope.teacher.firstname+' '+$scope.teacher.lastname).then(function(data)
				 	 	{
				 	 		$scope.news =data;
				 	 		$scope.news.checkContents=false;
				 	 		$rootScope.newsdata = $scope.news;
				 	 		$rootScope.newsdata =data;
				 	 		if($scope.news[0].article!="")
				 	 		{
				 	 			$scope.news.checkContents=true;
				 	 		}
				 	 	});
						
						Teacher.getShipData($scope.teacher.ship, $scope.teacher.shiptype).then(function(data)
			     	 	{
			     	 		$scope.ship = data;
			     	 		$rootScope.shipdata = data;
			     	 		$scope.ship[0].checkShip=false;
			     	 		if($scope.ship[0].ship!="")
			     	 		{
			     	 			$scope.ship[0].checkShip=true;
			     	 		}
			     	 		//$scope.shipdescription = $sanitize($scope.ship[0].description);
			     	 	
						//$scope.$apply();			
								
			     	 	});
				
				}
			else{
				$scope.teacher.dataLoaded=true;	
			}
			});
			
		/////////////////////If the url changes it changes the $scope.teacherdatacount number back to 0 and runs the data again	
		} else if($routeParams.teachername.replace('*', ' ').toLowerCase()!=$rootScope.teacherdata.firstname.toLowerCase()+' '+$rootScope.teacherdata.lastname.toLowerCase()&&$scope.teacherdatacount!=0) 
				{
					
				$scope.teacherdatacount = 0;
				$scope.number=$scope.teacherdatacount;
				$scope.accessData();
								
				}
				///////////////////If the url hasn't changed, it does not re-run the services to bring the data in
		else if($scope.teacherdatacount!=0){
			
			
			$scope.teacher = {};
			$scope.ship={};
			$scope.teacher = $rootScope.teacherdata;
			$scope.ship=$rootScope.shipdata;
			$scope.news = $rootScope.newsdata;
			$scope.lessons = $rootScope.lessonsdata;
			$scope.number=TeacherDataFetch.count
			$scope.wp={};
			$scope.wp=$rootScope.wpdata;
			$scope.images = $scope.wp.Images
			$scope.number=$scope.teacherdatacount;							
							
			
		}
		$scope.teacherdatacount = TeacherDataFetch.count += 1;
};

$scope.runtabs=function()
	{
		window.scrollTo(0,1000);
	};

$scope.accessData();


$scope.switchFavorite=function(id, type)
	{
		var blogTitle=[];
		var imgSrc=[];
		var lessonUrl = [];
		///////////////Blogs//////////////////
		if(type=='blog')
		{
			
			if(localStorage.getItem('BlogArr')!=null && localStorage.getItem('FavoriteArr')!='')
					{
						var blogFav = jQuery.parseJSON(localStorage.getItem('BlogArr'));
						
					}
				else
				{
					var blogFav=[];
				}
				
			if($scope.wp.items[id].favorite=='off')
			{
				$scope.wp.items[id].favorite='on';
				blogFav.push( $scope.wp.items[id]);
				localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
				
			//$rootScope.favorites = Favorites.addFavorites($rootScope.wpdata.items, 'blog');
			}
			else{
				
				for(var x=0; x<blogFav.length; x++)
				{
					blogTitle.push(blogFav[x].BlogTitle);
				}
				
				$scope.wp.items[id].favorite='off';
				var index=blogTitle.indexOf($scope.wp.items[id].BlogTitle);
				blogFav.splice(index, 1);
				localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
			
			//$rootScope.favorites = Favorites.removeFavorites($rootScope.wpdata.items, 'blog');	
			
			}
			
			
			//localStorage.setItem('BlogArr', JSON.stringify($rootScope.favorites.blog));
			
		}	
		////////////////PHotos//////////////////
		if(type=='photo')
		{
			if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
		
				
		if($scope.images[id].favorite=='off')
			{
				$scope.images[id].favorite='on';
				
				imgFav.push( $scope.wp.Images[id]);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				
				
				//$rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
			}
			else{
				for(var y=0; y<imgFav.length; y++)
				{
					imgSrc.push(imgFav[y].src);
				}
				$scope.images[id].favorite='off';
				var index=imgSrc.indexOf($scope.wp.Images[id].src);
				imgFav.splice(index, 1);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
			}
			 
		}
		
		///////////////////Bigphoto////////////	
		if(type=='bigphoto')
		{
			if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
			if($scope.favorite=='off')
				{
					$scope.favorite='on';
					imgFav.push( $scope.wp.Images[id]);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					// $rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
				}
				else{
					
					for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}
					$scope.favorite='off';
					var index=imgSrc.indexOf($scope.wp.Images[id].src);
					imgFav.splice(index, 1);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					 //$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
					}
					
			}	
		
		///////////Lessons////////////
		
		if(type=='lesson')
		{
			if(localStorage.getItem('LessonArr')!=null && localStorage.getItem('LessonArr')!='')
			{
				var lessonFav = jQuery.parseJSON(localStorage.getItem('LessonArr'));
			}
			else
			{
				var lessonFav =[];
			}
			
			if($scope.lessons[id].favorite=='off')
			{
				$scope.lessons[id].favorite='on';
				lessonFav.push( $scope.lessons[id]);
				localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
				//$rootScope.favorites = Favorites.addFavorites($rootScope.lessonsdata, 'lessons');
			}
			else{
				
				$scope.lessons[id].favorite='off';
				for(var y=0; y<lessonFav.length; y++)
					{
						lessonUrl.push(lessonFav[y].url);
					}
					
					var index=lessonUrl.indexOf($scope.lessons[id].url);
					lessonFav.splice(index, 1);
					localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.lessonsdata, 'lessons');		
			}
			
		}
		
		$rootScope.favorites = Favorites.addFavorites();
		for(var i=0; i<$rootScope.wpdata.items.length;i++)
		{
			Favorites.checkFavorites($rootScope.wpdata.items[i], 'blogs');
			
		}
		for(var j=0; j<$rootScope.imagedata.length;j++)
		{
			Favorites.checkFavorites($rootScope.imagedata[j], 'images');
			
		}
		for(var k=0; k<$rootScope.lessonsdata.length;k++)
		{
			Favorites.checkFavorites($rootScope.lessonsdata[k], 'lessons');
		}
		
		
	};			


$scope.openBigImage = function(img,post_title,post_url, caption, parent, id, favorite)
		{
			
			if(post_title=='undefined')
			{
				
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			
			window.scrollTo(0,0);
			$scope.bigImageSrc='';
			$scope.bigImageHider=false;
			$scope.bigImageSrc=img
			$scope.bigImage=true;
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.favorite = favorite;
			
				
			
 
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigBigImage = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			
			length=$scope.images.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			
			$scope.alt=$scope.images[prev].caption;
			$scope.post_title = $scope.images[prev].post_title;
			if(post_title=='undefined')
			{
				
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			$scope.post_url = $scope.images[prev].post_url;
			$scope.parent = $scope.images[prev].parent;
			$scope.id = $scope.images[prev].id;
			$scope.favorite = $scope.images[prev].favorite;
			 $scope.bigImageSrc=$scope.images[prev].src
			
		}
           
		
		$scope.nextImg = function(id)
		{
			
			
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.images.length;
            
			var next = (parseInt(id)+1)
			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			
			//$scope.bigImageSrc=[$scope.images[next].src];
			$scope.favorite = $scope.images[next].favorite;
       $scope.bigImageSrc=$scope.images[next].src;
        $scope.alt=$scope.images[next].caption;
		$scope.post_title = $scope.images[next].post_title;
		if(post_title=='undefined')
			{
				
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
		$scope.post_url = $scope.images[next].post_url;
		$scope.parent = $scope.images[next].parent;
		$scope.id = $scope.images[next].id;			
			
		
		};
		
		$scope.SkipValidation = function(value) {
						  return $sce.trustAsHtml(value);
						};
						
		
		

	}]);			


angular.module('Media', [])
.controller('mediaPage', ['$scope','$rootScope','$location','$routeParams','Media','Teacher','preloadImage','Slideshow','Favorites', function($scope, $rootScope, $location, $routeParams,Media,Teacher , preloadImage, Slideshow, Favorites)
{
	myScroll  = new iScroll("wrapper", {hScrollbar:false});
	$scope.bigImage = false;
	$scope.bigImage2 = false;
	$scope.popup=false;
	$scope.popup2=false;
	Media.loadMediaList().then(function(data)
	{
		$scope.dataLoaded=true;
		$scope.teachers=data;
		$scope.teachers.buttons[0].state='on';
	}
);

		Slideshow.loadSlideData('11INSvguka4SOHln9R4C8C96EQ1kkpoaw-EC8l7_h').then(function(data)
			{
				$scope.slides = data;
				$scope.slides[0].visible=true;
				$scope.slides[0].classy='active';
				$scope.slideshow_width = $scope.slides.length*620;
				$scope.playhider=true;
			});

	$scope.tabClick = function(number)
	{
		for(var x=0; x<$scope.teachers.buttons.length; x++)
			{
				if(x!=number)
				{
				$scope.teachers.buttons[x].state='off';
				}
				else
				{
					$scope.teachers.buttons[x].state='on';
				}
			}
	};
	$scope.nameClick = function(year, name)
	{
		Teacher.getWPData(year, name.replace(/'/g, "")).then(function(result)
		{
			$scope.name=name;
			//$scope.name = $scope.name.replace(/'/g, "\'");
			
			$scope.wp = result;
			$scope.images = $scope.wp.Images;
			for(var x=0; x<$scope.images.length; x++)
			{
				Favorites.checkFavorites($scope.images[x], 'images');
			}
			$scope.bigImage=true;
			$scope.bigImage2=false;
			$scope.popup=true;
		});
	};
	
	$scope.closeBigImage = function()
		{	
			$scope.bigImage=false;
			$scope.popup=true;
			$scope.popup2=false;
		};
	$scope.closeBigBigImage2 = function()
		{
			
			$scope.bigImage2=false;
			$scope.popup2=false;
			$scope.popup=true;
			$scope.bigImage=true;
		};	
		
	$scope.openBigImage = function(img,post_title,post_url, caption, parent, id, favorite)
		{
			$scope.isLoading = true;
			if(post_title=='undefined')
			{
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			window.scrollTo(0,0);
			$scope.bigImageSrc='';
			
			
			$scope.loadHider=false;
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			
            	
			$scope.bigImage2=true;
			$scope.bigImage=false;
			$scope.popup2=true;
			$scope.popup=false;
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.favorite=favorite;
			$scope.bigImageSrc=img;
			preloadImage.runPreloader('.xyzPhoto');
			//$scope.isLoading = false;
			
		
		};
		
		
		
		/*$scope.closeBigImage = function()
		{
			$scope.bigImage=true;
			
		};*/
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc='';
			$scope.isLoading = true;
			length=$scope.images.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			
            // Loading was successful.
          
           
           	$scope.isLoading = true;
            $scope.isSuccessful = false;
			$scope.alt=$scope.images[prev].caption;
			$scope.post_title = $scope.images[prev].post_title;
			if($scope.post_title=='undefined')
			{
				
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			$scope.post_url = $scope.images[prev].post_url;
			$scope.parent = $scope.images[prev].parent;
			$scope.id = $scope.images[prev].id;
			$scope.favorite = $scope.images[prev].favorite;
			$scope.bigImageSrc=$scope.images[prev].src;
			preloadImage.runPreloader('.xyzPhoto');
 			
                   
 
		};
		
		$scope.nextImg = function(id)
		{
			$scope.loadHider=true;
			$scope.bigImageSrc=''
			$scope.isLoading = true;
			console.log($scope.isLoading);
			
            length=$scope.images.length;
			var next = (parseInt(id)+1)
			if(next<($scope.images.length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
            $scope.alt=$scope.images[next].caption;
			$scope.post_title = $scope.images[next].post_title;
			if($scope.post_title=='undefined')
			{
				
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			$scope.post_url = $scope.images[next].post_url;
			$scope.parent = $scope.images[next].parent;
			$scope.id = $scope.images[next].id;
			$scope.favorite = $scope.images[next].favorite;
			$scope.bigImageSrc=$scope.images[next].src;
			preloadImage.runPreloader('.xyzPhoto');
			
			
			
 
			
			$scope.imageLoaded=true;
		};	
		
		$scope.switchFavorite=function(id, type)
		{
		var imgSrc=[];	
		if(type=='photo')
		{
			if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
			if($scope.images[id].favorite=='off')
				{
					$scope.images[id].favorite='on';
					imgFav.push( $scope.wp.Images[id]);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					// $rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
					
				}
				else{
					for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}

					$scope.images[id].favorite='off';
					var index=imgSrc.indexOf($scope.wp.Images[id].src);
					imgFav.splice(index, 1);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					// $rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
					
				}
				
		}	
		if(type=='bigphoto')
		{
		if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}	
			
		if($scope.favorite=='off')
			{
				$scope.favorite='on';
				imgFav.push( $scope.wp.Images[id]);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.addFavorites($scope.wp.Images, 'images');
				
			}
			else{
				
				$scope.favorite='off';
				for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}
					$scope.images.favorite='off';
					var index=imgSrc.indexOf($scope.wp.Images[id].src);
					imgFav.splice(index, 1);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					//$rootScope.favorites = Favorites.removeFavorites($scope.wp.Images, 'images');

				}
				
		}
			
			$rootScope.favorites = Favorites.addFavorites();
			for(var i=0; i<$rootScope.wpdata.items.length;i++)
			{
				Favorites.checkFavorites($rootScope.wpdata.items[i], 'blogs');
				
			}
			for(var j=0; j<$rootScope.imagedata.length;j++)
			{
				Favorites.checkFavorites($rootScope.imagedata[j], 'images');
				
			}
			for(var k=0; k<$rootScope.lessonsdata.length;k++)
			{
				Favorites.checkFavorites($rootScope.lessonsdata[k], 'lessons');
				
			}

	};
}])



.controller('newsPage', ['$scope','$location','$routeParams','News','Teacher','preloadImage', function($scope, $location, $routeParams,News,Teacher , preloadImage)
{
	$scope.bigImage = false;
	$scope.bigImage2 = false;
	$scope.location = $location.path()
	News.getNewsData().then(function(results){
		$scope.data=results.finalNews.reverse();
		$scope.years= results.finalYearsArr.reverse();
		$scope.filtered_data=[];
		$scope.itemsPerPage = 7;
  		if($routeParams.news_num!==undefined)
		{
  		$scope.currentPage = parseInt($routeParams.news_num.replace('page',''));
  		}
  		else
  		{
  		$scope.currentPage=0;
  		}//console.log($scope.offset);
		for(var i=0; i<($scope.data.length); i++)
		{
			$scope.data[i].main.newsItemsFinal=[];
			var splitter = $scope.data[i].extra.split('$$')
			
				
			
			for(var x=0; x<splitter.length-1;x++)
			{
				
			var number=$scope.data[i].main.newsItemsFinal.length+1;
			$scope.data[i].main.newsItemsFinal.push(jQuery.parseJSON('{"articletitle":"'+splitter[x].split('##')[0]+'","mediaoutlet":"'+splitter[x].split('##')[1]+'","articleurl":"'+splitter[x].split('##')[2]+'","mediaoutleturl":"'+splitter[x].split('##')[3]+'"}'));
			
			}
		}
		for(var y=($scope.currentPage*$scope.itemsPerPage); y<($scope.itemsPerPage*($scope.currentPage+1)); y++)
		{
			$scope.filtered_data.push($scope.data[y]);
		}

		$scope.news.dataLoaded=true;
		$scope.noFilter=true;
	});
		
	$scope.checkLength = function(query)
	{
		if(query.length==0)
		{
			$scope.noFilter=true;
		}
		else
		{
			$scope.noFilter=false;
		}
	}	;

	
}])


.controller('powPage', ['$scope','$location','$routeParams','POW','preloadImage','$sce', function($scope, $location, $routeParams,POW, preloadImage, $sce)
{
	
	$scope.bigImage =false;
	$scope.noFilter=true;
	$scope.location = $location.path();
	POW.getPOWData().then(function(result){
		$scope.pow = result;
		$scope.pow[0].finalImage=$scope.pow[0].url
				
		$scope.data = [];
		$scope.filtered_data=[];
		$scope.pow.checkContents =true;
		$scope.itemsPerPage = 3;
  		$scope.currentPage = 0;
  		
  		if($routeParams.pow_num!==undefined)
  		{
		$scope.currentPage = parseInt($routeParams.pow_num.replace('page',''));
		}
		else
		{
		$scope.currentPage=0;
		}
		for(var x=1; x<$scope.pow.length; x++)
		{
			$scope.data.push($scope.pow[x]);
			
		}
		for(var y=($scope.currentPage*$scope.itemsPerPage); y<($scope.itemsPerPage*($scope.currentPage+1)); y++)
		{
			$scope.filtered_data.push($scope.data[y]);
		
		}
		$scope.pow.checkContents = true;	
		
	});	
	
	$scope.checkLength = function(query)
	{
		if(query.length==0)
		{
			$scope.noFilter=true;
		}
		else
		{
			$scope.noFilter=false;
		}
	}	;
	
	$scope.openBigImage = function(img,post_title,post_url, caption, parent, id)
		{
			window.scrollTo(0,0);
			$scope.bigImageHider=false;
			$scope.bigImageSrc='';
			$scope.bigImageSrc=img;
			
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.percentLoaded = 0;
							
			
		
		};
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=''
			length=$scope.data.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			$scope.isLoading = true;
            $scope.isSuccessful = false;
			$scope.alt=$scope.data[prev].caption;
			$scope.post_title = $scope.data[prev].post_title;
			$scope.post_url = $scope.data[prev].post_url;
			$scope.parent = $scope.data[prev].parent;
			$scope.id = $scope.alert(id);[prev].id;
			preloadImage.preloadImages([$scope.data[prev].ur])
			 $scope.bigImageSrc=$scope.data[prev].url
			
            
 
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc='';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.data.length;
			
			var next = (parseInt(id)+1)
			
;			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			$scope.bigImageSrc=$scope.data[next].url;
            $scope.alt=$scope.data[next].caption;
			$scope.post_title = $scope.data[next].post_title;
			$scope.post_url = $scope.data[next].post_url;
			$scope.parent = $scope.data[next].parent;
			$scope.id = $scope.data[next].id;
			//$scope.bigImageSrc=[$scope.images[next].src];
			
			
 						
                        // Loading was successful.
                       
                       
 
                  
		};
		
		
		
		$scope.SkipValidation = function(value) {
						  return $sce.trustAsHtml(value);
						};


}]);

angular.module('Alumni', [])
.controller('spotPage', ['$scope','$location','$routeParams','preloadImage','Alumni','$sce','$rootScope', function($scope, $location, $routeParams, preloadImage, Alumni, $sce, $rootScope)
{
		//alert($routeParams.spot_num.replace('page',''));
		$scope.bigImage=false;
		$scope.noFilter=true;
		$scope.indivSpot=false;
		$scope.location = $location.path();
		//$scope.checkContents=false;
		$scope.count=0;
	
		Alumni.getSpotData().then(function(data)
		{
		$scope.data = data;
		$scope.filtered_data=[];
		$scope.checkContents =true;
		$scope.itemsPerPage = 5;
		if($routeParams.spot_num!==undefined)
		{
  		$scope.currentPage = parseInt($routeParams.spot_num.replace('page',''));
  		}
  		else
  		{
  		$scope.currentPage=0;
  		}
  	
  		
			for(var y=($scope.currentPage*$scope.itemsPerPage); y<($scope.itemsPerPage*($scope.currentPage+1)); y++)
			{
			$scope.filtered_data.push($scope.data[y]);
				if($scope.data[y].longbody=="#" || $scope.data[y].longbody==$scope.data[y].shortbody)
				{
					$scope.data[y].hideLongBody=true;
				}
				else
				{
					$scope.data[y].hideLongBody=false;
				}
			}
		
		$scope.checkContents =true;			
		});

		
$scope.checkLength = function(query)
	{
		
		if(query.length==0)
		{
			$scope.noFilter=true;
		}
		else
		{
			$scope.noFilter=false;
		}
	};
	


$scope.openBigImage = function(img,post_title,post_url, caption, parent, id)
		{
			window.scrollTo(0,0);
			$scope.bigImageHider=false;
			$scope.bigImageSrc=''
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.bigImageSrc=img
			
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc='';
			length=$scope.data.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			$scope.isLoading = true;
            $scope.isSuccessful = false;
			$scope.alt=$scope.data[prev].caption;
			$scope.post_title = $scope.data[prev].post_title;
			$scope.post_url = $scope.data[prev].post_url;
			$scope.parent = $scope.data[prev].parent;
			$scope.id = $scope.alert(id);[prev].id;
			$scope.bigImageSrc=$scope.data[prev].url
			
 
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc='';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.data.length;
			
			var next = (parseInt(id)+1)
			
;			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			  $scope.alt=$scope.data[next].caption;
				$scope.post_title = $scope.data[next].post_title;
				$scope.post_url = $scope.data[next].post_url;
				$scope.parent = $scope.data[next].parent;
				$scope.id = $scope.data[next].id;
				$scope.bigImageSrc=$scope.data[next].url;
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			
 
			
			$scope.imageLoaded=true;
		};
		
		
		
		$scope.SkipValidation = function(value) {
						  return $sce.trustAsHtml(value);
						};

		
}])

.controller('openIndivSpot', ['$scope','$location','$routeParams','preloadImage','Alumni','$sce', '$rootScope', function($scope, $location, $routeParams, preloadImage, Alumni, $sce, $rootScope)
{
	
	
	$scope.bigImage=false;
	$scope.checkContents=false;
		////////////////routeParams//////////////////
	if($rootScope.alumni_spot==null)
	{
		Alumni.getSpotData().then(function(data)
		{
		
		$rootScope.alumni_spot = data;
		$rootScope.alumni_spot.checkContents= false;
		//console.log($rootScope.alumni_spot);
		for(var i=0; i<$rootScope.alumni_spot.length; i++)
			{
				
				if($routeParams.spot_title==$rootScope.alumni_spot[i].hash.split('/indiv_spotlight/')[1])
				{
				$scope.indiv_image='/images/NOAA-Logo.gif'
				$scope.isLoading = true;
           		$scope.isSuccessful = false;
			 	var img=[$rootScope.alumni_spot[i].url.split('?')[0]+'?w=400'];
				$scope.indiv_title = $rootScope.alumni_spot[i].firstname+' '+$rootScope.alumni_spot[i].lastname;
				$scope.indiv_caption = $rootScope.alumni_spot[i].caption;
				$scope.indiv_longbody = $rootScope.alumni_spot[i].longbody;
				$scope.indivSpot=true;
				$scope.checkContents =true;
				preloadImage.preloadImages(img)
				.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
		                  
                        $scope.indiv_image=img[0]
                       
 
                    }
                   
               );
			
				}
			}
			
		});
		
	}
	else
	{
		window.scrollTo(0,50);
		
		
			for(var i=0; i<$rootScope.alumni_spot.length; i++)
			{
				if($routeParams.spot_title==$rootScope.alumni_spot[i].hash.split('/indiv_spotlight/')[1])
				{
				$scope.indiv_image='/images/NOAA-Logo.gif'
				$scope.isLoading = true;
           		$scope.isSuccessful = false;
			 	var img=[$rootScope.alumni_spot[i].url.split('?')[0]+'?w=400'];
				$scope.indiv_title = $rootScope.alumni_spot[i].firstname+' '+$rootScope.alumni_spot[i].lastname;
				$scope.indiv_caption = $rootScope.alumni_spot[i].caption;
				$scope.indiv_longbody = $rootScope.alumni_spot[i].longbody;
				$scope.indivSpot=true;
				$scope.checkContents =true;
				preloadImage.preloadImages(img)
				.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
		                  
                        $scope.indiv_image=img[0]
                       
 
                    }
                   
               );
			}	
			

	}
}		
$scope.SkipValidation = function(value) {
						  return $sce.trustAsHtml(value);
						};
	
}]);
		
angular.module('TabPages', [])
.controller('TabsPages-NoTop', ['$scope','$location','$routeParams','preloadImage','Tabs', 'TabsDataFetch','TabsDataFetchTop', '$sce', '$rootScope', function($scope, $location, $routeParams, preloadImage, Tabs,TabsDataFetch,TabsDataFetchTop, $sce, $rootScope)
{	
	
	
	$scope.bigImage=false;
	$scope.spreadsheets =[{type:'alumni', spreadsheet_id:'0Ak_vKEBczgcYdGdFNGlHZEhOUGRYQW8yOFlrQktxZGc'}, {type:'about', spreadsheet_id:'0Ak_vKEBczgcYdHpJQnNPOTZWRDlIVVZ3MV9NOGxRVEE'}, {type:'how_to_apply', spreadsheet_id:'0Ak_vKEBczgcYdDNvV29Ka1BJN1Ezd2dMcnJOOW8zY0E'}, {type:'ships', spreadsheet_id:'0Ak_vKEBczgcYdG1wa0tIWmRrU28yNVFQR29RT2tvR1E'}, {type:'resources', spreadsheet_id:'0Ak_vKEBczgcYdE13QzE0Y0xMMm1oaTh3WjFKRktsRHc'}];
	
	for(var x=0; x<$scope.spreadsheets.length;x++)
	{
		
		if($scope.spreadsheets[x].type==$location.path().split('/')[1].split('/')[0])
		{
			$scope.spreadsheet = $scope.spreadsheets[x].spreadsheet_id;
			$scope.location='/'+$scope.spreadsheets[x].type+'/';
			$scope.type = $scope.spreadsheets[x].type;
		}
	}
	var tabsdatacount = TabsDataFetch.count;
	$scope.accessData = function()
	{
	
		if(tabsdatacount==0)
		{
			
			TabsDataFetch.data($scope.spreadsheet, $scope.type).then(function(result){
				$scope.tabs = result;
				if($scope.tabs.count!=0)
				{
				$rootScope.tabsdata=result;
				
				for(var i=0; i<$scope.tabs.length; i++)
				{
					$scope.tabs[i].gsx$tabname.$t=toTitleCase($scope.tabs[i].gsx$tabname.$t);
					$scope.tabs[i].gsx$tabname.classy='hider2';
					$scope.tabs[i].gsx$tabname.state='off'
					
					if($routeParams.tabname!=undefined && $routeParams.tabname.replace(/_/g, ' ').toLowerCase()==$scope.tabs[i].gsx$tabname.$t.toLowerCase())
					{
						$scope.tabs[i].gsx$tabname.classy='shower2';
						$scope.tabs[i].gsx$tabname.state='on'
					}
					else if($routeParams.tabname==undefined && i==($scope.tabs.length-1))
					{
						
						$location.path($scope.location+$scope.tabs[0].gsx$tabname.rp);
					}
					
				}
				$scope.dataLoaded=true;
				}
				else
				{
					$scope.dataLoaded=false;
				}
				
				});
			
			
				
			}
			else if($rootScope.tabsdata.type.toLowerCase()!=$location.path().split('/')[1].split('/')[0].toLowerCase())
			{
				tabsdatacount=0;
				$scope.accessData();
			}
			else
			{
			$scope.tabs = $rootScope.tabsdata;
			for(var i=0; i<$scope.tabs.length; i++)
				{
					$scope.tabs[i].gsx$tabname.$t=toTitleCase($scope.tabs[i].gsx$tabname.$t);
					$scope.tabs[i].gsx$tabname.classy='hider2';
					$scope.tabs[i].gsx$tabname.state='off';
					if($routeParams.tabname!=undefined && $routeParams.tabname.replace(/_/g,' ' ).toLowerCase()==$scope.tabs[i].gsx$tabname.$t.toLowerCase())
					{
						$scope.tabs[i].gsx$tabname.classy='shower2';
						$scope.tabs[i].gsx$tabname.state='on'
					}
					else if($routeParams.tabname==undefined && i==($scope.tabs.length-1))
					{
						
						$location.path($scope.location+$scope.tabs[0].gsx$tabname.rp);
					}
					
				}
				$scope.dataLoaded=true;
			}
			tabsdatacount = TabsDataFetch.count += 1;
	};
	$scope.runtabs_no_top=function()
	{
		
		window.scrollTo(0,1000);
	};
	
	
	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};	
	
	$scope.accessData();
	
}])


.controller('Tabs', ['$scope','$location','$routeParams','preloadImage','Tabs', 'TabsDataFetch','TabsDataFetchTop', '$sce', '$rootScope', function($scope, $location, $routeParams, preloadImage, Tabs,TabsDataFetch,TabsDataFetchTop, $sce, $rootScope)
{	
	

	$scope.bigImage=false;
	$scope.spreadsheets =[{type:'alumni', spreadsheet_id:'0Ak_vKEBczgcYdGdFNGlHZEhOUGRYQW8yOFlrQktxZGc'}, {type:'about', spreadsheet_id:'0Ak_vKEBczgcYdHpJQnNPOTZWRDlIVVZ3MV9NOGxRVEE'}, {type:'how_to_apply', spreadsheet_id:'0Ak_vKEBczgcYdDNvV29Ka1BJN1Ezd2dMcnJOOW8zY0E'}, {type:'ships', spreadsheet_id:'0Ak_vKEBczgcYdG1wa0tIWmRrU28yNVFQR29RT2tvR1E'}, {type:'resources', spreadsheet_id:'0Ak_vKEBczgcYdE13QzE0Y0xMMm1oaTh3WjFKRktsRHc'}];
	
	for(var x=0; x<$scope.spreadsheets.length;x++)
	{
		
		if($scope.spreadsheets[x].type==$location.path().split('/')[1].split('/')[0])
		{
			$scope.spreadsheet = $scope.spreadsheets[x].spreadsheet_id;
			$scope.location='/'+$scope.spreadsheets[x].type+'/';
			$scope.type = $scope.spreadsheets[x].type;
		}
	}
	var tabsdatacount = TabsDataFetch.count;
	var topdatacount=TabsDataFetchTop.count;
	
	$scope.accessData = function()
	{
	
		if(tabsdatacount==0 ||topdatacount==0)
		{
			$scope.loadHider=false;
			
			$rootScope.topdata ={};
			$rootScope.tabsdata={};
			
			TabsDataFetchTop.data($scope.spreadsheet, $scope.type).then(function(result)
			{
				
				$scope.top=result;
				console.log($scope.top);
				$scope.top.finalImage=$scope.top.image.split('?')[0];
				console.log($scope.top.finalImage)
				
				$rootScope.topdata=result;
				
			}).then(function(){
				TabsDataFetch.data($scope.spreadsheet, $scope.type).then(function(result){
				$scope.tabs = result;
				if($scope.tabs.count!=0)
				{
				$rootScope.tabsdata=result;
				
				for(var i=0; i<$scope.tabs.length; i++)
				{
					$scope.tabs[i].gsx$tabname.$t=toTitleCase($scope.tabs[i].gsx$tabname.$t);
					$scope.tabs[i].gsx$tabname.classy='hider2';
					$scope.tabs[i].gsx$tabname.state='off'
					
					if($routeParams.tabname!=undefined && $routeParams.tabname.replace(/_/g, ' ').toLowerCase()==$scope.tabs[i].gsx$tabname.$t.toLowerCase())
					{
						$scope.tabs[i].gsx$tabname.classy='shower2';
						$scope.tabs[i].gsx$tabname.state='on'
					}
					else if($routeParams.tabname==undefined && i==($scope.tabs.length-1))
					{
						
						$location.path($scope.location+$scope.tabs[0].gsx$tabname.rp);
					}
					$scope.dataLoaded=true;
					
				}
				
				}
				else
				{
					$scope.dataLoaded=false;
				}
				});
			});
			
			
				
				
			}
			else if($rootScope.tabsdata.type.toLowerCase()!=$location.path().split('/')[1].split('/')[0].toLowerCase())
			{
				
				tabsdatacount=0;
				topdatacount=0;
				$scope.accessData();
			}
			else
			{
			$scope.tabs = $rootScope.tabsdata;
			$scope.top=$rootScope.topdata;
			for(var i=0; i<$scope.tabs.length; i++)
				{
					$scope.tabs[i].gsx$tabname.$t=toTitleCase($scope.tabs[i].gsx$tabname.$t);
					$scope.tabs[i].gsx$tabname.classy='hider2';
					$scope.tabs[i].gsx$tabname.state='off';
					if($routeParams.tabname!=undefined && $routeParams.tabname.replace(/_/g,' ' ).toLowerCase()==$scope.tabs[i].gsx$tabname.$t.toLowerCase())
					{
						$scope.tabs[i].gsx$tabname.classy='shower2';
						$scope.tabs[i].gsx$tabname.state='on'
					}
					else if($routeParams.tabname==undefined && i==($scope.tabs.length-1))
					{
						
						$location.path($scope.location+$scope.tabs[0].gsx$tabname.rp);
					}
					
				}
				$scope.dataLoaded=true;
			//	$scope.image = $scope.top[0].gsx$image.$t;
			}
			tabsdatacount = TabsDataFetch.count += 1;
			topdatacount = TabsDataFetchTop.count+=1;
	};
	$scope.runtabs=function()
	{
		window.scrollTo(0,1000);
	};
	
	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};	
	
	$scope.accessData();
	
	
	
	
}]);	

angular.module('FAQs', [])
.controller('getFAQsData', ['$scope','$location','$routeParams','preloadImage','FAQs','$sce', '$rootScope', function($scope, $location, $routeParams, preloadImage, FAQs, $sce, $rootScope)
{	
	$scope.bigImage=false;	
	$scope.buttons = [{name:'Facts', state:'on', classy:'shower2'},{name:'Quotes', state:'off', classy:'hider2'}]
	$scope.buttonChange = function(name)
	{
		for(var i=0; i<$scope.buttons.length; i++)
		{
			
			if(name == $scope.buttons[i].name)
			{
				$scope.buttons[i].state='on';
				$scope.buttons[i].classy='shower2'
			}
			else{
				$scope.buttons[i].state='off';
				$scope.buttons[i].classy='hider2'
			}
		}
	};
	
	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};
		
	$scope.showAnswer = function(id) {
		if($scope.faqs[id].gsx$answer.hideAnswer==true)	
		{
	     $scope.faqs[id].gsx$answer.hideAnswer=false;
	    }
	    else
	    {
	    	 $scope.faqs[id].gsx$answer.hideAnswer=true;
	    }
    
   };	
   
   
	FAQs.getFAQData().then(function(result){
		$scope.faqs=result;
		
		$scope.checkContents =true
	});
	
	FAQs.getQuotesData().then(function(result){
		$scope.quotes = result
		console.log($scope.quotes);
	});
	
	
}]);	

angular.module('TASA', [])
.controller('getTASAData', ['$scope','$location','$routeParams','preloadImage','TASA','$sce', '$rootScope', function($scope, $location, $routeParams, preloadImage, TASA, $sce, $rootScope)
{	
	$scope.bigImage=false;	
	$scope.regions =[{type:'netasa', ab:'NE'}];
	$scope.teacher_for_rollover={};
	$scope.showInfo=false;
	for(var x=0; x<$scope.regions.length;x++)
	{
		
		if($scope.regions[x].type==$location.path().split('/')[1].split('/')[0].toLowerCase())
		{
			$scope.region = $scope.regions[x].ab;
			//$scope.location='/'+$scope.regions[x].type+'/';
		}
	}
	
	$scope.openBigImage = function(img, caption, id)
		{
			window.scrollTo(0,0);
			$scope.bigImageHider=false;
			$scope.bigImage=true;
			$scope.bigImageSrc=''
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.alt=caption;
			$scope.id = id;
			$scope.percentLoaded = 0;
			 $scope.bigImageSrc=img;			
			
		
		};
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
			goToByScrollTop('gallery');
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc='';
			length=$scope.gallery.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			
			$scope.alt=$scope.gallery[prev].gsx$caption.$t;
			$scope.id = $scope.gallery[prev].id.$t;
			$scope.bigImageSrc=$scope.gallery[prev].gsx$photourl.$t;
			
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc=''
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.gallery.length;
			
			var next = (parseInt(id)+1)
			
;			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			 $scope.isLoading = false;
            $scope.isSuccessful = true;
           $scope.bigImageSrc=$scope.gallery[next].gsx$photourl.$t;
            $scope.alt=$scope.gallery[next].gsx$caption.$t;
			
			$scope.id = $scope.gallery[next].id.$t;
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			
		};
		
	
	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};
	
	$scope.rollClickState=function(id)
	{
			
			for(var i=0; i<$scope.teachers.length; i++)
			{
			
			if(id.toLowerCase()==$scope.teachers[i].gsx$teachername.$t.toLowerCase())
					{
						
						$scope.showInfo=true;
						
						$scope.teacher_for_rollover = $scope.teachers[i];
						console.log($scope.teacher_for_rollover);
						
					}
					
		}
	};
		
		
			
	$scope.closeRollover=function()
	{
		
		$scope.showInfo=false;
	};
	
	TASA.getSpotlightData($scope.region).then(function(data)
	{
		$scope.spot = data;
		
	});
	
	TASA.getIntroData().then(function(data)
	{
		$scope.intro = data;
		
	});
	TASA.getGalleryData().then(function(data)
	{
		$scope.gallery = data;
	});
	TASA.getTeacherData().then(function(data)
	{
		$scope.teachers=data;
		$scope.checkContents=true;
	});
	
	
	
}]);

angular.module('Homepage', [])
.controller('homePageController', ['$scope','$location','$routeParams','preloadImage','$sce', '$rootScope','HomepageData','Slideshow', function($scope, $location, $routeParams, preloadImage,  $sce, $rootScope, HomepageData, Slideshow)
{	
	
	
		
	$scope.currentIndex =0;
	$scope.slides={};
	$scope.bigImage=false;
	$scope.currentHider =true;
	$scope.alumniHider =true;
	$scope.powHider =true;
	$scope.dykHider =true;
	
	
	$scope.tweets={name:'tweets', state:"on",classy:'shower2' };
	$scope.photos={name:'photos', state:'off', classy:'hider2'};
	$scope.videos={name:'videos', state:'off', classy:'hider2'};
	$scope.buttons =[$scope.tweets, $scope.photos, $scope.videos];
	
	$scope.buttonChange = function(name)
	{
		
		for(var i=0; i<$scope.buttons.length; i++)
		{
			
			if(name == $scope.buttons[i].name)
			{
				$scope.buttons[i].state='on';
				$scope.buttons[i].classy='shower2'
			}
			else{
				$scope.buttons[i].state='off';
				$scope.buttons[i].classy='hider2'
			}
		}
	};
	$scope.showTitle=function(id)
	{
		$scope.images[id].showTitle=true;
	};
	$scope.hideTitle=function(id)
	{
		$scope.images[id].showTitle=false;
	};
	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};
	$scope.closeBigImage = function()
	{
		$scope.bigImage=false;
		$scope.bigImageHider=true;
	};
	
	$scope.bigImageHider=true;
	$scope.popupHider=true;
	$scope.searchBox=false;
	$scope.currentLoader =true;
	
/*	HomepageData.getTeacherData().then(function(data)
	{
		$scope.teachers = data;
		$scope.currentHider=false;
	});
	
	HomepageData.getSpotlightData().then(function(data)
	{
		$scope.spotlights = data;
		$scope.alumniHider=false;

		//console.log($scope.spotlights);
	});
*/	
	/*HomepageData.getPOWData().then(function(data)
	{
		$scope.pows = data;
		$scope.powHider=false;

			
	});*/
	
	HomepageData.getDYKData().then(function(data)
	{
		$scope.dyks = data;
		$scope.dykHider=false;

			
	});
	
	HomepageData.getNewsData().then(function(data)
	{
		$scope.news = data;
		$scope.newsHider=false;
	});
	
	HomepageData.getWPData().then(function(data)
	{
		$scope.data = data;
		$scope.wpMinus=[];
		$scope.images=[];
		$scope.videosArr=[]
		for(var x=0; x<4; x++)
		{
			$scope.wpMinus.push({item:$scope.data.items[x], id:x});
		}
		for(var i=0; i<15; i++)
		{
			$scope.images.push($scope.data.Images[i]);
			$scope.images[i].id=i;
			$scope.images[i].showTitle=false;
		}
		for(var n=0; n<8; n++)
		{
			
			$scope.videosArr.push($scope.data.WPVid[n]);
			//$scope.videos[n].id=n;
		}
		$scope.wpHider=false;
		$scope.checkContents = false;
			
	});
	
	
	
	
}]);




angular.module('Highlights', [])
.controller('highlightsController', ['$scope','$location','$routeParams','preloadImage','$sce', '$rootScope','HomepageData', function($scope, $location, $routeParams, preloadImage,  $sce, $rootScope, HomepageData)
{
	$scope.bigImage=false;
}]);

angular.module('PastSeasons', [])
.controller('pastController', ['$scope', function($scope)
{
	$scope.bigImage=false;
}]);


angular.module('Footer', [])
.controller('Footer', ['$scope', function($scope)
{
		$scope.showSiteMap=true;
		
	$scope.clickFooter=function()
	{
		if($scope.showSiteMap==true)
		{
			$scope.showSiteMap=false;
		}
		else
		{
			$scope.showSiteMap=true;
		}
	};	
		
}]);

angular.module('Favorites', [])
.controller('FavoriteController', ['$scope','$location','$routeParams','preloadImage','$sce', '$rootScope','Favorites', 'preloadImage', function($scope, $location, $routeParams, preloadImage,  $sce, $rootScope, Favorites, preloadImage)
{
	$scope.toggleInfo = function()
	{
		if($scope.LSinfo==false)
		{
			$scope.LSinfo=true;
			$scope.showOption=false
		}
		else{
			$scope.LSinfo=false;
			$scope.showOption=true;
		}
	};
	
	$scope.toggleEmail = function()
	{
		if($scope.showEmailForm==false)
		{
			$scope.showEmailForm=true;
			$scope.showOption=false
		}
		else
		{
			$scope.showEmailForm=false;
			$scope.showOption=true;
		}
	};
	
	$scope.openFavorites=function()
	{
		
		$scope.bigImageFav=true;
		$scope.popupHider6=false;
		$rootScope.favorites =Favorites.addFavorites();
		
		
	};	
	$scope.closeFavorites = function()
	{
		$scope.popupHider6=true;
		$scope.bigImageFav=false;
	};
	
	$scope.openBigImage2=function(img,post_title,post_url, caption, parent, id, favorite)
		{
			window.scrollTo(0,0);
			$scope.bigImageSrc='';
			$scope.bigImageSrc=img
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImageFav2=true;
			$scope.bigImageFav=false;
			$scope.popupHider7=false;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url[0];
			$scope.parent = parent[0];
			$scope.id = id;
			$scope.favorite = favorite;
			
				
			
 
          
			//$scope.imageLoaded=true;
		
		};
		
		
	$scope.closeBigImage2 = function()
	{
		$scope.popupHider7=true;
		$scope.bigImageFav2=false;
		$scope.popupHider6=false;
		$scope.bigImageFav=true;
	};
	
	$scope.changeClass = function(obj)
	{
		for(var x=0; x<$scope.favButtons.length; x++)
		{
			
			if(obj.name==$scope.favButtons[x].name)
			{
				$scope.favButtons[x].state='on';
				$scope.favButtons[x].classy='shower';
			}
			else
			{
				$scope.favButtons[x].state='off';
				$scope.favButtons[x].classy='hider';
			}
		}
	};
	
	$scope.switchFavorite=function(id, type)
	{
		var blogTitle=[];
		var imgSrc=[];
		var lessonUrl = [];
		///////////////Blogs//////////////////
		if(type=='blog')
		{
			
			if(localStorage.getItem('BlogArr')!=null && localStorage.getItem('FavoriteArr')!='')
					{
						var blogFav = jQuery.parseJSON(localStorage.getItem('BlogArr'));
						
					}
				else
				{
					var blogFav=[];
				}
			if($rootScope.favorites.blogs[id]!=null)
			{	
				if($rootScope.favorites.blogs[id].favorite=='off')
				{
					$rootScope.favorites.blogs[id].favorite='on';
					blogFav.push( $rootScope.favorites.blogs[id]);
					
					localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
					//$rootScope.favorites = Favorites.addFavorites($rootScope.wpdata.items, 'blog');
				}
				else{
					
					for(var x=0; x<blogFav.length; x++)
					{
						blogTitle.push(blogFav[x].BlogTitle);

					}
					
					$rootScope.favorites.blogs[id].favorite='off';
					//console.log($scope.blogs[id].favorite);
					
					var index=blogTitle.indexOf($rootScope.favorites.blogs[id].BlogTitle);
					blogFav.splice(index, 1);
										localStorage.setItem('BlogArr', JSON.stringify(blogFav));
					//$rootScope.favorites = Favorites.removeFavorites($rootScope.wpdata.items, 'blog');
				}
				
			}
			else
				{
					blogFav=[];
					localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
				}
			
		}	
		////////////////PHotos//////////////////
		if(type=='photo')
		{
			if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
		if($rootScope.favorites.images[id]!=null)
			{	
			if($rootScope.favorites.images[id].favorite=='off')
				{
					$rootScope.favorites.images[id].favorite='on';
					imgFav.push( $scope.favorite.images[id]);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					//$rootScope.favorites = Favorites.addFavorites();
					// $rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');	
				}
				else{
					for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}
					$rootScope.favorites.images[id].favorite='off';
					var index=imgSrc.indexOf($rootScope.favorites.images[id].src);
					imgFav.splice(index, 1);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					//$rootScope.favorites = Favorites.addFavorites();
					 //$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');	
					
				
			
			
			}
		}
		else
		{
			imgFav=[];
			localStorage.setItem('ImgArr',imgFav );
		}	
	}	
		////////////BigPhoto
		if(type=='bigphoto')
		{
			if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
		if($rootScope.favorites.images[id]!=null)
			{	
			if($rootScope.favorites.images[id].favorite=='off')
				{
					$rootScope.favorites.images[id].favorite='on';
					imgFav.push( $scope.favorite.images[id]);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					 //$rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
				}
				else{
					for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}
					$rootScope.favorites.images[id].favorite='off';
					var index=imgSrc.indexOf($rootScope.favorites.images[id].src);
					imgFav.splice(index, 1);
					localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
					 //$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
				}
				
			}
			else
			{
				imgFav=[];
				localStorage.setItem('ImgArr',imgFav );
			}
		}
		
		///////////Lessons////////////
		
		if(type=='lesson')
		{
			if(localStorage.getItem('LessonArr')!=null && localStorage.getItem('LessonArr')!='')
			{
				var lessonFav = jQuery.parseJSON(localStorage.getItem('LessonArr'));
			}
			else
			{
				var lessonFav =[];
			}
			if($rootScope.favorites.lessons[id]!=null)
			{
				if($rootScope.favorites.lessons[id].favorite=='off')
				{
					$scope.favorite.lessons[id].favorite='on';
					lessonFav.push( $scope.favorite.lessons[id]);
					localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
					//$rootScope.favorites = Favorites.addFavorites($rootScope.lessonsdata, 'lessons');
				}
				else{
					
					$rootScope.favorites.lessons[id].favorite='off';
					for(var y=0; y<lessonFav.length; y++)
						{
							lessonUrl.push(lessonFav[y].url);
						}
						var index=lessonUrl.indexOf($rootScope.favorites.lessons[id].url);
						lessonFav.splice(index, 1);
						localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
						//$rootScope.favorites = Favorites.removeFavorites($rootScope.lessonsdata, 'lessons');
				}
			}
			else
			{
				lessonFav=[];
				localStorage.setItem('LessonArr',lessonFav );
			}	
		}
			$rootScope.favorites = Favorites.addFavorites();
			for(var i=0; i<$rootScope.wpdata.items.length;i++)
			{
				Favorites.checkFavorites($rootScope.wpdata.items[i], 'blogs');	
			}
			
			for(var j=0; j<$rootScope.imagedata.length;j++)
			{
				Favorites.checkFavorites($rootScope.imagedata[j], 'images');
				
			}
			for(var k=0; k<$rootScope.lessonsdata.length;k++)
			{
				Favorites.checkFavorites($rootScope.lessonsdata[k], 'lessons');
				
			}
	};			
	
	$scope.setUpEmail = function()

	{
		$scope.success=true;

		$scope.email =Favorites.setUpEmail();
		$scope.address = $('#email').val();
		$scope.url = encodeURIComponent('http://teacheratsea.noaa.gov/php/send_html.php?email='+$scope.address+$scope.email);
		$scope.url = $scope.url.replace(/ /g, '%20');
		console.log($scope.url);
		if($scope.address==''||$scope.address==undefined)
		{
		alert('Please enter a valid email address');
		}
		else
		{
			Favorites.getBitLy($scope.url).then(function(result){
				$scope.short_url=result;
			});
		}
		
	};
	
	
	$scope.setUpPlainEmail = function()

	{
		$scope.success=true;
		$scope.email =Favorites.setUpEmail();
		$scope.address = $('#email').val();
		$scope.url = encodeURIComponent('http://teacheratsea.noaa.gov/php/send_plain.php?email='+$scope.address+$scope.email);
		$scope.url = $scope.url.replace(/ /g, '%20');
		console.log($scope.url);
		if($scope.address==''||$scope.address==undefined)
		{
		alert('Please enter a valid email address');
		}
		else
		{
			Favorites.getBitLy($scope.url).then(function(result){
				$scope.short_url=result;
			});
		}
				
	};	
	$scope.setUpSocial = function()
	{
		$scope.email =Favorites.setUpEmail();
		$scope.address = 'tas@noaa';
		$scope.image='http://teacheratsea.files.wordpress.com/2012/05/logo3.jpg?w=100'
		$scope.url = encodeURIComponent('http://teacheratsea.noaa.gov/php/send_html.php?email='+$scope.address+$scope.email);
		$scope.url = $scope.url.replace(/ /g, '%20');
		console.log($scope.url);
		Favorites.getBitLy($scope.url).then(function(result){
				$scope.social=result;
				
			});
		
	};	
		
		
	
	
	
	$scope.bigImageFav=false;
	$scope.popupHider6=true;
	$scope.popupHider7=true;
	$scope.bigImageFav2=false;
	$scope.LSinfo=false;
	$scope.showEmailForm=false;
	$scope.showOptions =true;
	
	$scope.favButtons = [{name:'blogs', state:'on', classy: 'shower'}, {name:'images', state:'off', classy:'hider'}, {name:'lessons', state:'off', classy:'hider'}, {name:'dyks', state:'off', classy:'hider'}];
	
	
	

}]);

angular.module('SearchBox', [])
.controller('SearchBox', ['$scope','SearchBox','preloadImage','$sce','Favorites', function($scope, SearchBox, preloadImage, $sce, Favorites)
{
	
	
	$scope.searchToggle=function()
	{
		
		if($scope.searchBox==true)
		{
			$scope.searchBox=false;
		}
		else
		{
			$scope.searchBox=true;
		}
		
	};	
	$scope.searchBlogs=function(search_blogs)
	{
		if($scope.search_blogs!=null)
		{
		$scope.search_blogs = search_blogs;
		$scope.search_blogs = $scope.search_blogs.replace(/ or /g,'');
		$scope.search_blogs = $scope.search_blogs.replace(/ and /g,'');
		$scope.search_blogs=$scope.search_blogs.replace(/ the /g,'');
		$scope.search_blogs =$scope.search_blogs.replace(/ the/g,'');
		$scope.search_blogs = $scope.search_blogs.replace(/ and/g,'');
		$scope.search_blogs = $scope.search_blogs.replace(/ or/g,'');
		$scope.search_blogs=$scope.search_blogs.replace(/and /g,'');
		$scope.search_blogs=$scope.search_blogs.replace(/the /g, '');
		$scope.search_blogs = $scope.search_blogs.replace(/or /g,'');
		$scope.search_blogs = $scope.search_blogs.replace(/,/g,'');
		$scope.search_blogs = $scope.search_blogs.replace(/,/g,'');
		//$scope.search_blogs = $scope.search_blogs.replace.lastI(' ','');
		$scope.search_blogs = $scope.search_blogs.toLowerCase();
		$scope.search_blogs = $scope.search_blogs.replace(/ a /g, ' ');
		$scope.search_blogs = $scope.search_blogs.replace(/ an /g, ' ');
	////////Runs a for loop of $scope.search_blogs variable to eliminate areas where there might be more than one space////////////////////////
			for(var t=0; t<$scope.search_blogs.length; t++)
			{
				if($scope.search_blogs.charAt($scope.search_blogs.length-1)==" ")
				{
				$scope.search_blogs = $scope.search_blogs.slice(0,$scope.search_blogs.length-1);
				}
			}
			$scope.bigImageHider=false;
			$scope.popupHider=false;
			$scope.showBlogSearch=false;
			SearchBox.searchBlogs($scope.search_blogs).then(function(result)
			{
				$scope.blogs = result;
				for(var x=0; x<$scope.blogs.length; x++)
				{
					$scope.blogs[x].id=x;
					//$scope.blogs[x].favorite='off';
					Favorites.checkFavorites($scope.blogs[x], 'blogs');	
				}
				$scope.showBlogSearch=true;
				//console.log($scope.blogs);
				
			});

		}
		////////////////If the search field is left blank, it sends an alert box with the following message: 'Please enter search terms'///////////////////////////////
		else
		{
		alert('Please enter search terms');
		}
		
			};
	
	$scope.searchImages=function(search_images)
	{
		if($scope.search_images!=null)
		{
		$scope.search_images = search_images;
		$scope.search_images = $scope.search_images.replace(/ or /g,'');
		$scope.search_images = $scope.search_images.replace(/ and /g,'');
		$scope.search_images=$scope.search_images.replace(/ the /g,'');
		$scope.search_images =$scope.search_images.replace(/ the/g,'');
		$scope.search_images = $scope.search_images.replace(/ and/g,'');
		$scope.search_images = $scope.search_images.replace(/ or/g,'');
		$scope.search_images=$scope.search_images.replace(/and /g,'');
		$scope.search_images=$scope.search_images.replace(/the /g, '');
		$scope.search_images = $scope.search_images.replace(/or /g,'');
		$scope.search_images = $scope.search_images.replace(/,/g,'');
		$scope.search_images = $scope.search_images.replace(/,/g,'');
		$scope.search_images = $scope.search_images.toLowerCase();
		$scope.search_images = $scope.search_images.replace(/ a /g, ' ');
		$scope.search_images = $scope.search_images.replace(/ an /g, ' ');
	////////Runs a for loop of $scope.search_images variable to eliminate areas where there might be more than one space////////////////////////
			for(var t=0; t<$scope.search_images.length; t++)
			{
				if($scope.search_images.charAt($scope.search_images.length-1)==" ")
				{
				$scope.search_images = $scope.search_images.slice(0,$scope.search_images.length-1);
				}
			}
			$scope.bigImageHider3=false;
			$scope.popupHider3=false;
			$scope.showImageSearch=false;
			$scope.images={};
			
			SearchBox.searchImages($scope.search_images).then(function(result)
			{
				$scope.showImageSearch=true;
				$scope.images =result;
				$scope.images.shift();
				for(var x=0; x<$scope.images.length; x++)
				{
					$scope.images[x].id=x;
					
					Favorites.checkFavorites($scope.images[x], 'images');
				}
				
				
			});

		}
		////////////////If the search field is left blank, it sends an alert box with the following message: 'Please enter search terms'///////////////////////////////
		else
		{
		alert('Please enter search terms');
		}

		
	};
	
	$scope.searchLessons=function(search_lessons)
	{
		if($scope.search_lessons!=null)
		{
		$scope.search_lessons = search_lessons;
		$scope.search_lessons = $scope.search_lessons.replace(/ or /g,'');
		$scope.search_lessons = $scope.search_lessons.replace(/ and /g,'');
		$scope.search_lessons=$scope.search_lessons.replace(/ the /g,'');
		$scope.search_lessons =$scope.search_lessons.replace(/ the/g,'');
		$scope.search_lessons = $scope.search_lessons.replace(/ and/g,'');
		$scope.search_lessons = $scope.search_lessons.replace(/ or/g,'');
		$scope.search_lessons=$scope.search_lessons.replace(/and /g,'');
		$scope.search_lessons=$scope.search_lessons.replace(/the /g, '');
		$scope.search_lessons = $scope.search_lessons.replace(/or /g,'');
		$scope.search_lessons = $scope.search_lessons.replace(/,/g,'');
		$scope.search_lessons = $scope.search_lessons.replace(/,/g,'');
		//$scope.search_lessons = $scope.search_lessons.replace.lastI(' ','');
		$scope.search_lessons = $scope.search_lessons.toLowerCase();
		$scope.search_lessons = $scope.search_lessons.replace(/ a /g, ' ');
		$scope.search_lessons = $scope.search_lessons.replace(/ an /g, ' ');
	////////Runs a for loop of $scope.search_lessons variable to eliminate areas where there might be more than one space////////////////////////
			for(var t=0; t<$scope.search_lessons.length; t++)
			{
				if($scope.search_lessons.charAt($scope.search_lessons.length-1)==" ")
				{
				$scope.search_lessons = $scope.search_lessons.slice(0,$scope.search_lessons.length-1);
				}
			}
			$scope.bigImageHider4=false;
		$scope.popupHider4=false;
		$scope.showLessonSearch=false;
		$scope.checkboxes=SearchBox.createLessonsCheck();
		SearchBox.searchLessons($scope.search_lessons).then(function(result)
		{
			
			$scope.lessons = result;
			$scope.showLessonSearch=true;
			for(var z=0; z<$scope.lessons.length; z++)
			{
				$scope.lessons[z].id=z;
				Favorites.checkFavorites($scope.lessons[z], 'lessons');
			}	
			
			
		});

		}
		////////////////If the search field is left blank, it sends an alert box with the following message: 'Please enter search terms'///////////////////////////////
		else
		{
		alert('Please enter search terms');
		}
	};


	$scope.searchSite=function(search_site)
	{
		if($scope.search_site!=null)
		{
		$scope.search_site = search_site;
		$scope.search_site = $scope.search_site.replace(/ or /g,'');
		$scope.search_site = $scope.search_site.replace(/ and /g,'');
		$scope.search_site=$scope.search_site.replace(/ the /g,'');
		$scope.search_site =$scope.search_site.replace(/ the/g,'');
		$scope.search_site = $scope.search_site.replace(/ and/g,'');
		$scope.search_site = $scope.search_site.replace(/ or/g,'');
		$scope.search_site=$scope.search_site.replace(/and /g,'');
		$scope.search_site=$scope.search_site.replace(/the /g, '');
		$scope.search_site = $scope.search_site.replace(/or /g,'');
		$scope.search_site = $scope.search_site.replace(/,/g,'');
		$scope.search_site = $scope.search_site.replace(/,/g,'');
		//$scope.search_site = $scope.search_site.replace.lastI(' ','');
		$scope.search_site = $scope.search_site.toLowerCase();
		$scope.search_site = $scope.search_site.replace(/ a /g, ' ');
		$scope.search_site = $scope.search_site.replace(/ an /g, ' ');
	////////Runs a for loop of $scope.search_site variable to eliminate areas where there might be more than one space////////////////////////
			for(var t=0; t<$scope.search_site.length; t++)
			{
				if($scope.search_site.charAt($scope.search_site.length-1)==" ")
				{
				$scope.search_site = $scope.search_site.slice(0,$scope.search_site.length-1);
				}
			}
			$scope.bigImageHider4=false;
		$scope.popupHider5=false;
		$scope.showSiteSearch=false;
		SearchBox.searchSite($scope.search_site).then(function(result)
		{
			
			$scope.sitesearch = result;
			for(var x=0; x<$scope.sitesearch.length; x++)
			{
				$scope.sitesearch[x].id=x;
			}
			
			$scope.showSiteSearch=true;
			
			
		});

		}
		////////////////If the search field is left blank, it sends an alert box with the following message: 'Please enter search terms'///////////////////////////////
		else
		{
		alert('Please enter search terms');
		}
	};
	
	
	
	$scope.lessonChecker=function(grade)
	{
		
		$scope.grades =[];
		if($scope.checkboxes[grade].checked==false)
		{
		$scope.checkboxes[grade].checked=true;
		}
		else
		{
			$scope.checkboxes[grade].checked=false;
		}
		
		for(var i=0; i<$scope.checkboxes.length; i++)
		{
			
			if($scope.checkboxes[i].checked ==true )
			{
			$scope.grades.push($scope.checkboxes[i].grade)
			
			}
		}
		//////////////checks to see if checkboxes are checked.  If so, it reveals the filtered lessons via changing the ng-hide paramater in the DOM. 
		if($scope.grades.length==0)
		{
			$scope.checkbox=false;
		}
		else{
			$scope.checkbox=true;
			for(var x=0; x<$scope.lessons.length; x++)
			{	
				if(!$scope.lessons[x].grades.toString().match($scope.grades.toString())) {
					
					$scope.lessons[x].hider=true;
				}
				else{
					$scope.lessons[x].hider=false
				}
				
			}
		}
	
	};
	
	
	$scope.closeBigBigImage = function()
	{
		$scope.popupHider2=true;
	};
	
	$scope.closeBigImageLessons = function()
	{
		
		$scope.popupHider4=true;
	};
	
	$scope.closeBigImageSite = function()
	{
		
		$scope.popupHider5=true;
	};
	
	$scope.closeBigImage = function()
		{
			
		$scope.bigImageHider=false;
		$scope.popupHider=true;
		$scope.bigImageHider3=false;
		$scope.popupHider3=true;
			
		};	
		
	$scope.openBigImage = function(img,post_title,post_url, caption, parent, id, favorite)
		{
			if(post_title=='undefined')
			{
				$scope.titleHider=true;
				console.log($scope.titleHider);
			}
			else
			{
				$scope.titleHider=false;
			}
			
			window.scrollTo(0,0);
			$scope.bigImageSrc=img
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            $scope.favorite=favorite;	
			$scope.bigImage2=true;
			$scope.bigImage=false;
			$scope.popupHider2=false;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url[0];
			$scope.parent = parent[0];
			$scope.id = id;
			
				
		
 
          
			//$scope.imageLoaded=true;
		
		};
		
		
	
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			
			length=$scope.images.length;
			var prev = (parseInt(id)-1);
			if(prev!=-1)
			{
			prev=prev;
			}
			else{
			prev=(length-1);	
			}
			$scope.isLoading = true;
            $scope.isSuccessful = false;
			$scope.alt=$scope.images[prev].caption;
			$scope.post_title = $scope.images[prev].post_title;
			$scope.post_url = $scope.images[prev].post_url;
			$scope.parent = $scope.images[prev].parent;
			$scope.id = $scope.images[prev].id;
			$scope.favorite = $scope.images[prev].favorite;
			$scope.bigImageSrc=$scope.images[prev].src
                       
 
                  
 
		};
		
		$scope.nextImg = function(id)
		{
			
			
            length=$scope.images.length;
            
			var next = (parseInt(id)+1)
			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			
			
			$scope.favorite = $scope.images[next].favorite;

		    $scope.bigImageSrc=$scope.images[next].src;
		    $scope.alt=$scope.images[next].caption;
			$scope.post_title = $scope.images[next].post_title;
			$scope.post_url = $scope.images[next].post_url;
			$scope.parent = $scope.images[next].parent;
			$scope.id = $scope.images[next].id;
								
                   
 
			
			$scope.imageLoaded=true;
		};
		

	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
	};
	
	
	$scope.switchFavorite=function(id, type)
	{
		var blogTitle=[];
		var imgSrc=[];
		var lessonUrl = [];
		if(type=='blog')
		{
			if(localStorage.getItem('BlogArr')!=null && localStorage.getItem('FavoriteArr')!='')
			{
				var blogFav = jQuery.parseJSON(localStorage.getItem('BlogArr'));
				
			}
			else
			{
				var blogFav=[];
			}

			if($scope.blogs[id].favorite=='off')
			{
				$scope.blogs[id].favorite='on';
				blogFav.push( $scope.blogs[id]);
				localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
				//console.log($scope.wp.items[id].favorite);
				//$rootScope.favorites = Favorites.addFavorites($rootScope.wpdata.items, 'blog');
			}
			else{
				for(var x=0; x<blogFav.length; x++)
				{
					blogTitle.push(blogFav[x].BlogTitle);
				}
				var index=blogTitle.indexOf($scope.blogs[id].BlogTitle);
				blogFav.splice(index, 1);
				localStorage.setItem('BlogArr',  JSON.stringify(blogFav));
				$scope.blogs[id].favorite='off';
				//console.log($scope.wp.items[id].favorite);
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.wpdata.items, 'blog');
			}
			
		}	
		if(type=='photo')
		{
		if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}
	
		if($scope.images[id].favorite=='off')
			{
				$scope.images[id].favorite='on';
				imgFav.push( $scope.images[id]);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
			}
			else{
				for(var y=0; y<imgFav.length; y++)
				{
					imgSrc.push(imgFav[y].src);
				}
				$scope.images[id].favorite='off';
				var index=imgSrc.indexOf($scope.images[id].src);
				imgFav.splice(index, 1);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
			}
			 
		}	
		if(type=='bigphoto')
		{
		if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
			{
				var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			}
			else
			{
				var imgFav =[];
			}	
		if($scope.favorite=='off')
			{
				$scope.favorite='on';
				imgFav.push( $scope.images[id]);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.addFavorites($rootScope.imagedata, 'images');
			}
			else{
				
				$scope.favorite='off';
				for(var y=0; y<imgFav.length; y++)
					{
						imgSrc.push(imgFav[y].src);
					}
				$scope.images.favorite='off';
				var index=imgSrc.indexOf($scope.images[id].src);
				imgFav.splice(index, 1);
				localStorage.setItem('ImgArr',  JSON.stringify(imgFav));
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.imagedata, 'images');
				}
				 
		}	
		if(type=='lesson')
		{
			if(localStorage.getItem('LessonArr')!=null && localStorage.getItem('LessonArr')!='')
			{
				var lessonFav = jQuery.parseJSON(localStorage.getItem('LessonArr'));
			}
			else
			{
				var lessonFav =[];
			}
			if($scope.lessons[id].favorite=='off')
			{
				$scope.lessons[id].favorite='on';
				$scope.lessons[id].favorite='on';
				lessonFav.push( $scope.lessons[id]);
				localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
				//$rootScope.favorites = Favorites.addFavorites($rootScope.lessonsdata, 'lessons');
				}
			else{
				
				$scope.lessons[id].favorite='off';
				for(var y=0; y<lessonFav.length; y++)
					{
						lessonUrl.push(lessonFav[y].url);
					}
				$scope.images.favorite='off';
				var index=lessonUrl.indexOf($scope.lessons[id].url);
				lessonFav.splice(index, 1);
				localStorage.setItem('LessonArr',  JSON.stringify(lessonFav));
				//$rootScope.favorites = Favorites.removeFavorites($rootScope.lessonsdata, 'lessons');
				
				}
				
		}
			$rootScope.favorites = Favorites.addFavorites();
			for(var i=0; i<$rootScope.wpdata.items.length;i++)
			{
				Favorites.checkFavorites($rootScope.wpdata.items[i], 'blogs');
				
			}
			for(var j=0; j<$rootScope.imagedata.length;j++)
			{
				Favorites.checkFavorites($rootScope.imagedata[j], 'images');
				
			}
			for(var k=0; k<$rootScope.lessonsdata.length;k++)
			{
				Favorites.checkFavorites($rootScope.lessonsdata[k], 'lessons');
				
			}
	};			

	
	
	$scope.bigImageHider=true;
	$scope.popupHider=true;
	$scope.bigImageHider2=true;
	$scope.popupHider2=true;
	$scope.bigImage3=true;
	$scope.popupHider3=true;
	$scope.bigImage4=true;
	$scope.popupHider4=true;
	$scope.bigImage5=true;
	$scope.popupHider5=true;
	$scope.searchBox=false;
	$scope.checkbox=false;	
		
}]);

angular.module('Navigation', [])
.controller('Navigation', ['$scope', function($scope)
{
	
	$scope.searchBox=false;
	$scope.popupHider6=true;
	$scope.bigImageFav=false;
	$scope.showNav=true;
	$scope.navigationItems = [{name:'about', state:'hider'},{name:'current', state:'hider'}, {name:'past', state:'hider'}, {name:'alumni', state:'hider'}, {name:'resources', state:'hider'}, {name:'media', state:'hider'}];	
	$scope.navigationToggle=function(id)
	{
		
		for(var x=0; x<$scope.navigationItems.length; x++)
		{
			if($scope.navigationItems[x].name==id)
			{
				if($scope.navigationItems[x].state=='hider')
				{
				$scope.navigationItems[x].state='shower';
				}
				else{
				$scope.navigationItems[x].state='hider';
				}
			}
		}
		
		
	};
	
		
}]);

angular.module('RespNav', [])
.controller('RespNav', ['$scope', function($scope)
{
	
	$scope.resp_nav_shower=false;
		
	$scope.respNavToggle=function()
	{
			
		if($scope.resp_nav_shower==true)
		{
			$scope.resp_nav_shower=false;
		}
		else
		{
			$scope.resp_nav_shower=true;
		}
		
	};	
		
}]);

angular.module('Facts',[])
.controller('Facts', ['$scope', '$rootScope', function($scope, $rootScope){

	$rootScope.facts=[{fact:'A sandbar shark will have around 35,000 teeth over the course of its lifetime!'}, {fact: 'The back of sharks\' eyeballs have a reflective layer of tissue called a tapetum. This helps sharks see extremely well with little light.'}, {fact:'A sea scallop\'s eyes are the black dots that line the edges of both its top and bottom shells.'}, {fact:'This fish, the polka dot batfish, is a bottom-dwelling species that uses its stubby fins to slowly "walk" along the seafloor.'}, {fact:'A "sea mouse" is not a mouse, but a marine polychaete worm.'} , {fact:'The male spoon arm octopus has a modified arm that aids in reproduction.'}, {fact: 'A scorpion fish\'s mouth has gill rakers: rows of bumpy spikes that help filter food from the water.'}, {fact:'Scallops can live up to 20 years, and a single female scallop can produce up to 270 million eggs in her lifetime.'},{fact:'Sea spiders have no lungs or other respiratory organs. Since they are so small, gasses diffuse in and out of their bodies.' }];
		
		
		var randomnumber = Math.floor(Math.random()*$scope.facts.length);	
		
		$rootScope.fact = $scope.facts[randomnumber].fact;
		console.log($rootScope.fact)
}]);



////////////Helper Functions///////////////////
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function Slicer(str, number)
{
	var slicer = str.slice(0, number);
	var slicer2 = str.slice(number, str.length);
	var slicer2Index = slicer2.indexOf(' ');
	slicer2 = str.slice(0, (number+slicer2Index));
	//alert(slicer2);
	return slicer2;
}

function removeHTML(str)
{
	
	
         var str =  jQuery('<div />', { html: str }).text();
        str = 		jQuery('<p />', { html: str }).text();
        str = jQuery('<i />', { html: str }).text();
		return str;
}

function DigPatt(str, char)
{
	  var checkDigit = (str.lastIndexOf(char)+1);
	  var digPatt = str.slice(checkDigit, str.length);
			           //console.log(digPatt);
			           if(digPatt.match(/\d/g))
			           {
			           	name = str.split('-')[0];
			           }
			           else
			           {
			           	name=str;
			           }
			           return name;
}

function goToByScrollTop(id) {
	// Remove "link" from the ID
	id = id.replace("link", "");
	// Scroll
	$('#' + id).animate({
		scrollTop : 50
	}, 'slow');

}

function createTitleFromURL(str)
{
	var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
	
	var str = str.replace('http://teacheratsea.wordpress.com/','').split('/')[3];
	str = toTitleCase(str.replace(/-/g, ' '));
	var strSplitter = str.split(' ');
	var substr = strSplitter[1];
	var str = str.replace(substr, substr+',');
	
	str = str.replace(' 20', ', 20');
	for(var z=0; z<monthArr.length; z++)
	{
		if(str.replace(/\W/g,'').match(monthArr[z].replace(/\W/g,'')))
		{
			str = str.replace(monthArr[z], ', '+monthArr[z]).replace(' , ', ', ');
			return str;

		}
	}	
}
