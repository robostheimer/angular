//'use strict';

/* Services */
/////////////////////////////////HomePage/////////////////////////////////////////////
TAS_SITE.factory('HomePageCurrent', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		

		getCarouselData : function() {
			var teacher = [];
			
			
			
			
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL+%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+WHERE+Year=%272014%27+ORDER%20BY+TeacherLastName%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				
				if (result.data.rows != undefined) {
					
							
					for (var o = 0; o < result.data.rows.length; o++) {
					var d = new Date();
    				var td = d.valueOf();
					var pd = new Date(result.data.rows[o][7].split('-')[1]).valueOf();
					var prd=new Date(result.data.rows[o][7].split('-')[0]).valueOf();
					var tpd=pd.valueOf();	
					
					if(td>pd)
					{
					teacher.push({
					lastname : result.data.rows[o][0],
					firstname : result.data.rows[o][1].replace(' ', ''),
					lastname_forDOM : DigPatt(result.data.rows[o][0].replace(' ', '')),
					shiptype : result.data.rows[o][2],
					ship : result.data.rows[o][3],
					shipurl : result.data.rows[o][4],
					cruiseurl : result.data.rows[o][5],
					mission : result.data.rows[o][6],
					dates : result.data.rows[o][7],
					subjects : result.data.rows[o][8],
					school : result.data.rows[o][9],
					city : result.data.rows[o][10],
					state : result.data.rows[o][11],					
					image : result.data.rows[o][12].split('?')[0], 
					grades : result.data.rows[o][13],
					schoolurl : result.data.rows[o][14],
					wordpressurl : result.data.rows[o][15],
					subjects1 :result.data.rows[o][8].split('&&')[0],
					subjects2 : result.data.rows[o][8].split('&&')[1],
					school1 : result.data.rows[o][9].split('&&')[0],
					school2: result.data.rows[o][9].split('&&')[1],
					schoolurl1 : result.data.rows[o][14].split('&&')[0],
					schoolurl2 :result.data.rows[o][14].split('&&')[1],
					//caption : firstname + ' ' + lastname.split('-')[o] + ' aboard ',
					hashy : $location.path().split('/')[3],
					year : td,
					hider:true,
					verb:'was'
					//teachername :firstname+' '+lastname
					});
					}
					else if(td<pd&&td>prd)
					{
						teacher.push({
						lastname : result.data.rows[o][0],
						firstname : result.data.rows[o][1].replace(' ', ''),
						lastname_forDOM : DigPatt(result.data.rows[o][0].replace(' ', '')),
						shiptype : result.data.rows[o][2],
						ship : result.data.rows[o][3],
						shipurl : result.data.rows[o][4],
						cruiseurl : result.data.rows[o][5],
						mission : result.data.rows[o][6],
						dates : result.data.rows[o][7],
						subjects : result.data.rows[o][8],
						school : result.data.rows[o][9],
						city : result.data.rows[o][10],
						state : result.data.rows[o][11],					
						image : result.data.rows[o][12].split('?')[0], 
						grades : result.data.rows[o][13],
						schoolurl : result.data.rows[o][14],
						wordpressurl : result.data.rows[o][15],
						subjects1 :result.data.rows[o][8].split('&&')[0],
						subjects2 : result.data.rows[o][8].split('&&')[1],
						school1 : result.data.rows[o][9].split('&&')[0],
						school2: result.data.rows[o][9].split('&&')[1],
						schoolurl1 : result.data.rows[o][14].split('&&')[0],
						schoolurl2 :result.data.rows[o][14].split('&&')[1],
						//caption : firstname + ' ' + lastname.split('-')[o] + ' aboard ',
						hashy : $location.path().split('/')[3],
						year : td,
						hider:true,
						verb:'is'
						//teachername :firstname+' '+lastname
					});	
					}
					else{
						teacher.push({
						lastname : result.data.rows[o][0],
						firstname : result.data.rows[o][1].replace(' ', ''),
						lastname_forDOM : DigPatt(result.data.rows[o][0].replace(' ', '')),
						shiptype : result.data.rows[o][2],
						ship : result.data.rows[o][3],
						shipurl : result.data.rows[o][4],
						cruiseurl : result.data.rows[o][5],
						mission : result.data.rows[o][6],
						dates : result.data.rows[o][7],
						subjects : result.data.rows[o][8],
						school : result.data.rows[o][9],
						city : result.data.rows[o][10],
						state : result.data.rows[o][11],					
						image : result.data.rows[o][12].split('?')[0], 
						grades : result.data.rows[o][13],
						schoolurl : result.data.rows[o][14],
						wordpressurl : result.data.rows[o][15],
						subjects1 :result.data.rows[o][8].split('&&')[0],
						subjects2 : result.data.rows[o][8].split('&&')[1],
						school1 : result.data.rows[o][9].split('&&')[0],
						school2: result.data.rows[o][9].split('&&')[1],
						schoolurl1 : result.data.rows[o][14].split('&&')[0],
						schoolurl2 :result.data.rows[o][14].split('&&')[1],
						//caption : firstname + ' ' + lastname.split('-')[o] + ' aboard ',
						hashy : $location.path().split('/')[3],
						year : td,
						hider:true,
						verb:'will sail'
						//teachername :firstname+' '+lastname
					});	
					}
					
					}
				}
				return teacher;

			});
		},
	};

}]);


TAS_SITE.factory('HomePageAlumni', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		
			getCarouselData:function(region)
			{
				var spot = [];
				return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<10; i++)
						{
							var pd = new Date(result.data.rows[i][6]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][6]!='#'||td>=tpd)
							{
							spot.push(
							{
							id:i,
							firstname:result.data.rows[i][0],
							lastname : result.data.rows[i][1],
							shortbody :result.data.rows[i][2],
							longbody :result.data.rows[i][3],
							url : result.data.rows[i][4].split('?')[0],
							caption:result.data.rows[i][5],
							date: result.data.rows[i][6],
							region : result.data.rows[i][7],
							more_url:result.data.rows[i][5].replace(/ /g, '_'),
							hash: '/indiv_spotlight/'+result.data.rows[i][0].replace(/ /g, '_')+'_'+result.data.rows[i][1].replace(/ /g,'_'),
							dataloaded: true,
							hider:true
							});
						}
					
					}
					
				}	
				return spot;
			});
				
			},
	};
}]);

TAS_SITE.factory('HomePagePOW', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
	getCarouselData : function() {
			var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,PhotoDescription,ShortDescription,BlogURL,PhotoCredit,BlogTitle,PublishDate, Keywords+FROM+19WBCSYuVJh1O2KaThKQJpLLn0VF6w3rHhbKtZMVf+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<10; i++)
						{
							var pd = new Date(result.data.rows[i][7]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][7]!='#'||td>=tpd)
							{

							pow.push(
							{
							id:i,
							url:result.data.rows[i][0],
							caption : result.data.rows[i][1],
							description :result.data.rows[i][2].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							shortdescription :result.data.rows[i][3].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							parent : result.data.rows[i][4],
							credit:result.data.rows[i][5],
							post_title:Slicer(result.data.rows[i][6], 40)+'...',
							date: result.data.rows[i][7],
							keywords : result.data.rows[i][8],
							titleSnippet:Slicer(result.data.rows[i][1], 70)+'...',
							dataloaded: true
							});
						}
					
					}
					
				}	
				return pow;
			});
			},
	};
}]);
TAS_SITE.factory('HomepageData', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		

	/*	getTeacherData : function() {
			var teacher = [];
			var d = new Date();
    		var td = d.getFullYear();
			
			
			
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL+%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+WHERE+Year=%272014%27+ORDER%20BY+TeacherLastName"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {

				
				if (result.data.rows != undefined) {
					for (var o = 0; o < result.data.rows.length; o++) {
					teacher.push({
					lastname : result.data.rows[o][0],
					firstname : result.data.rows[o][1].replace(' ', ''),
					lastname_forDOM : DigPatt(result.data.rows[o][1].replace(' ', '')),
					shiptype : result.data.rows[o][2],
					ship : result.data.rows[o][3],
					shipurl : result.data.rows[o][4],
					cruiseurl : result.data.rows[o][5],
					mission : result.data.rows[o][6],
					dates : result.data.rows[o][7],
					subjects : result.data.rows[o][8],
					school : result.data.rows[o][9],
					city : result.data.rows[o][10],
					state : result.data.rows[o][11],					
					image : result.data.rows[o][12].split('?')[0]+'?w=200', 
					grades : result.data.rows[o][13],
					schoolurl : result.data.rows[o][14],
					wordpressurl : result.data.rows[o][15],
					subjects1 :result.data.rows[o][8].split('&&')[0],
					subjects2 : result.data.rows[o][8].split('&&')[1],
					school1 : result.data.rows[o][9].split('&&')[0],
					school2: result.data.rows[o][9].split('&&')[1],
					schoolurl1 : result.data.rows[o][14].split('&&')[0],
					schoolurl2 :result.data.rows[o][14].split('&&')[1],
					//caption : firstname + ' ' + lastname.split('-')[o] + ' aboard ',
					hashy : $location.path().split('/')[3],
					year : td,
					//teachername :firstname+' '+lastname
					});

					
					}
				}
				return teacher;

			});
		},
		getSpotlightData:function(region)
			{
				var spot = [];
				return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<10; i++)
						{
							var pd = new Date(result.data.rows[i][6]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][6]!='#'||td>=tpd)
							{
							spot.push(
							{
							id:i,
							firstname:result.data.rows[i][0],
							lastname : result.data.rows[i][1],
							shortbody :result.data.rows[i][2],
							longbody :result.data.rows[i][3],
							url : result.data.rows[i][4].split('?')[0]+'?h=150',
							caption:result.data.rows[i][5],
							date: result.data.rows[i][6],
							region : result.data.rows[i][7],
							more_url:result.data.rows[i][5].replace(/ /g, '_'),
							hash: '/indiv_spotlight/'+result.data.rows[i][0].replace(/ /g, '_')+'_'+result.data.rows[i][1].replace(/ /g,'_'),
							dataloaded: true
							});
						}
					
					}
					
				}	
				return spot;
			});
				
			},
			getPOWData : function() {
			var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,PhotoDescription,ShortDescription,BlogURL,PhotoCredit,BlogTitle,PublishDate, Keywords+FROM+19WBCSYuVJh1O2KaThKQJpLLn0VF6w3rHhbKtZMVf+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<10; i++)
						{
							var pd = new Date(result.data.rows[i][7]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][7]!='#'||td>=tpd)
							{

							pow.push(
							{
							id:i,
							url:result.data.rows[i][0],
							caption : result.data.rows[i][1],
							description :result.data.rows[i][2].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							shortdescription :result.data.rows[i][3].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							parent : result.data.rows[i][4],
							credit:result.data.rows[i][5],
							post_title:result.data.rows[i][6],
							date: result.data.rows[i][7],
							keywords : result.data.rows[i][8],
							titleSnippet:Slicer(result.data.rows[i][1], 80)+'...',
							dataloaded: true
							});
						}
					
					}
					
				}	
				return pow;
			});
			},*/
			getDYKData : function() {
			
			return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdDdoTkZFb0lMMVUzdzFBOUZaWllxeUE/od6/public/values?alt=json&callback=JSON_CALLBACK').then(function(result) {					
					
					
					var randomNum =Math.floor(Math.random()*(result.data.feed.entry.length-3))	
					dyks=[];
					dyk={};
					for (var i=0; i<3; i++)
					{
					dyk=result.data.feed.entry[(randomNum+i)];		
					dyk.num = dyk.gsx$pdf.$t.replace('/dyk/DYK-','').replace('.pdf','');
					dyks.push(dyk);
					
					}
					
					
				
				return dyks;
			});
		
		},

		getNewsData : function() {
			///////////////////////////////Start Here////////////////////
			var news = [];
			var newsObj = {};
			newsObj.checkContents = false;
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ArticleYear%2C+Teacher%2C+MediaOutlet%2C+ArticleTitle%2C+MediaOutletURL%2C+ArticleURL+FROM+1EaTTZDozzJ0k3K2FMoD0O6JAfeiHcc6SB95f0hYv&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					for (var o = 0; o < 5; o++) {
						news.push({
							articleyear : result.data.rows[o][0],
							teacher : result.data.rows[o][1],
							mediaoutlet : result.data.rows[o][2],
							article : result.data.rows[o][3],
							medioutleturl : result.data.rows[o][4],
							articleurl : result.data.rows[o][5],
							checkContents : true
						});

					}
				} else {
					news.push({
						articleyear : "",
						teacher : "",
						mediaoutlet : "",
						article : "",
						mediaoutleturl : "",
						articleurl : "",
						checkContents : false
					});
				}
				//console.log(news);
				return news;

			});
		

		},

		getWPData : function(year, name) {
			var WPdata = {};
			//var feed = 'http://teacheratsea.wordpress.com/category/'+$routeParams.teachername.split('*')[0].toLowerCase()+'-'+$routeParams.teachername.split('*')[1].toLowerCase()+'/feed';
			//console.log(feed);

			return $http.get('/php/xml_json_home.php?q=2014').then(function(result) {

				WPdata = result.data;
				WPdata.dataLoaded = false;
				WPdata.Images = [];
				WPdata.Videos = [];
				WPdata.checkVideos = false;
				WPdata.checkBlogs = false;
				WPdata.checkPhotos = false;
				WPdata.YT = [];
				WPdata.WPVid = [];
				WPdata.VMVid = [];
				//WPdata.bigImage=false;
				var ImagesCap = {};
				ImagesCap.src = '';
				ImagesCap.caption = '';
				var ImagesArr = [];
				var VideosArr = [];
				var images_url = '';
				if (WPdata.items.length == 0) {
					WPdata.checkForItems = false;
				} else {
					WPdata.checkForItems = true;
				}
				for (var x = 0; x < (WPdata.items.length); x++) {
					WPdata.items[x].ind_date='';
					var html = removeHTML(WPdata.items[x].MainContent);
					WPdata.items[x].contentSnipp = Slicer(html, 380);
					var tmpstr = '';
					var imagesObj = {};
					WPdata.items[x].imagesArr = [];
					WPdata.items[x].CategoriesArr = [];
					imagesObj.src = '';
					imagesObj.caption = '';
					var dateInd =WPdata.items[x].date[0].indexOf(':');
					WPdata.items[x].ind_date=WPdata.items[x].date[0].slice(0,(dateInd-3));

					if (WPdata.items[x].YouTubeVideos.split(',') != "") {
						WPdata.YT.push($sce.trustAsResourceUrl('http://www.youtube.com/embed/' + WPdata.items[x].YouTubeVideos.split(',')[0] + '??&rel=0&showinfo=0&autohide=1'));
					}
					if (WPdata.items[x].WPVideos.split(',') != "") {
						var wpvideo = WPdata.items[x].WPVideos.split(',')[0].split(' w')[0].replace(' ', '');
						//WPdata.WPVid.push(wpvideo);
						WPdata.WPVid.push(jQuery.parseJSON('{"title":"' + WPdata.items[x].BlogTitle + '","lnk":"' + WPdata.items[x].BlogUrl[0] + '", "src":"' + wpvideo + '"}'));
					}
					if (WPdata.items[x].VimeoVideos.split(',') != "") {
						WPdata.VMVid.push($sce.trustAsResourceUrl('http://player.vimeo.com/video/' + WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0].replace(' ', '')));
						//$sce.trustAsResourceUrl('http://player.vimeo.com/video/'+WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0]));
					}

					for (var f = 0; f < WPdata.items[x].Tags.split(',').length; f++) {

						if (!tmpstr.replace(/\W/g, '').match(WPdata.items[x].Tags.split(',')[f].replace(/\W/g, ''))) {
							WPdata.items[x].CategoriesArr.push(WPdata.items[x].Tags.split(',')[f]);
							tmpstr = tmpstr + WPdata.items[x].Tags.split(',')[f];
						}

					}
				}

				for (var k = 0; k < WPdata.gallery_images.length - 1; k++) {

					var hyph_index = WPdata.gallery_images[k].post_url[0].lastIndexOf('-');
					if ((WPdata.gallery_images[k].post_url[0].length - hyph_index) < 4) {
						var posturl = WPdata.gallery_images[k].post_url[0].slice(0, hyph_index);
					} else {
						var posturl = WPdata.gallery_images[k].post_url[0];
					}
					if (WPdata.gallery_images.length > 0 && WPdata.gallery_images[k].src[0] != undefined) {

						if ((WPdata.gallery_images[k].src[0].match('.mov') || WPdata.gallery_images[k].src[0].match('.m4v') || WPdata.gallery_images[k].src[0].match('.ogg') || WPdata.gallery_images[k].src[0].match('.wmv') || WPdata.gallery_images[k].src[0].match('.m4a') || WPdata.gallery_images[k].src[0].match('.mp4') || WPdata.gallery_images[k].src[0].match('.avi') || WPdata.gallery_images[k].src[0].match('.doc') || WPdata.gallery_images[k].src[0].match('.docx') || WPdata.gallery_images[k].src[0].match('.pdf') || WPdata.gallery_images[k].src[0].match('.xlsx') || WPdata.gallery_images[k].src[0].match('.xls') || WPdata.gallery_images[k].src[0].match('.ppt') || WPdata.gallery_images[k].src[0].match('.pptx'))) {
							//var video_src = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0]);
							var img_video = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0].replace('.mp4', '_hd.original.jpg'));
							//VideosArr.push(video_src);
							//VideosArr.push(jQuery.parseJSON('{"vid":"'+video_src+'","img":"'+img_video+'"}'));
						} else if (!WPdata.gallery_images[k].src[0].match('.mov') || !WPdata.gallery_images[k].src[0].match('.mp4') || (WPdata.gallery_images[k].caption == "" && WPdata.gallery_images[k].excerpt == "")) {

							//if(!images_url.match(posturl.replace(/\W/g,'')))
							{
								var gallery_src = WPdata.gallery_images[k].src[0];

								if (WPdata.gallery_images[k].caption != "" && !WPdata.gallery_images[k].caption.match('a:1')) {
									var gallery_caption = WPdata.gallery_images[k].caption;
								} else if (WPdata.gallery_images[k].excerpt != "") {
									var gallery_caption = WPdata.gallery_images[k].excerpt;

								} else {
									gallery_caption = 'Teacher at Sea Photo';
								}
								gallery_caption = gallery_caption.replace(/"/g, '&quos;');
								gallery_caption = gallery_caption.replace(/'/g, '&#39;;');
								gallery_caption = gallery_caption.replace(/\n/g, '');
								if(gallery_caption.length>60)
								{
								gallery_caption = Slicer(gallery_caption.replace(/&#39;;/g, '\'').replace(/&quos;/g, '\''),60)+'...';
								}
								else
								{
									gallery_caption =gallery_caption.replace(/&#39;;/g, '\'').replace(/&quos;/g, '\'');
								}
								var post_url = WPdata.gallery_images[k].post_url[0];
								var post_title = post_url.replace('http://teacheratsea.wordpress.com/','').split('/')[3];
								post_title = toTitleCase(post_title.replace(/-/g, ' '));
								post_title = post_title.replace(' 20', ', 20');
								ImagesArr.push(jQuery.parseJSON('{"src":"' + gallery_src + '","id":"' + ImagesArr.length + '","caption":"' +gallery_caption + '", "parent":"' + WPdata.gallery_images[k].parent[0] + '","post_url":"' + post_url + '", "post_title":"' + post_title + '"}'));
								images_url += posturl.replace(/\W/g, '') + ',';
							}

						}

					}
				}

				WPdata.Videos = VideosArr;

				WPdata.Images = ImagesArr;
				
				return WPdata;
			});

		}
	};

}]);





TAS_SITE.factory('Teacher', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		createObjects : function() {

			var buttons = {};
			buttons.blogs = {};
			buttons.photos = {};
			buttons.videos = {};
			buttons.lessons = {};
			buttons.news = {};
			buttons.ship = {};

			buttons.blogs.name = 'blogs';
			buttons.blogs.classy = "shower";
			buttons.blogs.state = 'on';
			buttons.blogs.href = '#/' + $routeParams.year + '/' + $routeParams.teachername + '/blogs';
			buttons.blogs.hidden = 'false';

			buttons.photos.name = 'photos';
			buttons.photos.classy = "hider";
			buttons.photos.state = 'off';
			buttons.photos.href = $routeParams.year + '/' + $routeParams.teachername + '/photos';
			buttons.photos.hidden = "true";

			buttons.videos.name = 'videos';
			buttons.videos.classy = "hider";
			buttons.videos.state = 'off';
			buttons.videos.href = $routeParams.year + '/' + $routeParams.teachername + '/videos';
			buttons.videos.hidden = "true";

			buttons.lessons.name = 'lessons';
			buttons.lessons.classy = "hider";
			buttons.lessons.state = 'off';
			buttons.lessons.href = $routeParams.year + '/' + $routeParams.teachername + '/lessons';
			buttons.lessons.hidden = "true";

			buttons.news.name = 'news';
			buttons.news.classy = "hider";
			buttons.news.state = 'off';
			buttons.news.href = $routeParams.year + '/' + $routeParams.teachername + '/news';
			buttons.news.hidden = "true";

			buttons.ship.name = 'ship';
			buttons.ship.classy = "hider";
			buttons.ship.state = 'off';
			buttons.ship.href = $routeParams.year + '/' + $routeParams.teachername + '/ship';
			buttons.ship.hidden = "true";
			return buttons;
		},

		getProfileData : function() {
			var teacher = {};
			teacher.dataLoaded = false;
			$rootScope.clickLocation = '';

			var teacherfirstname = toTitleCase($routeParams.teachername.split('*')[0]);
			var teacherlastname = toTitleCase($routeParams.teachername.split('*')[1]);

			teacherfirstname = teacherfirstname.replace(/'/g, "\'");
			teacherlastname = teacherlastname.replace(/'/g, "\\'");

			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL+%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+WHERE+TeacherFirstName%20%20CONTAINS%20IGNORING%20CASE%27' + (teacherfirstname) + '%27+AND+TeacherLastName%20CONTAINS%20IGNORING%20CASE%27' + (teacherlastname) + '%27+ORDER%20BY+TeacherLastName"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {

				if (result.data.rows != undefined) {

					teacher.lastname = result.data.rows[0][0];
					teacher.firstname = result.data.rows[0][1];
					teacher.lastname_forDOM = DigPatt(teacher.lastname, '-')
					teacher.shiptype = result.data.rows[0][2];
					teacher.ship = result.data.rows[0][3];
					teacher.shipurl = result.data.rows[0][4];
					teacher.cruiseurl = result.data.rows[0][5];
					teacher.mission = result.data.rows[0][6];
					teacher.dates = result.data.rows[0][7];
					teacher.subjects = result.data.rows[0][8];
					teacher.school = result.data.rows[0][9];
					teacher.city = result.data.rows[0][10];
					teacher.state = result.data.rows[0][11];					
					teacher.image = result.data.rows[0][12];
					teacher.grades = result.data.rows[0][13];
					teacher.schoolurl = result.data.rows[0][14];
					teacher.wordpressurl = result.data.rows[0][15];
					teacher.subjects1 =result.data.rows[0][8].split('&&')[0];
					teacher.subjects2 = result.data.rows[0][8].split('&&')[1];
					teacher.school1 = result.data.rows[0][9].split('&&')[0];
					teacher.school2= result.data.rows[0][9].split('&&')[1];
					teacher.schoolurl1 = result.data.rows[0][14].split('&&')[0];
					teacher.schoolurl2 =result.data.rows[0][14].split('&&')[1];
					teacher.caption = teacher.firstname + ' ' + teacher.lastname.split('-')[0] + ' aboard ';
					teacher.hashy = $location.path().split('/')[3];
					teacher.year = result.data.rows[0][16];
					$rootScope.teachername =teacher.firstname+' '+teacher.lastname;

					if (teacher.hashy == undefined) {
						teacher.hashy = 'blogs'
					};
					teacher.year = teacher.dates.split('/')[4];

				}
				if (teacher.year == $routeParams.year) {
					teacher.dataLoaded = true;
					$location.path(teacher.year + '/' + teacher.firstname + '*' + teacher.lastname + '/' + teacher.hashy);

				}
				return teacher;

			});
		},
		getLessonData : function(teachername) {
			var lesson = [];
			var teacherfirstname = $routeParams.teachername.split('*')[0];
			var teacherlastname = $routeParams.teachername.split('*')[1];
			teacherfirstname = teacherfirstname.replace(/'/g, "\'");
			teacherlastname = teacherlastname.replace(/'/g, "\\'");
		

			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+LastName%2CFirstName%2CState%2C+YearSailed%2C+GradeLevel%2C+Size%2C+Title%2C+Keywords%2C+Objective%2C+Description%2C+URL%2c+Topics+FROM+17OXuyYjiIvxjr1Yd3DZ-SI-dzp-soOuTDNOHoSOA+WHERE+FirstName%20CONTAINS%20IGNORING%20CASE%27' + toTitleCase(teacherfirstname) + '%27+AND+LastName%20CONTAINS%20IGNORING%20CASE%27' + toTitleCase(teacherlastname) + '%27+ORDER%20BY+LastName"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {

					for (var o = 0; o < result.data.rows.length; o++) {
						lesson.push({
							lastname : result.data.rows[o][0],
							firstname : result.data.rows[o][1],
							state : result.data.rows[o][2],
							year : result.data.rows[o][3],
							grades : result.data.rows[o][4],
							gradesArr: result.data.rows[o][4].split(','),
							size : result.data.rows[o][5],
							title : result.data.rows[o][6],
							keywords : result.data.rows[o][7],
							keywordArr: result.data.rows[o][7].split(','),
							objective : result.data.rows[o][8],
							description : result.data.rows[o][9],
							url : result.data.rows[o][10],
							topics : result.data.rows[o][11],
							checkContents : true,
							id:o,
							favorite:'off'

						});
					}
				} else {
					lesson.push({
						lastname : "",
						firstname : "",
						state : "",
						year : "",
						grades : "",
						size : "",
						title : "",
						keywords : "",
						objective : "",
						description : "",
						url : "",
						topics : "",
						checkContents : false
					});

				}

				return lesson;

			});
		},

		getNewsData : function(teachername) {
			///////////////////////////////Start Here////////////////////
			var news = [];
			var newsObj = {};
			newsObj.checkContents = false;
			var teacherfirstname = $routeParams.teachername.split('*')[0];
			var teacherlastname = $routeParams.teachername.split('*')[1];
			teacherfirstname = teacherfirstname.replace(/'/g, "\'");
			teacherlastname = teacherlastname.replace(/'/g, "\\'");
			var teachername = teacherfirstname + ' ' + teacherlastname;
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ArticleYear%2C+Teacher%2C+MediaOutlet%2C+ArticleTitle%2C+MediaOutletURL%2C+ArticleURL+FROM+1EaTTZDozzJ0k3K2FMoD0O6JAfeiHcc6SB95f0hYv+WHERE+Teacher%20CONTAINS%20IGNORING%20CASE%27' + toTitleCase(teachername) + '%27+ORDER%20BY+Teacher"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					for (var o = 0; o < result.data.rows.length; o++) {
						news.push({
							articleyear : result.data.rows[o][0],
							teacher : result.data.rows[o][1],
							mediaoutlet : result.data.rows[o][2],
							article : result.data.rows[o][3],
							medioutleturl : result.data.rows[o][4],
							articleurl : result.data.rows[o][5],
							checkContents : true
						});

					}
				} else {
					news.push({
						articleyear : "",
						teacher : "",
						mediaoutlet : "",
						article : "",
						mediaoutleturl : "",
						articleurl : "",
						checkContents : false
					});
				}

				return news;

			});
		},

		getShipData : function(ship, shiptype) {

			///////////////////////////////Start Here////////////////////

			var ships = [];

			var teacherfirstname = $routeParams.teachername.split('*')[0];
			var teacherlastname = $routeParams.teachername.split('*')[1];
			teacherfirstname = teacherfirstname.replace(/'/g, "\'");
			teacherlastname = teacherlastname.replace(/'/g, "\\'");
			var teachername = teacherfirstname + ' ' + teacherlastname;
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ShipName%2C+Image+%2CDescription+FROM+1pfPZ8CHS1sXia_hgESAHxdXOYzalx-IWU2MdsPkC+WHERE+ShipName%20CONTAINS%20IGNORING%20CASE%27' + toTitleCase(ship) + '%27+ORDER%20BY+ShipName"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					for (var o = 0; o < result.data.rows.length; o++) {
						ships.push({
							shipname : result.data.rows[o][0],
							shipimage : result.data.rows[o][1],
							description : result.data.rows[o][2],
							checkShip : true
						});

					}
				} else {
					ships.push({
						shipname : "",
						shipimage : "",
						description : "",
						checkShip : false
					})
				}
				return ships;

			});
		},

		getWPData : function(year, name) {
			var WPdata = {};
			//var feed = 'http://teacheratsea.wordpress.com/category/'+$routeParams.teachername.split('*')[0].toLowerCase()+'-'+$routeParams.teachername.split('*')[1].toLowerCase()+'/feed';
			//console.log(feed);

			return $http.get('/php/xml_json.php?q=' + year + '&n=' + name).then(function(result) {

				WPdata = result.data;
				WPdata.dataLoaded = false;
				WPdata.Images = [];
				WPdata.Videos = [];
				WPdata.checkVideos = false;
				WPdata.checkBlogs = false;
				WPdata.checkPhotos = false;
				WPdata.YT = [];
				WPdata.WPVid = [];
				WPdata.VMVid = [];
				//WPdata.bigImage=false;
				var ImagesCap = {};
				ImagesCap.src = '';
				ImagesCap.caption = '';
				var ImagesArr = [];
				var VideosArr = [];
				var images_url = '';
				if (WPdata.items.length == 0) {
					WPdata.checkForItems = false;
				} else {
					WPdata.checkForItems = true;
				}
				
				for (var k = 0; k < WPdata.gallery_images.length - 1; k++) {

					var hyph_index = WPdata.gallery_images[k].post_url[0].lastIndexOf('-');
					if ((WPdata.gallery_images[k].post_url[0].length - hyph_index) < 4) {
						var posturl = WPdata.gallery_images[k].post_url[0].slice(0, hyph_index);
					} else {
						var posturl = WPdata.gallery_images[k].post_url[0];
					}
					if (WPdata.gallery_images.length > 0 && WPdata.gallery_images[k].src[0] != undefined) {

						if ((WPdata.gallery_images[k].src[0].match('.mov') || WPdata.gallery_images[k].src[0].match('.m4v') || WPdata.gallery_images[k].src[0].match('.ogg') || WPdata.gallery_images[k].src[0].match('.wmv') || WPdata.gallery_images[k].src[0].match('.m4a') || WPdata.gallery_images[k].src[0].match('.mp4') || WPdata.gallery_images[k].src[0].match('.avi') || WPdata.gallery_images[k].src[0].match('.doc') || WPdata.gallery_images[k].src[0].match('.docx') || WPdata.gallery_images[k].src[0].match('.pdf') || WPdata.gallery_images[k].src[0].match('.xlsx') || WPdata.gallery_images[k].src[0].match('.xls') || WPdata.gallery_images[k].src[0].match('.ppt') || WPdata.gallery_images[k].src[0].match('.pptx'))) {
							//var video_src = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0]);
							var img_video = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0].replace('.mp4', '_hd.original.jpg'));
							//VideosArr.push(video_src);
							//VideosArr.push(jQuery.parseJSON('{"vid":"'+video_src+'","img":"'+img_video+'"}'));
						} else if (!WPdata.gallery_images[k].src[0].match('.mov') || !WPdata.gallery_images[k].src[0].match('.mp4') || (WPdata.gallery_images[k].caption == "" && WPdata.gallery_images[k].excerpt == "")) {

							//if(!images_url.match(posturl.replace(/\W/g,'')))
							{
								var gallery_src = WPdata.gallery_images[k].src[0];

								if (WPdata.gallery_images[k].caption != "" && !WPdata.gallery_images[k].caption.match('a:1')) {
									var gallery_caption = WPdata.gallery_images[k].caption;
								} else if (WPdata.gallery_images[k].excerpt != "") {
									var gallery_caption = WPdata.gallery_images[k].excerpt;

								} else {
									gallery_caption = 'Photo by ' + name;
								}
								gallery_caption = gallery_caption.replace(/"/g, '&quos;');
								gallery_caption = gallery_caption.replace(/'/g, '&#39;;');
								gallery_caption = gallery_caption.replace(/\n/g, '');
								var post_url = WPdata.gallery_images[k].post_url[0];
								var post_title = post_url.replace('http://teacheratsea.wordpress.com/','').split('/')[3];
								post_title = toTitleCase(post_title.replace(/-/g, ' '));
								post_title = post_title.replace(' 20', ', 20');
								ImagesArr.push(jQuery.parseJSON('{"src":"' + gallery_src + '","id":"' + ImagesArr.length + '","tabIndex":"'+ImagesArr.length+250+'","caption":"' + gallery_caption.replace(/&#39;;/g, '\'').replace(/&quos;/g, '\'') + '", "favorite":"off","parent":"' + WPdata.gallery_images[k].parent[0] + '","post_url":"' + post_url + '", "post_title":"' + post_title + '"}'));
								images_url += posturl.replace(/\W/g, '') + ',';
							}

						}

					}
				}

				
				for (var x = 0; x < (WPdata.items.length); x++) {

					WPdata.items[x].id=x;
					WPdata.items[x].favorite='off'
					var html = removeHTML(WPdata.items[x].MainContent);
					WPdata.items[x].contentSnipp = Slicer(html, 380);
					//WPdata.items[x].src = ImagesArr[0];
					var tmpstr = '';
					var imagesObj = {};
					WPdata.items[x].imagesArr = [];
					WPdata.items[x].CategoriesArr = [];
					imagesObj.src = '';
					imagesObj.caption = '';

					if (WPdata.items[x].YouTubeVideos.split(',') != "") {
						WPdata.YT.push($sce.trustAsResourceUrl('http://www.youtube.com/embed/' + WPdata.items[x].YouTubeVideos.split(',')[0] + '??&rel=0&showinfo=0&autohide=1'));
					}
					if (WPdata.items[x].WPVideos.split(',') != "") {
						var wpvideo = WPdata.items[x].WPVideos.split(',')[0].split(' w')[0].replace(' ', '');
						WPdata.WPVid.push(jQuery.parseJSON('{"title":"' + WPdata.items[x].BlogTitle + '","lnk":"' + WPdata.items[x].BlogUrl[0] + '", "src":"' + wpvideo + '"}'));

					}
					if (WPdata.items[x].VimeoVideos.split(',') != "") {
						WPdata.VMVid.push($sce.trustAsResourceUrl('http://player.vimeo.com/video/' + WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0].replace(' ', '')));
						//$sce.trustAsResourceUrl('http://player.vimeo.com/video/'+WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0]));
					}

					for (var f = 0; f < WPdata.items[x].Tags.split(',').length; f++) {

						if (!tmpstr.replace(/\W/g, '').match(WPdata.items[x].Tags.split(',')[f].replace(/\W/g, ''))) {
							WPdata.items[x].CategoriesArr.push(WPdata.items[x].Tags.split(',')[f]);
							tmpstr = tmpstr + WPdata.items[x].Tags.split(',')[f];
						}

					}
				}

				
				WPdata.Videos = VideosArr;

				WPdata.Images = ImagesArr;
				
				console.log((WPdata))
				return WPdata;
			});

		}
	};

}]);

TAS_SITE.factory('preloadImage', ['$q', '$rootScope',
function($q, $rootScope) {

	// I manage the preloading of image objects. Accepts an array of image URLs.
	function Preloader(imageLocations) {
		// I am the image SRC values to preload.
		this.imageLocations = imageLocations;

		// As the images load, we'll need to keep track of the load/error
		// counts when announing the progress on the loading.
		this.imageCount = this.imageLocations.length;
		this.loadCount = 0;
		this.errorCount = 0;

		// I am the possible states that the preloader can be in.
		this.states = {
			PENDING : 1,
			LOADING : 2,
			RESOLVED : 3,
			REJECTED : 4
		};

		// I keep track of the current state of the preloader.
		this.state = this.states.PENDING;

		// When loading the images, a promise will be returned to indicate
		// when the loading has completed (and / or progressed).
		this.deferred = $q.defer();
		this.promise = this.deferred.promise;

	}

	// ---
	// STATIC METHODS.
	// ---

	// I reload the given images [Array] and return a promise. The promise
	// will be resolved with the array of image locations.
	Preloader.preloadImages = function(imageLocations) {
		window.scrollTo(50, 0)
		var preloader = new Preloader(imageLocations);
		
		return ( preloader.load() );

	};

	// ---
	// INSTANCE METHODS.
	// ---

	Preloader.prototype = {

		// Best practice for "instnceof" operator.
		constructor : Preloader,

		// ---
		// PUBLIC METHODS.
		// ---

		// I determine if the preloader has started loading images yet.
		isInitiated : function isInitiated() {

			return (this.state !== this.states.PENDING );

		},

		// I determine if the preloader has failed to load all of the images.
		isRejected : function isRejected() {

			return (this.state === this.states.REJECTED );

		},

		// I determine if the preloader has successfully loaded all of the images.
		isResolved : function isResolved() {

			return (this.state === this.states.RESOLVED );

		},

		// I initiate the preload of the images. Returns a promise.
		load : function load() {

			// If the images are already loading, return the existing promise.
			if (this.isInitiated()) {

				return (this.promise );

			}

			this.state = this.states.LOADING;

			for (var i = 0; i < this.imageCount; i++) {

				this.loadImageLocation(this.imageLocations[i]);

			}

			// Return the deferred promise for the load event.
			return (this.promise );

		},

		// ---
		// PRIVATE METHODS.
		// ---

		// I handle the load-failure of the given image location.
		handleImageError : function handleImageError(imageLocation) {

			this.errorCount++;

			// If the preload action has already failed, ignore further action.
			if (this.isRejected()) {

				return;

			}

			this.state = this.states.REJECTED;

			this.deferred.reject(imageLocation);

		},

		// I handle the load-success of the given image location.
		handleImageLoad : function handleImageLoad(imageLocation) {

			this.loadCount++;

			// If the preload action has already failed, ignore further action.
			if (this.isRejected()) {

				return;

			}

			// Notify the progress of the overall deferred. This is different
			// than Resolving the deferred - you can call notify many times
			// before the ultimate resolution (or rejection) of the deferred.
			this.deferred.notify({
				percent : Math.ceil(this.loadCount / this.imageCount * 100),
				imageLocation : imageLocation
			});

			// If all of the images have loaded, we can resolve the deferred
			// value that we returned to the calling context.
			if (this.loadCount === this.imageCount) {

				this.state = this.states.RESOLVED;

				this.deferred.resolve(this.imageLocations);

			}

		},

		// I load the given image location and then wire the load / error
		// events back into the preloader instance.
		// --
		// NOTE: The load/error events trigger a $digest.
		loadImageLocation : function loadImageLocation(imageLocation) {

			var preloader = this;

			// When it comes to creating the image object, it is critical that
			// we bind the event handlers BEFORE we actually set the image
			// source. Failure to do so will prevent the events from proper
			// triggering in some browsers.
			var image = $(new Image()).load(function(event) {

				// Since the load event is asynchronous, we have to
				// tell AngularJS that something changed.
				$rootScope.$apply(function() {

					preloader.handleImageLoad(event.target.src);

					// Clean up object reference to help with the
					// garbage collection in the closure.
					preloader = image = event = null;

				});

			}).error(function(event) {

				// Since the load event is asynchronous, we have to
				// tell AngularJS that something changed.
				$rootScope.$apply(function() {

					preloader.handleImageError(event.target.src);

					// Clean up object reference to help with the
					// garbage collection in the closure.
					preloader = image = event = null;

				});

			}).prop("src", imageLocation);

		}
	};

	// Return the factory instance.
	return (Preloader );

}]);



TAS_SITE.factory('Class', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
	createStateObj : function()
	{
	var usStates = [
    { name: 'ALABAMA', abbreviation: 'AL', num:0, isThere:false},
    { name: 'ALASKA', abbreviation: 'AK',  num:0, isThere:false},
    { name: 'ARKANSAS', abbreviation: 'AR',  num:0, isThere:false},
    { name: 'AMERICAN SAMOA', abbreviation: 'AS',  num:0, isThere:false},
    { name: 'ARIZONA', abbreviation: 'AZ',  num:0, isThere:false},
    { name: 'CALIFORNIA', abbreviation: 'CA',  num:0, isThere:false},
    { name: 'COLORADO', abbreviation: 'CO',  num:0, isThere:false},
    { name: 'CONNECTICUT', abbreviation: 'CT',  num:0, isThere:false},
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC',  num:0, isThere:false},
    { name: 'DELAWARE', abbreviation: 'DE',  num:0, isThere:false},
    { name: 'FLORIDA', abbreviation: 'FL',  num:0, isThere:false},
    { name: 'GEORGIA', abbreviation: 'GA',  num:0, isThere:false},
    { name: 'GUAM', abbreviation: 'GU',  num:0, isThere:false},
    { name: 'HAWAII', abbreviation: 'HI',  num:0, isThere:false},
    { name: 'IOWA', abbreviation: 'IA', num:0, isThere:false},
    { name: 'IDAHO', abbreviation: 'ID',  num:0, isThere:false},
    { name: 'ILLINOIS', abbreviation: 'IL',  num:0, isThere:false},
    { name: 'INDIANA', abbreviation: 'IN', num:0, isThere:false},
    { name: 'KANSAS', abbreviation: 'KS',  num:0, isThere:false},
    { name: 'KENTUCKY', abbreviation: 'KY',  num:0, isThere:false},
    { name: 'LOUISIANA', abbreviation: 'LA',  num:0, isThere:false},
    { name: 'MASSACHUSETTS', abbreviation: 'MA',  num:0, isThere:false},    
    { name: 'MARYLAND', abbreviation: 'MD',  num:0, isThere:false},
    { name: 'MAINE', abbreviation: 'ME', num:0, isThere:false},
    { name: 'MICHIGAN', abbreviation: 'MI',  num:0, isThere:false},
    { name: 'MINNESOTA', abbreviation: 'MN',  num:0, isThere:false},
    { name: 'MISSOURI', abbreviation: 'MO',  num:0, isThere:false},
    { name: 'MISSISSIPPI', abbreviation: 'MS',  num:0, isThere:false},
    { name: 'MONTANA', abbreviation: 'MT',  num:0, isThere:false},
     { name: 'NORTH CAROLINA', abbreviation: 'NC',  num:0, isThere:false},
    { name: 'NORTH DAKOTA', abbreviation: 'ND',  num:0, isThere:false},
    { name: 'NEBRASKA', abbreviation: 'NE',  num:0, isThere:false},
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH',  num:0, isThere:false},
	{ name: 'NEW JERSEY', abbreviation: 'NJ',  num:0, isThere:false},
    { name: 'NEW MEXICO', abbreviation: 'NM',  num:0, isThere:false},
    { name: 'NEVADA', abbreviation: 'NV',  num:0, isThere:false},
    { name: 'NEW YORK', abbreviation: 'NY',  num:0, isThere:false},
    { name: 'OHIO', abbreviation: 'OH',  num:0, isThere:false},
    { name: 'OKLAHOMA', abbreviation: 'OK',  num:0, isThere:false},
    { name: 'OREGON', abbreviation: 'OR',  num:0, isThere:false},
    { name: 'PENNSYLVANIA', abbreviation: 'PA',  num:0, isThere:false},
    { name: 'PUERTO RICO', abbreviation: 'PR',  num:0, isThere:false},
    { name: 'RHODE ISLAND', abbreviation: 'RI', num:0, isThere:false},
    { name: 'SOUTH CAROLINA', abbreviation: 'SC',  num:0, isThere:false},
    { name: 'SOUTH DAKOTA', abbreviation: 'SD', num:0, isThere:false},
    { name: 'TENNESSEE', abbreviation: 'TN',  num:0, isThere:false},
    { name: 'TEXAS', abbreviation: 'TX',  num:0, isThere:false},
    { name: 'UTAH', abbreviation: 'UT',  num:0, isThere:false},
    { name: 'VIRGINIA', abbreviation: 'VA', num:0, isThere:false},
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI', num:0, isThere:false},
    { name: 'VERMONT', abbreviation: 'VT',  num:0, isThere:false},
    { name: 'WASHINGTON', abbreviation: 'WA',  num:0, isThere:false},
    { name: 'WISCONSIN', abbreviation: 'WI',  num:0, isThere:false},
    { name: 'WEST VIRGINIA', abbreviation: 'WV',  num:0, isThere:false},
    { name: 'WYOMING', abbreviation: 'WY',  num:0, isThere:false },
    { name: 'BREMUDA', abbreviation: 'BM',  num:0, isThere:false }
];
			
	return usStates;
		
},	
	createTeacherList : function() {
			var teachers = [];
			
			var year = $location.path().split('/')[1].split('/')[0];

			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+WHERE+CruiseDates%20%20CONTAINS%20IGNORING%20CASE%27' + year + '%27+ORDER%20BY+TeacherLastName+"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
					if (result.data.rows != undefined) {

						for (var o = 0; o < result.data.rows.length; o++) {
						teachers.push({
							lastname : result.data.rows[o][0],
							lastname_forDOM : DigPatt(result.data.rows[o][0].replace(' ', '')),
							firstname : result.data.rows[o][1],
							shiptype: result.data.rows[o][2],
							ship : result.data.rows[o][3],
							shipurl : result.data.rows[0][4],
							cruiseurl : result.data.rows[o][5],
							mission:result.data.rows[o][6],
							dates : result.data.rows[o][7],
							subjects : result.data.rows[o][8],
							school : result.data.rows[o][9],
							city : result.data.rows[o][10],
							state : result.data.rows[o][11],					
							image : result.data.rows[o][12].split('?')[0],
							grades : result.data.rows[o][13],
							schoolurl : result.data.rows[o][14],
							wordpressurl : result.data.rows[o][15],
							year: result.data.rows[o][16],
							subjects1 : result.data.rows[o][8].split('&&')[0],
							subjects2 : result.data.rows[o][8].split('&&')[1],
							school1 : result.data.rows[o][9].split('&&')[0],
							school2 : result.data.rows[o][9].split('&&')[1],
							schoolurl1 : result.data.rows[o][14].split('&&')[0],
							schoolurl2 : result.data.rows[o][14].split('&&')[1],
							tabIndex:150+o,
							checkContents : true

						});
						}
				} else {
					
						teachers.push({
							lastname :'',
							firstname : '',
							shiptype: '',
							ship : '',
							shipurl:'',
							cruiseurl : '',
							mission:'',
							dates : '',
							subjects : '',
							school : '',
							city : '',
							state : '',					
							image : '' ,
							grades : '',
							schoolurl :'',
							wordpressurl : '',
							subjects1:'',
							subjects2:'',
							checkContents : '',
						});
				}
				return teachers;	
			});
	}
};	
}]);	




////////////////////Media Page///////////////////////////

TAS_SITE.factory('Media', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
	loadMediaList : function() {
			var teachers = [];
			
			

			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+ORDER%20BY+TeacherLastName+"&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
					if (result.data.rows != undefined) {
						teachers.yearsArr=[];
						teachers.finalYearsArr=[];
						teachers.group0=[];
						teachers.group1=[];
						teachers.group2=[];
						teachers.group3=[];
						teachers.buttons =[];
					


						for (var o = 0; o < result.data.rows.length; o++) {
						
							teachers.push({
							lastname : result.data.rows[o][0],
							lastname_forDOM : DigPatt(result.data.rows[o][0].replace(' ', '')),
							firstname : result.data.rows[o][1].replace(' ', ''),
							shiptype: result.data.rows[o][2],
							ship : result.data.rows[o][3],
							shipurl : result.data.rows[0][4],
							cruiseurl : result.data.rows[o][5],
							mission:result.data.rows[o][6],
							dates : result.data.rows[o][7],
							subjects : result.data.rows[o][8],
							school : result.data.rows[o][9],
							city : result.data.rows[o][10],
							state : result.data.rows[o][11],					
							image : result.data.rows[o][12].split('?')[0] + '?w=100' ,
							grades : result.data.rows[o][13],
							schoolurl : result.data.rows[o][14],
							wordpressurl : result.data.rows[o][15],
							year: result.data.rows[o][16],
							subjects1 : result.data.rows[o][8].split('&&')[0],
							subjects2 : result.data.rows[o][8].split('&&')[1],
							school1 : result.data.rows[o][9].split('&&')[0],
							school2 : result.data.rows[o][9].split('&&')[1],
							schoolurl1 : result.data.rows[o][14].split('&&')[0],
							schoolurl2 : result.data.rows[o][14].split('&&')[1],
							checkContents : true,
							favorite:'off',
							tabIndex : (150+o)
							
							
							

						});	
							teachers.yearsArr.push(result.data.rows[o][16]);
								
							}
							teachers.yearsArr.sort().reverse();
							for(var x=0; x<teachers.yearsArr.length-1; x++)
							{
								if(teachers.yearsArr[x]!=teachers.yearsArr[x+1])
								{
									teachers.finalYearsArr.push(teachers.yearsArr[x]);
									
									if(teachers.finalYearsArr.length<5)
									{
									teachers.buttons.push({name: teachers.yearsArr[x].toString(), state: 'off'});
									}
								}
							}
							
							
								
								for (var y=0; y<teachers.length; y++)
								{
									
									if(teachers.finalYearsArr[0]==teachers[y].year)
									{
										teachers.group0.push(teachers[y]);
										if(teachers[y].wordpressurl!="#"||teachers[y].wordpressurl!=null)
										{
											teachers[y].imagesExist =true;
											
										}
										else
										{
											teachers[y].imagesExist=false;
										}
									}
									if(teachers.finalYearsArr[1]==teachers[y].year)
									{
										teachers.group1.push(teachers[y]);
										if(teachers[y].wordpressurl!="#"||teachers[y]!=null)
										{
											teachers[y].imagesExist =true;
										}
										else
										{
											teachers[y].imagesExist=false;
										}
									}
									if(teachers.finalYearsArr[2]==teachers[y].year)
									{
										teachers.group2.push(teachers[y]);
										if(teachers[y].wordpressurl!="#"||teachers[y].wordpressurl!=null)
										{
											teachers[y].imagesExist =true;
										}
										else
										{
											teachers[y].imagesExist=false;
										}
									}
									if(teachers.finalYearsArr[3]==teachers[y].year)
									{
										teachers.group3.push(teachers[y]);
										if(teachers[y].wordpressurl!="#"||teachers[y].wordpressurl!=null)
										{
											teachers[y].imagesExist =true;
										}
										else
										{
											teachers[y].imagesExist=false;
										}
									}
									
								
			
							
						
						}
				} else {
					
						teachers.push({
							lastname :'',
							firstname : '',
							shiptype: '',
							ship : '',
							shipurl:'',
							cruiseurl : '',
							mission:'',
							dates : '',
							subjects : '',
							school : '',
							city : '',
							state : '',					
							image : '' ,
							grades : '',
							schoolurl :'',
							wordpressurl : '',
							subjects1:'',
							subjects2:'',
							checkContents : '',
						});
				}
				//console.log(teachers);
				return teachers;	
			});
	}
};	
}]);	


TAS_SITE.factory('News', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
	getNewsData : function() {
			var news = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ArticleYear,Teacher,MediaOutlet,ArticleTitle,MediaOutletURL,ArticleURL,Image+FROM+1EaTTZDozzJ0k3K2FMoD0O6JAfeiHcc6SB95f0hYv+ORDER%20BY+ArticleYear+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
					if (result.data.rows != undefined) {
						news.yearsArr=[];
						news.finalYearsArr=[];
						news.teachers = [];
						news.holderNews=[];
						news.finalNews=[];
						var holderNewsStr='';
					


						for (var o = 0; o < result.data.rows.length; o++) {
							news.push({
							articleYear : result.data.rows[o][0],
							teacher : result.data.rows[o][1],
							mediaoutlet: result.data.rows[o][2],
							articletitle : result.data.rows[o][3],
							mediaoutleturl : result.data.rows[0][4],
							articleurl : result.data.rows[o][5],
							image : result.data.rows[o][6],
							checkContents : true,
							
							
							
						});

						news.yearsArr.push(result.data.rows[o][0]);
						
						}
					}
						for(var i=0; i<news.length-1; i++)
						{
							if(news[i].teacher!=news[i+1].teacher)
							{
							news.teachers.push({teacher: news[i].teacher, year:news[i].articleYear});	
							}
							if(news.yearsArr[i]!=news.yearsArr[i+1])
							{
								news.finalYearsArr.push(news.yearsArr[i]);
								
							}
							
								
						}
						news.finalYearsArr.push(news.yearsArr[news.length-1]);
						news.teachers.push({teacher: news[news.length-1].teacher, year:news[news.length-1].articleYear});	
						
						for(var u=0; u<news.teachers.length; u++)
						{
							for(var x=0; x<news.length; x++)
							{
								if(news.teachers[u].teacher==news[x].teacher && !holderNewsStr.replace(/\W/g,'').match(news.teachers[u].teacher.replace(/\W/g,'')))
								{
									news.holderNews.push({id:news.teachers[u].year+'_'+news[x].teacher, newsItems:news[x]});
								}
								
							}
						holderNewsStr+=news.teachers[u].teacher;
						}
						var teacherStr='';
						for(var b=0; b<news.holderNews.length-1; b++)
						{
							if(teacherStr.match(news.holderNews[b].id))
							{
								tmpid = news.holderNews[b].id;
								
								for(var c=0; c<news.finalNews.length; c++)
								{
									extra=news.holderNews[b].newsItems.articletitle+'##'+news.holderNews[b].newsItems.mediaoutlet+'##'+news.holderNews[b].newsItems.articleurl+'##'+news.holderNews[b].newsItems.mediaoutleturl+'$$';
									if(tmpid == news.finalNews[c].id)
									{
									news.finalNews[c].extra +=extra;	
									}	
								}
								
							}
							else
							{
								news.finalNews.push({id: news.holderNews[b].id , main: news.holderNews[b], extra:'', tabIndex:500-b});
							}
						
							teacherStr+=news.holderNews[b].id;
							
						}
						
					
						console.log(news)
						return news;
			});
					
		}
	};
			
}]);		
						
						
TAS_SITE.factory('POW', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
		getPOWData : function() {
		var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,PhotoDescription,ShortDescription,BlogURL,PhotoCredit,BlogTitle,PublishDate, Keywords+FROM+19WBCSYuVJh1O2KaThKQJpLLn0VF6w3rHhbKtZMVf+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<result.data.rows.length; i++)
						{
							var pd = new Date(result.data.rows[i][7]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][7]!='#'||td>=tpd)
							{
							pow.push(
							{
							id:i,
							url:result.data.rows[i][0],
							caption : result.data.rows[i][1].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							description :result.data.rows[i][2].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							shortdescription :result.data.rows[i][3].replace(/<p>/g, '').replace(/<\/p>/g, ''),
							parent : result.data.rows[i][4],
							credit:result.data.rows[i][5],
							post_title:result.data.rows[i][6],
							date: result.data.rows[i][7],
							keywords : result.data.rows[i][8],
							dataloaded: true,
							tabIndex: (150+(i+7))
							});
						}
					
					}
					
				}	
				
				return pow
			});
		
		}
		
	};
}]);

TAS_SITE.factory('Alumni', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
		getSpotData: function()
		{
			var spot=[];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<result.data.rows.length; i++)
						{
							var pd = new Date(result.data.rows[i][6]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][6]!='#'||td>=tpd)
							{
							spot.push(
							{
							id:i,
							firstname:result.data.rows[i][0],
							lastname : result.data.rows[i][1],
							shortbody :result.data.rows[i][2],
							longbody :result.data.rows[i][3],
							url : result.data.rows[i][4].split('?')[0],
							caption:result.data.rows[i][5],
							date: result.data.rows[i][6],
							region : result.data.rows[i][7],
							more_url:result.data.rows[i][5].replace(/ /g, '_'),
							hash: '/indiv_spotlight/'+result.data.rows[i][0].replace(/ /g, '_')+'_'+result.data.rows[i][1].replace(/ /g,'_'),
							dataloaded: true,
							tabIndex : 150+i
							
							});
						}
					
					}
					
				}	
				
				return spot
			});
		}
	};
}]);


TAS_SITE.factory('Tabs', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

		return{
			
			getTabsData: function(spreadsheet_id, type)
			{
				var tabs=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/1/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
				tabs=result.data.feed.entry;
				
								
					for (var i=0; i<tabs.length; i++)
					{
						if(i==0)
						{
							tabs[i].gsx$tabname.state='on'; 
							tabs[i].gsx$tabname.classy='shower';
							tabs[i].gsx$tabname.rp=tabs[i].gsx$tabname.$t.replace(/ /g, '_');
							tabs[i].image = tabs[i].gsx$image.$t.split('?')[0];
							tabs[i].tabIndex = i+150;
							tabs[i].caption = tabs[i].gsx$caption.$t
						}	
						else
						{
							tabs[i].gsx$tabname.classy='on';
							tabs[i].gsx$tabname.classy="hider";
							tabs[i].gsx$tabname.rp=tabs[i].gsx$tabname.$t.replace(/ /g, '_');
							tabs[i].image = tabs[i].gsx$image.$t.split('?')[0];
							tabs[i].tabIndex = i+150;
							tabs[i].caption = tabs[i].gsx$caption.$t
						}
					}
					tabs.type = type;
					
					return tabs;
				});
			},
			getTopData: function(spreadsheet_id,type)
			{
				var top=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/2/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
				top=result.data.feed.entry;
				top.type = type;
				top.image = result.data.feed.entry[0].gsx$image.$t;
				top.imagealt = result.data.feed.entry[0].gsx$imagealt.$t;
				console.log(top);
				return top;
				});
			}
		};
}]);

TAS_SITE.factory('FAQs', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

		return{
			
			getFAQData: function()
			{
				var faq=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdGF0RG02ZzNHYzFRZnYwd3ZlNlRWcVE/1/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
					var faq=result.data.feed.entry;
					for(var i=0; i<faq.length; i++)
					{
						faq[i].id=i;
						faq[i].gsx$answer.hideAnswer=true;
						faq[i].tabIndex=i+150;
					}
					return faq;
				});
			},
			getQuotesData:function()
			{
				var quotes=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdHczblprYk9WalhQTzhnY0h5Sm10Z3c/1/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
					quotes = result.data.feed.entry;
					for(var i=0; i<quotes.length;i++)
					{
						quotes[i].id=i;
						quotes[i].gsx$tn.$t = quotes[i].gsx$tn.$t;
						quotes[i].tabIndex=i+200;
					}
					
					return quotes;
				
				});
			}
		};		
}]);

TAS_SITE.factory('TASA', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

		return{
			
			getIntroData: function()
			{
				var intro=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdEJDOE9weDRPdnV2WmN6aEVJUlByZnc/3/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
					var intro=result.data.feed.entry;
					
					return intro;
				});
			},
			getGalleryData: function()
			{
				var gallery=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdEJDOE9weDRPdnV2WmN6aEVJUlByZnc/2/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
					var gallery=result.data.feed.entry;
					for(var i=0; i<gallery.length; i++)
					{
						gallery[i].id=i;
						gallery[i].tabIndex = i+150;
						//faq[i].gsx$answer.hideAnswer=true;
					}
					return gallery;
				});
			},
			getTeacherData:function()
			{
				var teachers=[];
				return $http.jsonp('https://spreadsheets.google.com/feeds/list/0Ak_vKEBczgcYdFlQc2dkYjlqNVlzUzJXWlVrWUFSZFE/1/public/values?alt=json&callback=JSON_CALLBACK').then(function(result){
					teachers = result.data.feed.entry;
					teachers.teacher_locations=[];
					teachers.teacher_locations_str ='';
					teachers.finalLocation=[];
					teachers.states=[];
					teachers.objArr=[];
					teachers.finalObjArr=[];
					
					for(var i=0; i<teachers.length-1; i++)
						{
							
							
							if(teachers[i].gsx$state.$t!=teachers[i+1].gsx$state.$t)
							{
							teachers.teacher_locations.push(JSON.stringify({state:teachers[i].gsx$state.$t, stateAB: teachers[i].gsx$stateab.$t, city:teachers[i].gsx$city.$t, profileurl: teachers[i].gsx$profileurl.$t, profileimage: teachers[i].gsx$profileimage.$t, school: teachers[i].gsx$schools.$t, name:teachers[i].gsx$teachername.$t, year:teachers[i].gsx$year.$t}));	
							teachers.teacher_locations.push('$$$$');	
							teachers.states.push(teachers[i].gsx$state.$t);
							}
							else
							{
								teachers.teacher_locations.push(JSON.stringify({state:teachers[i].gsx$state.$t, stateAB: teachers[i].gsx$stateab.$t, city:teachers[i].gsx$city.$t, profileurl: teachers[i].gsx$profileurl.$t, profileimage: teachers[i].gsx$profileimage.$t, school: teachers[i].gsx$schools.$t, name:teachers[i].gsx$teachername.$t, year:teachers[i].gsx$year.$t}));
							}
								
						}
						
						teachers.teacher_locations.push(JSON.stringify({state:teachers[teachers.length-1].gsx$state.$t, stateAB: teachers[teachers.length-1].gsx$stateab.$t, city:teachers[teachers.length-1].gsx$city.$t, profileurl: teachers[teachers.length-1].gsx$profileurl.$t, profileimage: teachers[teachers.length-1].gsx$profileimage.$t, school: teachers[teachers.length-1].gsx$schools.$t, name:teachers[teachers.length-1].gsx$teachername.$t, year:teachers[teachers.length-1].gsx$year.$t}));	
							teachers.teacher_locations.push('$$$$');	
							teachers.states.push(teachers[i].gsx$state.$t);					
					
					teachers.teacher_location_str = teachers.teacher_locations.toString();
					teachers.finalLocation = teachers.teacher_location_str.split('$$$$');
					//console.log(teachers.finalLocation);
					
					for(var x=0; x<teachers.finalLocation.length;x++)
					{
						var splitter = teachers.finalLocation[x].split('},')
						var objArr=[];
						//console.log(splitter);
						for (var t=0; t<splitter.length-1; t++)
						{
						var tmpstr =splitter[t]+'}';
						tmpstr = tmpstr.replace(',{','{')
						
						objArr.push(jQuery.parseJSON(tmpstr));
						
					
						}
						teachers.finalObjArr.push({objects:objArr, tabIndex:(i+130)});
					}
			
					console.log(teachers)
					return teachers;
				
				});
			},
			getSpotlightData:function(region)
			{
				var spot = [];
				return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+WHERE+Region=%27'+region+'%27+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
					if(result.data.rows!=null)
					{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						for (var i=0; i<result.data.rows.length; i++)
						{
							var pd = new Date(result.data.rows[i][6]);
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][6]!='#'||td>=tpd)
							{
							spot.push(
							{
							id:i,
							firstname:result.data.rows[i][0],
							lastname : result.data.rows[i][1],
							shortbody :result.data.rows[i][2],
							longbody :result.data.rows[i][3],
							url : result.data.rows[i][4].split('?')[0],
							caption:result.data.rows[i][5],
							date: result.data.rows[i][6],
							region : result.data.rows[i][7],
							more_url:result.data.rows[i][5].replace(/ /g, '_'),
							hash: '/indiv_spotlight/'+result.data.rows[i][0].replace(/ /g, '_')+'_'+result.data.rows[i][1].replace(/ /g,'_'),
							dataloaded: true
							});
						}
					
					}
					
				}	
				return spot;
			});
				
			},
		};		
}]);

TAS_SITE.factory('Slideshow', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

return{
	
	loadSlideData:function(tableId)
	{
		var slideshow = [];
				return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+SlideNumber,Title,ImageUrl,Link,Description,PublishDate,Type+FROM+'+tableId+'+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {					
var d= new Date();
						result.data.rows.reverse();
						var slideshow_beginner = JSON.stringify(result.data.rows);
						
						if(result.data.rows.length>0)
						{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						var count = 1;
								
						for (var i=0; i<result.data.rows.length; i++)
						{
							var pd = new Date(result.data.rows[i][5]);
							
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][5]!='#'||td>=tpd)
							{
								if(result.data.rows[i][6].toLowerCase()=="dyk")
								{
									if((tpd+604800000)>td)
									{
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2].split('?')[0],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											class:'inactive',
										});
									}
								}
								else if(result.data.rows[i][6].toLowerCase()=="pow"){
									if((tpd+604800000)>td)
									{	
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2].split('?')[0],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											classy:'inactive',
										});
									}
								}
								else if(result.data.rows[i][6].toLowerCase()=="alumni")
								{
									if((tpd+604800000)>td)
									{	
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2].split('?')[0],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											classy:'inactive'
										});
									}
								}
								else
								{
									slideshow.push(
									{
										slidenumber:count++,
										title: 	result.data.rows[i][1],
										imageurl:result.data.rows[i][2].split('?')[0],
										link:result.data.rows[i][3],
										description:result.data.rows[i][4],
										publishdate:result.data.rows[i][5],
										type:result.data.rows[i][6],
										hider:true,
										visible:false,
										classy:'inactive',
									});
								}
							}
						}
					}
					console.log(slideshow);
					return slideshow;
				});	
	}
	
};
}]);

TAS_SITE.factory('SearchBox', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
	searchBlogs:function(search_term)
	{
		
		var blogs ={};
		return $http.jsonp('/php/search_blogs.php?q='+search_term+'&callback=JSON_CALLBACK').then(function(result)
		{
			blogs=result.data.items;
			for(var x=0; x<blogs.length;x++)
			{
				blogs[x].id = x;
				blogs[x].tabIndex=(x+40);
			}
			
			return blogs;
		});
	},
	searchImages:function(search_term)
	{
		
		var _images={};	
		var images =[{id:''}];
		return $http.jsonp('/php/search_images.php?q='+search_term+'&callback=JSON_CALLBACK').then(function(result)
		{
			_images = result.data.images;
			console.log(_images);
			
			for(var x=0; x<_images.length; x++)
			{
				_images[x].src = _images[x].src['0'];	
							
				if ((!_images[x].src.match('.mov') && !_images[x].src.match('.m4v') && !_images[x].src.match('.ogg') && !_images[x].src.match('.wmv') && !_images[x].src.match('.m4a') && !_images[x].src.match('.mp4') && !_images[x].src.match('.avi') && !_images[x].src.match('.doc') && !_images[x].src.match('.docx') && !_images[x].src.match('.pdf') && !_images[x].src.match('.xlsx') && !_images[x].src.match('.xls') && !_images[x].src.match('.ppt') && !_images[x].src.match('.pptx')||!_images[x].src.match('teacheratsea.wordpress'))) {
					console.log(_images[x].src);
					_images[x].id=x;
					_images[x].tabIndex=(x+40);
					_images[x].post_title = _images[x].post_url[0].replace('http://teacheratsea.wordpress.com/','').split('/')[3];
					_images[x].post_title = toTitleCase(_images[x].post_title.replace(/-/g, !' '));
					_images[x].post_title = _images[x].post_title.replace(' 20', ', 20');
					_images[x].favorite='off';
					if(_images[x].caption=="" && _images[x].excerpt!="")
					{
						_images[x].finalCaption =_images[x].excerpt;
					}
					else if (_images[x].caption!=""&&_images[x].excerpt=="")
					{
						_images[x].finalCaption=_images[x].caption;
					}
					else if(_images[x].caption!=""&&_images[x].excerpt!="")
					{
						_images[x].finalCaption=_images[x].caption;
					}
					else{
						_images[x].finalCaption = 'NOAA Teacher at Sea Photo';
					}
					images.push(_images[x]);
					
				}
			}
			console.log(images);
			return images;
		});
	},
	
	searchLessons:function(search_term)
	{
		var lessons = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+LastName%2CFirstName%2CState%2C+YearSailed%2C+GradeLevel%2C+Size%2C+Title%2C+Keywords%2C+Objective%2C+Description%2C+URL%2c+Topics+FROM+17OXuyYjiIvxjr1Yd3DZ-SI-dzp-soOuTDNOHoSOA&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					for (var o = 0; o < result.data.rows.length; o++) {
						if(result.data.rows[o][0].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][1].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][2].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][3].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][4].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][6].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][7].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][8].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][9].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][11].toLowerCase().match(search_term.toLowerCase()))
						{
						
							lessons.push({
								lastname : result.data.rows[o][0],
								firstname : result.data.rows[o][1],
								state : result.data.rows[o][2],
								year : result.data.rows[o][3],
								grades : result.data.rows[o][4].split(', '),
								size : result.data.rows[o][5],
								title : result.data.rows[o][6],
								keywordArr : result.data.rows[o][7].split(', '),
								objective : result.data.rows[o][8],
								description : result.data.rows[o][9],
								url : result.data.rows[o][10],
								topics : result.data.rows[o][11],
								checkContents : true,
								hider:false,
								tabIndex:(o+41),
								id:o,
								favorite:'off'
							});
						}
					}
				}
			return lessons;
		});
	},
	
	
	searchSite:function(search_term)
	{
		var sitesearch = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+lastname,firstname,city,state,Title,Page,subject,ship,school,cruisetype,keywords+FROM+1jNDK0JUr8xJ5u1Kg-y03OSgQOE8XYEVTlYb43HuB&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					c
					for (var o = 0; o < result.data.rows.length; o++) {
						if(result.data.rows[o][0].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][1].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][2].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][3].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][4].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][6].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][7].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][8].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][9].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][10].toLowerCase().match(search_term.toLowerCase()))
						{
						
							if(result.data.rows[o][0]==""&&result.data.rows[o][1]=="")
							{
							sitesearch.push({
								lastname : result.data.rows[o][0],
								firstname : result.data.rows[o][1],
								city:result.data.rows[o][2],
								state : result.data.rows[o][3],
								title : result.data.rows[o][4],
								page :result.data.rows[o][5],
								subject :result.data.rows[o][6],
								ship: result.data.rows[o][7],
								school: result.data.rows[o][8],
								cruisetype: result.data.rows[o][9],
								keywords : result.data.rows[o][10].split(', '),
	
								id:o,
								
							});
							}
							else if((result.data.rows[o][0]!="" && result.data.rows[o][1]!="" && result.data.rows[o][4].match('2014')&&result.data.rows[o][4].match('2013')&&result.data.rows[o][4].match('2012')&& result.data.rows[o][4].match('2011')&&result.data.rows[o][4].match('2010')&&result.data.rows[o][4].match('2009')&&result.data.rows[o][4].match('2004'))&&result.data.rows[o][0].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][1].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][2].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][3].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][4].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][6].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][7].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][8].toLowerCase().replace(/\W/g, '').match(search_term.toLowerCase())||result.data.rows[o][9].toLowerCase().match(search_term.toLowerCase())||result.data.rows[o][10].toLowerCase().match(search_term.toLowerCase())){
							sitesearch.push({	
								lastname : result.data.rows[o][0],
								firstname : result.data.rows[o][1],
								city:result.data.rows[o][2],
								state : result.data.rows[o][3],
								title : result.data.rows[o][4],
								page :'#/'+result.data.rows[o][4].slice((result.data.rows[o][4].indexOf('- ')+2),(result.data.rows[o][4].indexOf('- ')+6))+'/'+result.data.rows[o][1]+'*'+result.data.rows[o][0],
								subject :result.data.rows[o][6],
								ship: result.data.rows[o][7],
								school: result.data.rows[o][8],
								cruisetype: result.data.rows[o][9],
								keywords : result.data.rows[o][10],
								id:o,
								

							});
							}
							else{
								sitesearch.push({
								lastname : result.data.rows[o][0],
								firstname : result.data.rows[o][1],
								city:result.data.rows[o][2],
								state : result.data.rows[o][3],
								title : result.data.rows[o][4],
								page :result.data.rows[o][5].replace('#/','/')+'.html',
								subject :result.data.rows[o][6],
								ship: result.data.rows[o][7],
								school: result.data.rows[o][8],
								cruisetype: result.data.rows[o][9],
								keywords : result.data.rows[o][10].split(', '),
								id:o,
								
							});
							}
						}
					}
					for(var x=0; x<sitesearch.length;x++)
					{
						sitesearch[x].tabIndex=x+40;
					}
				}
			
			return sitesearch;
		});
	},
	
	
	
		createLessonsCheck: function()
		{
			checkBoxes = [{grade:'Kindergarten', checked: false, classy: 'no-check', state:'off' },{grade:'1st', checked: false, classy: 'no-check', state:'off' },{grade:'2nd', checked: false, classy: 'no-check', state:'off' },{grade:'3rd', checked: false, classy: 'no-check', state:'off' }, {grade:'4th', checked: false, classy: 'no-check', state:'off' }, {grade:'5th', checked: false, classy: 'no-check', state:'off' }, {grade:'6th', checked: false, classy: 'no-check', state:'off' },{grade:'7th', checked: false, classy: 'no-check', state:'off' }, {grade:'8th', checked: false, classy: 'no-check', state:'off' },{grade:'9th', checked: false, classy: 'no-check', state:'off' },{grade:'10th', checked: false, classy: 'no-check', state:'off' }, {grade:'11th', checked: false, classy: 'no-check', state:'off' }, {grade:'12th', checked: false, classy: 'no-check', state:'off' }];
		return checkBoxes;
		}
	};
}]);


/*For TABS*********/
TAS_SITE.factory('TeacherDataFetch', [ 'Teacher',
function(Teacher) {
	//return {
	var teacherdata = {};
	teacherdata.data = function(teachername) {
		teacherdata = Teacher.getProfileData();
		return teacherdata;
	};
	teacherdata.result = teacherdata;
	teacherdata.count = 0;
	console.log(teacherdata);
	return teacherdata;
	//};
}]);

TAS_SITE.factory('WPDataFetch', [ 'Teacher','$location','$routeParams',
function(Teacher, $location, $routeParams) {
	//var year = $location.path().split('/')[1].split('/')[0];
	var wpdata = {};
	var lastname = DigPatt($routeParams.teachername.split('*')[1].replace(/'/g, ''), '-');
	wpdata.data = function(year, teachername) {
		
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		wpdata = Teacher.getWPData(year, toTitleCase(teachername));
		
		
		return wpdata;
	};

	wpdata.count = 0;
	
	return wpdata;
}]);

TAS_SITE.factory('LessonsDataFetch',[ 'Teacher',
function(Teacher) {
	//return {
	var lessondata = {};
	lessondata.data = function(teachername) {
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		lessondata = Teacher.getLessonData();
		return lessondata;
	};

	lessondata.count = 0;
	return lessondata;
	//};
}]);

TAS_SITE.factory('NewsDataFetch', [ 'Teacher',
function(Teacher) {
	//return {
	var newsdata = {};
	newsdata.data = function(teachername) {
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		newsdata = Teacher.getNewsData();
		return newsdata;
	};

	newsdata.count = 0;
	return newsdata;
	//};
}]);

TAS_SITE.factory('ShipDataFetch', [ 'Teacher',
function(Teacher) {

	var shipdata = {};
	shipdata.data = function(ship, shiptype) {
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		shipdata = Teacher.getShipData(ship, shiptype);
		return shipdata;
	};

	shipdata.count = 0;
	return shipdata;

}]);



TAS_SITE.factory('TabsDataFetch', [ 'Tabs',
function(Tabs) {

	var tabsdata = {};
	tabsdata.data = function(spreadsheet, type) {
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		tabsdata = Tabs.getTabsData(spreadsheet,type)
		return tabsdata;
	};

	tabsdata.count = 0;
	return tabsdata;

}]);


TAS_SITE.factory('TabsDataFetchTop', [ 'Tabs',
function(Tabs) {

	var topdata = {};
	topdata.data = function(spreadsheet,type) {
		//Teacher.getWPData(teachersteacher.year, teachersteacher.firstname+' '+teachersteacher.lastname_forDOM).
		topdata = Tabs.getTopData(spreadsheet,type)
		return topdata;
	};

	topdata.count = 0;
	return topdata;

}]);

TAS_SITE.factory('Favorites', ['$http', '$routeParams', '$location', '$rootScope', '$sce','$q',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
		
		
		addFavorites:function()
		{
		var favorites={};
			if(localStorage.getItem('BlogArr')!=null && localStorage.getItem('FavoriteArr')!='')
			{
				var blogFav = jQuery.parseJSON(localStorage.getItem('BlogArr'));
				//favorites.blogHider=false;
			}
			else
			{
				blogFav=[];
				//favorites.blogHider=true;
			}
		
		if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
		{
			var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
			//favorites.imgHider=false;
		}
		else
		{
			var imgFav =[];
			//favorites.imgHider=true;
		}
		
		if(localStorage.getItem('LessonArr')!=null && localStorage.getItem('LessonArr')!='')
			{
				var lessonFav = jQuery.parseJSON(localStorage.getItem('LessonArr'));
				//favorites.lessonHider=false;
				
			}
			else
			{
				var lessonFav =[];
				//favorites.lessonHider=true;
			}

		favorites.blogs =blogFav;
		for(var x=0; x<favorites.blogs.length; x++)
		{
			favorites.blogs[x].favorite='on';
			favorites.blogs[x].id=x;
			
		}
		favorites.images=imgFav;
		for(var y=0; y<favorites.images.length; y++)
		{
			favorites.images[y].favorite='on';
			favorites.images[y].id=y;
		}
		favorites.lessons=lessonFav;
		for(var z=0; z<favorites.lessons.length; z++)
		{
			favorites.lessons[z].favorite='on';
			favorites.lessons[z].id=z;
		}
		favorites.dyks=[];
		console.log(favorites);
		return favorites;
		},
		
		
		
		
		checkFavorites:function(obj, type)
		{
			
			///////compare localStorage to the blogposts, images, and lessons that exist on profile page, media page, and searchboxes////////////
			var favorites = {};
			if(localStorage.getItem('BlogArr')!=null && localStorage.getItem('FavoriteArr')!='')
				{
					var blogFav = jQuery.parseJSON(localStorage.getItem('BlogArr'));
					
				}
				else
				{
					blogFav=[];
				}
				
				if(localStorage.getItem('ImgArr')!=null && localStorage.getItem('ImgArr')!='')
				{
					var imgFav = jQuery.parseJSON(localStorage.getItem('ImgArr'));
					
				}
				else
				{
					var imgFav =[];
					
				}
				
				if(localStorage.getItem('LessonArr')!=null && localStorage.getItem('LessonArr')!='')
					{
						var lessonFav = jQuery.parseJSON(localStorage.getItem('LessonArr'));
						favorites.lessonHider=false;
						
					}
					else
					{
						var lessonFav =[];
						
					}
		
				favorites.blogs =blogFav;
				if(type=="blogs")
				{
					for(var x=0; x<favorites.blogs.length; x++)
					{
						//favorites.blogs[x].favorite='on';
						favorites.blogs[x].id=x;
						//console.log(obj.BlogUrl['0']);
						if(favorites.blogs[x].BlogUrl['0']==obj.BlogUrl['0'])
						{
							obj.favorite='on';
	
						}
						else{
							obj.favorite='off'
						}
					}
				}
				favorites.images=imgFav;
				if(type=="images")
				{
										for(var y=0; y<favorites.images.length; y++)
					{
						//favorites.images[y].favorite='on';
						favorites.images[y].id=y;
						if(favorites.images[y].src == obj.src)
						{
							
							console.log(obj)

							obj.favorite='on';
							console.log(obj.favorite);
							
						}
						else{
							obj.favorite='off';
						}
					}
				}
				favorites.lessons=lessonFav;
				if(type=="lessons")
				{
					console.log(obj)	
					for(var z=0; z<favorites.lessons.length; z++)
					{
						//favorites.lessons[z].favorite='on';
						favorites.lessons[z].id=z;
						if(favorites.lessons[z].url==obj.url)
						{
							obj.favorite='on';	
						}
						else{
							obj.favorite='off'
						}
					}
				}
				
				
				favorites.dyks=[];
				
				

			
		},
		
		getBitLy:function(url)
		{
			var bitly = 'http://api.bitly.com/v3/shorten?format=json&apiKey=R_06ae3d8226a246f2a0bb68afe44c8379&login=robostheimer&longUrl='+url
			return $http.get(bitly).then(
				function(result){
					return result.data.data.url;
				});
		}

	};

}]);



////////////////////////////////////Class Page/////////////////////////
