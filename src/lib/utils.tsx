import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMilliseconds(totalMilliseconds: number): string {
  if (totalMilliseconds < 0) totalMilliseconds = 0;

  const milliseconds = String(Math.floor(totalMilliseconds % 1000)).padStart(3, '0');
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export const PILOT_COLORS = [
  '#FF5733', '#33FF57', '#3357FF', '#F0FF33',
  '#FF33A1', '#33FFA1', '#A133FF', '#FF9633',
  '#8D33FF', '#33FFDA',
];

export function getPilotColor(index: number): string {
  return PILOT_COLORS[index % PILOT_COLORS.length];
}