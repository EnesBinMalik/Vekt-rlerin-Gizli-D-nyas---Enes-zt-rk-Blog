export enum BuyuklukEnum {
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
}

export type LineType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type ConsoleStep =
  | 'MAIN_MENU'
  | 'ADD_TITLE'
  | 'ADD_CONTENT'
  | 'ADD_SIZE'
  | 'ADD_MEMBER'
  | 'DELETE_TITLE'
  | 'DELETE_NOT_FOUND_CHOICE'
  | 'MOVE_TITLE'
  | 'MOVE_NOT_FOUND_CHOICE'
  | 'MOVE_SELECT_LINE'
  | 'UPDATE_TITLE'
  | 'UPDATE_NOT_FOUND_CHOICE'
  | 'UPDATE_FIELD_CHOICE'
  | 'UPDATE_FIELD_VALUE';

export interface TakimUyesi {
  id: number;
  isim: string;
  unvan: string;
  avatarColor: string;
}

export interface Kart {
  id: string;
  baslik: string;
  icerik: string;
  atananKisiId: number;
  buyukluk: BuyuklukEnum;
  line: LineType;
  olusturmaTarihi: string;
}

export interface BoardState {
  lines: Record<LineType, Kart[]>;
  takimUyeleri: Record<number, TakimUyesi>;
}

export interface TerminalLine {
  id: string;
  text: string;
  type: 'prompt' | 'input' | 'output' | 'header' | 'error' | 'success' | 'system' | 'card';
  timestamp?: string;
}

export const LINE_LABELS: Record<LineType, string> = {
  TODO: 'TODO Line',
  IN_PROGRESS: 'IN PROGRESS Line',
  DONE: 'DONE Line',
};

export const BUYUKLUK_LABELS: Record<BuyuklukEnum, string> = {
  [BuyuklukEnum.XS]: 'XS',
  [BuyuklukEnum.S]: 'S',
  [BuyuklukEnum.M]: 'M',
  [BuyuklukEnum.L]: 'L',
  [BuyuklukEnum.XL]: 'XL',
};
