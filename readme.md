Primeramente el trabajo integrador plantea los siguientes modelos:

User
Article
Tag
Comment

Dado que en el propio trabajo se especifica como serán los documentos, no requirió un planeamiento de mi parte

User tiene un documento embebido (profile),
Article tiene referencias a user y tag
Comment tiene referencias a user y article

Así mismo las relaciones también están dadas en las consignas

Uno a uno: User <-> Profile
Uno a muchos: User -> Article y Article -> Comment
Muchos a muchos: Article <-> Tag

Eliminaciones:
-Lógica: Se implementó en User, dado que en una BD puede ser necesario llevar un registro de todos los usuarios,
además de por si se quiere recuperar algún usuario.
-Cascada: Implementé eliminación en cascada para User y Article, de modo que si se elimina un usuario, todos sus
artículos se eliminarán con él, además de los comentarios en ese artículo y se eliminan las referencias de los tags
a ese artículo.
También, al eliminar un artículo, se eliminarán los comentarios y los tags asociados a ese artículo.

Populate:
Article tiene como campo las referencias de User y Tag, por lo cual se puede usar el populate, sin embargo,
lo contrario no funciona, por ello se implementó el populate inverso en User y Tag

Endpoints:
Siguiendo lo especificado en el trabajo se implementaron los endpoints correspondientes:

ACLARACIÓN: En la ruta antes de "/api/" debe colocarse: http://localhost:3000
Users:
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

Tags:
POST /api/tags
GET /api/tags
GET /api/tags/:id
PUT /api/tags/:id
DELETE /api/tags/:id

Articles:
POST /api/articles
GET /api/articles
GET /api/articles/:id
GET /api/articles/my
PUT /api/articles/:id
DELETE /api/articles/:id

Comments:
POST /api/comments
GET /api/comments/article/:articleId
GET /api/comments/my
PUT /api/comments/:id
DELETE /api/comments/:id

Article Tags:
POST /api/articles/:articleId/tags/:tagId
DELETE /api/articles/:articleId/tags/:tagId

Registro:
POST /api/auth/register

Logueo:
POST /api/auth/login

Deslogueo:
POST /api/auth/logout

Ejemplo de registro:
{
"username": "Alejandro",
"email": "alejndro@hotmail.com",
"password": "Contraseña5",
"role": "user",
"profile": {
"firstName": "Alejandro",
"lastName": "Recalde",
"biography": "Nacido en Formosa, Argentina",
"avatarUrl": "https://classroom.google.com/w/NzAwNTQ1MTYxOTc3/t/all",
"birthDate": "08/01/98"
}
}

Para lo cual recibirá el siguiente mensaje de ser exitoso:
{
"msg": "Usuario registrado existosamente"
}

Sino:
{
"errors": {
"username": {
"type": "field",
"msg": "Faltan campos obligatorios",
"path": "username",
"location": "body"
},
}
}
El mensaje será personalizado a los errores cometidos

Instalación y configuración

Se deberá clonar el repositorio con el siguiente comando: git clone https://github.com/AlejadroOFDY/trabajo-practico-integrador-2

Luego entrará en la carpeta e iniciará la terminal dentro de esa carpeta sea powershell o git bash.
Utilizará el comando npm i para que se instalen todos los nodos, y en la misma ubicación creará un archivo .env
con el siguiente contenido:
MONGODB_URI= la url de su mongodb
JWT_SECRET= Una clave secreta cualquiera para los tokens
PORT= Acá va el puerto

Una vez hecho todo lo anterior, podrá realizar npm start para levantar el servidor y poder operar en postman o thunderClient.
