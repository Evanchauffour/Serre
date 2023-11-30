import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import io from 'socket.io-client';
import Image from 'next/image';
import serre from '@/assets/img/aquarium.png';
import Widget from "@/components/widget";
import thermometer from '@/assets/img/thermometer.svg';
import { socket } from '../socket';


export default function Home() {

  const changeMode = useRef(null);
  const [modeManuel, setModeManuel] = useState(false);
  const [temperature, setTemperature] = useState(''); 

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('temperature');
      socket.on('temperature', (newTemperature) => {
        setTemperature(newTemperature);
      });
    } 
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Vous êtes déconnecté');
    });
  }, [isConnected, socket])

  const handleChangeMode = (e) => {
    setModeManuel(!modeManuel);
  }


  // console.log(temperature); 

  return (
    <div className="containerHome">
      <h1>L'aquarium</h1>
      <div className="changeMode">
        <label className="switch">
          <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="content">
        <div className="containerInformations">
          <Widget name="Température" image={thermometer}>
          <p>{temperature !== '' ? `${temperature}°C` : 'Chargement...'}</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
        </div>
        <Link href="/serreDetails">
            <Image src={serre} alt="serre" className="illuSerre"/>
        </Link>
        <div className="serreGlobalAction">
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
        </div>
      </div>
    </div>
  )
}
