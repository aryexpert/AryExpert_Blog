
// pour des erreurs qui ne sont pas gérées par express, on utilise le middleware pour les gérer.
// des exceptions que nous levons de nous meme comme un champ obligatoire non rempli.
// entre autre celles levées par express sont définies dans l'index du server.
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};