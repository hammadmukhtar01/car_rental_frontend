import React from "react";
import { Col, Row } from "react-bootstrap";

const SingleBookingDetails = ({ bookingData }) => {
  const chargeNameMap = {
    Extra1Charges: "Tint",
    Extra2Charges: "Mobile Holder",
    Extra3Charges: "Sunshades",
  };

  const acceptedChargeNames = bookingData.charges
    .filter(
      (charge) =>
        charge.accepted &&
        charge.chargesType.name !== "Rent" &&
        charge.chargesType.name !== "DeliveryCharges"
    )
    .map(
      (charge) =>
        chargeNameMap[charge.chargesType.name] || charge.chargesType.name
    );

  console.log(acceptedChargeNames);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";

    const date = new Date(isoDate);
    const options = {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const calculateNumOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const pickUpTime = start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dropOffTime = end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const [startHour, startMinute, startPeriod] = pickUpTime.split(/[: ]/);
    const [endHour, endMinute, endPeriod] = dropOffTime.split(/[: ]/);

    start.setHours(
      startPeriod === "PM" && startHour !== "12"
        ? parseInt(startHour) + 12
        : startPeriod === "AM" && startHour === "12"
        ? 0
        : parseInt(startHour),
      parseInt(startMinute)
    );

    end.setHours(
      endPeriod === "PM" && endHour !== "12"
        ? parseInt(endHour) + 12
        : endPeriod === "AM" && endHour === "12"
        ? 0
        : parseInt(endHour),
      parseInt(endMinute)
    );

    const timeDifference = end - start;
    const totalHours = timeDifference / (1000 * 60 * 60);
    const totalDays = Math.ceil(totalHours / 24);
    return totalDays;
  };

  const bookingDetails = [
    { labelName: "Pickup Location", bookingValue: bookingData?.location?.name },
    {
      labelName: "Drop off Location",
      bookingValue: bookingData?.closingLocation?.name,
    },
    {
      labelName: "Pickup Date & Time",
      bookingValue: formatDate(bookingData?.startDate),
    },
    {
      labelName: "Drop off Date & Time",
      bookingValue: formatDate(bookingData?.endDate),
    },
    {
      labelName: "Charges / day",
      bookingValue: bookingData?.charges?.[0]?.rate,
    },
    { labelName: "Discount", bookingValue: bookingData?.agreementNo },
    {
      labelName: "No. of Days",
      bookingValue: calculateNumOfDays(
        bookingData?.startDate,
        bookingData?.endDate
      ),
    },
    { labelName: "Total Tax", bookingValue: bookingData?.tax },
  ];

  console.log("Booking data : ", bookingData);
  return (
    <div className="single-booking-details-container bg-white pl-5 pr-5">
      {" "}
      <h5 className="pt-1">
        <p>
          {/* <strong> {bookingData?.agreementNo} Booking Details</strong> */}
        </p>
      </h5>
      <div className="single-booking-details">
        <div className="single-booking-data-heading">
          <Row>
            {bookingDetails.map((data, index) => (
              <Col
                xxl={3}
                lg={3}
                md={4}
                sm={6}
                xs={6}
                key={index}
                className="text-left"
              >
                <span className="booking-details-label">{data?.labelName}</span>
                <p>{data?.bookingValue}</p>
              </Col>
            ))}
            <hr />
          </Row>
          <Row className="text-left">
            <div className="booking-add-ons">
              <span className="booking-details-label">Selected Add-Ons : </span>
              {acceptedChargeNames.length > 0 ? (
                <>
                  {acceptedChargeNames.map((addOns, index) => (
                    <span key={index}>{addOns}, </span>
                  ))}
                </>
              ) : (
                <span className="text-left">No Add-Ons</span>
              )}
            </div>
          </Row>

          <br />
        </div>
      </div>
    </div>
  );
};

export default SingleBookingDetails;
