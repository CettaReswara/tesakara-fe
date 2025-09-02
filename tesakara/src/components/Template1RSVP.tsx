import React, { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import styles from './Template1RSVP.module.css';
import { RevealGroup } from "./reveal/reveal";
import { AnimatePresence, motion, Variants } from "framer-motion";

const data = [
  { sender: "Fulanah", text: "Selamat yaa, barakallahu laka wa baraka ‘alaikuma wa jama’a bayna kumaa fii khayr. Semoga senantiasa diberikan sakinah, mawaddah, wa rahmah. Dari sahabat kamu.", status: "Hadir" },
  { sender: "Siti", text: "Semoga Allah memberikan berkah yang melimpah pada pernikahan kalian. Selamat ya!", status: "Hadir" },
  { sender: "Ahmad", text: "Barakallahu lakuma wa jama’a baynakuma fii khayr. Semoga hidup kalian selalu bahagia.", status: "Tidak Hadir" },
  { sender: "Ali", text: "Selamat menempuh hidup baru! Semoga kalian berdua selalu dalam lindungan Allah dan selalu diberkahi.", status: "Hadir" },
  { sender: "Nisa", text: "Barakallah fii umrikuma. Semoga setiap langkah kalian dipenuhi kebahagiaan dan kebaikan.", status: "Tidak Hadir" },
  { sender: "Rina", text: "Selamat yaa, semoga Allah memberi kebahagiaan dunia dan akhirat pada kalian berdua. Sakinah mawadah warahmah!", status: "Hadir" },
  { sender: "Zahra", text: "Minal aidin wal faidzin. Semoga pernikahan kalian menjadi sakinah dan penuh berkah.", status: "Hadir" },
  { sender: "Yusuf", text: "Selamat atas pernikahannya, semoga kalian senantiasa dalam keberkahan Allah.", status: "Hadir" },
  { sender: "Lina", text: "Barakallahu lakuma wa baraka 'alaikum wa jama'a baynakuma fii khayr. Semoga selalu diberikan kebahagiaan bersama.", status: "Hadir" },
  { sender: "Tariq", text: "Selamat ya, semoga menjadi pasangan yang penuh kasih sayang dan selalu diberikan keberkahan.", status: "Tidak Hadir" },
  { sender: "Fatimah", text: "Barakallahu lakuma wa baraka 'alaikum. Semoga Allah selalu menjaga kebahagiaan kalian.", status: "Hadir" },
  { sender: "Salim", text: "Selamat atas pernikahannya! Semoga cinta kalian selalu tumbuh dan berkembang.", status: "Tidak Hadir" },
  { sender: "Amina", text: "Selamat menempuh hidup baru! Semoga kalian selalu diberikan rahmat dan keberkahan oleh Allah.", status: "Hadir" },
  { sender: "Zainab", text: "Barakallah fi umrikuma. Semoga hidup bersama selalu penuh kebahagiaan dan berkah.", status: "Tidak Hadir" },
  { sender: "Maya", text: "Semoga Allah senantiasa memberikan petunjuk dan keberkahan dalam hidup kalian berdua. Barakallah!", status: "Hadir" },
  { sender: "Jamilah", text: "Selamat yaa, semoga pernikahan kalian penuh dengan kedamaian dan kebahagiaan abadi.", status: "Hadir" },
  { sender: "Fahad", text: "Semoga Allah memberkati kalian berdua dan memberikan kebahagiaan yang tak terhingga.", status: "Tidak Hadir" },
  { sender: "Rami", text: "Selamat menempuh hidup baru! Semoga kalian selalu saling mendukung dan bahagia bersama.", status: "Hadir" },
  { sender: "Mira", text: "Barakallahu lakuma, semoga Allah memberikan kalian kesabaran dan kebahagiaan dalam hidup bersama.", status: "Hadir" },
  { sender: "Dina", text: "Selamat atas pernikahan kalian. Semoga pernikahan ini selalu diberkahi dan penuh cinta.", status: "Tidak Hadir" },
  { sender: "Ibrahim", text: "Selamat ya, semoga cinta kalian tumbuh semakin kuat setiap harinya. Barakallah fi umrikuma!", status: "Hadir" }
];

const cardVariants: Variants = {
  enter:  { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -8 },
};

interface RSVPProps {
  maxValue: number;
  name: string;
}

export function Template1RSVP({ maxValue, name }: RSVPProps) {
  const [submitted, setSubmitted] = useState(false);

  type FormState = {
    nama: string;
    kehadiran: string;
    jumlahTamu: string; // string biar enak dikontrol
    ucapan: string;
  };

  const [formData, setFormData] = useState<FormState>({
    nama: name || "",
    kehadiran: "",
    jumlahTamu: "",
    ucapan: "",
  });

  const [submittedData, setSubmittedData] = useState<FormState>({
    nama: name || "",
    kehadiran: "",
    jumlahTamu: "",
    ucapan: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "jumlahTamu") {
      // izinkan kosong saat mengetik; selain itu kunci 0..maxValue
      const next =
        value.trim() === ""
          ? ""
          : String(Math.min(Math.max(Number(value || 0), 0), maxValue));
      setFormData((p) => ({ ...p, jumlahTamu: next }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);
      setSubmittedData(formData);
      console.log("Submitting:", formData);
      // TODO: kirim ke server
    },
    [formData]
  );

  return (
    <div className={styles.selamat}>
      {/* background */}
      <div className="bg-scroll z-0" aria-hidden="true">
        <Image className={styles.bgPicIcon} fill alt="" src="/svg/template1paper.png" priority />
      </div>

      {/* header */}
      <RevealGroup direction="down" amount={0.3} duration={10} stagger={0.12}>
        <div className={`${styles.header} z-10`} style={{ pointerEvents: "auto" }}>
          <i className={styles.wishes}>Wishes</i>
          <div className={styles.sub}>
            <div className={styles.konfirmasi}>
              <div className={styles.k}>K</div>
              <div className={styles.onfirmasi}>onfirmasi</div>
            </div>
            <div className={styles.div}>&</div>
            <div className={styles.doa}>
              <div className={styles.k}>D</div>
              <div className={styles.oa}>oa</div>
            </div>
          </div>
        </div>
      </RevealGroup>

      {/* === SINGLE FORM === */}
      <RevealGroup direction="none" amount={0.3} duration={6} stagger={0.12}>
        <form className="z-10" onSubmit={onSubmit} style={{ pointerEvents: "auto" }}>
          {/* Nama (read-only) */}
          <div className={styles.formUser}>
            <b className={styles.formTitle}>Nama</b>
            <div className={styles.position}>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className={`${styles.form} py-2 px-3 focus:outline-none`}
                placeholder="Tulis nama Anda"
                readOnly
              />
            </div>
          </div>

          {/* Kehadiran */}
          <div className={styles.formUser}>
            <label className={styles.formTitle}>Konfirmasi Kehadiran</label>
            <div className={styles.position} style={{ position: "relative" }}>
              <select
                name="kehadiran"
                value={formData.kehadiran}
                onChange={handleInputChange}
                className={`${styles.form} block appearance-none w-full px-4 pt-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
              >
                <option value="" disabled>
                  Pilih status kehadiran
                </option>
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
              </select>
              {/* caret tidak menghalangi klik */}
              <div className="pointer-events-none absolute inset-y-0 right-3 sm:right-10 md:right-10 lg:right-10 flex items-center px-6 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Jumlah Tamu */}
          <div className={styles.formUser}>
            <b className={styles.formTitle1}>Jumlah Tamu</b>
            <div className={styles.position}>
              <input
                type="number"
                name="jumlahTamu"
                value={formData.jumlahTamu}
                onChange={handleInputChange}
                className={`${styles.form} py-2 px-3 focus:outline-none`}
                placeholder={`Jumlah pengunjung (maksimal ${maxValue})`}
                min={0}
                max={maxValue}
                inputMode="numeric"
                pattern="\d*"
              />
            </div>
          </div>

          {/* Ucapan */}
          <div className={styles.formUser}>
            <b className={styles.formTitle}>Ucapan</b>
            <div className={styles.position}>
              <textarea
                name="ucapan"
                value={formData.ucapan}
                onChange={handleInputChange}
                className={`${styles.formlong} py-2 px-3 pt-2 focus:outline-none`}
                placeholder="Tuliskan pesan dan doa Anda untuk mempelai"
              />
            </div>
          </div>

          {/* Kirim */}
          {/* <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}> */}
          <div className="flex justify-center">
            <button type="submit" className={`${styles.button} z-10`} style={{ pointerEvents: "auto" }}>
              <div className={styles.buttonBg} />
              <div className={styles.buttonText}>Kirim</div>
            </button>
          </div>
          {/* </RevealGroup> */}
        </form>
      </RevealGroup>

      {/* UCAPAN */}
      {!submitted ? (
        <RevealGroup direction="up" amount={0.3} duration={4} stagger={0.12}>
          <div className={styles.container}>
            <div className={styles.floatingMessage}>
              <div className={styles.formMask}>
                <div className={styles.design1} />
                <div className={styles.designa1} />
                <div className={styles.Title1}>
                  <span>Ucapan dari </span>
                  <b>Fulanah</b>
                </div>
                <div className={styles.Caption1}>Kirim ucapanmu untuk mempelai!</div>
                <div className={styles.designChild1} />
                <b className={styles.status1}>Konfirmasi!</b>
              </div>
            </div>
          </div>
        </RevealGroup>
      ) : (
        <RevealGroup direction="up" amount={0.3} duration={4} stagger={0.12}>
          <div className={styles.container}>
            <div className={styles.floatingMessage}>
              <div className={styles.formMask}>
                <div className={styles.design1} />
                <div className={styles.designa1} />
                <div className={styles.Title1}>
                  <span>Ucapan dari </span>
                  <b>{submittedData.nama}</b>
                </div>
                <div className={styles.Caption1}>{submittedData.ucapan}</div>
                <div
                  className={styles.designChild1}
                  style={{
                    backgroundColor:
                      submittedData.kehadiran === "hadir"
                        ? "#D9D4B1"
                        : submittedData.kehadiran === "tidak_hadir"
                        ? "#D9B9B1"
                        : "#c4c3c3",
                  }}
                />
                <div className={styles.status1}>
                  {submittedData.kehadiran === "hadir"
                    ? "Hadir"
                    : submittedData.kehadiran === "tidak_hadir"
                    ? "Tidak Hadir"
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </RevealGroup>
      )}

      <div className="h-20" />
    </div>
  );
}


export function Template1Selamat() {
    const [currentMessage1, setCurrentMessage1] = useState(0);
    const [currentMessage2, setCurrentMessage2] = useState(1);
    const [currentMessage3, setCurrentMessage3] = useState(2);
    
    useEffect(() => {

    const interval1 = setInterval(() => {
        setCurrentMessage1((prev) => (prev + 3) % data.length);
    }, 4000); 

    const interval2 = setTimeout(() => {
        setInterval(() => {
        setCurrentMessage2((prev) => (prev + 3) % data.length);
        }, 4000);
    },); 

    const interval3 = setTimeout(() => {
        setInterval(() => {
        setCurrentMessage3((prev) => (prev + 3) % data.length);
        }, 4000); 
    },); 

    return () => {
        clearInterval(interval1);
        clearTimeout(interval2);
        clearTimeout(interval3);
    };
    }, []);

    return (
        <div className={styles.selamat}>
            {/* background */}
            <div className="bg-scroll z-0" aria-hidden="true">
                <Image className={styles.bgPicIcon} fill alt="" src="/svg/template1paper.png" priority />
            </div>

            {/* header */}
            <RevealGroup direction="zoom" amount={0.3} duration={6} stagger={0.12}>
            <div className={`${styles.dheader} z-10`}>
                <i className={styles.dbarakallahu}>Barakallahu</i>
                <div className={styles.dlakumaa}>Lakumaa!</div>
            </div>
            </RevealGroup>

            {/* floatingMessage1 */}
            <div className={styles.container1}>
                <div className={`${styles.floatingMessage1} z-10`}>
                    <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentMessage1}
                        variants={iosPopVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{
                        position: "absolute",
                        inset: 0,
                        // pop feels like it comes from the top edge of the card
                        transformOrigin: "50% 10%",
                        // optional: ensure GPU acceleration
                        willChange: "transform, opacity, filter",
                        }}
                    >
                    <div className={styles.formMask}>
                    <div className={styles.design1} />
                    <div className={styles.designa1} />
                    <div className={styles.Title1}>
                        <span>{`Ucapan dari `}</span>
                        <b>{data[currentMessage1].sender}</b>
                    </div>
                    <div className={styles.Caption1}>
                        {data[currentMessage1].text}
                    </div>
                    <div 
                        className={styles.designChild1} 
                        style={{
                                backgroundColor:
                                data[currentMessage1].status === "Hadir"
                                ? "#D9D4B1" 
                                : data[currentMessage1].status === "Tidak Hadir"
                                ? "#D9B9B1"
                                : "#c4c3c3",
                                }}
                    />
                    <b className={styles.status1}>{data[currentMessage1].status}</b>
                    </div>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* floatingMessage2 */}
            <div className={styles.container2}>
                <div className={styles.floatingMessage2}>
                    <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentMessage1}
                        variants={iosPopVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{
                        position: "absolute",
                        inset: 0,
                        // pop feels like it comes from the top edge of the card
                        transformOrigin: "50% 10%",
                        // optional: ensure GPU acceleration
                        willChange: "transform, opacity, filter",
                        }}
                    >
                    <div className={styles.formMask}>
                    <div className={styles.design1} />
                    <div className={styles.designa1} />
                    <div className={styles.Title1}>
                        <span>{`Ucapan dari `}</span>
                        <b>{data[currentMessage2].sender}</b>
                    </div>
                    <div className={styles.Caption1}>
                        {data[currentMessage2].text}
                    </div>
                    <div 
                        className={styles.designChild1} 
                        style={{
                                backgroundColor:
                                data[currentMessage2].status === "Hadir"
                                ? "#D9D4B1" 
                                : data[currentMessage2].status === "Tidak Hadir"
                                ? "#D9B9B1"
                                : "#c4c3c3",
                                }}
                    />
                    <b className={styles.status1}>{data[currentMessage2].status}</b>
                    </div>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* floatingMessage3 */}
            <div className={styles.container3}>
                <div className={styles.floatingMessage3} >
                    <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentMessage1}
                        variants={iosPopVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{
                        position: "absolute",
                        inset: 0,
                        // pop feels like it comes from the top edge of the card
                        transformOrigin: "50% 10%",
                        // optional: ensure GPU acceleration
                        willChange: "transform, opacity, filter",
                        }}
                    >
                    <div className={styles.formMask}>
                    <div className={styles.design1} />
                    <div className={styles.designa1} />
                    <div className={styles.Title1}>
                        <span>{`Ucapan dari `}</span>
                        <b>{data[currentMessage3].sender}</b>
                    </div>
                    <div className={styles.Caption1}>
                        {data[currentMessage3].text}
                    </div>
                    <div 
                        className={styles.designChild1} 
                        style={{
                                backgroundColor:
                                data[currentMessage3].status === "Hadir"
                                ? "#D9D4B1" 
                                : data[currentMessage3].status === "Tidak Hadir"
                                ? "#D9B9B1"
                                : "#c4c3c3",
                                }}
                    />
                    <b className={styles.status1}>{data[currentMessage3].status}</b>
                    </div>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className='h-20'/>

        </div>
    );
};

const iosPopVariants: Variants = {
  enter: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    filter: "blur(2px)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
    transition: {
      // snappy spring with a tiny bounce
      y: { type: "spring", stiffness: 700, damping: 32, mass: 0.9 },
      scale: { type: "spring", stiffness: 700, damping: 34, mass: 0.9 },
      opacity: { duration: 0.16 },
      filter: { duration: 0.16 },
      boxShadow: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    filter: "blur(2px)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: { duration: 0.18 },
  },
};
