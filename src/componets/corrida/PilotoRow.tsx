'use client';

import { useEffect, useState } from 'react';
import type { Piloto } from '@/lib/type';
import { formatMilliseconds } from '@/lib/utils';
import { TableCell, TableRow } from '@/componets/ui/table';
import { Badge } from '@/componets/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle2, Trophy } from 'lucide-react';


interface PilotRowProps {
  piloto: Piloto;
  rank: number;
}

export function PilotoRow({ piloto, rank }: PilotRowProps) {
  const [rowClass, setRowClass] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    switch (piloto.status) {
      case 'ALERTA':
        setRowClass('bg-yellow-500/30 animate-pulse-yellow');
        break;
      case 'PASSOU':
        setRowClass('bg-green-500/40'); // Accent color for completed lap
        timeoutId = setTimeout(() => {
          // Check if status is still 'completed' before reverting to normal,
          // as another event might have changed it.
          // This check happens in the parent, this effect only cares about the temporary highlight.
          setRowClass(''); 
        }, 20000); // Green highlight for 20 seconds
        break;
      default:
        setRowClass('');
        break;
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [piloto.status, piloto.steutusUltamaVolta]); // Rerun effect if status or its timestamp changes

  const displayLastLapTime = piloto.voltas.length > 0 ? formatMilliseconds(piloto.voltas[piloto.voltas.length - 1].tempoAtual) : '-';
  const displayBestLapTime = piloto.melhorVolta ? formatMilliseconds(piloto.melhorVolta) : '-';
  const displayTotalTime = formatMilliseconds(piloto.tempoTotal);

  return (
    <TableRow className={`transition-colors border-red-500 duration-500 ${rowClass}`} aria-live="polite">
      <TableCell className="font-medium text-lg md:text-xl py-3 px-2 md:px-4 text-center">{rank}</TableCell>
      <TableCell className="font-semibold text-lg md:text-xl py-3 px-2 md:px-4 flex items-center">
        <span style={{color: piloto.cor}} className="font-bold mr-2 text-2xl">•</span>
        {piloto.nome}
      </TableCell>
      <TableCell className="text-lg md:text-xl py-3 px-2 md:px-4 text-center">
        {piloto.voltas.length}
        {piloto.status === 'PASSOU' && <Badge variant="default" className="ml-2 bg-accent text-accent-foreground animate-ping absolute">Lap!</Badge>}
      </TableCell>
      <TableCell className="font-mono text-lg md:text-xl py-3 px-2 md:px-4 text-center">{displayLastLapTime}</TableCell>
      <TableCell className="font-mono text-lg md:text-xl py-3 px-2 md:px-4 text-center">
        {displayBestLapTime}
        {piloto.melhorVolta && piloto.voltas.some(lap => lap.tempoAtual=== piloto.melhorVolta) && (
           <Trophy className="inline-block ml-2 h-5 w-5 text-yellow-400" />
        )}
      </TableCell>
      <TableCell className="font-mono text-lg md:text-xl py-3 px-2 md:px-4 text-center">{displayTotalTime}</TableCell>
      <TableCell className="py-3 px-2 md:px-4 text-center">
        {piloto.status === 'ALERTA' && <AlertTriangle className="h-6 w-6 text-yellow-400 mx-auto" />}
        {piloto.status === 'PASSOU' && <CheckCircle2 className="h-6 w-6 text-green-400 mx-auto" />}
        {piloto.status === 'NORMAL' && piloto.voltas.length > 0 && <TrendingUp className="h-6 w-6 text-blue-400 mx-auto" />}
      </TableCell>
    </TableRow>
  );
}
