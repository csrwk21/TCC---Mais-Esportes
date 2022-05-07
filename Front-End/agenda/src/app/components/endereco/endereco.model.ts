export interface Endereco{
    
    id?: number
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    complemento?: string
    numero?: string
}