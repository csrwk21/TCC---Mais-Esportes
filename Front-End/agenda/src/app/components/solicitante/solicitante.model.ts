import { Endereco } from "../endereco/endereco.model"

export interface Solicitante{

    id?: number
    cpf: string
    nome: string
    rg: string
    dtnascimento: string
    telefone: string
    email: string
    endereco: Endereco

}