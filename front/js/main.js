let allStudents = [];
let filteredStudents = [];
let currentPage = 1;
const studentsPerPage = 5;

async function getStudents() {
    try {
        const response = await fetch("http://127.0.0.1:5000/students/get_all_student");
        allStudents = await response.json();
        filteredStudents = [...allStudents]; 
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
    }
}



function getCurrentPageStudents() {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex); 
}

function displayStudents(students) {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    if (students.length === 0) {
        const noDataRow = tableBody.insertRow();
        const noDataCell = noDataRow.insertCell();
        noDataCell.colSpan = 6;
        noDataCell.textContent = "No existen datos";
        noDataCell.classList.add("full-width-cell");
        return;
    }

    students.forEach(student => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.lastname;
        row.insertCell().textContent = student.telephone;
        row.insertCell().textContent = student.age;
        row.insertCell().textContent = student.email;

        const actionsCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "me-1");
        deleteButton.textContent = "Inactivar";
        deleteButton.addEventListener("click", () => deleteStudent(student.student_id));
        actionsCell.appendChild(deleteButton);

    });
}

function updatePagination(totalPages, currentPage) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.classList.add("btn", "btn-secondary", "me-2");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        currentPage--;
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage); 
    });
    paginationDiv.appendChild(prevButton);

    const currentPageSpan = document.createElement("span");
    currentPageSpan.textContent = `Página ${currentPage} de ${totalPages}`;
    paginationDiv.appendChild(currentPageSpan);

    const nextButton = document.createElement("button");
    nextButton.classList.add("btn", "btn-secondary", "ms-2");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = currentPage === totalPages || totalPages === 0 || totalPages === 0;
    nextButton.addEventListener("click", () => {
        console.log("Botón Siguiente clickeado. currentPage antes:", currentPage);
        currentPage++;
        console.log("currentPage después:", currentPage);
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage); 
    });
    paginationDiv.appendChild(nextButton);
}

async function InactivaStudents(studentId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/students/inactive_student/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
    }
}

async function InactivaStudents(studentId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/students/inactive_student/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
    }
}

async function InactivaStudents(studentId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/students/inactive_student/${studentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        displayStudents(getCurrentPageStudents());
        updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
    }
}

async function createStudent(studentData) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/students/create_student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData), // Envía los datos del formulario como JSON
        });

        if (response.ok) {
            document.getElementById('createStudentForm').reset(); // Limpiar el formulario
            getStudents(); // Volver a cargar la lista de estudiantes
        } else {
            const errorData = await response.json();
            console.error('Error al crear estudiante:', response.status, errorData);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al enviar la petición de creación de estudiante:', error);
    }
}

document.getElementById('createStudentForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const telephoneInput = document.getElementById('telephone');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');

    const newStudentData = {
        name: nameInput.value,
        lastname: lastnameInput.value,
        telephone: telephoneInput.value,
        age: ageInput.value ? parseInt(ageInput.value) : null,
        email: emailInput.value,
    };

    await createStudent(newStudentData);
});

function deleteStudent(studentId) {
    InactivaStudents(studentId)
    allStudents = allStudents.filter(student => student.student_id !== studentId);
    filteredStudents = [...allStudents];
    displayStudents(getCurrentPageStudents());
    updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
}

function updateStudent(studentId) {
    console.log(`Actualizar estudiante con ID: ${studentId}`);
}

function filterStudents(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.lastname.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; 
    displayStudents(getCurrentPageStudents());
    updatePagination(Math.ceil(filteredStudents.length / studentsPerPage), currentPage);
}

document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value;
    filterStudents(searchTerm);
});

document.getElementById("searchInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchTerm = document.getElementById("searchInput").value;
        filterStudents(searchTerm);
    }
});

getStudents();