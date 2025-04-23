from domain.Students import Students 
import sqlite3

class SQLiteStudents:
    def __init__(self, db_path):
        self.db_path = db_path
        self.create_db_students()

    def create_db_students(self):
        """creation of the student table """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""CREATE TABLE IF NOT EXISTS students (
                        student_id INTEGER PRIMARY KEY ,
                        NAME TEXT NOT NULL,
                        lastname TEXT NOT NULL,
                        telephone TEXT NOT NULL,
                        age INTEGER NOT NULL,
                        email TEXT NOT NULL,
                        status TEXT NOT NULL
                    );
                    """)
        conn.commit()
        conn.close()
        
    def save_students(self, student):
        """creation of student """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO students (name, lastname, telephone, age, email, status) 
                       VALUES 
                       (?, ?, ?, ?, ?, ?);""", 
                       ((student.name, student.lastname, student.telephone, student.age, student.email, student.status)))
        conn.commit()
        cursor.execute("SELECT last_insert_rowid()")
        student.student_id = cursor.fetchone()[0]
        conn.close()
        return student


    def get_students(self):
        """get all student """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM students WHERE status = 'activo';""")
        data = cursor.fetchall()
        conn.close()

        students = []
        for row in data:
            students.append(Students(student_id=row[0], name=row[1], lastname=row[2], telephone=row[3], age=row[4], email=row[5], status=row[6]))
        return students

    def delete_students(self, student_id):
        """inactive student """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("UPDATE students SET status = 'inactivo' WHERE student_id = ?", (student_id,))
        conn.commit()
        conn.close()
        return student_id