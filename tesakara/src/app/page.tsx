import Template1View from "@/components/Template1View";
import NoCopy from "./nocopy";

type BankInfo = {
  bank: string;
  atasNama: string;
  noRekening: string;
};

type AlamatProp = {
  namatempat: string;
  alamat: string;
  link: string;
  mulai: string; //00.00
  selesai: string; //00.00
}

type LiveProps = {
  link: string;
}

type AddressBlock =
  { isAlamat: boolean; 
    penerima: string; //kalo false "" 
    alamat: string } //kalo false ""

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
}


type InviteProps = {
    bride: string;
    groom: string;
    to: string;
    date:string;
    bank: BankInfo[];
    detaildata: Details;
};

export default function Home({}: InviteProps) {
  const bride = ("Tesa").trim();
  const groom = ("Kara").trim();
  const invitee = ("Muhammad dan Pasangan").trim();
  const date = "21-09-2025"
  const bank = [
    { bank: "Bank Jago Syariah", atasNama: "John Doe", noRekening: "123456789" },
    { bank: "Bank BSI", atasNama: "Jane Smith", noRekening: "987654321" },
  ];

  // akad: AlamatProp;
  // walimah: AlamatProp;
  // live: LiveProps;
  // maxhadir: number;
  // alamat: AddressBlock;
  const tempatAkad = {
    namatempat: "Masjid Al-Ukhuwwah",
    alamat: "Jl. Wastukencana No.27, Babakan Ciamis, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40117",
    link: "https://maps.app.goo.gl/5iZJUTi2iPXJ1wVT8",
    mulai: "08.00",
    selesai: "09.00"
  }

  const tempatWalimah = {
    namatempat: "Intercontinental Dago Pakar",
    alamat: "Jalan Resor Dago Pakar Raya 2B Resor Dago Pakar, Mekarsaluyu, Kec. Cimenyan, Kota Bandung, Jawa Barat 40198",
    link: "https://maps.app.goo.gl/qpbCVwvsjoj3FbTg8",
    mulai: "13.00",
    selesai: "15.00"
  }

  const live = {
    link:"https://www.youtube.com/live/e85tJVzKwDU?si=aNFciZUgg0SqKhZB"
  }

  const alamatYes = {
    isAlamat: true,
    penerima: "Keluarga Handoko",
    alamat:
      "Jl. Tengah Kota Jauh Dari Kabupaten Kota Baru, Indonesia",
  }

  const alamatNo = {
    isAlamat: false,
    penerima: "",
    alamat: ""
  }

  const detaildata = {
   fullbride:"Tesa Azzahra, S.Pd.",
   fullgroom:"dr. Muhammad Kara Haritsah, Sp.PD.",
   fbride:"Fulan",
   mbride:"Fulanah",
   fgroom:"Fulan",
   mgroom:"Fulanah",
   brillust:"https://lh3.googleusercontent.com/d/1K22HWbR2mY5TLISQYVsjMvwNifNUG24D",
   grillust:"https://lh3.googleusercontent.com/d/1IMFbAWc3nNbnaDup7OTcpU6PLzaftaHv",
   akad: tempatAkad,
   walimah: tempatWalimah,
   live: live,
   maxhadir: 5,
   alamat: alamatNo,
  }

  return (
    <NoCopy>
      <div className="no-horizontal-scroll">
        <Template1View 
          bride={bride}
          groom={groom}
          to={invitee}
          date={date}
          bank={bank}
          detaildata={detaildata}
        >
        </Template1View>
      </div>
    </NoCopy>
  );
}
