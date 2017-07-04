"use strict";
function CourseContentHistoryClassDirective() {
    return {
        restrict: 'E',
        scope: {
            "courseId": "=",
            "contentId": "="
        },
        link: function (scope, elm, attr) {
            scope.$watch('inHistory', function () {
                if (scope.inHistory) {
                    elm.addClass("history");
                }
            });
        },
        controller: function ($scope, $rootScope, courseContentHistoryManager) {
            function checkInHistory() {
                courseContentHistoryManager.contentInHistory($scope.courseId, $scope.contentId).then(function (res) {
                    $scope.inHistory = res;
                });
            }
            checkInHistory();
            $rootScope.$on("courseHistoryUpdate", function () {
                checkInHistory();
            });
        }
    };
}
exports.CourseContentHistoryClassDirective = CourseContentHistoryClassDirective;
