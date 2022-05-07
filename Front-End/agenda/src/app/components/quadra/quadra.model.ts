import { Endereco } from './../endereco/endereco.model';

export interface Quadra{

    id?: number
    nome: string
    qtd_pessoas: string
    regiao: any
    foto?:string
    endereco: Endereco

}