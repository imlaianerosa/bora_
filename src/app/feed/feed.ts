export interface FeedResponse {
    dataEvento: string,
    descricaoEvento: string,
    id: string,
    idUsuario: string
    localEvento: string,
    nomeEvento: string,
}

export interface Usuario {
    email: string;
    fotoPerfil: string;
    idUsuario: string;
    linkedin: string;
    nome: string;
}