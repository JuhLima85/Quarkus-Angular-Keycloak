export class Usuario {
    id: number;
    nome: string;
    login: string;
    password: string;    
    role: string;
    perfil: 'ADMIN' | 'COORDENADOR' | 'PROFESSOR' | 'ALUNO';   
    email: string;    
    dataCadastro: string;
    endereco: string;
    telefone: string;
    cpf: string;
}