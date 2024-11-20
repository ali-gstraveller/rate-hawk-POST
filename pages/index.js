import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import axios from 'axios';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

const [inventory, setInventory] = useState('all');
  const [language, setLanguage] = useState('en');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchHotelInfo = async () => {
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post('/api/hotel-info', { inventory, language });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong');
    }
  };

  console.log("response=>",response)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Fetch Hotel Info</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Inventory:
          <input
            type="text"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Language:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <button onClick={fetchHotelInfo} style={{ padding: '10px 20px' }}>
        Fetch Info
      </button>

      <div style={{ marginTop: '20px' }}>
        
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          
          {/* {response && (
          <pre style={{ background: '#f4f4f4', padding: '10px' }}>
            {JSON.stringify(response, null, 2)}
          </pre> 
        ) 
         }   */}

         {response && 

            <div>

                  <h1>  {response.data.last_update}     </h1>
                 <a href={response.data.url}  > {response.data.url}       </a>

             </div>
         }

        
</div>
</div>
  );
}
