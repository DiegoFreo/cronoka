'use client';

import type { Piloto } from '@/lib/type';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/componets/ui/table';
import { PilotoRow } from './PilotoRow';
import { ScrollArea } from '@/componets/ui/scroll-area';

interface PilotDataTableProps {
  pilots: Piloto[];
}

export function PilotDataTable({ pilots }: PilotDataTableProps) {
  if (pilots.length === 0) {
    return <p className="text-center text-muted-foreground py-10 text-lg">Nenhum piloto adicionado ainda. Inicie a corrida ou adicione pilotos.</p>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-320px)] rounded-md border-2 shadow-lg border-red-500">
      <Table>
        <TableCaption className="text-base py-3">Dados piloto em tempo real. A tabela é atualizada automaticamente.</TableCaption>
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead className="w-[80px] text-center text-base md:text-lg">Pos</TableHead>
            <TableHead className="text-base md:text-lg">Piloto</TableHead>
            <TableHead className="w-[100px] text-center text-base md:text-lg">Voltas</TableHead>
            <TableHead className="w-[180px] text-center text-base md:text-lg">ultima Volta</TableHead>
            <TableHead className="w-[180px] text-center text-base md:text-lg">Melhor Volta</TableHead>
            <TableHead className="w-[200px] text-center text-base md:text-lg">Tempo Total</TableHead>
            <TableHead className="w-[100px] text-center text-base md:text-lg">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pilots.map((pilot, index) => (
            <PilotoRow key={pilot.id_piloto} piloto={pilot} rank={index + 1} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
