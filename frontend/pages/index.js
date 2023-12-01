import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import serre from '@/assets/img/aquarium.png';
import Widget from "@/components/widget";
import thermometer from '@/assets/img/thermometer.svg';
import windImg from '@/assets/img/wind.svg';
import opendoor from '@/assets/img/opendoor.svg';
import humidity from '@/assets/img/humidity.svg';
import raindrop from '@/assets/img/raindrop.svg';
import { socket } from '../socket';
import ButtonToogle from "@/components/buttonToogle";
import Loader from "@/components/loader";
import Lottie from "lottie-react";
import tap from "@/assets/aniamtion/tap.json";


export default function Home() {

  const changeMode = useRef(null);
  const [modeManuel, setModeManuel] = useState(false);
  const [data, setData] = useState(''); 
  const [dataFilter, setDataFilter] = useState(null); 

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('data');
      socket.on('data', (data) => {
        setData(data);
  
        // Filtrer les données ici
        const filteredData = data.split('_');
        setDataFilter(filteredData);
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
      <div className="content">
        <div className="left">
          <div className="containerInformations">
            <h2>Informations globales</h2>
            <div className="ContainerWidgetInformations">
              <Widget name="Température" image={thermometer}>
              <p>{data !== '' ? `${dataFilter[1]}°C` : <Loader />}
              </p>
              </Widget>
              <Widget name="Vitesse du vent" image={windImg}>
              <p>{data !== '' ? `${dataFilter[0]} Km/h` : <Loader />}</p>
              </Widget>
              <Widget name="Humidité" image={humidity}>
              <p>{data !== '' ? `${dataFilter[2]} %` : <Loader />}</p>
              </Widget>
              <Widget name="réservoir d'eau" image={raindrop}>
              <p>{data !== '' ? `${dataFilter[1]}°C` : <Loader />}</p>
              </Widget>
            </div>
          </div>
          {modeManuel && (
          <div className="serreGlobalAction">
            <h2>Actions globales</h2>
            <div className="ContainerWidgetActions">
              <Widget name="Ouverture" image={opendoor}>
                <ButtonToogle/>
              </Widget>
            </div>
          </div>
          )}
        </div>
        <div className="right">
          <Link href="/serreDetails">
              <div className="containerIlluSerre">
                <Lottie animationData={tap} className="tap"/>
                <Image src={serre} alt="serre" className="illuSerre"/>
              </div>
          </Link>
          <div className="changeMode">
            <label className="switch">
              <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
