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
