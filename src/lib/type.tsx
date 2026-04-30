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
    categorias: Categoria[];
};
export interface Categoria{
    _id: string;
    nome: string;
    pilotos: Piloto[];
};
export interface Evento{
    _id: string;
    nome_evento: string;
    descricao_evento: string;
    data_inicio: string;
    data_fim: string;
    local_evento: string;
    hora_evento: string;
    baterias: Bateria[];
};

export interface Piloto{
    _id: string;
    nome: string;
    numero_piloto: number;
    status: StatusPiloto;
    voltas: voltas[];
    categorias: string[]; //array de categorias que o piloto participa
    statusUltimaVolta: number; //status da ultama alteração da volta
    largada: number | null; //tempo de largada em milesegundos
    melhorVolta: number | null; //melhor volta em milesegundos
    ultimaVolta: number | null; //ultima volta em milesegundos
    tempoTotal: number ; //tempo total em milesegundos
    ultimaVoltaCompleta: number | null; //ultima volta completa em milesegundos
    posicao: number; //posição do piloto na corrida
    cor: string; //cor do piloto

}