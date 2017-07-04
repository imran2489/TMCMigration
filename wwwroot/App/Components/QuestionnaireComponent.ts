import { NuggetComponentController } from "./NuggetComponent";

export class QuestionnaireComponent {

    public templateUrl = "api/template/component/questionnaire";
    public controller = QuestionnaireComponentController;
    public bindings = { questionnaireId: "=", video: "=" };
    public require = { nugget: "^tmcNugget" };
}

class QuestionnaireComponentController {

    public questionnaireId;
    public questionnaire;
    public score;
    public maxScore;
    public showScore = false;
    public nugget: NuggetComponentController;
    public video;
    public visibleQuestions = 0;

    constructor(private contentItemService, private $scope) {

        contentItemService.getDataById(this.questionnaireId).then((res) => {
            this.questionnaire = res;
            if (this.nugget) {
                this.addQuestionsToSpecialVideoFrames();
            }
        });

        $scope.$watch('$ctrl.questionnaire', () => {

            if (this.questionnaire) {
                this.calculateScore();
            }

            if (this.questionnaire && this.questionnaire.questions) {
                this.visibleQuestions = this.questionnaire.questions.filter(function (q) { return q.visible; }).length;
            }

        }, true);

    }

    public $onInit() {

    }

    public addQuestionsToSpecialVideoFrames() {

        if (this.questionnaire) {

            for (var i = 0; i < this.questionnaire.questions.length; i++) {

                var q = this.questionnaire.questions[i];

                if (q.timeslot) {
                    this.nugget.specialFrames[parseInt(q.timeslot)] = [{ 'type': 'question', 'data': q }];
                }

            }

        }

    }

    public continueVideo() {

        this.makeAllQuestionsInvisible();

        if (this.video) {
            this.video.play();
        }

    }

    private makeAllQuestionsInvisible() {

        this.questionnaire.questions = this.questionnaire.questions.map((q) => { q.visible = false; return q; });
        this.visibleQuestions = 0;

    }

    public calculateScore() {

        this.maxScore = this.questionnaire.questions.map((q) => { return q.maxScore; }).reduce((a, b) => { return a + b; }, 0);
        this.score = this.questionnaire.questions.map((q) => { return q.score; }).reduce((a, b) => { return a + b; }, 0);

    }

    public validateQuestionnaire() {

        this.$scope.$broadcast("validateQuestionnaire", {});
        this.showScore = true;

    }

}