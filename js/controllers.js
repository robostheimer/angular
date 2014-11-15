/* Controllers */

angular.module('ClassPage', [])
.controller('classPage', ['$scope','$location','$routeParams','Class', function($scope, $location, $routeParams,Class )
{
	$scope.bigImage=false;
	$scope.svg = 'images/US_Map.svg';
	$scope.currentStatus='yes';
	$scope.hideMapDiv=true;
	
	
		
	Class.createTeacherList().then(function(data)
	{
		$scope.states=Class.createStateObj();
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
				
				
				
			}
			for(var y=0; y<$scope.states.length; y++)
			{
				
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
	}
}]);	


angular.module('BaseballCardInfo', [])	
			
.controller('changeTab',['$scope','$location','Teacher','TeacherDataFetch','WPDataFetch','LessonsDataFetch','NewsDataFetch','ShipDataFetch', '$q','$routeParams','$rootScope','$sce', 'preloadImage', function($scope, $location,Teacher, TeacherDataFetch, WPDataFetch, LessonsDataFetch, NewsDataFetch, ShipDataFetch, $q, $routeParams, $rootScope, $sce, preloadImage){
	$scope.buttons=Teacher.createObjects();
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
						
	
	var teacherdatacount = TeacherDataFetch.count;
	
	$scope.bigImage = false;
	
	////////////////Gets called below to initialize data-gathering services
	$scope.accessData=function()
	{
			//////////////checks datacount to determine data needs to be re-downloaded; if teacherdatacount==0 it loads
			if (teacherdatacount == 0)
			{
				TeacherDataFetch.data().then(function(data) {
				$scope.teacher = data;
				if($scope.teacher.count!=0)
				{
				$scope.teacher.dataLoaded=true;	
				$rootScope.teacherdata = $scope.teacher;
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
						
							 WPDataFetch.data($scope.teacher.firstname+' '+$scope.teacher.lastname).then(function(data) {
							     
							    $scope.wp = data;
								$rootScope.wpdata =data;
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
				preloadImage.preloadImages([$scope.teacher.image]).then(function handleResolve() {
	
					// Loading was successful.
					$scope.isLoading = false;
					$scope.isSuccessful = true;
					$scope.bigImageSrc = [$scope.teacher.image];
	
				});
				}
			else{
				$scope.teacher.dataLoaded=true;	
			}
			});
			
		/////////////////////If the url changes it changes the teacherdatacount number back to 0 and runs the data again	
		} else if($routeParams.teachername.replace('*', ' ').toLowerCase()!=$rootScope.teacherdata.firstname.toLowerCase()+' '+$rootScope.teacherdata.lastname.toLowerCase()&&teacherdatacount!=0) 
				{
				teacherdatacount = 0;
				$scope.accessData();
				}
				///////////////////If the url hasn't changed, it does not re-run the services to bring the data in
		else if(teacherdatacount!=0){
				
 			$scope.teacher = {};
			$scope.ship={};
			$scope.teacher = $rootScope.teacherdata;
			$scope.ship=$rootScope.shipdata;
			$scope.news = $rootScope.newsdata;
			$scope.lessons = $rootScope.lessonsdata;
			
			$scope.wp={};
			$scope.wp=$rootScope.wpdata;
			
							
							
			
		}
		teacherdatacount = TeacherDataFetch.count += 1;
	

	
	
	
	

};

$scope.accessData();

$scope.openBigImage = function(img,post_title,post_url, caption, parent, id)
		{
			$scope.bigImageHider=false;
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.percentLoaded = 0;
				
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigImage = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
			length=$scope.wp.Images.length;
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
			$scope.alt=$scope.wp.Images[prev].caption;
			$scope.post_title = $scope.wp.Images[prev].post_title;
			$scope.post_url = $scope.wp.Images[prev].post_url;
			$scope.parent = $scope.wp.Images[prev].parent;
			$scope.id = $scope.wp.Images[prev].id;
			preloadImage.preloadImages([$scope.wp.Images[prev].src])
			
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.wp.Images[prev].src]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.wp.Images.length;
			var next = (parseInt(id)+1)
			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.wp.Images[next].src])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       $scope.bigImageSrc=[$scope.wp.Images[next].src];
                        $scope.alt=$scope.wp.Images[next].caption;
						$scope.post_title = $scope.wp.Images[next].post_title;
						$scope.post_url = $scope.wp.Images[next].post_url;
						$scope.parent = $scope.wp.Images[next].parent;
						$scope.id = $scope.wp.Images[next].id;
 
                    }
                   
               );
 
			
			$scope.imageLoaded=true;
		};
		
		
		
		$scope.SkipValidation = function(value) {
						  return $sce.trustAsHtml(value);
						};


	}]);			


angular.module('Media', [])
.controller('mediaPage', ['$scope','$location','$routeParams','Media','Teacher','preloadImage','Slideshow', function($scope, $location, $routeParams,Media,Teacher , preloadImage, Slideshow)
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
	$scope.closeBigImage2 = function()
		{
			$scope.bigImage2=false;
			$scope.popup2=false;
			$scope.popup=true;
			$scope.bigImage=true;
		};	
		
	$scope.openBigImage = function(img,post_title,post_url, caption, parent, id)
		{
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage2=true;
			$scope.bigImage=false;
			$scope.popup2=true;
			$scope.popup=false;
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.percentLoaded = 0;
				
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		
		
		/*$scope.closeBigImage = function()
		{
			$scope.bigImage=true;
			
		};*/
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
			length=$scope.wp.Images.length;
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
			$scope.alt=$scope.wp.Images[prev].caption;
			$scope.post_title = $scope.wp.Images[prev].post_title;
			$scope.post_url = $scope.wp.Images[prev].post_url;
			$scope.parent = $scope.wp.Images[prev].parent;
			$scope.id = $scope.wp.Images[prev].id;
			preloadImage.preloadImages([$scope.wp.Images[prev].src])
			
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.wp.Images[prev].src]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            length=$scope.wp.Images.length;
			var next = (parseInt(id)+1)
			if(next<(length-1))
			{
				next=next;
			}
			else{
				
				next=0;
			}
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.wp.Images[next].src])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       	$scope.bigImageSrc=[$scope.wp.Images[next].src];
                        $scope.alt=$scope.wp.Images[next].caption;
						$scope.post_title = $scope.wp.Images[next].post_title;
						$scope.post_url = $scope.wp.Images[next].post_url;
						$scope.parent = $scope.wp.Images[next].parent;
						$scope.id = $scope.wp.Images[next].id;
 
                    }
                   
               );
 
			
			$scope.imageLoaded=true;
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
			$scope.bigImageHider=false;
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.percentLoaded = 0;
							
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.data[prev].url]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.data[next].url])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       $scope.bigImageSrc=[$scope.data[next].url];
                        $scope.alt=$scope.data[next].caption;
						$scope.post_title = $scope.data[next].post_title;
						$scope.post_url = $scope.data[next].post_url;
						$scope.parent = $scope.data[next].parent;
						$scope.id = $scope.data[next].id;
 
                    }
                   
               );
 
			
			$scope.imageLoaded=true;
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
			$scope.bigImageHider=false;
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url;
			$scope.parent = parent;
			$scope.id = id;
			$scope.percentLoaded = 0;
							
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigImage2 = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.data[prev].url]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.data[next].url])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       $scope.bigImageSrc=[$scope.data[next].url];
                        $scope.alt=$scope.data[next].caption;
						$scope.post_title = $scope.data[next].post_title;
						$scope.post_url = $scope.data[next].post_url;
						$scope.parent = $scope.data[next].parent;
						$scope.id = $scope.data[next].id;
 
                    }
                   
               );
 
			
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
			$rootScope.topdata ={};
			$rootScope.tabsdata={};
			
			TabsDataFetchTop.data($scope.spreadsheet, $scope.type).then(function(result)
			{
				
				$scope.top=result;
				
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
			$scope.bigImageHider=false;
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage=true;
			
			$scope.alt=caption;
			$scope.id = id;
			$scope.percentLoaded = 0;
							
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		$scope.closeBigImage = function()
		{
			$scope.bigImage=false;
			$scope.bigImageHider=true;
		};
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			$scope.id = $scope.alert(id);[prev].id;
			preloadImage.preloadImages([$scope.data[prev].ur])
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.data[prev].url]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.data[next].url])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       $scope.bigImageSrc=[$scope.data[next].url];
                        $scope.alt=$scope.data[next].caption;
						$scope.post_title = $scope.data[next].post_title;
						$scope.id = $scope.data[next].id;
 
                    }
                   
               );
 
			
			$scope.imageLoaded=true;
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
		$scope.checkContents = true;
			
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


angular.module('SearchBox', [])
.controller('SearchBox', ['$scope','SearchBox','preloadImage','$sce', function($scope, SearchBox, preloadImage, $sce)
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
			SearchBox.searchImages($scope.search_images).then(function(result)
			{
				$scope.images =result;
				$scope.showImageSearch=true;
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
	
	
	$scope.closeBigImage2 = function()
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
		
	$scope.openBigImage = function(img,post_title,post_url, caption, parent, id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif']
			//$scope.bigImageSrc='/images/NOAA-Logo.gif';
			$scope.isLoading = true;
            $scope.isSuccessful = false;
            	
			$scope.bigImage2=true;
			$scope.bigImage=false;
			$scope.popupHider2=false;
			
			$scope.alt=caption;
			$scope.post_title = post_title;
			$scope.post_url = post_url[0];
			$scope.parent = parent[0];
			$scope.id = id;
			$scope.percentLoaded = 0;
				
			preloadImage.preloadImages([img])
			.then(
                    function handleResolve( imageLocations ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[img]
                       
 
                    }
                   
               );
 
          
			//$scope.imageLoaded=true;
		
		};
		
		
		$scope.prevImg = function(id)
		{
			
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			$scope.post_url = $scope.images[prev].post_url[0];
			$scope.parent = $scope.images[prev].parent[0];
			$scope.id = $scope.images[prev].id;
			preloadImage.preloadImages([$scope.images[prev].src[0]])
			
            .then(
                    function handleResolve( ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.bigImageSrc=[$scope.images[prev].src[0]]
                       
 
                    }
                    
               );
 
		};
		
		$scope.nextImg = function(id)
		{
			$scope.bigImageSrc=['/images/NOAA-Logo.gif'];
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
			
			//$scope.bigImageSrc=[$scope.wp.Images[next].src];
			
			preloadImage.preloadImages([$scope.images[next].src[0]])
			.then(
                    function handleResolve(  ) {
 						
                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                       	$scope.bigImageSrc=[$scope.images[next].src[0]];
                        $scope.alt=$scope.images[next].caption;
						$scope.post_title = $scope.images[next].post_title;
						$scope.post_url = $scope.images[next].post_url[0];
						
						$scope.parent = $scope.images[next].parent[0];
						$scope.id = $scope.images[next].id;
 
                    }
                   
               );
 
			
			$scope.imageLoaded=true;
		};	

	$scope.SkipValidation = function(value) 
	{
	  return $sce.trustAsHtml(value);
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


