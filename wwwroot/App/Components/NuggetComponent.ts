import { CourseContentHistoryManager } from "../Services/CourseContentHistoryManager";
import { CourseFlowManager } from "../Services/CourseFlowManager";
import { Nugget } from "../Models/Nugget";

export class NuggetComponent {

    public templateUrl = "/api/template/component/nugget";
    public controller = NuggetComponentController;
    public bindings = { nugget: "=", courseId: "=" };
}

export class NuggetComponentController {

    public nugget: any;
    public courseId: number;
    public mode: string = "content";
    public specialFrames = {};
    public videoHandle;

    constructor(private $scope, private $state, private courseContentHistoryManager: CourseContentHistoryManager, private courseFlowManager: CourseFlowManager) {

        $scope.$on("videoCompleted", () => {

            courseContentHistoryManager.addToHistory(this.courseId, this.nugget.id);

            if (this.nugget.final_questionnaire) {
                this.switchMode("test");
            } else {
                this.switchToNextnugget();
            }

        });

        $scope.$on("secondChange", (event, data) => {
            this.videoFramePlayed(data);
        });
    }

    public $onInit() {

    }

    private switchToNextnugget() {

        var nextNugget: Nugget = this.courseFlowManager.getNextNuggetInModule(this.nugget.id);

        if (nextNugget) {
            this.courseFlowManager.navigateToNugget(this.courseId, nextNugget.id);
        } else {
            alert("module completed");
        }

    }

    public videoFramePlayed(data) {

        if (data.frame in this.specialFrames) {

            this.videoHandle = data.video;

            data.video.pause();

            for (var i = 0; i < this.specialFrames[data.frame].length; i++) {
                this.runSpecialFrame(this.specialFrames[data.frame][i]);
            }

        }

    }

    public runSpecialFrame(frame) {

        this.$scope.$apply(() => {
            if(frame.type == "question") {
                frame.data.visible = true;
            }
        });

    }

    public switchMode(mode: string): void {

        this.mode = mode;

    }

}