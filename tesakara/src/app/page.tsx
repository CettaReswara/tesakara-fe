import Template1View from "@/components/Template1View";
import NoCopy from "./nocopy";

export default function Home() {
  const bride = "Tesa".trim();
  const groom = "Kara".trim();
  const invitee = "Muhammad dan Pasangan".trim();
  const date = "21-09-2025";

  const bank = [
    { bank: "Bank Jago Syariah", atasNama: "John Doe", noRekening: "123456789" },
    { bank: "Bank BSI", atasNama: "Jane Smith", noRekening: "987654321" },
  ];

  const tempatAkad = {
    namatempat: "Masjid Al-Ukhuwwah",
    alamat:
      "Jl. Wastukencana No.27, Babakan Ciamis, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40117",
    link: "https://maps.app.goo.gl/5iZJUTi2iPXJ1wVT8",
    mulai: "08.00",
    selesai: "09.00",
  };

  const tempatWalimah = {
    namatempat: "Intercontinental Dago Pakar",
    alamat:
      "Jalan Resor Dago Pakar Raya 2B Resor Dago Pakar, Mekarsaluyu, Kec. Cimenyan, Kota Bandung, Jawa Barat 40198",
    link: "https://maps.app.goo.gl/qpbCVwvsjoj3FbTg8",
    mulai: "13.00",
    selesai: "15.00",
  };

  const live = {
    link: "https://www.youtube.com/live/e85tJVzKwDU?si=aNFciZUgg0SqKhZB",
  };

  const alamatNo = {
    isAlamat: false,
    penerima: "",
    alamat: "",
  };

  const detaildata = {
    fullbride: "Tesa Azzahra, S.Pd.",
    fullgroom: "dr. Muhammad Kara Haritsah, Sp.PD.",
    // fbride: "Fulan",
    // mbride: "Fulanah",
    // fgroom: "Fulan",
    // mgroom: "Fulanah",
    fbride: "Dr. Muhammad Fulan Ali",
    mbride: "Fulanah Safira Azzahra",
    fgroom: "Fulan Ramadhan, S.Pd., M.Pd.",
    mgroom: "dr. Fulanah Raihanah, Sp.KK.",
    brillust: "https://lh3.googleusercontent.com/d/1K22HWbR2mY5TLISQYVsjMvwNifNUG24D",
    grillust: "https://lh3.googleusercontent.com/d/1IMFbAWc3nNbnaDup7OTcpU6PLzaftaHv",
    akad: tempatAkad,
    walimah: tempatWalimah,
    live,
    maxhadir: 5,
    alamat: alamatNo,
    pfbride: "Fulan",
    pmbride: "Fulanah",
    pfgroom: "Fulan",
    pmgroom: "Fulanah",
  };

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
        />
      </div>
    </NoCopy>
  );
}
