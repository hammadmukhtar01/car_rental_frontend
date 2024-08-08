import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const EventCalculation = () => {
  const [numOfEvents, setNumOfEvents] = useState("");
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState({});

  const handleNumOfEventsChange = (e) => {
    const numInput = e.target.value;
    const num = numInput === "" ? 0 : parseInt(numInput, 10);

    setNumOfEvents(num);

    setEvents((currentEvents) => {
      if (num < currentEvents.length) {
        return currentEvents.slice(0, num);
      } else {
        return [
          ...currentEvents,
          ...new Array(num - currentEvents.length).fill(null).map(() => ({
            eventName: "",
            totalCost: "",
            participants: [],
            contributions: [],
          })),
        ];
      }
    });
  };

  const handleEventChange = (index, key, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][key] = value;
    setEvents(updatedEvents);
  };

  const addParticipant = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].participants.push({ name: "", paid: "" });
    setEvents(updatedEvents);
  };

  const delParticipant = (eventIndex, participantIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].participants.splice(participantIndex, 1);
    setEvents(updatedEvents);
  };

  const updateParticipant = (eventIndex, participantIndex, key, value) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].participants[participantIndex][key] = value;
    setEvents(updatedEvents);
  };

  const calculateBalances = () => {
    let balances = {};
    events.forEach((event) => {
      const totalCost = parseFloat(event.totalCost);
      event.participants.forEach(({ name, paid }) => {
        if (!balances[name]) balances[name] = 0;
        balances[name] +=
          parseFloat(paid) - (totalCost / event.participants.length).toFixed(2);
      });
    });
    return balances;
  };

  const handleSubmit = () => {
    const balances = calculateBalances();
    setResults(balances);
  };

  return (
    <Container className="pb-5 pt-5">
      <div className="text-center">
        <h3><b>Expense Calculation</b> </h3>
      </div>
   
      <br />
      <Row>
        <Col xl={12}>
          <Form>
            <Form.Group as={Row} controlId="formNumOfEvents" className="col-6">
              <Form.Label column sm={4}>
                Number of Events:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className={`form-control-update-password col-12`}
                  type="number"
                  min={0}
                  value={numOfEvents}
                  onChange={handleNumOfEventsChange}
                  placeholder="Enter number of events"
                />
              </Col>
            </Form.Group>

            <Row>
              {events.map((event, idx) => (
                <div key={idx} className="col-xl-6">
                  <br />
                  <br />
           
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      {`Event ${idx + 1}`}:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        className={`form-control-update-password col-12`}
                        type="text"
                        value={event.eventName}
                        onChange={(e) =>
                          handleEventChange(idx, "eventName", e.target.value)
                        }
                        placeholder="Enter event name"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Total Cost:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        className={`form-control-update-password col-12`}
                        min={0}
                        type="number"
                        value={event.totalCost}
                        onChange={(e) =>
                          handleEventChange(idx, "totalCost", e.target.value)
                        }
                        placeholder="Total cost of event"
                      />
                    </Col>
                  </Form.Group>
                  <br />
                  {event.participants.map((participant, pIdx) => (
                    <Form.Group
                      as={Row}
                      key={pIdx}
                      className="align-items-center justify-content-center pt-2"
                    >
                      <Col sm={1}>
                     
                        {pIdx + 1} .{" "}
                      </Col>
                      <Col sm={5}>
                       

                        <Form.Control
                          className={`form-control-update-password col-12`}
                          type="text"
                          value={participant.name}
                          onChange={(e) =>
                            updateParticipant(idx, pIdx, "name", e.target.value)
                          }
                          placeholder="Participant name"
                        />
                      </Col>
                      <Col sm={4}>
                       
                        <Form.Control
                          className={`form-control-update-password col-12`}
                          type="number"
                          min={0}
                          value={participant.paid}
                          onChange={(e) =>
                            updateParticipant(idx, pIdx, "paid", e.target.value)
                          }
                          placeholder="Amount paid"
                        />
                      </Col>
                      <Col sm={1}>
                       
                        <button
                          className="update-password-button"
                          aria-label="Calculate-expense"
                          onClick={(e) => {
                            e.preventDefault();
                            delParticipant(idx, pIdx);
                          }}
                        >
                          Del
                        </button>
                      </Col>
                    </Form.Group>
                  ))}
                  <br />

                  <Col
                    xl={12}
                    lg={12}
                    md={6}
                    sm={6}
                    xs={12}
                    className="update-password-button-col d-flex justify-content-center"
                  >
                    <button
                      className=" btn btn-success "
                      aria-label="Calculate-expense"
                      onClick={(e) => {
                        e.preventDefault();
                        addParticipant(idx);
                      }}
                    >
                      Add Participant
                    </button>
                  </Col>
                </div>
              ))}
            </Row>
            <br />
            {numOfEvents > 0 && (
              <Col
                xl={12}
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className="text-right update-password-button-col"
              >
                <button
                  className="update-password-button"
                  aria-label="Calculate-expense"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Calculate
                </button>
              </Col>
            )}
          </Form>
        </Col>
      </Row>

      <Row>
        {Object.keys(results).length > 0 && (
          <Col xl={12} className="mt-4">
            <h3>Balance Results:</h3>
            <br />

            <div className="row balance-result-single-row">
              <Col xl={2} className="text-center">
                {" "}
                <h6><b>Name</b></h6>
              </Col>{" "}
              <Col className="text-cente">
                <h6><b>AED</b></h6>{" "}
              </Col>
            </div>

            {Object.entries(results).map(([name, value], index) => (
              <div key={name} className="row balance-result-single-row">
                <Col xl={2}>
                  {" "}
                  <b>{index+1}.</b> {name} owes:
                </Col>{" "}
                <Col> {value.toFixed(2)}</Col>
              </div>
            ))}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EventCalculation;
