"use strict";
var QuestionnaireComponent = (function () {
    function QuestionnaireComponent() {
        this.templateUrl = "api/template/component/questionnaire";
        this.controller = QuestionnaireComponentController;
        this.bindings = { questionnaireId: "=", video: "=" };
        this.require = { nugget: "^tmcNugget" };
    }
    return QuestionnaireComponent;
}());
exports.QuestionnaireComponent = QuestionnaireComponent;
var QuestionnaireComponentController = (function () {
    function QuestionnaireComponentController(contentItemService, $scope) {
        var _this = this;
        this.contentItemService = contentItemService;
        this.$scope = $scope;
        this.showScore = false;
        this.visibleQuestions = 0;
        contentItemService.getDataById(this.questionnaireId).then(function (res) {
            _this.questionnaire = res;
            if (_this.nugget) {
                _this.addQuestionsToSpecialVideoFrames();
            }
        });
        $scope.$watch('$ctrl.questionnaire', function () {
            if (_this.questionnaire) {
                _this.calculateScore();
            }
            if (_this.questionnaire && _this.questionnaire.questions) {
                _this.visibleQuestions = _this.questionnaire.questions.filter(function (q) { return q.visible; }).length;
            }
        }, true);
    }
    QuestionnaireComponentController.prototype.$onInit = function () {
    };
    QuestionnaireComponentController.prototype.addQuestionsToSpecialVideoFrames = function () {
        if (this.questionnaire) {
            for (var i = 0; i < this.questionnaire.questions.length; i++) {
                var q = this.questionnaire.questions[i];
                if (q.timeslot) {
                    this.nugget.specialFrames[parseInt(q.timeslot)] = [{ 'type': 'question', 'data': q }];
                }
            }
        }
    };
    QuestionnaireComponentController.prototype.continueVideo = function () {
        this.makeAllQuestionsInvisible();
        if (this.video) {
            this.video.play();
        }
    };
    QuestionnaireComponentController.prototype.makeAllQuestionsInvisible = function () {
        this.questionnaire.questions = this.questionnaire.questions.map(function (q) { q.visible = false; return q; });
        this.visibleQuestions = 0;
    };
    QuestionnaireComponentController.prototype.calculateScore = function () {
        this.maxScore = this.questionnaire.questions.map(function (q) { return q.maxScore; }).reduce(function (a, b) { return a + b; }, 0);
        this.score = this.questionnaire.questions.map(function (q) { return q.score; }).reduce(function (a, b) { return a + b; }, 0);
    };
    QuestionnaireComponentController.prototype.validateQuestionnaire = function () {
        this.$scope.$broadcast("validateQuestionnaire", {});
        this.showScore = true;
    };
    return QuestionnaireComponentController;
}());
