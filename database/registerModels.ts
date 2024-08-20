import MessageModel from "./messageModel";
import SchoolModel from "./schoolModel";
import StudentLikeModel from "./studentLikeModel";
import StudentPhotoModel from "./studentPhotoModel";
import TeacherLikeModel from "./teacherLikeModel";
import TeacherPhotoModel from "./teacherPhotoModel";
import UserModel from "./userModel";

export function registerModels() {
    UserModel.register()

    MessageModel.register();
    
    SchoolModel.register()

    TeacherPhotoModel.register()

    StudentPhotoModel.register()

    TeacherLikeModel.register()

    StudentLikeModel.register()
}