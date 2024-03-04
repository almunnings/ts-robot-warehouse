const logs = []

export function log(...args: any) {
  logs.push({ args })
}

export function read() {
  for (const log of logs) {
    console.log(...log.args)
  }
}

export type Position = {
  x: number
  y: number
}

export enum Command {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
}
