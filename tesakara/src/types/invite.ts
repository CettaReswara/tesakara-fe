type BankInfo = {
  bank: string;
  atasNama: string;
  noRekening: string;
};

type AlamatProp = {
  namatempat: string;
  alamat: string;
  link: string;
  mulai: string; // 00.00
  selesai: string; // 00.00
};

type LiveProps = {
  link: string;
};

type AddressBlock = {
  isAlamat: boolean;
  penerima: string; // if false, ""
  alamat: string;   // if false, ""
};

type Details = {
  fullbride: string;
  fullgroom: string;
  fbride: string;
  mbride: string;
  fgroom: string;
  mgroom: string;
  brillust: string;
  grillust: string;
  akad: AlamatProp;
  walimah: AlamatProp;
  live: LiveProps;
  maxhadir: number;
  alamat: AddressBlock;
};

export type InviteProps = {
  bride: string;
  groom: string;
  to: string;
  date: string;
  bank: BankInfo[];
  detaildata: Details;
};