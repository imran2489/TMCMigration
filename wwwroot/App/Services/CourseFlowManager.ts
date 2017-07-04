import { Course } from "../Models/Course";
import { Module } from "../Models/Module";
import { Nugget } from "../Models/Nugget";

export class CourseFlowManager {

    public activeCourse: Course;

    constructor(private contentItemService,private $state) {

    }

    public switchCourse(courseId: number) {

        this.contentItemService.getDataById(courseId).then((courseData: Course) => {
            this.activeCourse = courseData;
        });

    }

    public navigateToNugget(courseId: number, nuggetId: number): void {
        this.$state.go("course.nugget", { courseId: courseId, nuggetId: nuggetId });
    }

    public getNextNuggetInModule(nuggetId: number): Nugget {

        var module = this.activeCourse.modules.filter((mod: Module) => { return mod.nuggets && mod.nuggets.filter(nugget => { return nugget.id == nuggetId; }).length > 0 })[0];

        if (!module) {
            return;
        }

        var nugget = module.nuggets.filter((nugget: Nugget) => { return nugget.id == nuggetId; })[0];

        if (!nugget) {
            return;
        }
        
        var indexOfNugget = module.nuggets.indexOf(nugget);

        if (indexOfNugget < module.nuggets.length - 1) {
            return module.nuggets[indexOfNugget + 1];
        }

    }

}