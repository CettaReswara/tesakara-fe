import React, { useCallback, useState } from 'react';
import Image from "next/image";
import styles from './Template1RSVP.module.css';

interface RSVPProps {
  maxValue: number;
  name: string;
}

export function Template1RSVP({ maxValue, name }: RSVPProps) {
    const [submitted, setSubmitted] = useState(false);

  	// State for handling form input
  	const [formData, setFormData] = useState({
        nama: name || '',
    	kehadiran: '',
    	jumlahTamu: '',
    	ucapan: ''
  	});

  	// Handle input change for form fields
  	const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    	const { name, value } = e.target;
    	if (name === 'jumlahTamu') {
        // Automatically set the jumlahTamu to maxValue if the value exceeds maxValue
        const updatedValue = Number(value) > maxValue ? maxValue : value;
        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
        } else {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        }
  	};

    const [submittedData, setSubmittedData] = useState({
        nama: name || '',
        kehadiran: '',
        jumlahTamu: '',
        ucapan: ''
    });

    // Handle form submission
    const onButtonContainerClick = useCallback(() => {
        setSubmitted(true);
        setSubmittedData(formData); // Update submittedData only when submit button is clicked
        console.log(submittedData); // Log the form data or send to the server

        // send submitted data to server
    }, [formData]);

  	return (
    		<div className={styles.ucapan}>
      			<div className={`${styles.bg} relative isolate h-full w-[470px] flex flex-col items-center justify-center`}>
      			<Image className={styles.bgPicIcon} fill alt="" src="/svg/template1paper.png" />
      			<div className={styles.header}>
        				<i className={styles.wishes}>Wishes</i>
        				<div className={styles.sub}>
          					<div className={styles.konfirmasi}>
            						<div className={styles.onfirmasi}>onfirmasi</div>
            						<div className={styles.k}>K</div>
          					</div>
          					<div className={styles.div}>{`&`}</div>
          					<div className={styles.doa}>
            						<div className={styles.oa}>oa</div>
            						<div className={styles.k}>D</div>
          					</div>
        				</div>
      			</div>

                {/* FORM */}
      			<form className={styles.formUser}>
        				<b className={styles.formTitle}>Nama</b>
        				<input 
          					type="text" 
          					name="nama" 
          					value={formData.nama} 
          					onChange={handleInputChange} 
          					className={`${styles.form} py-2 px-3 focus:outline-none `}
          					placeholder="Tulis nama Anda" 
                            readOnly
        				/>
      				</form>

                    <form className={`${styles.formUser1} inline-block relative w-64`}>
                        <label className={styles.formTitle1}>Konfirmasi Kehadiran</label>
                        <select 
                            name="kehadiran"
                            value={formData.kehadiran}
                            onChange={handleInputChange}
                            className={`${styles.form} block appearance-none w-full px-4 pt-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                        >
                            <option selected>Pilih status kehadiran</option>
          					<option value="hadir">Hadir</option>
          					<option value="tidak_hadir">Tidak Hadir</option>
                        </select>
                        <div className="pt-5 tpointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-full w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </form>

      				<form className={styles.formUser2}>
        				<b className={styles.formTitle1}>Jumlah Tamu</b>
        				<input 
          					type="number" 
          					name="jumlahTamu" 
          					value={formData.jumlahTamu} 
          					onChange={handleInputChange} 
          					className={`${styles.form} py-2 px-3 focus:outline-none `}
          					placeholder={`Jumlah pengunjung (maksimal ${maxValue})`}
                            min="0"
                            max={maxValue}
        				/>
      				</form>

      				<form className={styles.formUser3}>
        				<b className={styles.formTitle}>Ucapan</b>
        				<textarea 
          					name="ucapan" 
          					value={formData.ucapan} 
          					onChange={handleInputChange} 
          					className={`${styles.form3} py-2 px-3 pt-2 focus:outline-none `}
          					placeholder="Tuliskan pesan dan doa Anda untuk mempelai" 
        				/>
      				</form>

                {/* KIRIM */}
                
                <div className={styles.button} onClick={onButtonContainerClick}>
        				<div className={styles.buttonBg} />
        				<div className={styles.buttonText}>Kirim</div>
      			</div>

                {/* UCAPAN */}
                {!submitted ? (
      			<div className={styles.floatingMessage}>
                    <div className={styles.formMask}>
        				<div className={styles.form4} />
        				<div className={styles.form5} />
        				<div className={styles.formTitle4}>
          					<span>{`Ucapan dari `}</span>
          					<b>Fulanah</b>
        				</div>
        				<div className={styles.formTitle5}>Kirim ucapanmu untuk mempelai!</div>
        				<div className={styles.floatingMessageChild} />
        				<b className={styles.formTitle6}>Konfirmasi!</b>
                    </div>
      			</div>
                ):(
                    <div className={styles.floatingMessage}>
                        <div className={styles.formMask}>
                        <div className={styles.form4} />
                        <div className={styles.form5} />
                        <div className={styles.formTitle4}>
                            <span>{`Ucapan dari `}</span>
                            <b>{submittedData.nama}</b>
                        </div>
                        <div className={styles.formTitle5}>{submittedData.ucapan}</div>
                        <div 
                            className={styles.floatingMessageChild} 
                            style={{
                                backgroundColor:
                                submittedData.kehadiran === "hadir"
                                    ? "#D9D4B1" 
                                    : submittedData.kehadiran === "tidak_hadir"
                                    ? "#D9B9B1"
                                    : "#c4c3c3",
                            }}
                        />
                        <div className={styles.formTitle6}>
                            {submittedData.kehadiran === "hadir"
                            ? "Hadir"
                            : submittedData.kehadiran === "tidak_hadir"
                            ? "Tidak Hadir"
                            : ""}
                        </div>
                        </div>
                    </div>
                )
                }
                </div>
    		</div>
    );
};