"use strict";
var CourseFlowManager = (function () {
    function CourseFlowManager(contentItemService, $state) {
        this.contentItemService = contentItemService;
        this.$state = $state;
    }
    CourseFlowManager.prototype.switchCourse = function (courseId) {
        var _this = this;
        this.contentItemService.getDataById(courseId).then(function (courseData) {
            _this.activeCourse = courseData;
        });
    };
    CourseFlowManager.prototype.navigateToNugget = function (courseId, nuggetId) {
        this.$state.go("course.nugget", { courseId: courseId, nuggetId: nuggetId });
    };
    CourseFlowManager.prototype.getNextNuggetInModule = function (nuggetId) {
        var module = this.activeCourse.modules.filter(function (mod) { return mod.nuggets && mod.nuggets.filter(function (nugget) { return nugget.id == nuggetId; }).length > 0; })[0];
        if (!module) {
            return;
        }
        var nugget = module.nuggets.filter(function (nugget) { return nugget.id == nuggetId; })[0];
        if (!nugget) {
            return;
        }
        var indexOfNugget = module.nuggets.indexOf(nugget);
        if (indexOfNugget < module.nuggets.length - 1) {
            return module.nuggets[indexOfNugget + 1];
        }
    };
    return CourseFlowManager;
}());
exports.CourseFlowManager = CourseFlowManager;
