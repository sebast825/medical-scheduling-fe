interface IImageTextCard {
   title : string,
   content : string,
   imageUrl : string,
   altImg : string
   imageLeft : boolean
}

function ImageTextCard(props : IImageTextCard) {

   const {title,content,imageUrl,imageLeft,altImg} = props;

  return (
    <div className="container ">
      <div className="row justify-content-center">
        {/* Card 1 */}
        <div className="col-12 ">
          <div className=" gap-4 d-flex flex-column flex-md-row justify-content-center">

            <img
              src={imageUrl}
              className="card-img-left img-fluid rounded-start"
              alt={altImg}
              style={{ width: "500px", objectFit: "cover" }}
            />
            <div className=" col-12 col-md-4">
              <h3 className="card-title">{title}</h3>
              <p className="card-text mt-2">
              {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageTextCard;
