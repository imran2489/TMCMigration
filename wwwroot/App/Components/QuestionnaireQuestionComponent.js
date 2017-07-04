"use strict";
var QuestionnaireQuestionComponent = (function () {
    function QuestionnaireQuestionComponent() {
        this.templateUrl = "api/template/component/questionnairequestion";
        this.controller = QuestionnaireComponentController;
        this.bindings = { question: "=" };
    }
    return QuestionnaireQuestionComponent;
}());
exports.QuestionnaireQuestionComponent = QuestionnaireQuestionComponent;
var QuestionnaireComponentController = (function () {
    function QuestionnaireComponentController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.answeredCorrectly = false;
        this.question.maxScore = 1;
        this.question.score = 0;
        if (this.question.timeslot) {
            this.question.visible = false;
        }
        else {
            this.question.visible = true;
        }
        this.$scope.$on("validateQuestionnaire", function () {
            _this.markAnswers();
        });
    }
    QuestionnaireComponentController.prototype.markAnswers = function () {
        this.question.score = 0;
        this.answeredCorrectly = false;
        for (var i = 0; i < this.question.answers.length; i++) {
            var answ = this.question.answers[i];
            if (answ.id == this.selectedAnswer) {
                answ.markedCorrect = answ.correctanswer;
                answ.markedWrong = !answ.correctanswer;
            }
            else {
                answ.markedCorrect = false;
                answ.markedWrong = false;
            }
            if (answ.markedCorrect) {
                this.question.score = 1;
                this.answeredCorrectly = true;
            }
        }
    };
    return QuestionnaireComponentController;
}());
