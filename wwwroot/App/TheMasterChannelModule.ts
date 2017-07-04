import { CourseContentHistoryClassDirective } from './Directives/CourseContentHistoryClass';
import { CourseContentHistoryManager } from './Services/CourseContentHistoryManager';
import { NuggetComponent } from "./Components/NuggetComponent";
import { CourseFlowManager } from "./Services/CourseFlowManager";
import { QuestionnaireComponent } from "./Components/QuestionnaireComponent";
import { QuestionnaireQuestionComponent } from "./Components/QuestionnaireQuestionComponent";

declare var angular;
declare var config;

var mod = angular.module("tmc", []);

angular.bootstrap(document.body, ['tmc']);

mod.component("tmcNugget", new NuggetComponent());
mod.component("tmcQuestionnaire", new QuestionnaireComponent());
mod.component("tmcQuestionnaireQuestion", new QuestionnaireQuestionComponent());

mod.directive("courseContentHistoryClass", CourseContentHistoryClassDirective);

mod.service("courseFlowManager", CourseFlowManager);
mod.service("courseContentHistoryManager", CourseContentHistoryManager);

mod.run(function (courseFlowManager: CourseFlowManager, $rootScope) {

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