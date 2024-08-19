import { title } from "process";
import { Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";
import { Children } from "react";

interface IGenericCard {
  title: string;
  children: React.ReactNode;
  btnText?: string;
  handleEvent?: () => void;
}

function GenericCard({
  title,
  children,
  btnText = "Editar",
  handleEvent,
}: IGenericCard) {
  return (
    <div className="container d-flex justify-content-center align-items-center p-5 flex-column">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">ID: {numeroDocumento}</Card.Subtitle> */}
          <hr />
          {children}

          {handleEvent && (
            <>
              {" "}
              <hr />
              <Card.Text>
                <OneButton text={btnText} handleSubmit={handleEvent} />
              </Card.Text>{" "}
            </>
          )}
        </Card.Body>
      </Card>
      {/* <Button variant="primary" onClick={handleEvent}>Editar</Button> */}
    </div>
  );
}

export default GenericCard;
