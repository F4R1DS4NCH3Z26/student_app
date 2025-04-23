from flask import request, jsonify
from application.student_service import StudentsService
from flask import Blueprint

app_students = Blueprint('students', __name__, url_prefix='/students')

#Routes api rest student 
#student route initializer
def initialize_api_routes(student_service: StudentsService):

    # student creation route
    @app_students.route('/create_student', methods=['POST'])
    def create_student():
        if request.method == 'POST':
            data = request.get_json()
            print(data)
            name = data.get('name') 
            lastname = data.get('lastname') 
            telephone = data.get('telephone') 
            age = data.get('age') 
            email = data.get('email') 
            status = 'activo'

            data_student = {
                "name" : name, 
                "lastname" : lastname, 
                "telephone" : telephone, 
                "age" : age, 
                "email" : email, 
            }

            required = {}
            for value in data_student:
                if not data_student[value]:
                    required.update(data_student)
        
            if required:
                return jsonify({'error':'Se requieren todos los datos'}), 400

            student = student_service.create_student(name, lastname, telephone, age, email, status)
            return jsonify(student.to_dict())
    
    # route to obtaining all students
    @app_students.route('/get_all_student',  methods=['GET'])
    def get_student():
        students = student_service.get_student()
        if not students:
            return jsonify({'error':'No hay datos'}), 400
        return jsonify([student.to_dict() for student in students])
    
    # route to inactivate students
    @app_students.route('/inactive_student/<int:student_id>',  methods=['PUT'])
    def delete_student(student_id):
        if request.method == 'PUT':
            if not student_id:
                return jsonify({'error':'Se requieren todos los datos'}), 400
            student = student_service.delete_student(student_id)
            return jsonify([student])

