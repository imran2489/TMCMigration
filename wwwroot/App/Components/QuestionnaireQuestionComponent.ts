export class QuestionnaireQuestionComponent {

    public templateUrl = "api/template/component/questionnairequestion";
    public controller = QuestionnaireComponentController;
    public bindings = { question: "=" };

}

class QuestionnaireComponentController {

    public question;
    public selectedAnswer;
    public answeredCorrectly: boolean = false;

    constructor(private $scope) {

        this.question.maxScore = 1;
        this.question.score = 0;

        if (this.question.timeslot) {
            this.question.visible = false;
        } else {
            this.question.visible = true;
        }

        this.$scope.$on("validateQuestionnaire", () => {

            this.markAnswers();

        });

    }

    public markAnswers() {

        this.question.score = 0;
        this.answeredCorrectly = false;

        for (var i = 0; i < this.question.answers.length; i++) {

            var answ = this.question.answers[i];

            if (answ.id == this.selectedAnswer) {
                answ.markedCorrect = answ.correctanswer;
                answ.markedWrong = !answ.correctanswer;
            } else {
                answ.markedCorrect = false;
                answ.markedWrong = false;
            }

            if (answ.markedCorrect) {
                this.question.score = 1;
                this.answeredCorrectly = true;
            }


        }


    }

}