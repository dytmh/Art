import SchoolModel from "./schoolModel";
import SchoolResModel from "./schoolResModel";
import StudentModel from "./studentModel";
import StudentPhotoModel from "./studentPhotoModel";
import StudentPhotoResModel from "./studentPhotoResModel";
import TeacherModel from "./teacherModel";
import TeacherPhotoModel from "./teacherPhotoModel";
import TeacherPhotoResModel from "./teacherPhotoResModel";
import UserModel from "./userModel";

export function registerModels() {
    UserModel.register()
    
    SchoolModel.register()
    SchoolResModel.register()

    TeacherModel.register()
    TeacherPhotoModel.register()
    TeacherPhotoResModel.register()

    StudentModel.register()
    StudentPhotoModel.register()
    StudentPhotoResModel.register()
}