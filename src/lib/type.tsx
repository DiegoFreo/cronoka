export interface voltas{
    qtVoltas: number; //quantidade de voltas em milesegundos
    tempo: number; //em milesegundos
    tempoAtual: number; //tempo atual em milesegundos
    VoltaCompleta:number; //Tempo que a voltas completada
}

export type StatusPiloto = "NORMAL" | "PASSOU" | "ALERTA" | "SAIU" | "BURLOU";

export interface Bateria{
    _id: string;
    nome: string;
    pilotos: Piloto[];
};
export interface Categoria{
    _id: string;
    nome: string;
    baterias: Bateria[];
};
export interface Evento{
    _id: string;
    nome: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    local: string;
    hora: string;
    categorias: Categoria[];
};

export interface Piloto{
    _id: string;
    nome: string;
    numero_piloto: number;
    status: StatusPiloto;
    voltas: voltas[];
    steutusUltamaVolta: number; //status da ultama alteração da volta
    melhorVolta: number | null; //melhor volta em milesegundos
    ultimaVolta: number | null; //ultima volta em milesegundos
    tempoTotal: number ; //tempo total em milesegundos
    ultimaVoltaCompleta: number | null; //ultima volta completa em milesegundos
    posicao: number; //posição do piloto na corrida
    cor: string; //cor do piloto

}