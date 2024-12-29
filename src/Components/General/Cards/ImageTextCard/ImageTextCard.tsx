import useWindowSize from "../../../../hooks/ScreenSize";

interface IImageTextCard {
  title: string;
  content: string;
  imageUrl: string;
  altImg: string;
  imageLeft: boolean;
}

function ImageTextCard(props: IImageTextCard) {
  const { title, content, imageUrl, imageLeft, altImg } = props;
  const windowsSize = useWindowSize();

  // width:"max-content"
  return (
    <div className="container " style={{maxWidth:windowsSize.width > 1100 ?"1100px":"max-content"}}>
      <div className="row justify-content-center">
        {/* Card 1 */}
        <div className="col-12 d-flex justify-content-center">
          <div
            className={`col-12  gap-1  d-flex flex-column flex-md-row justify-content-center 
          ${imageLeft ? "flex-md-row-reverse" : ""}`}
          >
            <div
              className={`col-12 col-md-6  d-flex justify-content-left 
              ${imageLeft ? "flex-md-row-reverse" : ""}
         `} 
            >
              <img
                src={imageUrl}
                className="img-fluid rounded"
                alt={altImg}
                loading="lazy"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="col-12 col-md-6 mt-3 mt-md-0 d-flex justify-content-center flex-column"
              style={{
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <h2 className="card-title">{title}</h2>
              <p className="card-text mt-2">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageTextCard;
