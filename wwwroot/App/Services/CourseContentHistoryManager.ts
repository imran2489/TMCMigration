declare var angular;

export class CourseContentHistoryManager {

    private userHistory: any = {};

    constructor(private altaiHttp, private $q, private $rootScope) { }

    public contentInHistory(courseId, contentId) {

        var d = this.$q.defer();

        this.getCourseContentHistory(courseId).then(courseHistory => {

            var result: boolean = (courseHistory.indexOf(contentId) > -1);
            d.resolve(result);
        });

        return d.promise;

    }

    public addToHistory(courseId, contentId) {

        var d = this.$q.defer();

        this.getCourseContentHistory(courseId).then(courseHistory => {

            if (courseHistory.indexOf(contentId) > -1) {

                d.resolve();

            } else {

                courseHistory.push(contentId);
                this.$rootScope.$broadcast("courseHistoryUpdate", {});

                this.altaiHttp.post("api/course/" + courseId + "/content/" + contentId + "/completed").then(res => {
                    d.resolve();
                });

            }

        });

    }

    public getCourseContentHistory(courseId) {

        var d = this.$q.defer();

        var cached = this.userHistory[courseId];

        if (cached) {
            d.resolve(cached);
        } else {

            this.altaiHttp.get("api/course/" + courseId + "/history").then(res => {
                this.userHistory[courseId] = angular.copy(res);
                d.resolve(this.userHistory[courseId]);
            });

        }

        return d.promise;

    }

}