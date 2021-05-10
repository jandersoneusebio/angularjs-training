angular.module("uiAccordion", []);

angular.module("uiAccordion").run(function($templateCache){
	console.log("run!")
});

angular.module("uiAccordion").directive("uiAccordions", function () {
	return {
		controller: function ($scope, $element, $attrs) {
			var accordions = [];

			this.registerAccordion = function (accordion) {
				accordions.push(accordion);
			};

			this.closeAll = function () {
				accordions.forEach(function (accordion) {
					accordion.isOpened = false;
				});
			}
		}
	};
});
angular.module("uiAccordion").directive("uiAccordion", function () {
	return {
		templateUrl: "views/uiAccordion.html",
		transclude: true,
		scope: {
			title: "@"
		},
		require: "^uiAccordions",
		link: function (scope, element, attrs, ctrl) {
			ctrl.registerAccordion(scope);
			scope.open = function () {
				if(scope.isOpened){
                    scope.isOpened = false;
                } else{
                    ctrl.closeAll();
				    scope.isOpened= true;
                }
			};
		}
	};
});