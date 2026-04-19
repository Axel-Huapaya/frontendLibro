### 2. README.md para el Repositorio de FRONTEND (Angular)
---

Este archivo se enfoca en la interfaz de usuario, el proceso de compilación (build) y el servidor Nginx.

# 💻 Frontend: Sistema de Registro de Libros
---

Interfaz de usuario moderna desarrollada en **Angular** para la gestión de libros. Está diseñada para consumir una API REST distribuida en una arquitectura de microservicios en AWS.

## 🛠️ Stack Tecnológico
---

* **Framework:** Angular 17+
* **Lenguaje:** TypeScript
* **Estilos:** Bootstrap 5
* **Servidor Web:** Nginx

## 🚀 Proceso de Despliegue en Producción (AWS EC2)
---

### 1. Vinculación con el Backend
---

Antes de compilar, es necesario apuntar el servicio de Angular a la instancia correcta en `src/app/services/libro.service.ts`:
```typescript
private apiUrl = '[http://3.236.58.91:8080/api/libros](http://3.236.58.91:8080/api/libros)';
```

### 2. Generación del Build
---

Ejecutar el comando de compilación optimizada:
```bash
ng build --configuration production
```

### 3. Configuración del Servidor Web (Nginx)
---

Los archivos generados en `dist/registro-libros/browser/` deben moverse al directorio raíz de Nginx en la instancia de AWS:
```bash
sudo rm -rf /var/www/html/*
sudo cp -r ./dist/registro-libros/browser/* /var/www/html/
sudo systemctl restart nginx
```

## 🔍 Resolución de Problemas (Troubleshooting)
---

* **Conexión Fallida:** Si no se muestran datos, verificar que el Security Group del Backend permita el puerto 8080.
* **Página en blanco:** Revisar que los permisos de la carpeta `/var/www/html/` sean `755`.
```


