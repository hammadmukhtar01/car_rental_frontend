/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  BsPerson,
  BsSuitcase,
  BsFillShieldLockFill,
  BsPersonCircle,
  BsFileEarmarkArrowUp,
} from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { FaArrowTrendUp } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { PiMapPinLine } from "react-icons/pi";
import "./verticalSliderCarDetails.css";
import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { getWithExpiry } from "../Utils/localStorageUtils";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";

const importAll = (r) => {
  return r.keys().map(r);
};

const captivaImages = importAll(
  require.context(
    "../../images/allVehicleImages/captiva-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
const altoImages = importAll(
  require.context(
    "../../images/allVehicleImages/alto-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const nissanImages = importAll(
  require.context(
    "../../images/allVehicleImages/nissan-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
const peugeotImages = importAll(
  require.context(
    "../../images/allVehicleImages/peugeot-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const celerioImages = importAll(
  require.context(
    "../../images/allVehicleImages/celerio-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
const ciazImages = importAll(
  require.context(
    "../../images/allVehicleImages/ciaz-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const corollaImages = importAll(
  require.context(
    "../../images/allVehicleImages/corolla-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
const ertigaImages = importAll(
  require.context(
    "../../images/allVehicleImages/ertiga-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const swiftImages = importAll(
  require.context(
    "../../images/allVehicleImages/swift-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
const vitaraImages = importAll(
  require.context(
    "../../images/allVehicleImages/vitara-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const balenoImages = importAll(
  require.context(
    "../../images/allVehicleImages/baleno-imgs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const VehicleDetails = ({ nextStep }) => {
  const storedUserData = useMemo(
    () => getWithExpiry("userLocationData") || {},
    []
  );

  const userLocData = storedUserData?.userData;

  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [singleVehicleDetails, setSingleVehicleDetails] = useState({});
  const [addOnsValuesData, setAddOnsValuesData] = useState([]);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tariffLines, setTariffLines] = useState([]);
  // const [mileageInput, setMileageInput] = useState("");
  const [isVehicleImagesModalOpen, setIsVehicleImagesModalOpen] =
    useState(false);

  const openVehicleImagesModal = () => {
    setIsVehicleImagesModalOpen(true);
  };
  const closeVehicleImagesModal = () => {
    setIsVehicleImagesModalOpen(false);
  };

  const carTypeInURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(carTypeInURL?.search),
    [carTypeInURL?.search]
  );
  const TariffGroupId = queryParams?.get("tariffGroupId");
  const StartDateTime =
    userLocData?.dateRange?.startDate || queryParams?.get("startDate");
  const ReturnDateTime =
    userLocData?.dateRange?.endDate || queryParams?.get("endDate");
  const pickupTimeParam =
    userLocData?.pickUpTime || queryParams?.get("pickupTime");
  const dropoffTimeParam =
    userLocData?.dropOffTime || queryParams?.get("dropoffTime");
  const pickupLocParam =
    userLocData?.pickupLocation?.label || queryParams?.get("pickupLoc");
  const dropoffLocParam =
    userLocData?.dropoffLocation?.label || queryParams?.get("dropoffLoc");
  const checkBoxValueParam =
    String(userLocData?.showDropoff) || queryParams?.get("checkBoxValue");

  const numberOfDays = queryParams?.get("noOfDays");
  const pickupLocTabValue = "DELIVER";
  const DropoffLocTabValue = "DELIVER";
  const calculatedVehiclePrice = parseInt(queryParams?.get("vehiclePrice"));
  // const [dropoffLocParamState, setDropoffLocParamState] = useState("DUBAI");

  const createImagesArray = (images, prefix) => {
    return images.map((image, index) => ({
      original: image,
      thumbnail: image,
    }));
  };

  const vehicleImages = [
    {
      tariffGroupId: "8965",
      imagesArray: createImagesArray(captivaImages, "captiva-car-rental-img"),
    },
    {
      tariffGroupId: "8966",
      imagesArray: createImagesArray(nissanImages, "nissan-car-rental-img"),
    },
    {
      tariffGroupId: "8990",
      imagesArray: createImagesArray(peugeotImages, "peugeot-car-rental-img"),
    },
    {
      tariffGroupId: "8991",
      imagesArray: createImagesArray(altoImages, "alto-car-rental-img"),
    },

    {
      tariffGroupId: "8992",
      imagesArray: createImagesArray(celerioImages, "celerio-car-rental-img"),
    },
    {
      tariffGroupId: "8993",
      imagesArray: createImagesArray(ciazImages, "ciaz-car-rental-img"),
    },
    {
      tariffGroupId: "8994",
      imagesArray: createImagesArray(corollaImages, "corolla-car-rental-img"),
    },
    {
      tariffGroupId: "8996",
      imagesArray: createImagesArray(ertigaImages, "ertiga-car-rental-img"),
    },
    {
      tariffGroupId: "8997",
      imagesArray: createImagesArray(swiftImages, "swift-car-rental-img"),
    },
    {
      tariffGroupId: "8998",
      imagesArray: createImagesArray(vitaraImages, "vitara-car-rental-img"),
    },
    {
      tariffGroupId: "8999",
      imagesArray: createImagesArray(balenoImages, "baleno-car-rental-img"),
    },
    {
      tariffGroupId: "9246",
      imagesArray: createImagesArray(corollaImages, "corolla-car-rental-img"),
    },
  ];
  const selectedVehicleImages = vehicleImages.find(
    (vehicle) => vehicle?.tariffGroupId === TariffGroupId
  );

  const fetchSingleCarDetails = useCallback(async () => {
    let data = { TariffGroupId, StartDateTime, ReturnDateTime };
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/GetVehicleRateDetail`;
      const response = await axios.post(url, data, { headers });

      setSingleVehicleDetails(response?.data?.result);
      // console.log("Complete Details of a cars is : ", response?.data?.result);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [TariffGroupId, StartDateTime, ReturnDateTime]);

  useEffect(() => {
    fetchSingleCarDetails();
  }, [StartDateTime, ReturnDateTime, fetchSingleCarDetails]);

  const categoryMap = {
    Standard: "Sedan",
    "Small SUV 5 Seater": "SUV",
    Compact: "HatchBack",
    Fullsize: "7 Seater",
  };

  const fetchVehicleRentRates = useCallback(async (tariffGroupId) => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const url = `https://app.speedautosystems.com/api/services/app/tariff/GetTariffForEdit`;
      const response = await axios.post(
        url,
        { TariffGroupId: tariffGroupId },
        { headers }
      );

      const tariffLines =
        response?.data?.result?.tariffLines?.items.slice(0, 3) || [];
      setTariffLines(tariffLines);

      return tariffLines;
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchVehicleRentRates(TariffGroupId);
  }, [fetchVehicleRentRates, TariffGroupId]);

  const calculateRent = (rate, rateType, days) => {
    let calculatedRate = 0;
    if (days > 0 && days < 7) {
      calculatedRate = rate * days;
    } else if (days >= 7 && days <= 21) {
      calculatedRate = (rate * days) / 7;
    } else if (days > 21) {
      calculatedRate = (rate * days) / 30;
    }
    return Math.round(calculatedRate * 100) / 100;
  };

  const renderVehiclePriceAPI = useCallback(
    (tariffGroupId, days) => {
      const tariffs = tariffLines || [];

      let index;
      if (days > 0 && days < 7) {
        index = 0;
      } else if (days >= 7 && days <= 21) {
        index = 1;
      } else if (days > 21) {
        index = 2;
      }

      const line = tariffs[index];

      if (!line) {
        return 0;
      }
      const totalPrice = calculateRent(line?.rate, line?.rateType?.name, days);

      return Math.round(totalPrice);
    },
    [tariffLines]
  );

  const baseAPIResponsePath = singleVehicleDetails?.vehicle?.tariffGroup;

  const carTypeName = baseAPIResponsePath?.title;
  const carCategory =
    categoryMap[baseAPIResponsePath?.acrissCategory?.name] ||
    baseAPIResponsePath?.acrissCategory?.name;
  // const carImg = baseAPIResponsePath?.displayImage?.url;

  const totalAPIResponseCharges =
    parseInt(calculatedVehiclePrice) !== 0
      ? calculatedVehiclePrice
      : renderVehiclePriceAPI(TariffGroupId, numberOfDays);

  const singleDayPriceCalculation =
    parseInt(calculatedVehiclePrice) !== 0
      ? parseFloat((calculatedVehiclePrice / numberOfDays).toFixed(2))
      : parseFloat(
          (
            renderVehiclePriceAPI(TariffGroupId, numberOfDays) / numberOfDays
          ).toFixed(2)
        );

  const carPassengerCapacity = baseAPIResponsePath?.passengerCapacity;
  const carManualAutomaticType =
    baseAPIResponsePath?.acrissTransDrive?.name?.split("/")[0];
  const carDoorstype =
    baseAPIResponsePath?.acrissType?.name?.split("/")[1] ||
    baseAPIResponsePath?.acrissType?.name?.split("-")[1] ||
    baseAPIResponsePath?.acrissType?.name;
  const carlargeSafetyBags = baseAPIResponsePath?.largeBagsCapacity;
  const carsmallSafetyBags = baseAPIResponsePath?.smallBagsCapacity;
  const carTotalSafetyBags = carlargeSafetyBags + carsmallSafetyBags;

  const additionalFeaturesArray =
    singleVehicleDetails?.notes?.split(", ") || [];

  const auth = JSON.parse(localStorage.getItem("user"));
  const authToken = auth?.token;

  const carFeaturesWithIcons = [
    {
      name: "Seater",
      value: carPassengerCapacity,
      featureIcon: BsPerson,
    },

    {
      name: "",
      value: carDoorstype,
      featureIcon: GiCarDoor,
    },
    {
      name: carManualAutomaticType,
      value: null,
      featureIcon: GiGearStickPattern,
    },
    {
      name: "AC",
      value: null,
      featureIcon: LuSnowflake,
    },

    {
      name: "Luggage Bags",
      value: carTotalSafetyBags,
      featureIcon: BsSuitcase,
    },
  ];

  const getUpdatedPrice = (addOn, numberOfDays, carCategory) => {
    switch (addOn?.addOnsName) {
      case "CDW (Collision Damage Waiver)":
        if (numberOfDays > 0 && numberOfDays < 7) {
          return carCategory === "HatchBack" ? 20 : 30;
        } else if (numberOfDays >= 7 && numberOfDays <= 21) {
          return carCategory === "HatchBack" ? 15 : 20;
        } else if (numberOfDays > 21) {
          return carCategory === "HatchBack" ? 10 : 15;
        }
        break;
      case "Baby Seat":
        if (numberOfDays > 0 && numberOfDays < 7) return 20;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((120 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((400 / 30) * numberOfDays);
        break;
      case "Mobile Holder":
        if (numberOfDays > 0 && numberOfDays < 7) return 5;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((10 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((20 / 30) * numberOfDays);
        break;
      case "Sunshades":
        if (numberOfDays > 0 && numberOfDays < 7) return 10;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((30 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((50 / 30) * numberOfDays);
        break;
      case "PAI (Personal Accident Insurance)":
        if (numberOfDays > 0 && numberOfDays < 7) return 15;
        if (numberOfDays >= 7 && numberOfDays <= 21) return 10;
        if (numberOfDays > 21) return 5;
        break;
      default:
        return addOn?.pricePerTrip;
    }
  };

  const totalDays = parseInt(queryParams?.get("noOfDays"), 10) || 1;

  const AddOnsData = useMemo(
    () => [
      {
        id: 2,
        addOnsName: "CDW (Collision Damage Waiver)",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "CDW (Collision Damage Waiver)" },
          totalDays,
          carCategory
        ),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Optional coverage that limits the renter's liability in case of damage to the rental vehicle due to collision.",
      },

      {
        id: 3,
        addOnsName: "PAI (Personal Accident Insurance)",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "PAI (Personal Accident Insurance)" },
          totalDays
        ),
        checkBoxValue: 0,
        IconName: BsPersonCircle,
        addOnsDetail:
          "Coverage providing personal accident insurance for the driver and passengers during the rental period.",
      },
      // {
      //   id: 5,
      //   addOnsName: "Mileage",
      //   pricePerTrip: 0.5,
      //   checkBoxValue: 1,
      //   IconName: BsPersonCircle,
      //   addOnsDetail:
      //     "Additional miles beyond the standard limit included in the rental agreement, charged per mile/kilometer.",
      // },
      {
        id: 19,
        addOnsName: "Baby Seat",
        pricePerTrip: getUpdatedPrice({ addOnsName: "Baby Seat" }, totalDays),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Child safety seat suitable for infants or toddlers, ensuring safe transportation for young passengers.",
      },
      {
        id: 54,
        // Extra1Charges -> Tint
        addOnsName: "Tint",
        pricePerTrip: 150,
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Dark window tinting for added privacy and sun protection during the rental period.",
      },

      {
        id: 55,
        // Extra2Charges -> Mobile Holder
        addOnsName: "Mobile Holder",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "Mobile Holder" },
          totalDays
        ),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Convenient mount to securely hold smartphones for GPS navigation or hands-free calling.",
      },

      {
        id: 58,
        // Extra3Charges -> Sunshades
        addOnsName: "Sunshades",
        pricePerTrip: getUpdatedPrice({ addOnsName: "Sunshades" }, totalDays),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Shades for car windows to reduce heat and glare, providing a more comfortable interior.",
      },

      {
        id: 67,
        addOnsName: "Airport Surcharges",
        pricePerTrip: 120,
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Convenient pick-up service directly from the airport terminal to start the rental seamlessly.",
      },
    ],
    [carCategory, totalDays]
  );

  const fetchAddOnsChargesData = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/chargesSetting/GetChargesSettings`;

      const ModuleValue = {
        module: 1,
      };

      const response = await axios.post(url, ModuleValue, { headers });
      const fetchedAddOns = response?.data?.result?.items;

      const mergedAddOns = fetchedAddOns?.map((addOn) => ({
        ...addOn,
        ...AddOnsData?.find(
          (localAddOn) => localAddOn?.id === addOn?.chargesTypeId
        ),
      }));

      setAddOnsValuesData(mergedAddOns?.filter((addOn) => addOn?.addOnsName));
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [AddOnsData]);

  useEffect(() => {
    fetchAddOnsChargesData();
  }, [fetchAddOnsChargesData]);

  const handleViewDetails = (addOn) => {
    setSelectedAddOn(addOn);
    setShowModal(true);
  };

  // const handleMileageChange = (e) => {
  //   console.log("mileage value is chnaged ", e.target.value);
  //   const value = parseFloat(e.target.value);
  //   if (!isNaN(value)) {
  //     setMileageInput(value);
  //   }
  // };

  const handleCheckBoxChange = (id) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const index = prevSelectedAddOns?.findIndex((addOn) => addOn?.id === id);
      if (index !== -1) {
        const updatedAddOns = [...prevSelectedAddOns];
        updatedAddOns?.splice(index, 1);
        return updatedAddOns;
      } else {
        const addOnToAdd = AddOnsData?.find((addOn) => addOn?.id === id);
        return [...prevSelectedAddOns, addOnToAdd];
      }
    });
  };

  const totalAddOnsPriceSimple = () => {
    return selectedAddOns?.reduce((total, addOn) => {
      const isCDWorPAI =
        addOn?.addOnsName === "CDW (Collision Damage Waiver)" ||
        addOn?.addOnsName === "PAI (Personal Accident Insurance)";
      // console.log(`mileage Input is: ${mileageInput}`);

      // const mileageCost =
      //   addOn?.addOnsName === "Mileage" ? mileageInput * 0.5 : 0;
      // console.log(`mileageCost is: ${mileageCost}`);
      return total + (addOn?.pricePerTrip || 0) * (isCDWorPAI ? totalDays : 1);
    }, 0);
  };

  const deliveryCharges = {
    FUJAIRAH: 250,
    "AL AIN": 250,
    "ABU DHABI": 250,
    DUBAI: 50,
    "RAS AL KHAIMAH": 250,
    SHARJAH: 80,
    AJMAN: 80,
    "Umm Al Quwain": 250,
  };

  const steps = [
    {
      locName: pickupLocParam,
      locDate: StartDateTime,
      locTime: pickupTimeParam,
      locIcon: PiMapPinLine,
    },
    {
      locName: checkBoxValueParam === "true" ? dropoffLocParam : pickupLocParam,
      locDate: ReturnDateTime,
      locTime: dropoffTimeParam,
      locIcon: PiMapPinLine,
    },
  ];

  const removeCoupon = (e) => {
    setAppliedCoupon(null);
    setIsCouponApplied(false);
    setCouponCode("");
    e.preventDefault();
  };

  const getDeliveryCharge = () => {
    const selectedStatePickup = pickupLocParam?.toUpperCase();
    const selectedStateDropoff = dropoffLocParam?.toUpperCase();

    let pickupCharge = 0;
    let dropoffCharge = 0;

    if (pickupLocTabValue.toUpperCase() === "DELIVER") {
      pickupCharge =
        deliveryCharges[selectedStatePickup] !== undefined
          ? deliveryCharges[selectedStatePickup]
          : 50;
    }

    if (DropoffLocTabValue.toUpperCase() === "DELIVER") {
      dropoffCharge =
        deliveryCharges[selectedStateDropoff] !== undefined
          ? deliveryCharges[selectedStateDropoff]
          : 50;
    }

    let sumPickDropCharges = pickupCharge + dropoffCharge;

    return sumPickDropCharges;
  };

  const subTotalValue =
    totalAPIResponseCharges + getDeliveryCharge() + totalAddOnsPriceSimple();

  const taxTotal = Math.floor((5 * subTotalValue) / 100);
  const grandTotalPrice = subTotalValue + taxTotal;
  const grandTotalDiscountedValue = () => {
    if (appliedCoupon) {
      const discountedValue = appliedCoupon?.value;
      return Math.round(discountedValue);
    }
    return 0;
  };

  const grandTotalPriceWithDiscount =
    grandTotalPrice - grandTotalDiscountedValue();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartBookingClick = () => {
    // if (!auth || !authToken) {
    //   toast.dismiss();
    //   toast("Please log in to start booking.", {
    //     duration: 2000,
    //   });
    //   return;
    // }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "startBooking",
      carTypeName: carTypeName,
      numberOfDays: numberOfDays,
      totalCharges: totalAPIResponseCharges,
      deliveryCharge: getDeliveryCharge(),
      totalAddOnsPrice: totalAddOnsPriceSimple(),
      grandTotalPrice: grandTotalPriceWithDiscount,
    });

    handleNextStep1();
  };

  const handleNextStep1 = () => {
    const baseUrl = `/booking-page/2`;
    const urlParams = new URLSearchParams(window.location.search);

    const selectedAddOnsDetails = selectedAddOns?.map((addOn) => ({
      id: addOn?.id,
      price: addOn?.pricePerTrip,
    }));

    const selectedAddOnsIds = selectedAddOnsDetails
      ?.map((addOn) => addOn?.id)
      .join(",");

    urlParams?.set("page", "2");
    urlParams?.set("totalNoOfDays", numberOfDays);
    urlParams?.set("discountValue", grandTotalDiscountedValue());
    urlParams?.set("grandTotalCharges", grandTotalPriceWithDiscount);
    urlParams?.set("addOns", selectedAddOnsIds);
    urlParams?.set("totalDeliveryCharges", getDeliveryCharge());

    const nextStepUrl = `${baseUrl}?${urlParams?.toString()}`;
    window.location.href = nextStepUrl;
  };

  const couponsData = [
    {
      name: "RENTSUV20",
      value: 0.2 * grandTotalPrice,
    },

    {
      name: "NEW40",
      value: 40,
    },
  ];

  const applyCoupon = (e) => {
    e.preventDefault();

    const foundCoupon = couponsData?.find(
      (coupon) => coupon?.name === couponCode
    );

    if (couponCode?.trim() === "") {
      toast.dismiss();
      toast("Please enter a coupon code", {
        duration: 3000,
      });

      return;
    }

    if (!foundCoupon) {
      toast.dismiss();
      toast("Invalid coupon code. Please enter a valid one.", {
        duration: 2000,
      });
      return;
    }
    console.log("carCategory.toUpperCase() : ", carCategory.toUpperCase());
    console.log("cfoundCoupon: ", foundCoupon?.name);

    if (
      carCategory.toUpperCase() !== "SUV" &&
      foundCoupon?.name === "RENTSUV20"
    ) {
      toast.dismiss();
      toast("This coupon code is valid for SUV only.", {
        duration: 2000,
      });
      return;
    }

    setAppliedCoupon(foundCoupon);
    setIsCouponApplied(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%",
      padding: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  function CustomStepIcon({ locName, locDate, IconName, locTime }) {
    function formatDate(dateString) {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const date = new Date(dateString);
      return date?.toLocaleDateString("en-US", options);
    }

    const formattedDate = formatDate(locDate);

    return (
      <>
        <div className="customer-step-container">
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconName className="loc-detail-icon fs-5" />{" "}
              <div>
                <Typography
                  variant="body1"
                  className="loc-name-text-car-details"
                >
                  {locName}
                </Typography>
              </div>
            </Box>
          </div>
          <div className="loc-name-car-details-page d-flex justify-content-start">
            <Typography variant="body2">
              {formattedDate} | {locTime}
            </Typography>
          </div>
        </div>
      </>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Vehicle Detail | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
      </Helmet>
      <div className="vehicle-details-location-main-div pb-3 pt-3">
        <Container fluid>
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-car-details">
                <Row className="pl-3 pr-3 pt-3">
                  <h4 className="step1-car-name pl-3">{carTypeName}</h4>
                  <span className="step1-car-type pl-3">
                    {" "}
                    <strong>{carCategory} </strong>{" "}
                  </span>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <div className="car-imgs-details-container">
                      <div className="car-img-container">
                        <Row>
                          <Col
                            lg={8}
                            md={12}
                            sm={12}
                            xs={12}
                            className="pl-3 pb-2"
                          >
                            <div className="pt-3 text-center">
                              <div className="vehicle-images-carousel-container">
                                {selectedVehicleImages ? (
                                  <>
                                    <ImageGallery
                                      showPlayButton={false}
                                      showFullscreenButton={false}
                                      showNav={true}
                                      showIndex={true}
                                      items={selectedVehicleImages.imagesArray}
                                      onClick={openVehicleImagesModal}
                                    />

                                    <Modal
                                      show={isVehicleImagesModalOpen}
                                      onHide={closeVehicleImagesModal}
                                      size="xl"
                                      className="vehicle-images-modal-class"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          <span className="modal-heading">
                                          {carTypeName}{" "}
                                          </span>
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <ImageGallery
                                          showPlayButton={false}
                                          showNav={true}
                                          showIndex={true}
                                          items={
                                            selectedVehicleImages.imagesArray
                                          }
                                          startIndex={0}
                                          showThumbnails={true}
                                          showFullscreenButton={false}
                                        />
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <button
                                          className="btn btn-secondary"
                                          aria-label="Closing Vehicle Images Pop-up"
                                          onClick={closeVehicleImagesModal}
                                        >
                                          Close
                                        </button>
                                      </Modal.Footer>
                                    </Modal>
                                  </>
                                ) : (
                                  <p>No images available for this vehicle.</p>
                                )}
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={12} sm={12} xs={12}>
                            <div className=" ">
                              <span className="features-icons-heading pl-2">
                                <h1 className="vehicle-details-heading">
                                  {" "}
                                  Key Features:{" "}
                                </h1>
                              </span>
                              <hr className="hr-line-heading-scroll" />
                              <Row className="car-key-features-div mt-3">
                                {carFeaturesWithIcons?.map(
                                  (carFeaturesIcons, index) => (
                                    <Col
                                      lg={12}
                                      md={6}
                                      sm={6}
                                      xs={6}
                                      key={index}
                                    >
                                      <div className="features-values">
                                        <carFeaturesIcons.featureIcon className="mr-1 " />{" "}
                                        <span className="features-icon-name">
                                          {carFeaturesIcons?.value}{" "}
                                          {carFeaturesIcons?.name}
                                        </span>
                                      </div>
                                    </Col>
                                  )
                                )}
                              </Row>
                            </div>
                          </Col>
                        </Row>
                        <hr />

                        <div className="car-features-description-main-div2 p-2">
                          <div className="features-sub-div">
                            <span className="car-features-div2-heading fw-bolder">
                              <h1 className="vehicle-details-heading">
                                {" "}
                                Extra Features:{" "}
                              </h1>
                            </span>
                            <div className="car-features-text-2 pt-2">
                              <div className="car-features-div">
                                <Row className="car-features-list-main-div">
                                  {additionalFeaturesArray?.map(
                                    (additionalFeatures, index) => (
                                      <Col
                                        lg={6}
                                        md={6}
                                        sm={6}
                                        xs={6}
                                        key={index}
                                      >
                                        <div className="car-features-list pt-2 row ">
                                          <Col
                                            className="extra-features-icon"
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                          >
                                            <FaArrowTrendUp
                                              className="mr-2"
                                              style={{
                                                color: "#e87a28",
                                                fontSize: "20px",
                                              }}
                                            />{" "}
                                          </Col>
                                          <Col
                                            className="extra-features-text"
                                            lg={10}
                                            md={10}
                                            sm={10}
                                            xs={10}
                                          >
                                            {additionalFeatures}
                                          </Col>
                                        </div>
                                      </Col>
                                    )
                                  )}
                                </Row>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="step1-car-details pt-3">
                      <div className="location-label">
                        <div className="rental-addons-main-heading fs-4">
                          <b> Add-Ons:</b>
                        </div>
                        <div className="driver-details-form-container">
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div className=" form-group ">
                                <div>
                                  {addOnsValuesData?.map((AddOnsDataValues) => (
                                    <Col
                                      lg={12}
                                      md={12}
                                      sm={12}
                                      xs={12}
                                      className="add-on-container"
                                      key={AddOnsDataValues?.chargesTypeId}
                                    >
                                      <Form.Group
                                        controlId={`formKeyword_${AddOnsDataValues?.chargesTypeId}`}
                                      >
                                        <div className="row d-flex align-items-center">
                                          <Col lg={9} md={9} sm={9} xs={9}>
                                            <div className="add-ons-label-name p-2">
                                              <label className="add-ons-label">
                                                <>
                                                  {AddOnsDataValues?.addOnsName}
                                                </>
                                                <br />
                                                <span>
                                                  AED{" "}
                                                  <b>
                                                    {
                                                      AddOnsDataValues?.pricePerTrip
                                                    }
                                                  </b>{" "}
                                                  {
                                                    AddOnsDataValues?.rateType
                                                      ?.name
                                                  }
                                                </span>
                                              </label>
                                            </div>
                                          </Col>
                                          <Col lg={3} md={3} sm={3} xs={3}>
                                            {/* {AddOnsDataValues?.addOnsName ===
                                            "Mileage" ? (
                                              <input
                                                type="number"
                                                autoComplete="off"
                                                min={0}
                                                placeholder="/km"
                                                className="form-control form-control-contact-us"
                                                id="kmValue"
                                                name="kmValue"
                                                value={mileageInput}
                                                onChange={handleMileageChange}
                                              />
                                            ) : ( */}
                                            <a
                                              href={`#${AddOnsDataValues?.chargesTypeId}`}
                                              onClick={() =>
                                                handleViewDetails(
                                                  AddOnsDataValues
                                                )
                                              }
                                              className="add-ons-view-details"
                                              title={`${AddOnsDataValues?.addOnsName} Add-On`}
                                              id={`${AddOnsDataValues?.addOnsName}-add-on-detail-button`}
                                            >
                                              Details
                                            </a>
                                            <div className="form-check form-switch form-switch-md float-end">
                                              <input
                                                className="form-check-input add-ons-toggle-input"
                                                type="checkbox"
                                                id={`flexSwitchCheckDefault_${AddOnsDataValues?.chargesTypeId}`}
                                                onChange={() =>
                                                  handleCheckBoxChange(
                                                    AddOnsDataValues
                                                      ?.chargesType?.id
                                                  )
                                                }
                                              />
                                            </div>
                                            {/* )} */}
                                          </Col>
                                        </div>
                                      </Form.Group>
                                    </Col>
                                  ))}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <span className="modal-heading">
                              {" "}
                              View Details{" "}
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {selectedAddOn && (
                            <>
                              <p>{selectedAddOn?.addOnsDetail}</p>
                            </>
                          )}
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                            aria-label="Close AddOns Detail Modal"
                          >
                            Close
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <br />
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={12}>
                    <div className="step1-car-location-details-container">
                      <Box
                        sx={{ width: "100%" }}
                        className="customer-icon-stepper-container"
                      >
                        <div className="pickup-dropoff-heading text-center pb-2">
                          <h4>Details</h4>
                        </div>
                        <div className="loc-details-div pt-3">
                          <span className="step1-car-name pl-4">
                            <strong>{carTypeName}</strong>
                          </span>
                          <br />
                          <span className="step1-car-type pl-4">
                            {carCategory}{" "}
                          </span>
                          <hr
                            className="ml-3 mr-3"
                            style={{ opacity: "0.4" }}
                          />

                          <Stepper
                            activeStep={steps?.length - 1}
                            orientation="vertical"
                            className="pick-drop-data col-12"
                          >
                            {steps?.map((label, index) => (
                              <Step key={index}>
                                <StepLabel
                                  StepIconComponent={() => (
                                    <CustomStepIcon
                                      locName={label?.locName}
                                      locDate={label?.locDate}
                                      IconName={label?.locIcon}
                                      locTime={label?.locTime}
                                    />
                                  )}
                                />
                              </Step>
                            ))}
                          </Stepper>
                        </div>
                      </Box>
                    </div>
                    <br />
                    <div className="car-prices-details-container">
                      <div className="price-breakdown-heading pb-2 text-center">
                        <h4>
                          {" "}
                          <b>Price Details</b>{" "}
                        </h4>
                      </div>
                      <div className="price-break-down-container p-3">
                        <div className="total-days-div">
                          <div className="price-details-div col-lg-12">
                            <div className="booking-charges-evaluation-step1">
                              <>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    <strong>Rental Charges</strong>
                                  </span>
                                </div>

                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    {numberOfDays} Rental Day
                                    {numberOfDays > 1 && <>s</>} x AED{" "}
                                    {singleDayPriceCalculation}
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalAPIResponseCharges}
                                    </span>
                                  </div>
                                </div>

                                <hr />
                              </>
                              <>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    <strong>Taxes and Fees</strong>
                                  </span>
                                </div>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Delivery Charges
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {getDeliveryCharge()}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Add-ons Total
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalAddOnsPriceSimple()}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="total-price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <div>
                                    <span className="sub-total-price-label">
                                      VAT <strong> (5%)</strong>
                                    </span>{" "}
                                  </div>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="sub-total-price-value pl-1">
                                      {" "}
                                      {taxTotal}
                                    </span>
                                  </div>
                                </div>

                                <div className="coupon-main-div pt-3">
                                  <Row>
                                    <Col xs={12} className="coupon-label-div">
                                      <span className="coupon-label">
                                        Coupon:
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="coupon-input-fields-div d-flex">
                                    <Col>
                                      <div className="input-group">
                                        <input
                                          className="form-control-coupon col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8"
                                          name="couponCode"
                                          autoComplete="off"
                                          type="text"
                                          placeholder="Coupon Code"
                                          value={couponCode}
                                          onChange={(e) =>
                                            setCouponCode(e.target.value)
                                          }
                                        />

                                        {isCouponApplied ? (
                                          <>
                                            <button
                                              className="remove-coupon-btn button--submit"
                                              onClick={removeCoupon}
                                              id="remove-coupon-button"
                                              aria-label="Remove Coupon"
                                            >
                                              <RxCross2 />
                                            </button>
                                          </>
                                        ) : (
                                          <button
                                            className="apply-coupon-btn button--submit"
                                            onClick={applyCoupon}
                                            id="apply-coupon-button"
                                            aria-label="Apply Coupon"
                                          >
                                            <TiTick />
                                          </button>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </>
                              <hr />

                              {isCouponApplied && appliedCoupon && (
                                <div className="coupon-discount-main-div-container">
                                  <div
                                    className="total-price-row p-1"
                                    style={{
                                      lineHeight: "100%",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span className="grand-total-price-label">
                                      Total Price
                                    </span>
                                    <div className="del-value-main-div pb-3">
                                      AED{" "}
                                      <span className="coupon-discount-value">
                                        -{Math.round(appliedCoupon?.value)}
                                      </span>
                                      <span className="deleted-grand-total-price-value pl-1">
                                        {" "}
                                        {grandTotalPrice}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="total-price-row p-1"
                                    style={{
                                      lineHeight: "100%",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span className="discount-price-label">
                                      Total Discount
                                    </span>
                                    <div className="del-value-main-div pb-3">
                                      AED{" "}
                                      <span className="discounted-value">
                                        -{grandTotalDiscountedValue()}
                                      </span>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              )}
                              <div
                                className="total-price-row p-1"
                                style={{ lineHeight: "100%", fontSize: "16px" }}
                              >
                                <span className="grand-total-price-label">
                                  Total (incl. tax)
                                </span>
                                <div className="">
                                  AED{" "}
                                  <span className="grand-total-price-value pl-1">
                                    {" "}
                                    {grandTotalPriceWithDiscount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="booking-button-main-div-step2 d-flex flex-column pb-2 pt-3">
                      <button
                        onClick={handleStartBookingClick}
                        className="map-loc-middle py-3"
                        id="start-booking-button"
                        aria-label="Start Booking "
                      >
                        <span
                          className="animate-button start-booking-next-button-text btn4 fs-5"
                          id="start-booking-span"
                        >
                          <strong>Next</strong>
                        </span>
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        </Container>
      </div>
    </HelmetProvider>
  );
};

export default VehicleDetails;
