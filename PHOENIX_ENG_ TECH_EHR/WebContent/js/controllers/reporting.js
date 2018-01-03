materialAdmin
		.controller(
				'empreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						{
							field : 'projectName',
							visible : true,
							width : 150
						}, {
							field : 'customerName',
							width : 150
						}, {
							field : 'customerProgramCode',
							visible : true,
							width : 150
						}, {
							field : 'departmentName',
							visible : true,
							width : 150
						}, {
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'firstName',
							width : 150
						}, {
							field : 'lastName',
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							/* cellFilter: 'date:\'dd-MMM-yyyy\'' , */
							visible : true,

							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							/* cellFilter: 'date:\'dd-MMM-yyyy\'' , */
							visible : false,

							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							/* cellFilter: 'date:\'dd-MMM-yyyy\'' , */
							visible : false,

							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'departmentCode',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectCode',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						}, {
							field : 'managerComments',
							visible : false,
							width : 150
						} /*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byEmployee?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var employeeCode = $scope.employeeCode;
							var firstName = $scope.firstName;
							var lastName = $scope.lastName
							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byEmployee?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(employeeCode)
									&& employeeCode != undefined
									&& employeeCode != "") {
								url += "&employeeCode=" + employeeCode;
							}
							if (!angular.isUndefined(firstName)
									&& firstName != undefined
									&& firstName != "") {
								url += "&firstName=" + firstName;
							}
							if (!angular.isUndefined(lastName)
									&& lastName != undefined && lastName != "") {
								url += "&lastName=" + lastName;
							}
							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})

		.controller(
				'deptreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						{
							field : 'departmentName',
							visible : true,
							width : 150
						}, {
							field : 'departmentCode',
							visible : true,
							width : 150
						}, {
							field : 'projectName',
							visible : true,
							width : 150
						}, {
							field : 'projectCode',
							visible : true,
							width : 150
						}, {
							field : 'customerName',
							width : 150
						}, {
							field : 'customerProgramCode',
							visible : true,
							width : 150
						}, {
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'firstName',
							visible : false,
							width : 150
						}, {
							field : 'lastName',
							visible : false,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						}, {
							field : 'managerComments',
							visible : false,
							width : 150
						} /*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byDepartment?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var departmentCode = $scope.departmentCode;
							var departmentName = $scope.departmentName;
							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byDepartment?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(departmentCode)
									&& departmentCode != undefined
									&& departmentCode != "") {
								url += "&departmentCode=" + departmentCode;
							}
							if (!angular.isUndefined(departmentName)
									&& departmentName != undefined
									&& departmentName != "") {
								url += "&departmentName=" + departmentName;
							}

							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})
		.controller(
				'projreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						/*
						 * a. Task/Activity b. Project Name c. Project ID d.
						 * Customer Name e. Name of the Employee f. Number of
						 * Hours Charged & Approved g. Date range of the Project
						 * h. Total Number of Hours
						 */
						{
							field : 'projectName',
							visible : true,
							width : 180
						}, {
							field : 'projectCode',
							visible : true,
							width : 180
						}, {
							field : 'customerName',
							width : 180
						}, {
							field : 'customerProgramCode',
							visible : false,
							width : 150
						}, {
							field : 'taskName',
							visible : false,
							width : 150
						}, {
							field : 'departmentName',
							visible : false,
							width : 150
						}, {
							field : 'firstName',
							visible : true,
							width : 150
						}, {
							field : 'lastName',
							visible : true,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : true,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						} , {
							field : 'managerComments',
							visible : false,
							width : 150
						}/*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byProject?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var projectCode = $scope.projectCode;
							var projectName = $scope.projectName;
							var projectType = $scope.projectType;
							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byProject?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(projectCode)
									&& projectCode != undefined
									&& projectCode != "") {
								url += "&projectCode=" + projectCode;
							}
							if (!angular.isUndefined(projectName)
									&& projectName != undefined
									&& projectName != "") {
								url += "&projectName=" + projectName;
							}
							if (!angular.isUndefined(projectType)
									&& projectType != undefined
									&& projectType != "") {
								url += "&projectType=" + projectType;
							}

							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})

		.controller(
				'custreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						/*
						 * a. Customer Name b. Customer Program Code c. Project
						 * Name d. Project ID e. Task/Activity f. Name of the
						 * Employee g. Number of Hours Charged & Approved h.
						 * Date range of the Project i. Total Number of Hours
						 */
						{
							field : 'customerName',
							width : 180
						}, {
							field : 'customerProgramCode',
							visible : true,
							width : 150
						}, {
							field : 'projectName',
							visible : true,
							width : 180
						}, {
							field : 'projectCode',
							visible : true,
							width : 180
						}, {
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'departmentName',
							visible : false,
							width : 150
						}, {
							field : 'firstName',
							visible : true,
							width : 150
						}, {
							field : 'lastName',
							visible : true,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						} , {
							field : 'managerComments',
							visible : false,
							width : 150
						}/*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byCustomer?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var customerCode = $scope.customerCode;
							var customerName = $scope.customerName;

							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byCustomer?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(customerCode)
									&& customerCode != undefined
									&& customerCode != "") {
								url += "&customerCode=" + customerCode;
							}
							if (!angular.isUndefined(customerName)
									&& customerName != undefined
									&& customerName != "") {
								url += "&customerName=" + customerName;
							}

							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})

		.controller(
				'cpcreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						/*
						 * a. Customer Program Code b. Customer Name c. Project
						 * Name d. Project ID e. Task/Activity f. Name of the
						 * Employee g. Number of Hours Charged & Approved h.
						 * Date range of the Project i. Total Number of Hours
						 */
						{
							field : 'customerProgramCode',
							visible : true,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : true,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerName',
							width : 180
						}, {
							field : 'projectName',
							visible : true,
							width : 180
						}, {
							field : 'projectCode',
							visible : true,
							width : 180
						}, {
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'departmentName',
							visible : false,
							width : 150
						}, {
							field : 'firstName',
							visible : true,
							width : 150
						}, {
							field : 'lastName',
							visible : true,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						}, {
							field : 'managerComments',
							visible : false,
							width : 150
						} /*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byCustomerProgram?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var customerProgramCode = $scope.customerProgramCode;
							var customerProgramType = $scope.customerProgramType;

							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byCustomerProgram?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(customerProgramCode)
									&& customerProgramCode != undefined
									&& customerProgramCode != "") {
								url += "&customerProgramCode="
										+ customerProgramCode;
							}
							if (!angular.isUndefined(customerProgramType)
									&& customerProgramType != undefined
									&& customerProgramType != "") {
								url += "&customerProgramType="
										+ customerProgramType;
							}

							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})
		.controller(
				'taskreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * { field : 'reportId' ,visible: false }, {
										 * field : 'taskId',visible: false },
										 */
						/*
						 * a. Task/Activity b. Project Name c. Project ID d.
						 * Customer Name e. Name of the Employee f. Number of
						 * Hours Charged & Approved g. Date range of the Project
						 */
						{
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'customerProgramCode',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'customerName',
							width : 180
						}, {
							field : 'projectName',
							visible : true,
							width : 180
						}, {
							field : 'projectCode',
							visible : true,
							width : 180
						}, {
							field : 'departmentName',
							visible : false,
							width : 150
						}, {
							field : 'firstName',
							visible : true,
							width : 150
						}, {
							field : 'lastName',
							visible : true,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : false,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : false,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						}, {
							field : 'managerComments',
							visible : false,
							width : 150
						} /*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byTask?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var taskName = $scope.taskName;

							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byTask?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(taskName)
									&& taskName != undefined && taskName != "") {
								url += "&taskName=" + taskName;
							}

							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})
		.controller(
				'statusreportscontroller',
				function($scope, $http, $rootScope, $window, $location) {
					if ($scope.mactrl) {
						if ($scope.mactrl.sidebarToggle) {
							$scope.mactrl.sidebarToggle.left = false;
						}
					}
					$scope.myDate = new Date();
					$scope.toggleMin = function() {
						$scope.minDate = new Date($scope.myDate.getFullYear(),
								$scope.myDate.getMonth() - 11, $scope.myDate
										.getDate());

					};
					$scope.toggleMin();

					$scope.open = function($event, calId) {
						$event.preventDefault();
						$event.stopPropagation();
						if (calId === 1) {
							$scope.opened = true;
							$scope.opened2 = false;
							$('#startDate').closest('.form-group').removeClass(
									'has-error');

						}
						if (calId === 2) {
							$scope.opened2 = true;
							$scope.opened = false;
							$('#endDate').closest('.form-group').removeClass(
									'has-error');

						}

					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd',
							'dd-MMM-yyyy', 'shortDate' ];
					$scope.format = $scope.formats[2];

					var date2 = new Date();
					var startyyyy = date2.getFullYear();
					var startdd = date2.getDate();
					var startmm = date2.getMonth() + 1;
					var endyyyy = date2.getFullYear();
					var enddd = date2.getDate();
					var totalNoOfDays = new Date(startyyyy, startmm, 0)
							.getDate();
					var endmm = date2.getMonth() + 1;

					if (startdd < 10) {
						startdd = '0' + startdd;
					}
					if (enddd < 10) {
						enddd = '0' + enddd;
					}
					if (startmm < 10) {
						startmm = '0' + startmm;
					}
					if (endmm < 10) {
						endmm = '0' + endmm;
					}
					/* $('#loading-bar').remove(); */
					$scope.start = '01' + '-' + startmm + '-' + startyyyy;
					$scope.end = totalNoOfDays + '-' + endmm + '-' + endyyyy;

					$scope.webserviceshost = 'http://172.20.70.213:8080/';
					$scope.gridOptions = {
						columnDefs : [/*
										 * a. Customer Program Code b. Customer
										 * Name c. Project Name d. Project ID e.
										 * Task/Activity
										 */
						{
							field : 'customerProgramCode',
							visible : false,
							width : 150
						}, {
							field : 'customerName',
							width : 180
						}, {
							field : 'projectName',
							visible : true,
							width : 180
						}, {
							field : 'projectCode',
							visible : true,
							width : 180
						}, {
							field : 'taskName',
							visible : true,
							width : 150
						}, {
							field : 'customerProgramType',
							visible : false,
							width : 150
						}, {
							field : 'customerCode',

							visible : false,
							width : 150
						}, {
							field : 'departmentName',
							visible : false,
							width : 150
						}, {
							field : 'firstName',
							visible : false,
							width : 150
						}, {
							field : 'lastName',
							visible : false,
							width : 150
						}, {
							field : 'timesheetDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeId',
							visible : false,
							width : 150
						}, {
							field : 'weekStartDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150

						}, {
							field : 'weekEndDate',
							cellFilter : 'date:\'dd-MMM-yyyy\'',
							visible : true,
							width : 150
						}, {
							field : 'employeeCode',
							visible : false,
							width : 150
						}, {
							field : 'employeeType',
							visible : false,
							width : 150
						}, {
							field : 'employeeEmail',
							visible : false,
							width : 150
						}, {
							field : 'approverId',
							visible : false,
							width : 150
						}, {
							field : 'approverName',
							visible : false,
							width : 150
						}, {
							field : 'customerId',
							visible : false,
							width : 150
						}, {
							field : 'customerProgramId',
							visible : false,
							width : 150
						}, {
							field : 'departmentId',
							visible : false,
							width : 150
						}, {
							field : 'projectId',
							visible : false,
							width : 150
						}, {
							field : 'projectType',
							visible : false,
							width : 150
						}, {
							field : 'billedHours',
							visible : false,
							width : 150
						}, {
							field : 'timesheetStatus',
							visible : true,
							width : 150
						}, {
							field : 'comments',
							visible : false,
							width : 150
						}, {
							field : 'managerComments',
							visible : false,
							width : 150
						} /*
							 * , { field : 'timesheetSubmittedDate',visible:
							 * false }
							 */

						],
						enableFiltering : true,
						enableGridMenu : true,
						enableSelectAll : true,
						exporterCsvFilename : 'Phoenix.csv',
						exporterPdfDefaultStyle : {
							fontSize : 9
						},
						exporterPdfTableStyle : {
							margin : [ 30, 30, 30, 30 ]
						},
						exporterPdfTableHeaderStyle : {
							fontSize : 10,
							bold : true,
							italics : true,
							color : 'red'
						},
						exporterPdfHeader : {
							text : "Phoenix Engineering Technology",
							style : 'headerStyle'
						},
						exporterPdfFooter : function(currentPage, pageCount) {
							return {
								text : currentPage.toString() + ' of '
										+ pageCount.toString(),
								style : 'footerStyle'
							};
						},
						exporterPdfCustomFormatter : function(docDefinition) {
							docDefinition.styles.headerStyle = {
								fontSize : 22,
								bold : true
							};
							docDefinition.styles.footerStyle = {
								fontSize : 10,
								bold : true
							};
							return docDefinition;
						},
						exporterPdfOrientation : 'portrait',
						exporterPdfPageSize : 'LETTER',
						exporterPdfMaxGridWidth : 500,
						exporterCsvLinkElement : angular.element(document
								.querySelectorAll(".custom-csv-link-location")),
						onRegisterApi : function(gridApi) {
							$scope.gridApi = gridApi;
						}
					};
					/*
					 * &employeeCode=1009-15&firstName=Kiran&lastName=Vagga'
					 */var url = $scope.webserviceshost
							+ 'hr/timesheetReport/byStatus?startDate='
							+ $scope.start + '&endDate=' + $scope.end;
					$http(
							{
								method : "GET",
								url : url,
								headers : {
									'XSRF-TOKEN' : $window.sessionStorage
											.getItem("Access-Token"),
									'authorization' : $window.sessionStorage
											.getItem("AuthKey")
								}
							})
							.then(
									function mySucces(response) {
										if (response.data.length == 0) {
											swal(
													'error',
													'No report data fount for current inpur selection',
													'error')
										}
										$scope.gridOptions.data = response.data;

									}, function myError(response) {
										console.log(response);
									});

					$scope.search = function() {
						var validateResult = validateDates($scope.dtPopup,
								$scope.dtPopup1);
						if (validateResult) {
							var startDate = $scope.dtPopup;
							var endDate = $scope.dtPopup1;

							var startyyyy = startDate.getFullYear();
							var startdd = startDate.getDate();
							var startmm = startDate.getMonth() + 1;
							var endyyyy = endDate.getFullYear();
							var enddd = endDate.getDate();
							var endmm = endDate.getMonth() + 1;

							if (startdd < 10) {
								startdd = '0' + startdd;
							}
							if (enddd < 10) {
								enddd = '0' + enddd;
							}
							if (startmm < 10) {
								startmm = '0' + startmm;
							}
							if (endmm < 10) {
								endmm = '0' + endmm;
							}
							/* $('#loading-bar').remove(); */
							$scope.start = startdd + '-' + startmm + '-'
									+ startyyyy;
							$scope.end = enddd + '-' + endmm + '-' + endyyyy;
							var status = $scope.status;

							var url = $scope.webserviceshost
									+ 'hr/timesheetReport/byStatus?startDate='
									+ $scope.start + '&endDate=' + $scope.end;
							if (!angular.isUndefined(status)
									&& status != undefined && status != "") {
								url += "&status=" + status;
							}
							debugger;
							$http(
									{
										method : "GET",
										url : url,
										headers : {
											'XSRF-TOKEN' : $window.sessionStorage
													.getItem("Access-Token"),
											'authorization' : $window.sessionStorage
													.getItem("AuthKey")
										}
									})
									.then(
											function mySucces(response) {
												$scope.gridOptions.data = [];
												if (response.data.length == 0) {
													swal(
															'error',
															'No report data fount for current inpur selection',
															'error')
												}
												$scope.gridOptions.data = response.data;

											}, function myError(response) {
												console.log(response);
											});
						}
					}

				})