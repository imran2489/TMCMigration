"use strict";
var NuggetComponent = (function () {
    function NuggetComponent() {
        this.templateUrl = "/api/template/component/nugget";
        this.controller = NuggetComponentController;
        this.bindings = { nugget: "=", courseId: "=" };
    }
    return NuggetComponent;
}());
exports.NuggetComponent = NuggetComponent;
var NuggetComponentController = (function () {
    function NuggetComponentController($scope, $state, courseContentHistoryManager, courseFlowManager) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.courseContentHistoryManager = courseContentHistoryManager;
        this.courseFlowManager = courseFlowManager;
        this.mode = "content";
        this.specialFrames = {};
        $scope.$on("videoCompleted", function () {
            courseContentHistoryManager.addToHistory(_this.courseId, _this.nugget.id);
            if (_this.nugget.final_questionnaire) {
                _this.switchMode("test");
            }
            else {
                _this.switchToNextnugget();
            }
        });
        $scope.$on("secondChange", function (event, data) {
            _this.videoFramePlayed(data);
        });
    }
    NuggetComponentController.prototype.$onInit = function () {
    };
    NuggetComponentController.prototype.switchToNextnugget = function () {
        var nextNugget = this.courseFlowManager.getNextNuggetInModule(this.nugget.id);
        if (nextNugget) {
            this.courseFlowManager.navigateToNugget(this.courseId, nextNugget.id);
        }
        else {
            alert("module completed");
        }
    };
    NuggetComponentController.prototype.videoFramePlayed = function (data) {
        if (data.frame in this.specialFrames) {
            this.videoHandle = data.video;
            data.video.pause();
            for (var i = 0; i < this.specialFrames[data.frame].length; i++) {
                this.runSpecialFrame(this.specialFrames[data.frame][i]);
            }
        }
    };
    NuggetComponentController.prototype.runSpecialFrame = function (frame) {
        this.$scope.$apply(function () {
            if (frame.type == "question") {
                frame.data.visible = true;
            }
        });
    };
    NuggetComponentController.prototype.switchMode = function (mode) {
        this.mode = mode;
    };
    return NuggetComponentController;
}());
exports.NuggetComponentController = NuggetComponentController;
