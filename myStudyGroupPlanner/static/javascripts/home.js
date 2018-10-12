/**
* Home controller
*
*/
(function () {
  'use strict';

  angular
    .module('myStudyGroupPlanner')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', '$scope', 'Authentication', '$http', '$filter', '$q'];

  /**
  * @namespace HomeController
  */
  function HomeController($location, $scope, Authentication, $http, $filter, $q) {
    var vm = this;
    
	vm.subjects = [];
	vm.classes = [];
	vm.sections = [];
	vm.filteredClasses = [];
	vm.filteredSections = [];
	vm.selectedSubject = null;
	vm.selectedClass = null;
	vm.selectedSection = null;
	vm.selectedSubjectsID = null;
	vm.selectedClassID = null;
	vm.selectedSectionID = null;
	vm.selectedSubjectHolder = null;

	vm.subjectsCreate = [];
	vm.classesCreate = [];
	vm.sectionsCreate = [];
	vm.filteredClassesCreate = [];
	vm.filteredSectionsCreate = [];
	vm.selectedSubjectCreate = null;
	vm.selectedClassCreate = null;
	vm.selectedSectionCreate = null;
	vm.selectedSubjectsIDCreate = null;
	vm.selectedClassIDCreate = null;
	vm.selectedSectionIDCreate = null;
	vm.selectedSubjectHolderCreate = null;


    /** store current user (Account) object */
    vm.thisUser = Authentication.getAuthenticatedAccount();

	/** used to ng-include calendar HTML*/
	vm.calendarHTML = '';
	/** used to include meetingModal.html */
	vm.meetingModalHTML = '/static/templates/meetingModal.html';

	vm.date = new Date();
	vm.status = "";
	vm.msgpUserAll = [];
	vm.allGroups = [];
	
	/** Used to store ids of groups from group table current user is a part of*/
	vm.userGroups = [];
	

	/** search parameters/filters */
	vm.selectedSubject = "";
	vm.selectedClass = "";
	vm.selectedSection = "";
	
	/** order search results by this variable.  Set when clicking on table column titles */
	vm.orderResultsBy = "";
	/** group availability in group search results. */
	vm.groupAvailability = "";

	/** Variable used to track activated tab */
    vm.tab = 1;
    /** Variable tracks if search results should be showed */
    vm.showSearchResults = false;
    /** Create Group Tab variables */
    vm.groupFields = {
    	groupIdentifier: 0,
    	groupName: "",
    	groupSubject: "",
    	groupClass: "",
    	groupSection: "",
    	groupMaxMembers: 30
    }


	/** used to ng-include calendar HTML*/
	vm.calendarHTML = '';
	/** used to store meeting objects for meetings user is involved with */
	vm.currentMeetings = [];
	vm.filteredMeetings = [];
	vm.meetingToModify = {};
	vm.firstMeetingFiltering = true;
	/** used to store string of comma seperated meeting start_time dd/mm formatted */
	vm.meetings = "";
	

	/** ------------------------------------------------ */
	/** Sets current activated tab                       */
	/** ------------------------------------------------ */
	vm.selectTab = function(setTab) {
		vm.tab = setTab;
	}
	
	/** ------------------------------------------------ */
	/** Checks if activated tab is equal to tab passed 
	    in as parameter                                  */
	/** ------------------------------------------------ */
	vm.isSelected = function(checkTab) {
		return vm.tab === checkTab;
	}
	
	
	/** ------------------------------------------------ */
	/** Create New Group with user as the group owner.  
	    Also when first POST response is received it calls
	    a second POST to create new msgpUser which is 
	    USER-GROUP table                                 */
	/** ------------------------------------------------ */
	vm.createGroup = function() {		
		
		/** CREATE NEW GROUP */
		$http({method: 'POST',
		url: '/api/group/',
		data: {
			groupName: vm.groupFields.groupName,
			subject: vm.groupFields.groupSubject,
			className: vm.groupFields.groupClass,
			section: vm.groupFields.groupSection,
			groupOwner: vm.thisUser.username,
			memberCount: 1,
			totalMembersAllowed: vm.groupFields.groupMaxMembers
			}
		})
		.then(function(response){
			vm.status = "Group Created";
			vm.userGroups.push(response.data.id);
			
			/** CREATE NEW USER-GROUP-REPORT ENTRY (msgpUser table) */
			$http({method: 'POST',
			url: '/api/msgpUser/',
			data: {
				msgpUserId: vm.thisUser.id,
				msgpUsername: vm.thisUser.username,
				msgpGroupId: response.data.id,
				msgpGroupName: response.data.groupName
				}
			})
			.then(function(response2){		
				/**vm.status = "";*/
				vm.getGroups();
			},
			function(response2){
				/**vm.status = "";*/
			});
			
		},
		function(response){
			vm.status = "Failed to create group.";
		});

	}
	
	
	/** ------------------------------------------------ */
	/**  Get all user-groups info                        */
	/** ------------------------------------------------ */
	vm.getGroups = function() {
	
		/** Currently no filtering django side, GETS all objects so angular can filter client side */
		$http({method: 'GET',
			url: '/api/msgpUser/'})
			.then(function(response){
			/** response is a list of msgpUser json objects, contains user AND group data, plus meeting id*/
				vm.msgpUserAll = response.data;
				/** load user's meetings */
				vm.loadUserMeetings();
			},
			function(response){
				/**vm.status = "failed";*/
		});
	}
	
	
	/** ------------------------------------------------ */
	/**  Get single groups name                          */
	/** ------------------------------------------------ */
	vm.getGroupName = function(meetingObj) {
		
		for (var i = 0; i < vm.msgpUserAll.length; i++) {
			if (vm.msgpUserAll[i].msgpGroupId == meetingObj.groupId) {
				return vm.msgpUserAll[i].msgpGroupName;
				break;
			}
		}
		return "";
	}	
	
	
	/** ------------------------------------------------ */
	/** This runs when you click search button in group 
	    search tab                                       */
	/** ------------------------------------------------ */
	vm.searchGroups = function() {
		vm.showSearchResults = true;
		vm.getAllGroups();
	}
	
	
	/** ------------------------------------------------ */
	/** This runs when you click new search button in 
	    group search results                             */
	/** ------------------------------------------------ */
	vm.resetGroupSearch = function() {
		vm.showSearchResults = false;
		vm.selectedSubject = "";
		vm.selectedClass = "";
		vm.selectedSection = "";
	}	
	
	
	/** ------------------------------------------------ */
	/**  Get group table entries                         */
	/** ------------------------------------------------ */
	vm.getAllGroups = function() {
	
		/** GET request all objects from group table */
		$http({method: 'GET',
			url: '/api/group/'})
			.then(function(response){
				vm.allGroups = response.data;
			},
			function(response){
				
		});
	}	
	
	
	/** ------------------------------------------------ */
	/** sets how search results should be sorted.  Not sorted by default right now... */
	/** ------------------------------------------------ */
	vm.setOrderBy = function(column) {
		if (vm.orderResultsBy == column)
			vm.orderResultsBy = '-' + column;
		else
			vm.orderResultsBy = column;
	}
	
	
	/** ------------------------------------------------ */
	/** check if user in a specific group by checking 
	    msgpUser table.  Return ids list from group table*/
	/** Generates list of group ids user is a part of.  
	    This list is used in group search join button 
	    functionality                                    */
	/** ------------------------------------------------ */ 
	vm.getUserGroups = function() {
			
		$http({method: 'GET',
			url: '/api/msgpUser/'})
			.then(function(response){
				for (var i = 0; i < response.data.length; i++) {
					/** save groupId to userGroups if not already added*/
					if (response.data[i].msgpUserId == vm.thisUser.id) {
						if (vm.userGroups.indexOf(response.data[i].msgpGroupId) == -1)
							vm.userGroups.push(response.data[i].msgpGroupId);	
					}	
				}
			},
			function(response){
				
		});
	}
	
	
	/** ------------------------------------------------ */
	/** Check if group id is one user has joined 
	     -- ALSO CHECKS IF GROUP IS NOT FULL             */
	/** ------------------------------------------------ */
	vm.checkIfAvailable = function(groupId, groupMemberCount, groupMaxMembers) {
		if (vm.userGroups.indexOf(groupId) > -1) {
			vm.groupAvailability = "IN GROUP";
			return true;
		}
		else if (groupMemberCount >= groupMaxMembers) {
			vm.groupAvailability = "FULL";
			return true;
		}
		else {
			return false;
		}
	}
	
	
	/** ------------------------------------------------ */
	/** Load meetings for the current user only. 
	    to be displayed in meetings                      */
	/** ------------------------------------------------ */
	vm.loadUserMeetings = function() {
	
		vm.meetings = "";
		vm.currentMeetings = [];
		vm.filteredMeetings = [];
		
		/** temporary list of meeting ids */
		var uniqueMeetingIds = [];
		var day = "";
		var month = "";
		var year = "";
		
		vm.promiseList = [];
		
		for (var i = 0; i < vm.msgpUserAll.length; i++) {

			if (vm.msgpUserAll[i].msgpUserId == vm.thisUser.id && 
					vm.msgpUserAll[i].msgpMeetingId != null) {
				
				/** get meeting info from meeting table */
				vm.promiseList.push($http({method: 'GET',
				url: '/api/meeting/' + vm.msgpUserAll[i].msgpMeetingId + '/'})
				.then(function(meetingResponse){

					vm.currentMeetings.push(meetingResponse.data);
					vm.filteredMeetings.push(meetingResponse.data);

				},
				function(meetingResponse){
					
				}));
			}
		} /** END for loop */
		
		/** clear calendar before refreshing it */
		vm.calendarHTML = '';
		/** LOAD CALENDAR AFTER LOADING MEETINGS INFO !!! 
		    WAITS FOR ALL PROMISES FROM MEETING GET REQUESTS*/
		$q.all(vm.promiseList).then(function(waitResponse){
			
			for (var i = vm.currentMeetings.length-1; i >=0; i--) {
				if (uniqueMeetingIds.indexOf(vm.currentMeetings[i].id) <= -1) {
					
					uniqueMeetingIds.push(vm.currentMeetings[i].id);
					
					/** Setup vm.meetings String for pickadate calendar to know what days meetings are scheduled
					pickadate modified to splice string at ',' and make a list of strings formatted like 'mm/dd/yyyy' */

					day = String(vm.currentMeetings[i].start_time).substring(8,10);
					month = String(vm.currentMeetings[i].start_time).substring(5,7);
					year = String(vm.currentMeetings[i].start_time).substring(0,4);


					day = parseInt(day);
					month = parseInt(month);
					month -= 1;
					
					/** correct date from django storing the time with an offset of 4 hours for some reason...
					for example, start time of 11pm gets stored as 3am next day.  Time corrected elsewhere */
					if (parseInt(String(vm.currentMeetings[i].start_time).substring(11,13)) <= 3)
						day -= 1;

					vm.meetings += "" + month + "/" + day + "/" + year + ",";
					
				}
				else {
					vm.currentMeetings.splice(i,1);
					vm.filteredMeetings.splice(i,1);
				}
			}
		
		
			vm.filterMeetingsOnClick();
		
			vm.calendarHTML = '/static/templates/calendar.html';		
		});		
			
	} /** END loadGroupMeetings() */


	/**------------------------------------------*/
	/** filter meetings list for selected day    */
	/**------------------------------------------*/	
	vm.filterMeetingsOnClick = function() {
		
		var day;
		var month;
		var year;
		var selectedDay;
		var selectedMonth;
		var selectedYear;
		
		vm.filteredMeetings = [];
		
		for (var i = vm.currentMeetings.length-1; i >=0; i--) {
			
			day = String(vm.currentMeetings[i].start_time).substring(8,10);
			month = String(vm.currentMeetings[i].start_time).substring(5,7);
			year = String(vm.currentMeetings[i].start_time).substring(0,4);
			
			/** correct date from django storing the time with an offset of 4 hours for some reason...
			    for example, start time of 11pm gets stored as 3am next day.  Time corrected elsewhere */
			if (parseInt(String(vm.currentMeetings[i].start_time).substring(11,13)) <= 3)
				day -= 1;
			
			if (vm.firstMeetingFiltering == false) {
				selectedDay = String(vm.date).substring(3,5);
				selectedMonth = String(vm.date).substring(0,2);
				selectedYear = String(vm.date).substring(6,10);
			}
			else {
				selectedDay = vm.date.getDate();
				selectedMonth = vm.date.getMonth() + 1;
				selectedYear = vm.date.getFullYear();
			}
			/**alert("|" + day + month + year + ":" + selectedDay + selectedMonth + selectedYear + "|");*/
			if (day == selectedDay && month == selectedMonth && year == selectedYear)
				vm.filteredMeetings.push(vm.currentMeetings[i]);
		}
		vm.firstMeetingFiltering = false;
	}
	
	
	
	/**------------------------------------------*/
	/** Check if current user is in meeting		 
		return true or false					 */
	/**------------------------------------------*/
	vm.isUserAttendMeeting = function(meeting) {
		
		var meetingIds = [];
		/**
		for (var i = 0; i < vm.currentGroupMeetings.length; i++) {
			meetingIds.push(vm.currentGroupMeetings[i].id);
		}*/
		for (var i = 0; i < vm.msgpUserAll.length; i++) {
			if (vm.msgpUserAll[i].msgpMeetingId == meeting.id) {
				if (vm.msgpUserAll[i].msgpUserId == vm.thisUser.id)
					return true;
			}	
		}
		return false;
	}
	
	
	vm.userAttendMeeting = function(meeting) {
		/** Doesn't do anything */
	}
	
	
	/**------------------------------------------*/
	/** User no longer attending meeting, either
	    -1 to meeting attendance or delete meeting*/
	/**------------------------------------------*/
	vm.userNotAttendMeeting = function(meeting) {	
		
		/** Delete meeting if current members attending is 1 */
		if (meeting.users_attending <= 1) {
			$http({method: 'DELETE',
	  		   url: '/api/meeting/' + meeting.id + '/',
	  		})
	  		.then(function(deleteMeetingResponse){
				/** success */
				for (var i = 0; i < vm.filteredMeetings.length; i++) {
					if (vm.filteredMeetings[i].id == meeting.id)
						vm.filteredMeetings.splice(i,1);
				}
	  		},
	  		function(deleteMeetingResponse){
	  			/** request failed */
	  		});
		}
		else {

			var newAttendingCount = meeting.users_attending;
			newAttendingCount -= 1;

			/** Update meeting users_attending column by subtracting 1 */
			$http({method: 'PATCH',
				url: '/api/meeting/' + meeting.id + '/',
				data: {
					users_attending: newAttendingCount
				}
			})
			.then(function(patchResponse){
				/** success */
			},
			function(patchResponse){
				/** request failed */
			});
		}
		/** Delete msgpUser entry associated with that user and meeting */
		for (var i = vm.msgpUserAll.length-1; i >= 0; i--) {
			if (vm.msgpUserAll[i].msgpMeetingId == meeting.id) {
				if (vm.msgpUserAll[i].msgpUserId == vm.thisUser.id) {
					/** delete msgpUser table entry */
					$http({method: 'DELETE',
					   url: '/api/msgpUser/' + vm.msgpUserAll[i].id + '/',
					})
					.then(function(deleteMSGPUserResponse){
						/** Load/update all entries from the msgpUser table
						as there is a new one now.  This function update meetings too*/
						vm.getGroups();
					},
					function(deleteMSGPUserResponse){
						/** request failed */
					});
				}
			}
		}
		
	}		
	
	
	
	/** ------------------------------------------------ */
	/** Check if group id is one user has joined         */
	/** ------------------------------------------------ */
	vm.joinGroup = function(groupId, groupName) {
		
		$http({method: 'GET',
					url: '/api/group/' + groupId + '/',
				})
				.then(function(getResponse){
					
					if (getResponse.data.memberCount < getResponse.data.totalMembersAllowed) {
					
						$http({method: 'POST',
							url: '/api/msgpUser/',
							data: {
								msgpUserId: vm.thisUser.id,
								msgpUsername: vm.thisUser.username,
								msgpGroupId: groupId,
								msgpGroupName: groupName
							}
						})
						.then(function(response2){		
							vm.getGroups();
							vm.userGroups.push(groupId);
				
							/** update group's memberCount */		
							$http({method: 'PATCH',
								url: '/api/group/' + groupId + '/',
								data: {
									memberCount: getResponse.data.memberCount + 1
									}
								})
								.then(function(patchResponse){
									/** update list of groups being used to filter group search */
									vm.getAllGroups();
								},
								function(patchResponse){
									/** request failed */
								});			
				
						},
						function(response2){
							/** request failed */
						});
					
					} /** END IF */
				},
				function(getResponse){
					/** request failed */
				});
		
	} /** END vm.joinGroup() */
	

	// Getting the classes available for search



	$http({method: 'GET',
		url: '/api/subject/'
		}).then(function(response){
			vm.subjects = response.data;
		},
		function(response){
	});

	vm.updateSubject = function() {

	vm.classes = [];
	vm.filteredClasses = [];
	//vm.selectedSubjectsID = "";
	vm.selectedClass = "";
		if(vm.selectedSubject != ""){
			document.getElementById("classSelect").style.visibility = "visible";
			document.getElementById("sectionSelect").style.visibility = "hidden";

		 for(var i = 0; i < vm.subjects.length; i++){
		 	
			if(vm.subjects[i].subject == vm.selectedSubject){
				vm.selectedSubjectsID = vm.subjects[i].id;
		 	}
		 }

		$http({method: 'GET',
		       url: '/api/subject/class/'
		      }).then(function(response){
			  	vm.classes = response.data;
			  	//alert(vm.classes);
				  	for(var i =0; i <vm.classes.length; i++){
						if(vm.classes[i].subject == vm.selectedSubjectsID){
						vm.filteredClasses.push(vm.classes[i]);
					}
				}
				//alert(vm.filteredClasses);
		      },
			  function(response){
			   });

		}
	}


	vm.updateClass = function(){
		vm.sections = [];
		vm.filteredSections = [];
		vm.selectedSection = "";

		if (vm.selectedClass != ""){
			document.getElementById("sectionSelect").style.visibility = "visible";

			//alert(vm.filteredClasses);
			for(var i = 0; i < vm.filteredClasses.length; i++){
		 	
			if(vm.filteredClasses[i].subjectsClass == vm.selectedClass){
				vm.selectedClassID = vm.filteredClasses[i].id;
		 	}
		 }

		$http({method: 'GET',
		       url: '/api/subject/class/section/'
		      }).then(function(response){
			  	vm.sections = response.data;
				  	for(var i =0; i <vm.sections.length; i++){
						if(vm.sections[i].subjectsClass == vm.selectedClassID){
						vm.filteredSections.push(vm.sections[i]);
					}
				}
		      },
			  function(response){
			   });

		}
	}


	// get available classes for create
	
	$http({method: 'GET',
		url: '/api/subject/'
		}).then(function(response){
			vm.subjectsCreate = response.data;
		},
		function(response){
	});

	vm.updateSubjectCreate = function() {

	vm.classesCreate = [];
	vm.filteredClassesCreate = [];
	//vm.selectedSubjectsID = "";
	vm.groupFields.groupClass = "";
		if(vm.groupFields.groupSubject != ""){
			document.getElementById("classSelectCreate").style.visibility = "visible";
			document.getElementById("sectionSelectCreate").style.visibility = "hidden";

		 for(var i = 0; i < vm.subjectsCreate.length; i++){
		 	
			if(vm.subjectsCreate[i].subject == vm.groupFields.groupSubject){
				vm.selectedSubjectsIDCreate = vm.subjectsCreate[i].id;
		 	}
		 }

		$http({method: 'GET',
		       url: '/api/subject/class/'
		      }).then(function(response){
			  	vm.classesCreate = response.data;
			  	//alert(vm.classes);
				  	for(var i =0; i <vm.classesCreate.length; i++){
						if(vm.classesCreate[i].subject == vm.selectedSubjectsIDCreate){
						vm.filteredClassesCreate.push(vm.classesCreate[i]);
					}
				}
				//alert(vm.filteredClasses);
		      },
			  function(response){
			   });

		}
	}


	vm.updateClassCreate = function(){
		vm.sectionsCreate = [];
		vm.filteredSectionsCreate = [];
		vm.groupFields.groupSection = "";

		if (vm.groupFields.groupClass != ""){
			document.getElementById("sectionSelectCreate").style.visibility = "visible";

			//alert(vm.filteredClasses);
			for(var i = 0; i < vm.filteredClassesCreate.length; i++){
		 	
			if(vm.filteredClassesCreate[i].subjectsClass == vm.groupFields.groupClass){
				vm.selectedClassIDCreate = vm.filteredClassesCreate[i].id;
		 	}
		 }

		$http({method: 'GET',
		       url: '/api/subject/class/section/'
		      }).then(function(response){
			  	vm.sectionsCreate = response.data;
				  	for(var i =0; i < vm.sectionsCreate.length; i++){
						if(vm.sectionsCreate[i].subjectsClass == vm.selectedClassIDCreate){
						vm.filteredSectionsCreate.push(vm.sectionsCreate[i]);
					}
				}
		      },
			  function(response){
			   });

		}
	}


	/** Functions to run on page load */
	/** ----------------------------------------------------------- */
	/** Call getGroups() helper function one time initially to display user's current groups */
	vm.getGroups();
	/** Call this to get list of group ids from group table user is a part of */
	vm.getUserGroups();
	/** sets default group search sorting by member count */
	vm.setOrderBy('-memberCount');
	
	/** Load current user's meetings ### CALLED IN .THEN FUNCTION OF vm.getGroups() ### */
	
	/** ----------------------------------------------------------- */
	
  }
})();
