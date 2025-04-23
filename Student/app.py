from flask import Flask
from infraestructure.adapters.routes.routesStudents import app_students, initialize_api_routes
from application.student_service import StudentsService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the SQLite database path
DATABASE_PATH = 'students.db'

# Initialize the student service, directly creating the repository within
student_service = StudentsService(DATABASE_PATH)

# Initialize and register the student API routes, injecting the service dependency
student_api_bp = initialize_api_routes(student_service)
app.register_blueprint(app_students)

if __name__ == '__main__':
    app.run(port=5000, debug=True)