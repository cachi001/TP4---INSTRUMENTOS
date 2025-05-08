🌟 TP INSTRUMENTOS (RUTAS ANIDADAS) TP4, TP5, TP6

📌 Requisitos previos

Instalar:

- Git
- Node.js y npm
- MySQL Server & MySQL Workbench
- IntelliJ IDEA o cualquier IDE compatible con Spring Boot

---

🔹 **Clonar el repositorio**

Ejecuta el siguiente comando en la terminal:
```bash
git clone https://github.com/cachi001/TP4---INSTRUMENTOS.git
```

---

🔹 **Configurar el Frontend**

1. Abre la carpeta del **frontend** en Visual Studio Code
2. Instala las dependencias ejecutando:
```bash
npm install
```
3. Inicia la aplicación con:
```bash
npm run dev
```
4. Accede a la página en `http://localhost:5173`.

Si el puerto es diferente, cambiarlo en `config/webConfig` del backend.

---

🔹 **Configurar y ejecutar el Backend**

1. Abre la carpeta del **backend** en IntelliJ IDEA.
2. Asegúrate de tener **MySQL Workbench** y **MySQL Server** instalados y en ejecución.
3. Configura la conexión a la base de datos en el archivo `application.properties`:

```properties
spring.application.name=instrumentos-tp

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/instrumentos_db  # Nombre de la BD
spring.datasource.username=root  # Usuario
spring.datasource.password=1122  # Contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
```

4. Ejecuten la aplicación desde IntelliJ IDEA.

