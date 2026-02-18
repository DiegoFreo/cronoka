export interface DadosChip{
    Num: string;
    Tag: string;
}

export interface dadosEvento{
    categoria: string[];
    bategia: string[];
}
export interface Categoria{
    _id: string;
    nome: string;
}
export interface DadosCompetidor{
    Nome: string;
    Nº: string;
    Categoria: string;
    Chip: string[];
    PATROCINADORES: string;
    categorias?: Categoria[];
}

