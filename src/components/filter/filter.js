import { Offcanvas, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import { MarketContext } from "../../context";

export default function Filter() {

  const [minMount, setMinMount] = useState(0);
  const [maxMount, setMaxMount] = useState(0);
  let { nfts, setNfts, initNfts } = useContext(MarketContext);

  const filter = function () {

    console.log(minMount);

    let newNfts = initNfts.filter(function (value) {
      
      return value.price >= minMount && value.price <= maxMount;
    
    });

    if (minMount === NaN || minMount === [] || maxMount === 0 || maxMount === []) {
      newNfts = initNfts;
    }

    setNfts(newNfts);

  };

  return (
    <div className="filter-container">
      <Form>
        <Row>
          <Col>
            <Form.Control 
              className="mounts-filter" 
              onChange={(e) => setMinMount(parseFloat(e.target.value))} 
              placeholder="Min. mount" />
          </Col>
          <Col>
            <Form.Control 
              className="mounts-filter" 
              onChange={(e) => setMaxMount(parseFloat(e.target.value))} 
              placeholder="Max. mount" />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <div className="d-grid gap-2">
                <Button className="filter-button" onClick={ filter } variant="primary" size="sm">
                    <strong>Filter</strong>
                </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
