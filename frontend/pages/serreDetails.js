import VegetableItem from "@/components/VegetableItem"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import MicroModal from 'micromodal';  // es6 module
import carrot from '@/assets/img/carrot.svg';
import radish from '@/assets/img/radish.svg';
import onion from '@/assets/img/onion.svg';
import close from '@/assets/img/close.svg';
import parsley from '@/assets/img/parsley.svg';
import humidity from '@/assets/img/humidity.svg';
import Loader from "@/components/loader";
import ButtonToogle from "@/components/buttonToogle";
import watering from '@/assets/img/watering.svg'
import { socket } from '../socket';

const dataVegetable = [
  {
    "name": "Carotte",
    "image": carrot,
    "color": "rgb(251, 126, 81)"
  },
  {
    "name": "Radis",
    "image": radish,
    "color": "rgb(174, 101, 174)"
  },
  {
    "name": "Oignon",
    "image": onion,
    "color": "#e1a151"
  },
  {
    "name": "Persil",
    "image": parsley,
    "color": "rgb(173, 123, 90)"
  },
]

export default function serreDetails() {

  const [modeManuel, setModeManuel] = useState(false);

  const titleModal = useRef(null);

  const [data, setData] = useState(''); 
  const [dataFilter, setDataFilter] = useState(null); 
  const [itemHumidite, setItemHumidite] = useState(null); 

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    MicroModal.init();
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('data');
      socket.on('data', (data) => {
        setData(data);
      });
    } 
  
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Vous êtes déconnecté');
    });
  }, [isConnected, socket])

  const openItemModal = (e) => {
    titleModal.current.innerHTML = dataVegetable[e.target.id].name;
    setItemHumidite(data[parseInt(e.target.id, 10) + 2]);
    MicroModal.show('modal-1');
  }

  const handleActivePompe = () => {
    setOpendoor(prevOpendoor => !prevOpendoor);
    socket.emit('publishPompe1', !opendoor);
  }  

  return (
  <>
  <div className="containerSerreDetails">
    <div className="serre">
    {dataVegetable.map((vegetable, index) => (
      <VegetableItem
        key={vegetable.name}
        name={vegetable.name}
        image={vegetable.image}
        color={vegetable.color}
        functionOpenModal={openItemModal}
        id={index}
      />
    ))}
    </div>
  </div>
<div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
  <div className="modal__overlay" data-micromodal-close>
    <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
      <header className="modal__header">
        <h2 className="modal__title" id="modal-1-title" ref={titleModal}></h2>
        <button className="modal__close" aria-label="Close modal" data-micromodal-close><Image src={close} alt="buttonCloseModal"/></button>
      </header>
      <div className='containerContentModal'>
        <div className="item">
          <div className='header'>
              <Image src={humidity} width={30} height={30} alt="icon widget"/>
              <h3>Humidite</h3>
          </div>
          <div>{data !== '' ? `${itemHumidite} %` : <Loader />}</div>
        </div>
        <div className="item">
          <div className='header'>
              <Image src={watering} width={30} height={30} alt="icon widget"/>
              <h3>Arrosage</h3>
          </div>
          <ButtonToogle onChange={handleActivePompe}/>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}
