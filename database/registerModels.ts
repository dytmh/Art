import MessageModel from "./messageModel";
import SchoolModel from "./schoolModel";
import StudentPhotoModel from "./studentPhotoModel";
import TeacherPhotoModel from "./teacherPhotoModel";
import UserModel from "./userModel";

export function registerModels() {
    UserModel.register()

    MessageModel.register();
    
    SchoolModel.register()

    TeacherPhotoModel.register()

    StudentPhotoModel.register()
}