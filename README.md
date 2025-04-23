# Proyecto de Gestión de Estudiantes

Este proyecto consiste en un backend desarrollado con Flask (Python) para gestionar información de estudiantes y un frontend desarrollado con HTML y JavaScript para interactuar con el backend.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* **Python 3.x:** Puedes descargarlo desde [https://www.python.org/downloads/](https://www.python.org/downloads/)
* **pip:** El gestor de paquetes de Python (generalmente se instala con Python).
* **Un navegador web moderno:** (Chrome, Firefox, Safari, Edge, etc.)

## Configuración del Backend (Flask)

1.  **Clona el repositorio del proyecto (si aplica) o navega hasta el directorio del backend.**
    ```bash
    git clone [https://github.com/cran/DELTD](https://github.com/cran/DELTD)
    cd backend  # O la ruta a tu directorio del backend
    ```

2.  **Crea un entorno virtual (recomendado) para aislar las dependencias del proyecto:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Linux/macOS
    .\venv\Scripts\activate  # En Windows
    ```

3.  **Instala las dependencias del backend desde el archivo `requirements.txt` (si existe):**
    ```bash
    pip install -r requirements.txt
    ```
    Si no tienes un `requirements.txt`, instala al menos Flask y Flask-CORS (si lo utilizas):
    ```bash
    pip install Flask Flask-CORS
    ```

4.  **Ejecuta la aplicación Flask.** Asumiendo que tu archivo principal de Flask se llama `Student/app.py`:
    ```bash
    python app.py
    ```


5.  **Mantén la terminal abierta.** El servidor de Flask estará corriendo y listo para recibir peticiones. La dirección del servidor (por ejemplo, `http://127.0.0.1:5000/`) se mostrará en la terminal.

## Ejecución del Frontend (Students.html)

1.  **Navega hasta el directorio donde se encuentra el archivo `front/Students.html`.**
    ```bash
    cd ../front  # O la ruta a tu directorio del frontend
    ```

2.  **Abre el archivo `Students.html` directamente en tu navegador web.** Puedes hacerlo de las siguientes maneras:
    * **Haciendo doble clic** en el archivo `Students.html` en tu explorador de archivos.
    * **Arrastrando y soltando** el archivo `Students.html` en la ventana de tu navegador.
    * **Escribiendo la ruta completa del archivo** en la barra de direcciones del navegador (ejemplo: `file:///ruta/a/tu/proyecto/frontend/Students.html`).

3.  **Inspecciona la Consola del Navegador.** Abre las herramientas para desarrolladores de tu navegador (generalmente con la tecla F12) y ve a la pestaña "Consola". Aquí podrás ver cualquier error o mensaje de registro de tu código JavaScript al interactuar con el backend de Flask.

¡Ahora deberías tener tanto el backend de Flask corriendo como el frontend abierto en tu navegador, listos para interactuar!