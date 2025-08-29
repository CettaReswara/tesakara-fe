import { Template1Hadiah } from "@/components/Template1Hadiah";

const bank = [
  { bank: "Bank BCA Syariah", atasNama: "John Doe", noRekening: "123456789" },
  { bank: "Bank BCA Syariah", atasNama: "Jane Smith", noRekening: "987654321" },
  { bank: "Bank Mandiri", atasNama: "Andi Wijaya", noRekening: "1122334455" },
  { bank: "Bank Mandiri", atasNama: "Siti Aminah", noRekening: "5566778899" },
  { bank: "Bank BCA Syariah", atasNama: "Rudi Hartono", noRekening: "9988776655" },
  { bank: "Bank BNI", atasNama: "Maria Susanti", noRekening: "4433221100" },
  { bank: "Bank Jago Syariah", atasNama: "Agus Prasetyo", noRekening: "1212121212" },
  { bank: "Bank BSI", atasNama: "Dewi Kartika", noRekening: "3434343434" },
  { bank: "Bank BSI", atasNama: "Bambang Santoso", noRekening: "5656565656" },
  { bank: "Bank Jago Syariah", atasNama: "Nur Aisyah", noRekening: "7878787878" },
];


export default function Page() {
  return (
  <Template1Hadiah
    dataRekening={bank} 
    isAlamat={true} 
    penerima="Keluarga Handoko"
    alamat="Jl. Sosiologi No.22, Cigadung, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40191"
  />
  )
}
