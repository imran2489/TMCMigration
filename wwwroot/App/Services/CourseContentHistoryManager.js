"use strict";
var CourseContentHistoryManager = (function () {
    function CourseContentHistoryManager(altaiHttp, $q, $rootScope) {
        this.altaiHttp = altaiHttp;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.userHistory = {};
    }
    CourseContentHistoryManager.prototype.contentInHistory = function (courseId, contentId) {
        var d = this.$q.defer();
        this.getCourseContentHistory(courseId).then(function (courseHistory) {
            var result = (courseHistory.indexOf(contentId) > -1);
            d.resolve(result);
        });
        return d.promise;
    };
    CourseContentHistoryManager.prototype.addToHistory = function (courseId, contentId) {
        var _this = this;
        var d = this.$q.defer();
        this.getCourseContentHistory(courseId).then(function (courseHistory) {
            if (courseHistory.indexOf(contentId) > -1) {
                d.resolve();
            }
            else {
                courseHistory.push(contentId);
                _this.$rootScope.$broadcast("courseHistoryUpdate", {});
                _this.altaiHttp.post("api/course/" + courseId + "/content/" + contentId + "/completed").then(function (res) {
                    d.resolve();
                });
            }
        });
    };
    CourseContentHistoryManager.prototype.getCourseContentHistory = function (courseId) {
        var _this = this;
        var d = this.$q.defer();
        var cached = this.userHistory[courseId];
        if (cached) {
            d.resolve(cached);
        }
        else {
            this.altaiHttp.get("api/course/" + courseId + "/history").then(function (res) {
                _this.userHistory[courseId] = angular.copy(res);
                d.resolve(_this.userHistory[courseId]);
            });
        }
        return d.promise;
    };
    return CourseContentHistoryManager;
}());
exports.CourseContentHistoryManager = CourseContentHistoryManager;
