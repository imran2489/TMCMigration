"use strict";
var CourseContentHistoryClass_1 = require("./Directives/CourseContentHistoryClass");
var CourseContentHistoryManager_1 = require("./Services/CourseContentHistoryManager");
var NuggetComponent_1 = require("./Components/NuggetComponent");
var CourseFlowManager_1 = require("./Services/CourseFlowManager");
var QuestionnaireComponent_1 = require("./Components/QuestionnaireComponent");
var QuestionnaireQuestionComponent_1 = require("./Components/QuestionnaireQuestionComponent");
var mod = angular.module("tmc", []);
angular.bootstrap(document.body, ['tmc']);
mod.component("tmcNugget", new NuggetComponent_1.NuggetComponent());
mod.component("tmcQuestionnaire", new QuestionnaireComponent_1.QuestionnaireComponent());
mod.component("tmcQuestionnaireQuestion", new QuestionnaireQuestionComponent_1.QuestionnaireQuestionComponent());
mod.directive("courseContentHistoryClass", CourseContentHistoryClass_1.CourseContentHistoryClassDirective);
mod.service("courseFlowManager", CourseFlowManager_1.CourseFlowManager);
mod.service("courseContentHistoryManager", CourseContentHistoryManager_1.CourseContentHistoryManager);
mod.run(function (courseFlowManager, $rootScope) {
    function handleCourseRouteChange(courseId) {
        courseFlowManager.switchCourse(courseId);
    }
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == "course" || toState.name == "course.nugget") {
            handleCourseRouteChange(toParams.courseId);
        }
    });
});
config.modules.push(mod.name);
