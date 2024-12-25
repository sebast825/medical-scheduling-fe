import "./LineTitle.scss";

interface ILineTitle {
  title?: string;
}
function LineTitle(props: ILineTitle) {
  const { title } = props;
  return (
    <div className="d-flex  align-content-center justify-content-center ">
      <h2 className={`text-center border-bottom line ${title != undefined ? "pb-2 m-5" : ""}`}>{title}</h2>
    </div>
  );
}

export default LineTitle;
