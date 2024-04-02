import React from "react";
import "./otherPages.css";
import MainNavbar from "../navbar/mainNavbar";
// import { useReload } from "../../PrivateComponents/utils";
// import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";

const TermsConditionsPage = () => {
  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <>
      <div className="navbar-bg-img-container">
        <div className="booking-page-banner-navbar">
          {" "}
          <MainNavbar />
        </div>
      </div>
      <div className="container pt-4 pb-2">
        <div className="styled-label text-center">
          <span>
            <b className="fs-3"> Terms & Conditions</b>
          </span>
          <hr className="middle-hr-tag" />
        </div>
        <br />
        <div className="all-terms-conditions-main-container">
          <div className="terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h1 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h5 className="terms-conditions-headings">PAYMENT</h5>
              <p>
                Rental is calculated on 24hour basis. Rental payments to be paid
                in advance and non-rental payment will be billed separately and
                needs to be settled on receiving the invoices by email. <br />{" "}
                <br /> MILELE has a right to charge an additional amount per
                month, in case payments are not made on due date. <br /> <br />
                The Customer shall pay a fine outstanding debt amounting:
              </p>

              <ul className="list-style-small-alpha mt-3">
                <li>
                  to 20% if the debt is not paid in full between 10thand 20th
                  days after statement of Account/invoices was sent to customers
                  contact specified in the rental agreement
                </li>
                <li>
                  to additional 30% if the debt is not paid in full between 21st
                  and 30th days accordingly and{" "}
                </li>
                <li>
                  to additional 50% if the debt exceeds 30 days accordingly
                  MILELE has the right to proceed legally in case the above
                  terms and conditions are not followed accordingly.
                </li>
              </ul>
            </div>

            <div className="term-conditions-h2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h5 className="terms-conditions-headings">VEHICLE CHECK-OUT & CHECK-IN REPORT</h5>
              <ul className="list-style-small-alpha">
                <li>
                  Vehicle check out & check in report must be verified & signed
                  barHirer.
                </li>
                <li>
                  Dents/ Scratches will be charged depending on severity of the
                  damage.
                </li>
                <li>
                  In case the vehicle is returned with interior stains, marks,
                  pet hair etc, Cleaning will be charged minimum AEO 300 up to
                  AED 1000.
                </li>
                <li>
                  Smoking in the vehicle is prohibited and violation will be
                  charged AED 250.
                </li>
                <li>
                  Torn seats/hole or any damages to the interior of the vehicle
                  shall be charged based on the estimate from supplier with a
                  minimum of AED 700.
                </li>
                <li>
                  Fuel policy is return as received. We will refer to the
                  check-out/in report and charge as per the prevailing price
                  with addition of AED-10 as refuelling charge.
                </li>
                <li>
                  The Lessor will not be held responsible for any loss of
                  goods/items by the hirer.
                </li>
                <li>
                  Charges for lost keys may vary depending on the category of
                  vehicle that is rented.
                </li>
              </ul>
              <em>
                <strong>
                  If the Hirer has lost his/her copy, MILELE Copy will be
                  treated as final.
                </strong>
              </em>
            </div>
          </div>

          <div className="terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h5 className="terms-conditions-headings">INSURANCE</h5>
              <p>
                The HIRER shall pay to MILELE in respect of each and every
                incident resulting in damages to or loss of the Vehicle the
                first AED 1,000/- or any other larger sum specified as the
                excess amount for the Vehicle, or the cost of such damage or
                loss. If the HIRER has agreed to additionally for 'Collision
                Damage Waiver' and pays the additional fees as quoted in
                MILELE's current tariff, MILELE agrees to relieve the Hirer of
                all liability for the sum payable in accordance with this
                condition, provided that if on the happening of any such
                incident the Vehicle is being used, operated or driven otherwise
                than in accordance with the terms of this agreement the HIRER
                shall be liable to pay MILELE the full amount or cost of such
                damage or loss or of any other loss occasioned by or to MILELE
                as a result of such incident. <br />
                <br /> Insurance will be deemed void If the hirer, without
                authorization or consent from MILELE hands over the vehicle to
                any other person or has caused
              </p>
              <h5 className="terms-conditions-headings">TRAFFIC FINES & VOILATIONS</h5>
              MILELE will pay the fines on regular basis to keep the traffic
              file active with the traffic authorities and will not notify the
              Hirer of any fines which may have caused by the Hirer except for
              Any Block/Red fines with OR without black point issued by the
              traffic authorities, which should be resolved by the Hirer within
              24 hours, to avoid lessors traffic file being blocked.{" "}
              <span className="colored-bold-line">
                <strong>NOTE:</strong> ANY BLACK POINTS PANALTY WHATSO EVER WILL
                BE PAID BY CUSTOMER DIRECTLY.
              </span>{" "}
              <br />
              <br />
              Fines paid by MILELE will be invoiced to the Hirer including a
              service charge of AED-50 per traffic fine.
              <br />
              <br />
              For any Impounding fine, Hirer will be liable to pay MILELE the
              impounding charges plus loss of rental charges for period that
              vehicle is impounded. <br />
              <br /> HIRER will remain responsible for payments of Fines and
              Penalties received from the Traffic Depts. up to 12 months from
              the date of the offence.
            </div>

            <div className="term-conditions-h4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
              <h5 className="terms-conditions-headings">VEHICLE MISUSE</h5>
              <ul className="list-style-capital-alpha">
                <li>
                  {" "}
                  The Vehicle will always be driven and used with care and due
                  consideration to other road users.
                </li>
                <li>The vehicle will not be used:</li>
                <p></p>

                <ul className="list-style-lower-roman">
                  <li>
                    in any manner which would or might render the insurance
                    void.
                  </li>
                  <li>
                    To carry passengers or property for the HIRER's business
                    purposes, unless he has the necessary licenses or permits.
                  </li>
                  <li>for any illegal purpose.</li>
                  <li>
                    to carry a greater number of persons than that for which it
                    was designed.
                  </li>
                  <li>
                    to carry a load which is improperly secured or loaded, or
                    which overloads the Vehicle or which would or might cause
                    damage to the Vehicle.
                  </li>
                  <li>
                    to propel or tow another vehicle, trailer or other object
                    unless the Vehicle is specially equipped for that purpose,
                  </li>
                  <li>for carrying hazardous substances.</li>
                  <li>
                    for racing, pace making, reliability trials, rallies, speed
                    testing, driving tuition or similar purposes.
                  </li>
                  <li>
                    by any person who:
                    <br />
                    <ol className="list-style-small-alpha">
                      <li>is not properly licensed to drive the vehicle,</li>
                      <li>
                        has given a fictitious or false name, age, address or
                        license details.
                      </li>
                      <li>is under the influence of alcohol or drugs</li>
                      <li>
                        has at any time been convicted of any motoring offense
                        unless details have been disclosed to MILELE.
                      </li>
                      <li>
                        is under the age of 21 years, without the prior written
                        consent of the owner.
                      </li>
                    </ol>
                    <p></p>
                  </li>

                  <li>
                    to carry any sort of alcoholic drinks, additionally in case
                    the vehicle is impounded/detained by the police the HIRER
                    will be liable to pay the owner all charges (including
                    accrued rental), losses, cause, damages, fines and penalties
                    and expenses by this reason or in respect thereof.
                  </li>
                </ul>
              </ul>
            </div>
          </div>

          <div className="terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h5 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h5 className="terms-conditions-headings">SERVICE & MAINTENANCE</h5>

              <p>
                It is the Hirer's responsibility to book the vehicle for
                service. Service due sticker and checklist report provided will
                have information of the next service. MILELE will collect the
                vehicle for service & maintenance within 1-2 working days. In
                case the vehicle is not booked for service on time and due to
                which if there is an issue with the vehicles warranty or
                performance, an additional charge for the engine damage
                /flushing etc. will be charged. Any additional repair required
                due to service not carried out on time will apply as per
                technician report and estimate from Agency.
                <br />
                <br />
                It is the responsibility of the Hirer to fix the flat tire
                caused during driving. Any damages to the tire/rim as a result
                of driving with the flat tire, will be charged to the Hirer.
                Insurance does not cover for any type of tire or rim repair or
                replacement.
                <br />
                <br />
                Replacement will be provided during service, maintenance,
                accidents. Any emergencies will be catered to on a case-to-case
                basis. <br />
                <br />
                The Hirer is not allowed to rent or sub-lease the vehicle to
                anyone eise without the prior consent and approval of MILELE.
              </p>
            </div>

            <div className="term-conditions-h6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h5 className="terms-conditions-headings">VEHICLE RESPONSIBILITY</h5>
              <p>
                The number of kilometres which the Vehicle shall have been
                driven pursuant to this Agreement shall be conclusively
                determined by reading the odometer attached to the Vehicle
                unless the odometer shall be found to be faulty or tampered with
                when MILELE shall equitably determine the kilometrage. <br />{" "}
                <br /> The Vehicle will be adequately secured when not in use
                and adequately due to weather conditions. MILELE should be
                informed immediately in writing of any loss or damage occurring
                to the Vehicle or of any fault developing therein. In the event
                of such loss, damage or fault the Vehicle will not be used if to
                do so would or might cause further loss or aggravation of fault
                and in the case of loss, damage or fault which makes the Vehicle
                unroadworthy or liable to cause damage to any person or property
                the Vehicle will not be used until the loss, damage or fault has
                been corrected, repaired or made good. <br /> <br /> The HIRER
                or any other driver shall at no ti ine be or be deemed to be the
                agent, servant or employee of MILELE for any purpose whatsoever.
                The vehicle will not be altered or modified in any way nor shall
                there be incurred or cause to be incurred any liability for
                repairs without the previous approval of MILELE. The Vehicle
                will be kept in the possession of the HIRER or other approved
                driver and no lien shall be created thereon whether for repairs
                or otherwise and the vehicle will be kept free and exempt from
                all legal process and that MILELE Indemnified against all
                losses, costs, charges, damages and expenses incurred by MILELE
                by reason or in respect thereof.
              </p>
            </div>
          </div>
          
          <div className="term-conditions-h7 col-lg-12">
            <h5 className="terms-conditions-headings">TERMINATION</h5>
            <p>
              Milele have the right to terminate the agreement into following
              points:
            </p>
            <ul className="list-style-numbers">
              <li>In Case of non-payment or Due Payments</li>
              <li>Breach by customer on of the terms of agreement</li>
            </ul>
            <p>
              Milele has right to terminate the agreement and recover the
              vehicle without any approval from the customer.
              <br />
              The customer is not entitled to claim any compensation and is not
              entitled to demand any refund of any amounts paid. <br />
              In case of termination any provision related to payments,
              violations or compensation that customer must pay will remain in
              effect until Due Payment process is completed.
            </p>
          </div>
          <br />
          <div className="term-conditions-h4">
            <p>
              The HIRER hereby releases and indemnifies MILELE from any and
              against any liability or loss or damage to any property (including
              costs relating thereto) left, stored or transported by the HIRER
              in or upon the vehicle before or after the return of the vehicle
              to MILELE. <br /> <br /> MILELE whilst taking all precautions and
              using its best efforts to prevent such happenings shall not be
              liable for any loss or damage arising from any fault or defect in
              form of mechanical failure of the vehicle or any consequential
              loss or damage. <br /> <br /> If any breach of the terms of this
              Agreement Is committed then MILELE shall be entitled, but without
              prejudice to any other rights any remedies he may have, to
              terminate the rental of the Vehicle and to recover possession
              thereof and the insurance cover provided by MILELE shall cease
              forth with. Where this Agreement requires approval of MILELE, such
              approval must be in writing. <br /> <br />
            </p>
            <ul>
              <li>
                {" "}
                This Agreement shall be governed by and construed according to
                the laws of the United Arab Emirates.{" "}
              </li>
              <li>
                The terms and conditions are subject to change at any time by
                MILELE without providing prior notice to the HIRER.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditionsPage;
