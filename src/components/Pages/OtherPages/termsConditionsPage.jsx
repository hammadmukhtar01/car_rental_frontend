/* eslint-disable no-unused-vars */
import React from "react";
import "./otherPages.css";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TermsConditionsPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Things to Consider when Renting a Car in UAE </title>
        <meta
          name="description"
          content="Read the rental terms of Milele Car Rental: details on rental periods, payment policies, fines for overdue payments, contract extensions, vehicle check-in/out, insurance, and more."
        />
        <meta name="keywords" content="keywords" />
        <link
          rel="canonical"
          href="https://www.milelecarrental.com/terms&Conditions"
        />
      </Helmet>
      <HeaderCombination />
      <div className="container pt-4 pb-2">
        <div className="styled-label text-center">
          <span className="terms-conditions-main-heading">
            <h1>
              <b className="fs-3"> Terms & Conditions</b>
            </h1>
          </span>
        </div>
        <br />
        <div className="all-terms-conditions-main-container">
          <div className="terms-conditions-main-div row  pb-3">
            <div className=" term-conditions-h1  ">
              <h2 className="terms-conditions-headings-main">PAYMENT</h2>
              <span>
                <div className="terms-conditions-sub-heading-1">
                  Rental Terms with Milele Car Rental
                </div>{" "}
                <ul>
                  <li className="pb-2">
                    <b>Rental Period: </b>Rentals operate on a 24-hour basis.
                  </li>
                  <li className="pb-2">
                    <b>Payments:</b> Rental payments are made in advance.
                    Non-rental payments are invoiced separately and must be paid
                    upon receipt via email. Overdue payments may incur
                    additional charges
                  </li>
                </ul>
              </span>

              <span>
                <div className="terms-conditions-sub-heading-1">
                  Outstanding Debts:
                </div>{" "}
                Twenty percent fine if unpaid 10-20 days after invoice.
                <br />
                Additional 30% fine if unpaid 21-30 days.
                <br />
                Additional 50% fine if unpaid beyond 30 days.
                <br />
                Milele Car Rental reserves the right to pursue legal action for
                non-compliance.
              </span>

              <br />
              <span>
                <div className="terms-conditions-sub-heading-1">
                  Contract Extension Policy:
                </div>{" "}
                Extend during contract validity at original rate.
                <br />
                Surcharge applies if extended after expiry, as per the rental
                agreement.
              </span>
              <br />
              <div className="mt-3">
                <div className="terms-conditions-sub-heading-1">
                  Deposit Refund Fee:{" "}
                </div>{" "}
                Refunds via bank transfer incur a 20 AED processing fee.
              </div>
            </div>

            <div className=" term-conditions-h2 mt-3">
              <h2 className="terms-conditions-headings-main">
                VEHICLE CHECK-OUT & CHECK-IN REPORT
              </h2>
              <div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Vehicle rental terms and conditions:{" "}
                  </span>{" "}
                  <br /> Upon vehicle check-out and check-in, the Hirer must
                  verify and sign the inspection report.
                </div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Damage charges:{" "}
                  </span>
                  <br /> Dents and scratches will incur charges based on
                  severity of the damage. Interior stains, marks, or pet hair
                  will result in a cleaning fee ranging from AED 300 - AED 1000.
                </div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Other charges:{" "}
                  </span>
                  <br /> Smoking in the vehicle is strictly prohibited and will
                  result in a fine of AED 250. Torn seats, holes, or other
                  interior damages will be assessed by the supplier, with a
                  minimum charge of AED 700.
                </div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Fuel policy:{" "}
                  </span>{" "}
                  <br /> Vehicles must be returned with the same fuel level as
                  received. Refuelling charges will apply based on prevailing
                  prices plus AED 10.
                </div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Loss and liability:{" "}
                  </span>{" "}
                  <br /> The Lessor is not liable for any loss of goods or items
                  left in the vehicle.
                </div>
                <div className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    {" "}
                    Lost keys:{" "}
                  </span>{" "}
                  Charges for lost keys vary by vehicle category.
                </div>
                <span className="terms-conditions-sub-heading-1">
                  Important notes:{" "}
                </span>
                <em>
                  If the Hirer loses their copy of rental agreement, the MILELE
                  Copy will be considered final.
                </em>
              </div>
            </div>
          </div>

          <div className=" terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h3">
              <h2 className="terms-conditions-headings-main">INSURANCE</h2>
              <p>
                The HIRER agrees to pay MILELE for any incident resulting in
                damages to or loss of the Vehicle, up to the excess amount
                specified (currently AED 1,500/-), or the actual cost of the
                damage or loss, whichever is greater.
                <br />
                <br />
                If the HIRER has opted for 'Collision Damage Waiver' by paying
                the additional fees as per MILELE's current tariff, MILELE will
                waive the liability of the HIRER for the amount payable under
                this condition. However, if the Vehicle is used, operated, or
                driven in violation of the terms of this agreement, the HIRER
                will be liable for the full cost of any damage or loss, or any
                resulting loss to MILELE.
                <br />
                <br />
                The insurance coverage will be void if the HIRER, without
                authorization from MILELE, hands over the vehicle to any other
                person or causes damage through unauthorized use.
              </p>

              <h2 className="terms-conditions-headings-main">
                TRAFFIC FINES & VOILATIONS
              </h2>

              <div>
                <span className="terms-conditions-sub-heading-1">
                  Notification of Fines:{" "}
                </span>{" "}
                <br />
                <ul>
                  <li>
                    Milele will promptly notify customers of any fines issued by
                    traffic authorities within 24 hours of receipt.
                  </li>
                </ul>
                <span className="terms-conditions-sub-heading-1">
                  Payment Responsibility:
                </span>
                <br />
                <ul>
                  <li className="pb-2">
                    Customers must settle fines directly with the relevant
                    authorities within 24 hours of notification.
                  </li>
                  <li className="pb-2">
                    Alternatively, Milele can pay fines on behalf of customers,
                    subject to a surcharge of AED 50, which must be reimbursed
                    within 24 hours of notification.
                  </li>
                </ul>
                <span className="terms-conditions-sub-heading-1">
                  Late Payment Charges:{" "}
                </span>
                <br />{" "}
                <p>
                  Here is a minimized version of the terms and conditions
                  without losing their meaning:
                </p>
                <ul>
                  <li className="pb-2">
                    Fines not settled within 24 hours will incur a charge of AED
                    100 per day for the next two days
                  </li>
                  <li className="pb-2">
                    If unpaid after this period, the contract will be
                    terminated, and the vehicle retrieved. An additional AED 300
                    inconvenience charge will apply
                  </li>
                  <li className="pb-2">
                    An overdue payment penalty of AED 500 per day will be
                    imposed for the next four days after contract termination.
                  </li>
                  <li>
                    From the fifth day onwards, a charge of AED 1000 per day
                    will be applied for the next 5 days.
                  </li>
                </ul>
                <span className="terms-conditions-sub-heading-1">
                  Legal Action:{" "}
                </span>
                <br />{" "}
                <ul>
                  <li>
                    Milele Reserves a right to pursue a legal action if fines
                    are not cleared in 10 days.
                  </li>
                </ul>{" "}
                <span className="terms-conditions-sub-heading-1">
                  Customer Obligation:{" "}
                </span>
                <br />{" "}
                <ul>
                  <li className="pb-2">
                    Customers must provide accurate contact information to
                    ensure prompt communication regarding fines and payments.
                  </li>
                  <li className="pb-2">
                    Milele holds no liability for any consequences resulting
                    from inaccurate or outdated contact information provided by
                    customers.
                  </li>
                </ul>{" "}
                <span className="terms-conditions-sub-heading-1">
                  Impounding Fines:{" "}
                </span>
                <br />{" "}
                <ul>
                  <li>
                    Customers must pay all impounding charges, a 250 AED
                    inconvenience fee, and loss of rental charges for the
                    impounded period. Additionally, a daily fee of 100 AED will
                    apply during impoundment.
                  </li>
                </ul>{" "}
                <span className="terms-conditions-sub-heading-1">
                  Service Charge:{" "}
                </span>
                <br />{" "}
                <ul>
                  <li>
                    Fines paid by Milele on behalf of customers will be
                    invoiced, including a service charge of AED 50 per traffic
                    fine.
                  </li>
                </ul>
              </div>
            </div>

            <div className="term-conditions-h4 mt-4">
              <h2 className="terms-conditions-headings-main">VEHICLE MISUSE</h2>
              <ul className="list-style-capital-alpha">
                <li>
                  {" "}
                  <span className="terms-conditions-sub-heading-1">
                    Vehicle Use:
                  </span>{" "}
                  <p>
                    {" "}
                    The vehicle shall always be driven and used with care and
                    consideration to other road users.
                  </p>
                </li>
                <p></p>
                <li className="pb-2">
                  <span className="terms-conditions-sub-heading-1">
                    Prohibited Uses:{" "}
                  </span>{" "}
                </li>
                <ul className="custom-list-double-brackets-roman">
                  <li>
                    The vehicle shall not be used in any manner that would or
                    might render the insurance void.
                  </li>
                  <li>
                    It shall not be used to carry passengers or property for the
                    HIRER's business purposes unless the necessary licenses or
                    permits are obtained.
                  </li>
                  <li>It shall not be used for any illegal purpose. </li>
                  <li>
                    It shall not carry a greater number of persons than for
                    which it was designed.
                  </li>
                  <li>
                    It shall not carry a load that is improperly secured or
                    loaded, or which overloads the Vehicle, causing damage.
                  </li>
                  <li>
                    It shall not propel or tow another vehicle, trailer, or
                    object unless the Vehicle is specially equipped for that
                    purpose.
                  </li>
                  <li>
                    It shall not be used for carrying hazardous substances.{" "}
                  </li>
                  <li>
                    It shall not be used for racing, pace making, reliability
                    trials, rallies, speed testing, driving tuition, or similar
                    purposes.
                  </li>
                  <li>
                    It shall not carry any alcoholic drinks; in case of
                    impoundment/detainment by the police, the HIRER is liable
                    for all charges, losses, damages, fines, penalties, and
                    expenses
                  </li>
                  <li>It shall not be driven by any person who: </li>
                </ul>
                <ol>
                  <ol className="custom-list-double-brackets-roman-alpha-dot">
                    <li>is not properly licensed to drive the vehicle,</li>
                    <li>
                      has given a fictitious or false personal information,
                    </li>
                    <li>is under the influence of alcohol or drugs</li>
                    <li>
                      Has a history of motoring offenses without disclosure to
                      Milele
                    </li>
                    <li>is under the age of 21 years.</li>
                  </ol>
                </ol>
                <li>
                  {" "}
                  <span className="terms-conditions-sub-heading-1">
                    Prohibited Articles:{" "}
                  </span>{" "}
                  <p>
                    {" "}
                    No articles that may cause damage to the vehicle, its
                    upholstery, or any of its components shall be transported in
                    the vehicle. Any resulting damages will be charged to the
                    HIRER at Milele's Agency price.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className=" terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h5  ">
              <h2 className=" terms-conditions-headings-main">TERMINATION</h2>
              <p>
                {" "}
                Milele retains the authority to terminate the agreement under
                the following circumstances:{" "}
              </p>
              <ol className="order-list-termination-heading">
                <li className="pb-2">
                  Non-payment or overdue payments by the customer.
                </li>
                <li className="pb-2">
                  {" "}
                  Breach of any terms outlined in the agreement by the customer.{" "}
                </li>
                <li className="pb-2">
                  Early termination initiated by the HIRER.
                </li>
              </ol>
              <ul>
                <li className="pb-2">
                  Upon termination, Milele has the right to reclaim the vehicle
                  without requiring approval from the customer. The customer
                  waives any entitlement to compensation or refund of previously
                  paid amounts, including in the case of early termination by
                  the HIRER.
                </li>
                <li className="pb-2">
                  If the agreement is terminated due to breaches or outstanding
                  payments, the customer remains obligated to fulfil any
                  outstanding payment obligations or compensatory fees until all
                  dues are settled.
                </li>
                <li className="pb-2">
                  Furthermore, in the event of a breach of contract by the
                  HIRER, the LESSOR reserves the right to repossess the vehicle
                  and charge the HIRER for any loss of income resulting from the
                  breach.
                </li>
                <li className="pb-2">
                  In cases where the HIRER absconds or fails to respond for two
                  consecutive days, the LESSOR retains the right to repossess
                  the vehicle and recover any losses incurred, without any
                  claims being made against the LESSOR. The LESSOR assumes no
                  responsibility for lost items left in the vehicle
                </li>
              </ul>
            </div>
          </div>

          <div className=" terms-conditions-main-div row  pb-3">
            <div className="term-conditions-h5  ">
              <h2 className=" terms-conditions-headings-main">
                SERVICE AND MAINTENANCE
              </h2>

              <div>
                <p>
                  It is the Hirer's responsibility to ensure timely vehicle
                  servicing by booking appointments. The service due sticker and
                  checklist report provided will specify the next service date.
                  MILELE will collect the vehicle for servicing and maintenance
                  within 1-2 working days. If the vehicle is not serviced on
                  time and this results in issues affecting warranty or
                  performance, additional charges for engine damage, flushing,
                  etc., may apply.
                </p>

                <p>
                  {" "}
                  Any repairs necessitated by overdue servicing will be charged
                  based on the technician's report and estimates from the
                  agency.
                </p>

                <p>
                  {" "}
                  The Hirer is accountable for repairing flat tires incurred
                  during driving. Any damages to the tire or rim due to driving
                  with a flat tire will be the responsibility of the Hirer.
                  Insurance coverage does not extend to tire or rim repair or
                  replacement.
                </p>

                <p>
                  During servicing, maintenance, or accidents, vehicle
                  replacement will be provided. Emergencies will be addressed on
                  a case-by-case basis.
                </p>
                <p>
                  The Hirer is prohibited from renting or sub-leasing the
                  vehicle to others without prior consent from MILELE.
                </p>

                <p>
                  Repairs on the vehicle must not be undertaken by the Hirer
                  without authorization from the LESSOR. All repairs and
                  maintenance should be conducted at Milele Authorized
                  workshops. The Hirer will be fully liable for damages or
                  additional costs resulting from unauthorized repairs, part
                  changes, or maintenance.
                </p>
                <br />
              </div>
            </div>

            <div className="term-conditions-h6  ">
              <h2 className="terms-conditions-headings-main">
                VEHICLE RESPONSIBILITY
              </h2>
              <ul>
                <li className="pb-2">
                  The number of kilometres driven by the Vehicle under this
                  Agreement will be determined conclusively by reading the
                  odometer attached to the Vehicle, unless the odometer is found
                  to be faulty or tampered with, in which case MILELE will
                  equitably determine the mileage.
                </li>
                <li className="pb-2">
                  The Vehicle must be adequately secured when not in use and
                  protected from adverse weather conditions. MILELE should be
                  promptly notified in writing of any loss, damage, or fault
                  occurring to the Vehicle. In case of such occurrences, the
                  Vehicle must not be used if it may cause further loss or
                  exacerbate the fault. If the Vehicle becomes unroadworthy or
                  poses a risk to persons or property, it should not be used
                  until the issue is corrected, repaired, or resolved.
                </li>
                <li className="pb-2">
                  The HIRER or any other driver is not and will not be deemed to
                  be an agent, servant, or employee of MILELE for any purpose.
                  The Vehicle must not be altered or modified in any way without
                  MILELE's prior approval. The HIRER or approved driver will
                  keep the Vehicle in their possession without creating any
                  liens, and the Vehicle must be kept free from legal processes.
                  MILELE must be indemnified against any losses, costs, charges,
                  damages, or expenses arising from or in connection with the
                  Vehicle.
                </li>
                <li className="pb-2">
                  Report any abnormalities or malfunctions within one hour of
                  the rental start. Issues identified later will be repaired or
                  replaced at the HIRER's expense.
                </li>
                <li className="pb-2">
                  HIRERs with UAE licenses issued less than a year prior to the
                  rental date or who are under 25 years old will be liable for
                  all accident damages, with an excess of DHS 1500 plus 20% of
                  the claim/loss amount.
                </li>
                <li className="pb-2">
                  The HIRER is responsible for any tire punctures or bursts and
                  must cover repair or replacement costs
                </li>
                <li className="pb-2">
                  An accident handling administration fee of AED 200 per
                  incident will be charged, in addition to damage repair costs
                  or applicable excess fees.
                </li>
                <li className="pb-2">
                  If car keys are lost, the following charges apply:
                  <ul>
                    <li className="pb-2 pt-2">
                      AED 500 for Celerio and Alto models.
                    </li>
                    <li className="pb-2">AED 1000 for all other models.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="term-conditions-h7  mb-3">
              <h2 className="terms-conditions-headings-main">
                DEPOSIT REFUND FEE{" "}
              </h2>
              <span>
                All deposits refunded via bank transfer will incur a processing
                fee of 20 AED per transaction, which covers the bank charges
                associated with the transfer.
              </span>
            </div>

            <div className="term-conditions-h7  mb-3">
              <h2 className="terms-conditions-headings-main">
                DEPOSIT OPTIONS{" "}
              </h2>
              <span>
                Customers have the option to choose between a refundable deposit
                or a non-refundable deposit insurance.
              </span>
            </div>

            <div className="term-conditions-h8 mb-3 ">
              <h2 className="terms-conditions-headings-main">
                CONTRACT EXTENSION POLICY{" "}
              </h2>
              <span>
                Customers may extend their rental contract during its validity
                at the original rate for the extension period.
              </span>
              <br />
              <ul>
                <li className="pb-2">
                  For Refundable Deposit: In case of a deposit, the customer
                  will not need to pay again during the extension.
                </li>
                <li className="pb-2">
                  For Non-Refundable Deposit Insurance: If the customer has
                  opted for a deposit insurance, they will have to pay the
                  amount for every contract extension.
                </li>
              </ul>
              <span>
                However, in the event of extending the contract after its
                expiry, a surcharge will be applied as per the terms specified
                in the rental agreement.
              </span>
            </div>

            <div className="term-conditions-h9  ">
              <span className="terms-conditions-sub-heading-1">
                <h4>Note:</h4>{" "}
              </span>
              <ul>
                <li className="pb-2">
                  The HIRER hereby releases and indemnifies MlLELE from any and
                  against any liability or loss or damage to any property
                  (including costs relating therefor) left, stored, or
                  transported by the HIRER in or upon the vehicle before or
                  after the return of the vehicle to MlLELE.
                </li>
                <li className="pb-2">
                  MlLELE whilst taking all precautions and using its best
                  efforts to prevent such happenings shall not be liable for any
                  loss or damage arising from any fault or defect in form of
                  mechanical failure of the vehicle or any consequential loss or
                  damage.
                </li>
                <li className="pb-2">
                  If any breach of the terms of this Agreement Is committed then
                  MILE LE shall be entitled, but without prejudice to any other
                  rights any remedies he may have, to terminate the rental of
                  the Vehicle and to recover possession thereof and the
                  insurance cover provided by MlLELE shall cease forth with.
                  Where this Agreement requires approval of MlLELE, such
                  approval must be in writing.
                </li>
                <li className="pb-2">
                  This Agreement shall be governed by and construed according to
                  the laws of the United Arab Emirates.
                </li>
                <li className="pb-2">
                  The terms and conditions are subject to change at any time by
                  MlLELE without providing prior notice to the HIRER.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default TermsConditionsPage;
