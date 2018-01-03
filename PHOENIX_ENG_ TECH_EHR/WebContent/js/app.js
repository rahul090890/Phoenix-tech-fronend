var materialAdmin = angular.module('materialAdmin', [ 'ngAnimate',
		'ngResource', 'ui.router', 'ui.bootstrap', 'angular-loading-bar',
		'oc.lazyLoad', 'nouislider', 'ngTable', 'ui.grid',
		'ui.grid.selection', 'ui.grid.exporter' ])

materialAdmin.directive('myRequired', function() {
	return {
		restrict : 'AE',
		scope : {},
		require : 'ngModel',
		link : function(scope, iElement, iAttrs) {
			if (iElement.val() == "") {
				// do something
				return;
			} else {
				// do other things
			}
		}
	};
});

materialAdmin.directive('formvalidation', function(e) {
	var fieldId = e.target.attributes.id.value;
	var maxLength = e.target.attributes.maxlength.value;

	if (fieldId == 'phone' || fieldId == 'zip' || fieldId == 'fax') {
		var targetVal = $('#' + fieldId).val();
		$('#' + fieldId).val(targetVal.replace(/[^0-9]/g, ''));

		var valLength = $('#' + fieldId).val().length;
		if (valLength < maxLength) {
			$('#' + fieldId).addClass('failedCheck inputError ');
		} else {
			$('#' + fieldId).removeClass('failedCheck').removeClass(
					'inputError ');
		}
	} else if (fieldId == 'email') {
		var checkMatch = $('#' + fieldId).val().match(
				/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/);
		if (!checkMatch) {
			$('#' + fieldId).addClass('failedCheck inputError ');
		} else {
			$('#' + fieldId).removeClass('failedCheck').removeClass(
					'inputError ');
		}
	}
});

materialAdmin.directive('numbersOnly', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^1-9][^0-9]/g, '');
					if (parseInt(transformedInput) > 20
							|| parseInt(transformedInput) < 1) {
						ngModelCtrl.$setViewValue('');
						ngModelCtrl.$render();
					}
					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});
materialAdmin.directive('allowDecimalNumbers', function () {  
    return {  
        restrict: 'A',  
        link: function (scope, elm, attrs, ctrl) {  
            elm.on('keydown', function (event) {  
                var $input = $(this);  
                var value = $input.val();  
                value = value.replace(/[^0-9\.]/g, '')  
                var findsDot = new RegExp(/\./g)  
                var containsDot = value.match(findsDot)  
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
                    event.preventDefault();  
                    return false;  
                }  
                $input.val(value);  
               
                if (event.which == 64 || event.which == 16) {  
                    // numbers  
                    return false;  
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {  
                    // backspace, enter, escape, arrows  
                    return true;  
                } else if (event.which >= 48 && event.which <= 57) {  
                    // numbers  
                    return true;  
                } else if (event.which >= 96 && event.which <= 105) {  
                    // numpad number  
                    return true;  
                } else if ([46, 110, 190].indexOf(event.which) > -1) {  
                    // dot and numpad dot  
                    return true;  
                } else {  
                    event.preventDefault();  
                    return false;  
                }  
            });  
        }  
    }  
})
