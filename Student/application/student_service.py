from domain.Students import Students
from infraestructure.persistence.students import SQLiteStudents

class StudentsService():
    def __init__(self, db_path):
        self.repository = SQLiteStudents(db_path)

    def create_student(self, name, lastname, telephone, age, email, status):
        student = Students(student_id = None, name=name, lastname=lastname, telephone=telephone, age=age, email=email, status=status)
        self.repository.save_students(student)
        return student

    def get_student(self):
        student = self.repository.get_students()
        return student
    
    def delete_student(self, student_id):
        student = self.repository.delete_students(int(student_id))
        return student