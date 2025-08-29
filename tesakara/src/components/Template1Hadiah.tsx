"use client";
import { useCallback } from 'react';
import Image from 'next/image';
import styles from './Template1Hadiah.module.css';
import CopyButton from './ui/copybutton';
import BankCarousel from './ui/bankcarousel';

interface dataRekening {
  bank: string;       
  atasNama: string;   
  noRekening: string;
}

interface HadiahProps {
  dataRekening: dataRekening[];
  isAlamat: boolean;
  penerima: string;
  alamat: string;
}

export function Template1Hadiah({ dataRekening, isAlamat, penerima, alamat }: HadiahProps) {
    return (
        <div className={styles.kado}>
            {/* background */}
            <div className="bg-scroll z-0" aria-hidden="true">
                <Image className={styles.bgPicIcon} fill alt="" src="/svg/template1paper.png" priority />
            </div>

            <div className="wrapper">
            {/* header */}
            <div className={styles.header}>
                <i className={styles.wedding}>Wedding</i>
                <div className={styles.gift}>Gift</div>
                <Image className={styles.asetIcon} width={249} height={312} sizes="100vw" alt="" src="/svg/template1border.png" />
            </div>

            {/* subheader */}
            <div className={styles.subContainer}>
                <p className={styles.sub}>Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i berkeinginan memberikan tanda kasih untuk kedua mempelai, dapat disalurkan melalui: </p>
            </div>
            </div>
            
            {/* alamat */}
            {isAlamat && (
                <div className={`${styles.wrapperAlamat} z-10`}>
                    <div className={styles.pengirimanKado}>
                        <div className={styles.judulpengirimanKado}>
                            <b>Pengiriman Kado</b>
                        </div>

                        <div className={styles.rumahPenerima}>
                            <b>Rumah {penerima}</b>
                        </div>
                        
                        <div className={styles.alamat}>
                            <p>{alamat}</p>
                        </div>

                        <div className={styles.buttonAlamat}>
                            <CopyButton
                                text={[penerima, alamat].join(", ")}
                                onCopied={() => alert("Alamat berhasil disalin!")}
                            />
                        </div>
                        
                    </div>
                    <div className={styles.atau}>atau</div>
                </div>
            )}

            {/* bank */}

            <div className={`${
                    !isAlamat ? styles.noAlamatShift : ""
                }`}
                style={{ padding: 16 }}>
                <BankCarousel
                    title="Daftar Rekening"
                    items={dataRekening.map((b, i) => ({
                    id: i,               
                    bank: b.bank,      
                    norek: b.noRekening, 
                    pemilik: b.atasNama,
                    }))}
                    copyJoiner="\n"
                />
            </div>

            {/* terimakasih */}

            <div
                className={`${styles.terimaKasih} z-10`}
            >Terima kasih</div>
            <div className={styles.jazaakumullahuKhayran}>Jazaakumullahu Khayran</div> 
            <div className='h-20'/>
        </div>
    );
}
