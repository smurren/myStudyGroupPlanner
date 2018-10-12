(function(){
    'use strict';

    angular
	.module('myStudyGroupPlanner')
	.controller('AdminHomeController', AdminHomeController);

    AdminHomeController.$inject = ['$location', '$scope', 'Authentication', '$http'];

    /**
     * @namespace AdminHomeController
     */
    function AdminHomeController($location, $scope, Authentication, $http) {
	var vm = this;
	vm.addNewBuilding = "addNewBuilding";
	vm.addNewRoom = "addNewRoom";
	vm.addNewSubject = "addNewSubject";
	vm.addNewClass = "addNewClass";
	vm.addNewSection = "addNewSection";
	vm.selectedBuilding = null;
	vm.selectedBuildingID = null;
	vm.selectedRoom = null;
	vm.buildingStatus = null;
	vm.roomStatus = null;
	vm.buildings = [];
	vm.rooms = [];
	vm.filteredRooms = [];
	vm.users = [];
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


	vm.tab = 1;

	vm.reports = [];

	notAdminRedirect();

	vm.selectTab = function(setTab){
	    vm.tab = setTab;
	}

	vm.isSelected = function(checkTab){
	    return vm.tab === checkTab;
	}

	vm.updateBuilding = function() {

	vm.rooms = [];
	vm.filteredRooms = [];
	vm.selectedRoom = "";
	document.getElementById("newRoom").style.visibility = "hidden";
	document.getElementById("makeRoom").style.visibility = "hidden";

		if(vm.selectedBuilding != "addBuilding" && vm.selectedBuilding != ""){
			document.getElementById("newBuilding").style.visibility = "hidden";
			document.getElementById("makeBuilding").style.visibility = "hidden";
			document.getElementById("roomSelect").style.visibility = "visible";
			document.getElementById("roomLabel").style.visibility = "visible";

		 for(var i = 0; i < vm.buildings.length; i++){
		 	
			if(vm.buildings[i].name == vm.selectedBuilding){
				vm.selectedBuildingID = vm.buildings[i].id;
		 	}
		 }

		$http({method: 'GET',
		       url: '/api/building/room/'
		      }).then(function(response){
			  	vm.rooms = response.data;
			  	for(var i =0; i <vm.rooms.length; i++){
					if(vm.rooms[i].building == vm.selectedBuildingID){
					vm.filteredRooms.push(vm.rooms[i]);
				}
				}
		      },
			  function(response){
			   });

		}else if (vm.selectedBuilding == "addBuilding"){
			document.getElementById("newBuilding").style.visibility = "visible";
			document.getElementById("makeBuilding").style.visibility = "visible";
			document.getElementById("roomSelect").style.visibility = "hidden";
			document.getElementById("roomLabel").style.visibility = "hidden";
			document.getElementById("newRoom").style.visibility = "hidden";
			document.getElementById("makeRoom").style.visibility = "hidden";
			vm.selectedRoom = "";
		}


	}

	vm.updateRoom = function(){
		if (vm.selectedRoom == "addRoom"){
			document.getElementById("newRoom").style.visibility = "visible";
			document.getElementById("makeRoom").style.visibility = "visible";

		}else{
			document.getElementById("newRoom").style.visibility = "hidden";
			document.getElementById("makeRoom").style.visibility = "hidden";

		}
	}
	
	vm.makeBuilding = function(){
		vm.buildingAbrv = vm.newBuilding.substring(0,3);
		$http({method: 'POST',
		url: '/api/building/',
		data: {
			name: vm.newBuilding,
			abrv: vm.buildingAbrv
			}
		})
		.then(function(response){
			alert("building Created");
			location.reload();
			// vm.buildingStatus = "BuildingCreated";
		},
		function(response){
			// vm.buildingStatus = "Failed to create building.";
			alert("Failed to create building");
		});
	}


	vm.makeRoom = function(){

		$http({method: 'POST',
		url: '/api/building/room/',
		data: {
			room_num: vm.newRoom,
			building: vm.selectedBuildingID
						}
		})
		.then(function(response){
			alert("Room Created");
			location.reload();
			// vm.roomStatus = "Room Created";
		},
		function(response){
			alert("Failed to create Room");
			// vm.roomStatus = "Failed to create Room.";
		});
	}

	$http({method: 'GET',
	       url: '/api/building/'
	      }).then(function(response){
		  vm.buildings = response.data;
	      },
		  function(response){
		   });

	vm.openReportDetail = function(reportID,reporter,reportee,comment){
		$("#reportViewModal").modal("show");
		vm.currentID = reportID;
		vm.currentReporter = reporter;
		vm.currentReportee = reportee;
		vm.currentComment = comment;
		// $("#txtreporter").val($(this).closest('tr').children()[0].textContent);
    // $("#txtreportee").val($(this).closest('tr').children()[1].textContent);
		// $("#txtmessage").val($(this).closest('tr').children()[2].textContent);
	}

	$http({method: 'GET',
		url: '/api/report/'
		}).then(function(response){
			vm.reports = response.data;
		},
		function(response){
	});


	$http({method: 'GET',
		url: '/api/v1/accounts/'
		}).then(function(response){
			vm.users = response.data;
		},
		function(response){
	});





	//ADD Classes

	$http({method: 'GET',
		url: '/api/subject/'
		}).then(function(response){
			vm.subjects = response.data;
		},
		function(response){
	});

	vm.updateSubject = function() {

	// vm.selectedSubjectHolder = null;
	//document.getElementById("classSelect").val = ""
	// vm.selectedSubjectHolder =  vm.selectedSubject;
	// vm.selectedSection = "";
	// vm.selectedSubject = vm.selectedSubjectHolder;
	vm.classes = [];
	vm.filteredClasses = [];
	//vm.selectedSubjectsID = "";
	vm.selectedClass = "";
		if(vm.selectedSubject != "addSubject" && vm.selectedSubject != ""){
			document.getElementById("newSubject").style.visibility = "hidden";
			document.getElementById("makeSubject").style.visibility = "hidden";
			document.getElementById("classSelect").style.visibility = "visible";
			document.getElementById("classLabel").style.visibility = "visible";
			document.getElementById("newClass").style.visibility = "hidden";
			document.getElementById("makeClass").style.visibility = "hidden";
			document.getElementById("sectionSelect").style.visibility = "hidden";
			document.getElementById("sectionLabel").style.visibility = "hidden";
			document.getElementById("newSection").style.visibility = "hidden";
			document.getElementById("makeSection").style.visibility = "hidden";


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

		}else if (vm.selectedSubject == "addSubject"){
			document.getElementById("newSubject").style.visibility = "visible";
			document.getElementById("makeSubject").style.visibility = "visible";
			document.getElementById("classSelect").style.visibility = "hidden";
			document.getElementById("classLabel").style.visibility = "hidden";
			document.getElementById("newClass").style.visibility = "hidden";
			document.getElementById("makeClass").style.visibility = "hidden";
			document.getElementById("sectionSelect").style.visibility = "hidden";
			document.getElementById("sectionLabel").style.visibility = "hidden";
			document.getElementById("newSection").style.visibility = "hidden";
			document.getElementById("makeSection").style.visibility = "hidden";
			// vm.selectedRoom = "";
		}


	}

	vm.makeSubject = function(){
		$http({method: 'POST',
		url: '/api/subject/',
		data: {
			subject: vm.newSubject
			}
		})
		.then(function(response){
			alert("subject Created");
			location.reload();
			// vm.buildingStatus = "BuildingCreated";
		},
		function(response){
			// vm.buildingStatus = "Failed to create building.";
			alert("Failed to create subject");
		});
	}

	vm.updateClass = function(){
		vm.sections = [];
		vm.filteredSections = [];
		vm.selectedSection = "";

		if (vm.selectedClass != "addClass" && vm.selectedClass != ""){
			document.getElementById("newClass").style.visibility = "hidden";
			document.getElementById("makeClass").style.visibility = "hidden";
			document.getElementById("sectionLabel").style.visibility = "visible";
			document.getElementById("sectionSelect").style.visibility = "visible";
			document.getElementById("newSection").style.visibility = "hidden";
			document.getElementById("makeSection").style.visibility = "hidden";

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

		}else if (vm.selectedClass == "addClass"){
			document.getElementById("newClass").style.visibility = "visible";
			document.getElementById("makeClass").style.visibility = "visible";
			document.getElementById("sectionLabel").style.visibility = "hidden";
			document.getElementById("sectionSelect").style.visibility = "hidden";
			document.getElementById("newSection").style.visibility = "hidden";
			document.getElementById("makeSection").style.visibility = "hidden";

		}
	}



	vm.makeClass = function(){

		$http({method: 'POST',
		url: '/api/subject/class/',
		data: {
			subjectsClass: vm.newClass,
			subject: vm.selectedSubjectsID
						}
		})
		.then(function(response){
			alert("Class Created");
			location.reload();
			// vm.roomStatus = "Room Created";
		},
		function(response){
			alert("Failed to create Class");
			// vm.roomStatus = "Failed to create Room.";
		});
	}


	vm.updateSection = function(){
		if (vm.selectedSection == "addSection"){
			document.getElementById("newSection").style.visibility = "visible";
			document.getElementById("makeSection").style.visibility = "visible";

		}else{
			document.getElementById("newSection").style.visibility = "hidden";
			document.getElementById("makeSection").style.visibility = "hidden";

		}
	}

	vm.makeSection = function(){

		$http({method: 'POST',
		url: '/api/subject/class/section/',
		data: {
			section: vm.newSection,
			subjectsClass: vm.selectedClassID
						}
		})
		.then(function(response){
			alert("Section Created");
			location.reload();
			// vm.roomStatus = "Room Created";
		},
		function(response){
			alert("Failed to section Class");
			// vm.roomStatus = "Failed to create Room.";
		});
	}

	// vm.usernameTemp = "";

	//vm.buildings = ["Sherman", "ITE", "Engineering", "Biology"];

	// vm.username = 'username1';

	//activate();
		function notAdminRedirect() {
			var authenticatedAccount = Authentication.getAuthenticatedAccount();
	   		var isAdmin = Authentication.getAuthenticatedAccount().is_admin;
			//var is_admin = $routeParams.username.is_admin;
			//alert(isAdmin);

			if(!authenticatedAccount){
				$location.url('/');
			}else{
				if(!isAdmin){
					$location.url('/');
				}
			}
	   }
    }


})();
