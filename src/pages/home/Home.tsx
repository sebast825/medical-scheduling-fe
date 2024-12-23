import ImageTextCard from "../../Components/General/Cards/ImageTextCard/ImageTextCard";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import useRedirects from "../../hooks/useRedicrects";
import {
  habitosSaludablesCard,
  pevenciónMedicaCard,
  saludGeneralCard,
  saludMentalCard,
} from "../../constants/imageContentCards";
function Home() {
  const { redirectToLogin, redirectToNuestrosMedicos } = useRedirects();

  return (
    <div>
      <Opening title="Clinica Horizonte" smallOpening={false} />

      <TwoButtonComponent
        textButton1="Ingresar"
        textButton2="Nuestros Medicos"
        onClickButton1={redirectToLogin}
        onClickButton2={redirectToNuestrosMedicos}
      />
      <div className="d-flex gap-4 gap-md-3 flex-column">

      
      <ImageTextCard
        title={saludGeneralCard.title}
        content={saludGeneralCard.content}
        imageUrl={saludGeneralCard.imageUrl}
        altImg={saludGeneralCard.altImg}
        imageLeft={false}
      />
      <ImageTextCard
        title={saludMentalCard.title}
        content={saludMentalCard.content}
        imageUrl={saludMentalCard.imageUrl}
        altImg={saludMentalCard.altImg}
        imageLeft={false}
      />
      <ImageTextCard
        title={pevenciónMedicaCard.title}
        content={pevenciónMedicaCard.content}
        imageUrl={pevenciónMedicaCard.imageUrl}
        altImg={pevenciónMedicaCard.altImg}
        imageLeft={false}
      />
      <ImageTextCard
        title={habitosSaludablesCard.title}
        content={habitosSaludablesCard.content}
        imageUrl={habitosSaludablesCard.imageUrl}
        altImg={habitosSaludablesCard.altImg}
        imageLeft={false}
      />
      </div>
    </div>
  );
}

export default Home;
