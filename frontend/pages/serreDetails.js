import VegetableItem from "@/components/VegetableItem"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import MicroModal from 'micromodal';  // es6 module
import carrot from '@/assets/img/carrot.svg';
import radish from '@/assets/img/radish.svg';
import onion from '@/assets/img/onion.svg';
import chive from '@/assets/img/chive.svg';
import close from '@/assets/img/close.svg';
import parsley from '@/assets/img/parsley.svg';
import fish from '@/assets/img/fish.svg';
import watering from '@/assets/img/watering.svg';
import openPannel from '@/assets/img/opendoor.svg';

const data = [
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
    "name": "Ciboulette",
    "image": chive,
    "color": "rgb(121, 181, 116)"
  },
  {
    "name": "Persil",
    "image": parsley,
    "color": "rgb(173, 123, 90)"
  },
  {
    "name": "Poisson",
    "image": fish,
    "color": "rgb(90, 130, 173)"
  },
]

export default function serreDetails() {

  const [modeManuel, setModeManuel] = useState(false);

  const titleModal = useRef(null);
  const changeMode = useRef(null);

  useEffect(() => {
    MicroModal.init();
  }, []);

  const openGlobalModal = (e) => {
    MicroModal.show('modal-2');
  }

  const openItemModal = (e) => {
    titleModal.current.innerHTML = data[e.target.id].name;
    MicroModal.show('modal-1');
  }

  const handleChangeMode = (e) => {
    setModeManuel(!modeManuel);
  }

  return (
  <>
  <div className="containerSerreDetails">
    <div className="serre">
    {data.map((vegetable, index) => (
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
    </div>
  </div>
</div>

<div className="modal micromodal-slide" id="modal-2" aria-hidden="true">
  <div className="modal__overlay" data-micromodal-close>
    <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
      <header className="modal__header">
        <h2 className="modal__title" id="modal-1-title">Global</h2>
        <button className="modal__close" aria-label="Close modal" data-micromodal-close><Image src={close} alt="buttonCloseModal"/></button>
      </header>
      <div className="changeMode">
          <h2>Mode manuel</h2>
          <label className="switch">
            <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
            <span className="slider round"></span>
          </label>
      </div>
      <div className="infos">
        <h2>Informations:</h2>
          <div className="infos__item">
            <h3>Température</h3>
            <p className="infos__item__value">20°C</p>
          </div>
          <div className="infos__item">
            <h3>Humidité</h3>
            <p className="infos__item__value">50%</p>
          </div>
          <div className="infos__item">
            <h3>vitesse du vent</h3>
            <p className="infos__item__value">120km/h</p>
          </div>
      </div>    
      <div className={modeManuel ? 'settings clickable' : 'settings'}>
      <h2>Paramètres:</h2>
        <div className="settings__item">
          <label className="switch">
            <input type="checkbox"  name="openPannel" id="openPannel"/>
            <span className="slider round"></span>
          </label>
          <div>
            <Image src={openPannel} alt="Ouverture de la serre img" width={30} height={30}/>
            <h3>Ouverture de la serre</h3>
          </div>
        </div>
        <div className="settings__item">
          <label className="switch">
            <input type="checkbox"  name="watering" id="watering"/>
            <span className="slider round"></span>
          </label>
          <div>
            <Image src={watering} alt="watering img" width={30} height={30}/>
            <h3>Activer l'arrosage</h3>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>
</>
  )
}
