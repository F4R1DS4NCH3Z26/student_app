class Students():

    def __init__(self, student_id: None | int, name, lastname, telephone, age, email, status) -> None:
        self.student_id = student_id
        self.name = name
        self.lastname = lastname
        self.telephone = telephone
        self.age = age
        self.email = email
        self.status = status

    def __repr__(self):
        return f"<Students(student_id={self.student_id}, name='{self.name}', lastname='{self.lastname}', telephone='{self.telephone}', age='{self.age}' , email='{self.email}', status='{self.status}')>"

    def to_dict(self):
        return {
            "student_id": self.student_id,
            "name": self.name,
            "lastname": self.lastname,
            "telephone": self.telephone,
            "age": self.age,
            "email": self.email,
            "status": self.status
        }
