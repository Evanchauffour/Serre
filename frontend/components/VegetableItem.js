import Image from 'next/image'

export default function VegetableItem({image, color, functionOpenModal, id}) {
  return (
    <>
    <div className='itemVegetable' id={id} onClick={functionOpenModal} style={{ background: `${color}` }}>
     <Image src={image} alt="carrot" width={100} height={100}/>
    </div>
    </>
  );
}
