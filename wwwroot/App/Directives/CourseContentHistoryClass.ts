import { CourseContentHistoryManager } from "../Services/CourseContentHistoryManager";

export function CourseContentHistoryClassDirective() {

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
        controller: function ($scope,$rootScope, courseContentHistoryManager: CourseContentHistoryManager) {

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