/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCarFrontFill,
  BsJustify,
  BsTags,
  BsPerson,
  BsSuitcase,
} from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import "./vehicleDetails.css";
import PickupLocationModal from "../homePage/pickupSearchBoxDropDown";
import DropoffLocationModal from "../homePage/dropoffSearchBoxDropDown";
import Pagination from "./pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
// import { useReload } from "../../PrivateComponents/utils";
// import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
import UseGlobalFormFields from "../Utils/useGlobalFormFields";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PageSize = 8;
const animatedComponents = makeAnimated();

const VehiclesPage = () => {
  const carTypeInURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(carTypeInURL.search),
    [carTypeInURL.search]
  );
  const pickupLocParam = queryParams?.get("pickupLoc");
  const dropoffLocParam = queryParams?.get("dropoffLoc");
  const startDateParam = queryParams?.get("startDate");
  const endDateParam = queryParams?.get("endDate");
  const carCategoryParam = queryParams?.get("carCategory");

  const pickupLocStateParam = queryParams?.get("pickupLocState");
  const dropoffLocStateParam = queryParams?.get("dropoffLocState");
  const pickupLocTabValueParam = queryParams?.get("pickupLocSelectedTab");
  const DropoffLocTabValueParam = queryParams?.get("dropoffLocSelectedTab");

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickupSelectedTab, setPickupSelectedTab] = useState(
    pickupLocTabValueParam || ""
  );
  const [dropoffSelectedTab, setDropoffSelectedTab] = useState(
    DropoffLocTabValueParam || ""
  );
  const [pickupStateValueProp, setPickupStateValueProp] = useState(
    pickupLocStateParam || "DUBAI"
  );
  const [dropoffStateValueProp, setDropoffStateValueProp] = useState(
    dropoffLocStateParam || "DUBAI"
  );

  const [loading, setLoading] = useState(true);
  const [validPrice, setValidPrice] = useState(false);

  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [carsData, setCarsData] = useState([]);
  const [carType, setCarType] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [carCategoriesData, setCarCategoriesData] = useState([]);
  const [tariffLines, setTariffLines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pickupLocationMessage, setPickupLocationMessage] = useState(
    pickupLocParam ?? ""
  );
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState(
    dropoffLocParam ?? ""
  );
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [inputPickupFieldValue, setPickupInputFieldValue] = useState("");
  const [inputDropoffFieldValue, setDropoffInputFieldValue] = useState("");
  const [activeSelection, setActiveSelection] = useState({
    startDate: false,
    endDate: false,
  });
  const [isCarCategoriesOpen, setIsCarCategoriesOpen] = useState(
    window.innerWidth > 425 ? true : false
  );
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(
    window.innerWidth > 425 ? true : false
  );
  const [isCarPriceRangeOpen, setIsCarPriceRangeOpen] = useState(
    window.innerWidth > 425 ? true : false
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const localStorageDataCalculation = () => {
    const reqLocalStorageData = localStorage?.getItem("formFields");
    if (reqLocalStorageData) {
      const storedFormFields = JSON.parse(reqLocalStorageData);
      let storedStartDateRange, storedEndDateRange;

      if (storedFormFields) {
        setShowDropoff(storedFormFields?.showDropoffV1 === 1);

        const pickupLocTabV1 = storedFormFields?.selectedTabPickUp;
        const dropoffLocTabV1 = storedFormFields?.selectedTabDropOff;

        if (storedFormFields?.dateRangeV1) {
          storedStartDateRange = new Date(
            storedFormFields?.dateRangeV1?.startDate
          );
          storedEndDateRange = new Date(storedFormFields?.dateRangeV1?.endDate);
          if (
            isNaN(storedStartDateRange.getTime()) ||
            isNaN(storedEndDateRange.getTime())
          ) {
            storedStartDateRange = new Date();
            storedEndDateRange = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            );
          }
        }

        if (pickupLocTabV1 === "pick") {
          setPickupLocationMessage(
            storedFormFields?.pickupInputMessageV1 || ""
          );
        } else if (pickupLocTabV1 === "deliver") {
          setPickupLocationMessage(
            storedFormFields?.deliveryMapLocPickUp || ""
          );
        }

        if (dropoffLocTabV1 === "pick") {
          setDropoffLocationMessage(
            storedFormFields?.dropoffInputMessageV1 || ""
          );
        } else if (dropoffLocTabV1 === "deliver") {
          setDropoffLocationMessage(
            storedFormFields?.deliveryMapLocDropOff || ""
          );
        }

        setPickUpTime(storedFormFields?.pickTimeV1 || "");
        setDropOffTime(storedFormFields?.dropTimeV1 || "");
        setPickupSelectedTab(
          storedFormFields?.selectedTabPickUp || pickupLocTabValueParam || ""
        );
        setDropoffSelectedTab(
          storedFormFields?.selectedTabDropOff || DropoffLocTabValueParam || ""
        );
        setPickupStateValueProp(
          storedFormFields?.pickupLocationStateV1 ||
            pickupLocStateParam ||
            "DUBAI"
        );
        setDropoffStateValueProp(
          storedFormFields?.dropoffLocationStateV1 ||
            dropoffLocStateParam ||
            "DUBAI"
        );
      }

      setDateRange([
        {
          startDate: storedStartDateRange || new Date(),
          endDate:
            storedEndDateRange ||
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          key: "selection",
        },
      ]);
    }
  };

  useEffect(() => {
    localStorageDataCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const { formFields, handleFieldChange } = UseGlobalFormFields({
    pickTimeV1: pickUpTime || "",
    dropTimeV1: dropOffTime || "",
    dateRangeV1: "",
    showDropoffV1: 0,
  });

  useEffect(() => {}, [dropoffLocationMessage]);

  useEffect(() => {
    const pickupTimeParam = queryParams?.get("pickupTime");
    if (pickupTimeParam && !pickUpTime) {
      setPickUpTime(pickupTimeParam);
    }
    if (showDropoff === false) {
      setDropoffLocationMessage(dropoffLocationMessage);
    }
  }, [queryParams, pickUpTime, showDropoff, dropoffLocationMessage]);

  const handlePickUpTimeChange = (selectedOption) => {
    setPickUpTime(selectedOption?.value);
    handleFieldChange("pickTimeV1", selectedOption?.value);
  };

  const handleDropOffTimeChange = (selectedOption) => {
    setDropOffTime(selectedOption?.value);
    handleFieldChange("dropTimeV1", selectedOption?.value);
  };

  const handleInputFieldChange = (value) => {
    setPickupInputFieldValue(value);
  };

  const defaultStartDate = new Date();
  const defaultEndDate = new Date(
    defaultStartDate.getTime() + 24 * 60 * 60 * 1000
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: startDateParam ? new Date(startDateParam) : defaultStartDate,
      endDate: endDateParam ? new Date(endDateParam) : defaultEndDate,
      key: "selection",
    },
  ]);

  const startDate = useMemo(() => dateRange[0].startDate, [dateRange]);
  const endDate = useMemo(() => dateRange[0].endDate, [dateRange]);

  const startDateFunc = new Date(startDate);
  if (
    startDateFunc.toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0] ||
    startDateFunc.toISOString().split("T")[0] === startDateParam
  ) {
    startDateFunc.setDate(startDateFunc.getDate());
  } else startDateFunc.setDate(startDateFunc.getDate() + 1);

  const endDateFunc = new Date(endDate);
  if (
    endDateFunc.toISOString().split("T")[0] ===
      new Date(defaultStartDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0] ||
    endDateFunc.toISOString().split("T")[0] === endDateParam
  ) {
    endDateFunc.setDate(endDateFunc.getDate());
  } else endDateFunc.setDate(endDateFunc.getDate() + 1);

  const datePickerStartDate = encodeURIComponent(
    startDateFunc.toISOString()
  ).split("T")[0];
  const datePickerEndDate = encodeURIComponent(endDateFunc.toISOString()).split(
    "T"
  )[0];

  useEffect(() => {
    if (pickUpDate && dropOffDate) {
    }
  }, [pickUpDate, dropOffDate]);

  const validateTimeDifference = (
    pickUpDateV,
    dropOffDateV,
    pickUpTime,
    dropOffTime
  ) => {
    const pickUpDateObj = new Date(pickUpDateV);
    const dropOffDateObj = new Date(dropOffDateV);

    if (pickUpDateObj.toDateString() !== dropOffDateObj.toDateString()) {
      return true;
    }

    const [pickUpHour, pickUpMinute, pickUpPeriod] = pickUpTime.split(/[: ]/);
    const [dropOffHour, dropOffMinute, dropOffPeriod] =
      dropOffTime.split(/[: ]/);

    const pickUpDateWithTime = new Date(pickUpDateV);
    const dropOffDateWithTime = new Date(dropOffDateV);

    pickUpDateWithTime.setHours(
      pickUpPeriod === "PM" && pickUpHour !== "12"
        ? parseInt(pickUpHour) + 12
        : pickUpPeriod === "AM" && pickUpHour === "12"
        ? 0
        : parseInt(pickUpHour)
    );
    pickUpDateWithTime.setMinutes(parseInt(pickUpMinute));

    dropOffDateWithTime.setHours(
      dropOffPeriod === "PM" && dropOffHour !== "12"
        ? parseInt(dropOffHour) + 12
        : dropOffPeriod === "AM" && dropOffHour === "12"
        ? 0
        : parseInt(dropOffHour)
    );
    dropOffDateWithTime.setMinutes(parseInt(dropOffMinute));

    const timeDifference =
      (dropOffDateWithTime - pickUpDateWithTime) / (1000 * 60);

    return timeDifference >= 60;
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

      return tariffLines;
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
      return [];
    }
  }, []);

  const fetchCarsData = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const startDate = encodeURIComponent(
        dateRange[0].startDate.toISOString()
      );
      const endDate = encodeURIComponent(dateRange[0].endDate.toISOString());
      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/SearchVehicleRates?startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.post(url, {}, { headers });
      const titles = response?.data?.result?.items?.map((item) => item?.title);
      setCarType(titles);
      const cars = response?.data?.result?.items || [];
      setCarsData(cars);

      const tariffPromises = cars?.map((car) =>
        fetchVehicleRentRates(car?.tariffGroupId)
      );
      const tariffs = await Promise.all(tariffPromises);
      const tariffMap = {};
      cars?.forEach((car, index) => {
        tariffMap[car?.tariffGroupId] = tariffs[index];
      });

      setTariffLines(tariffMap);

      const allPricesValid = cars?.every(
        (car) => renderVehiclePrices(car?.tariffGroupId) > 0
      );
      setValidPrice(allPricesValid);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
      setLoading(false);
    }
  }, [dateRange, fetchVehicleRentRates]);

  useEffect(() => {
    fetchCarsData();
  }, [dateRange, fetchCarsData]);

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

  const renderVehiclePrices = useCallback(
    (tariffGroupId) => {
      const days = numberOfDays;

      const tariffs = tariffLines[tariffGroupId] || [];

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
    [numberOfDays, tariffLines]
  );

  useEffect(() => {
    if (loading && carsData.length > 0) {
      for (const car of carsData) {
        const price = renderVehiclePrices(car?.tariffGroupId);
        if (price > 0) {
          setLoading(false);
          break;
        }
      }
    }
  }, [carsData, renderVehiclePrices]);

  const categoryMap = {
    Standard: "Sedan",
    "Small SUV 5 Seater": "SUV",
    Compact: "HatchBack",
    Fullsize: "7 Seater",
  };

  const fetchAllCategories = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/getSettings`;
      const response = await axios.post(url, {}, { headers });

      const requiredCategories = [
        "Standard",
        "Small SUV 5 Seater",
        "Compact",
        "Fullsize",
      ];

      const categoryMap1 = {
        Standard: "Sedan",
        "Small SUV 5 Seater": "SUV",
        Compact: "HatchBack",
        Fullsize: "7 Seater",
      };

      const filteredAndRenamedCategories = response?.data?.result?.categories
        .filter((category) => requiredCategories?.includes(category?.name))
        .map((category) => ({
          id: category?.id,
          name: categoryMap1[category?.name] || category?.name,
        }));

      setCarCategoriesData(filteredAndRenamedCategories);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const normalizedCarCategories = useMemo(
    () =>
      carCategoriesData?.map((cat) => ({
        ...cat,
        name: cat?.name?.toUpperCase(),
      })),
    [carCategoriesData]
  );

  const enhanceCategoryData = useCallback(() => {
    const categoryDetailsMap = new Map();
    const categoryMap = {
      Standard: "Sedan",
      "Small SUV 5 Seater": "SUV",
      Compact: "HatchBack",
      Fullsize: "7 Seater",
    };

    carsData?.forEach((car) => {
      if (car?.acrissCategory) {
        const key = `${car?.acrissCategory?.code}-${car?.acrissCategory?.name}`;
        if (!categoryDetailsMap.has(key)) {
          const renamedName =
            categoryMap[car?.acrissCategory?.name] || car?.acrissCategory?.name;
          categoryDetailsMap?.set(key, {
            id: car?.acrissCategory?.id,
            name: renamedName,
            code: car?.acrissCategory?.code,
          });
        }
      }
    });

    const updatedCategories = [...categoryDetailsMap.values()];
    setCarCategoriesData(updatedCategories);
  }, [carsData]);

  useEffect(() => {
    if (carsData?.length > 0) {
      enhanceCategoryData();
    }
  }, [carsData, enhanceCategoryData]);

  useEffect(() => {
    if (carCategoryParam && normalizedCarCategories?.length > 0) {
      const matchedCategory = normalizedCarCategories.find((cat) => {
        const isMatch =
          cat?.name?.toUpperCase() === carCategoryParam?.toUpperCase();
        return isMatch;
      });

      if (matchedCategory) {
        setSelectedCategories([
          { label: matchedCategory?.name, value: matchedCategory?.id },
        ]);
      }
    }
  }, [carCategoryParam, normalizedCarCategories]);

  const carFeaturesWithIcons = [
    {
      name: "Person Seats",
      value: null,
      featureIcon: BsPerson,
    },

    // {
    //   name: "Doors",
    //   value: 5,
    //   featureIcon: GiCarDoor,
    // },
    {
      name: "Automatic",
      value: "A",
      featureIcon: GiGearStickPattern,
    },

    {
      name: "Air Bags",
      value: 2,
      featureIcon: BsSuitcase,
    },
    {
      name: "AC",
      value: "AC",
      featureIcon: LuSnowflake,
    },
  ];

  const dataArray = [];

  carsData?.forEach((item) => {
    const dataObject = {
      category: item?.acrissCategory?.name,
      fuel: item?.acrissFuelAc?.name,
      type: item?.acrissType?.name,
      transmission: item?.acrissTransDrive?.name,
      passengerCapacity: item?.passengerCapacity,
      smallBagsCapacity: item?.smallBagsCapacity,
      largeBagsCapacity: item?.largeBagsCapacity,
      tariffGroupId: item?.tariffGroupId,
    };
    dataArray.push(dataObject);
  });

  const sortByDropDown = [
    { label: "Recommended", value: "Recommended" },
    { label: "Low to High", value: "LowToHigh" },
    { label: "High to Low", value: "HighToLow" },
  ];

  const generateTimeSlots = () => {
    const timeSlots = [];
    let hour = 7;
    let minute = 0;
    let ampm = "AM";
    while (!(hour === 23 && minute === 30)) {
      let formattedHour;
      if (hour <= 12) {
        formattedHour = hour.toString().padStart(2, "0");
      } else {
        const newhour = hour - 12;
        formattedHour = newhour.toString().padStart(2, "0");
      }

      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute} ${ampm}`;
      timeSlots.push({ label: time, value: time });

      minute += 30;
      if (minute === 60) {
        hour++;
        minute = 0;
      }
      if (hour === 12 && minute === 0) {
        ampm = "PM";
      }
    }

    return timeSlots;
  };

  const timeOptions = generateTimeSlots();

  const handlePickUpButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In delivery");
    } else if (option === "Pick") {
      console.log("In pick");
    }
    setPickupLocation(option);
    setShowPickupModal(false);
  };

  const handleDropOffButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In deliver drop off");
    } else if (option === "Pick") {
      console.log("In drop off pick");
    }
    setDropoffLocation(option);
    setShowDropoffModal(false);
  };

  const handleDropoffCheckboxChange = () => {
    setShowDropoff(!showDropoff);
    handleFieldChange("showDropoffV1", !showDropoff ? 1 : 0);
  };

  const onPickupSelectTabChange = (tab) => {
    console.log("pickupSelectedTab Tab in all vehciles page is :", tab);
    setPickupSelectedTab(tab);
  };

  const onDropoffSelectTabChange = (tab) => {
    console.log("dropoffSelectedTab Tab in all vehciles page is :", tab);
    setDropoffSelectedTab(tab);
  };

  const handlePickupStateChange = (stateName) => {
    setPickupStateValueProp(stateName);
    console.log("Pickup state changed to:", stateName);
  };

  const handleDropoffStateChange = (stateName) => {
    setDropoffStateValueProp(stateName);
    console.log("Dropoff state changed to:", stateName);
  };

  const allCarsBookingButton = (
    tariffGroupId,
    vehicleName,
    startDate,
    endDate,
    calculatedVehiclePrice
  ) => {
    const missingFields = [];
    if (!pickupLocationMessage) {
      missingFields.push("Pickup location");
    }
    if (!pickUpTime) {
      missingFields.push("Pickup time");
    }
    if (!dropOffTime) {
      missingFields.push("Dropoff time");
    }
    if (showDropoff && !dropoffLocationMessage) {
      missingFields.push("Dropoff location");
    }
    const timeDiffChecker = validateTimeDifference(
      startDate,
      endDate,
      pickUpTime,
      dropOffTime
    );
    if (timeDiffChecker === false) {
      toast.error(
        "The difference between pickup and dropoff time should be at least 60 minutes.",
        {
          autoClose: 1000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            lineHeight: "18px",
            fontSize: "14px",
          },
        }
      );
      return;
    }

    if (missingFields.length > 0) {
      const errorMessage = `${missingFields.join(", ")} field(s) are missing.`;
      toast.error(errorMessage, {
        autoClose: 2000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
      return;
    }

    localStorageDataCalculation();

    console.log("Pickup state value prop is:", pickupStateValueProp);
    console.log("Dropoff State Value Prop state is: ", dropoffStateValueProp);

    navigate(
      `/bookingPage/1?tariffGroupId=${tariffGroupId}&vehicleName=${vehicleName}&startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}&pickupLoc=${pickupLocationMessage}&dropoffLoc=${dropoffLocationMessage}&pickupLocState=${pickupStateValueProp}&dropoffLocState=${dropoffStateValueProp}&pickupLocSelectedTab=${pickupSelectedTab}&dropoffLocSelectedTab=${dropoffSelectedTab}&checkBoxValue=${showDropoff}&noOfDays=${numberOfDays}&vehiclePrice=${calculatedVehiclePrice}`
    );
  };

  const filterCars = useMemo(() => {
    const filteredCars = carsData?.filter((car) => {
      const currentCarCategory = normalizedCarCategories.find(
        (cat) => cat?.id === car?.acrissCategory?.id
      );

      const categoryMatch =
        selectedCategories?.length === 0 ||
        selectedCategories.some((selectedCategory) => {
          const valueMatch = selectedCategory?.value === currentCarCategory?.id;
          const labelMatch =
            selectedCategory?.label?.toUpperCase() ===
            currentCarCategory?.name?.toUpperCase();

          return valueMatch && labelMatch;
        });

      const typeMatch =
        selectedCarTypes?.length === 0 || selectedCarTypes.includes(car?.title);

      const priceMatch =
        (minPrice === "" || car?.rate >= minPrice) &&
        (maxPrice === "" || car?.rate <= maxPrice);

      return categoryMatch && typeMatch && priceMatch;
    });

    return filteredCars?.sort((a, b) => {
      switch (sortBy) {
        case "LowToHigh":
          return a?.rate - b?.rate;
        case "HighToLow":
          return b?.rate - a?.rate;
        case "Recommended":
          return b?.discount - a?.discount;
        default:
          return 0;
      }
    });
  }, [
    carsData,
    minPrice,
    maxPrice,
    selectedCarTypes,
    selectedCategories,
    sortBy,
    normalizedCarCategories,
  ]);

  const filteredCarTypes = useMemo(() => {
    if (selectedCategories.length === 0) {
      return carType;
    }

    const selectedCategoryIds = selectedCategories.map(
      (category) => category.value
    );

    const typesInSelectedCategories = carsData
      .filter((car) => selectedCategoryIds.includes(car.acrissCategory.id))
      .map((car) => car.title);

    return [...new Set(typesInSelectedCategories)];
  }, [selectedCategories, carsData, carType]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(
      selectedOptions?.map((option) => {
        const category = carCategoriesData?.find(
          (cat) =>
            cat?.id === option?.id &&
            cat?.name?.toUpperCase() === option?.label?.toUpperCase()
        );
        return category ? { id: category?.id, label: category?.name } : option;
      })
    );
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterCars.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterCars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCarTypeCheckboxChange = (type) => {
    setSelectedCarTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleClearAllFilters = () => {
    setSelectedCarTypes([]);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setActiveSelection({ startDate: false, endDate: false });
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    const pickupDate = startDate ? startDate?.toLocaleDateString() : null;
    const dropoffDate = endDate ? endDate?.toLocaleDateString() : null;

    setPickUpDate(pickupDate);
    setDropOffDate(dropoffDate);

    setActiveSelection((prev) => ({
      startDate: true,
      endDate: prev.startDate ? true : false,
    }));

    if (activeSelection.startDate && endDate) {
      setShowDateRangeModal(false);
    }

    const updatedStartDate = startDate
      ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
      : null;
    const updatedEndDate = endDate
      ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000)
      : null;

    const dateRangeObject = {
      startDate: updatedStartDate.toISOString().split("T")[0],
      endDate: updatedEndDate.toISOString().split("T")[0],
    };

    handleFieldChange("dateRangeV1", dateRangeObject);

    setDateRange([ranges.selection]);
  };

  const calculateNumberOfDays = (
    startDate,
    endDate,
    pickUpTime,
    dropOffTime
  ) => {
    const [startHour, startMinute] = pickUpTime?.split(/[: ]/);
    const [endHour, endMinute] = dropOffTime?.split(/[: ]/);

    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(
      pickUpTime.includes("PM") && startHour !== "12"
        ? parseInt(startHour) + 12
        : parseInt(startHour),
      parseInt(startMinute)
    );

    end.setHours(
      dropOffTime.includes("PM") && endHour !== "12"
        ? parseInt(endHour) + 12
        : parseInt(endHour),
      parseInt(endMinute)
    );

    const timeDifference = end - start;
    const totalHours = timeDifference / (1000 * 60 * 60);
    const totalDays = Math.ceil(totalHours / 24);

    return totalDays;
  };

  useEffect(() => {
    if (startDate && endDate && pickUpTime && dropOffTime) {
      const totalDays = calculateNumberOfDays(
        startDate,
        endDate,
        pickUpTime,
        dropOffTime
      );

      setNumberOfDays(totalDays);
    }
  }, [startDate, endDate, pickUpTime, dropOffTime]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDatePicker &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDatePicker]);

  const toggleCarCategories = () => {
    setIsCarCategoriesOpen(!isCarCategoriesOpen);
  };

  const toggleCarType = () => {
    setIsCarTypeOpen(!isCarTypeOpen);
  };

  const toggleCarPriceRange = () => {
    setIsCarPriceRangeOpen(!isCarPriceRangeOpen);
  };

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-13px",
      marginRight: "-14px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#e87a28" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#e87a28" : "rgb(229, 229, 229)",
      },
    }),
  };

  const selectCategoriesStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-7px",
      marginRight: "-8px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#e87a28" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#e87a28" : "#e87a28",
        color: isSelected ? "gray" : "white",
      },
    }),
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fleet | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://milelecarrental.com/vehicles" />
      </Helmet>
      <HeaderCombination />
      <div id="main" className="pb-2 ">
        <>
          <div className="all-cars-main-container-div container">
            <div className="vehicles-page-main-container">
              <div className="searchbox-container">
                <div className="form-group pb-4 pt-4">
                  <Row className=" d-flex justify-content-center">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="all-cars-search-box-container pb-4"
                    >
                      <form action="">
                        <Row>
                          <Col xxl={3} lg={3} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formDropoffDateTime">
                              <div className="date-label">
                                <label className="styled-label">
                                  <BsCalendar2Check className="mr-2" />
                                  <b>Pickup-Dropoff Date *</b>
                                </label>
                              </div>
                              <div onClick={handleDateClick} ref={dateInputRef}>
                                <input
                                  className="form-control-date mt-2 col-12"
                                  type="text"
                                  value={
                                    formFields?.dateRangeV1?.startDate &&
                                    formFields?.dateRangeV1?.endDate
                                      ? `${new Date(
                                          formFields?.dateRangeV1?.startDate
                                        ).toLocaleDateString()} - ${new Date(
                                          formFields?.dateRangeV1?.endDate
                                        ).toLocaleDateString()}`
                                      : "Select date range"
                                  }
                                  onClick={() => setShowDateRangeModal(true)}
                                  readOnly
                                />
                              </div>
                            </Form.Group>
                          </Col>

                          <Modal
                            show={showDateRangeModal}
                            onHide={() => setShowDateRangeModal(false)}
                            size="sm"
                          >
                            <DateRange
                              editableDateInputs={true}
                              onChange={handleDateChange}
                              moveRangeOnFirstSelection={false}
                              ranges={dateRange}
                              rangeColors={["#e87a28"]}
                              disabledDay={(date) =>
                                date < new Date().setHours(0, 0, 0, 0)
                              }
                              onClose={() => setShowDatePicker(false)}
                            />
                          </Modal>
                          <Col
                            xxl={5}
                            lg={5}
                            md={showDropoff ? 9 : 6}
                            sm={12}
                            xs={12}
                          >
                            <Row>
                              <Col
                                xxl={showDropoff ? 6 : 12}
                                lg={showDropoff ? 6 : 12}
                                md={showDropoff ? 6 : 12}
                                sm={6}
                                xs={12}
                                className={` ${
                                  showDropoff
                                    ? "dropoff-visible"
                                    : "dropoff-hidden"
                                }`}
                              >
                                <Form.Group controlId="formKeyword">
                                  <div className="location-label">
                                    <label className="styled-label">
                                      <BsGeoAlt className="mr-2" />
                                      <b>Pick-Up *</b>
                                    </label>
                                  </div>
                                  <div className="custom-dropdown-container">
                                    <input
                                      className="form-control-location mt-2 col-12"
                                      type="text"
                                      placeholder="Enter pickup location"
                                      value={pickupLocationMessage}
                                      onChange={() =>
                                        console.log("On change in pickup")
                                      }
                                      onClick={() => setShowPickupModal(true)}
                                    />
                                  </div>
                                </Form.Group>
                              </Col>

                              {showDropoff ? (
                                <Col xxl={6} lg={6} md={6} sm={6} xs={12}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label">
                                        <BsGeoAltFill className="mr-2" />
                                        <b>Drop-Off *</b>
                                      </label>
                                    </div>
                                    <div className="custom-dropdown-container">
                                      <input
                                        className="form-control-location mt-2 col-12"
                                        type="text"
                                        placeholder="Enter dropoff location"
                                        value={dropoffLocationMessage}
                                        onChange={() =>
                                          console.log("On change in dropoff")
                                        }
                                        onClick={() =>
                                          setShowDropoffModal(true)
                                        }
                                      />
                                    </div>
                                  </Form.Group>
                                </Col>
                              ) : null}
                            </Row>
                            <Row>
                              <div className="mt-2">
                                <Form.Check
                                  type="checkbox"
                                  label="Different Dropoff Location"
                                  onChange={handleDropoffCheckboxChange}
                                  checked={showDropoff}
                                />
                              </div>
                            </Row>
                          </Col>

                          <Modal
                            show={showPickupModal}
                            onHide={() => setShowPickupModal(false)}
                            size="xl"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                <span className="modal-heading">
                                  {" "}
                                  Pickup Location{" "}
                                </span>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <PickupLocationModal
                                show={showPickupModal}
                                handleButtonClick={handlePickUpButtonClick}
                                updatePickupLocationMessage={
                                  setPickupLocationMessage
                                }
                                initialSelectedLocation={pickupLocation}
                                initialInputFieldValue={pickupLocationMessage}
                                inputPickupFieldValue={inputPickupFieldValue}
                                setPickupInputFieldValue={
                                  setPickupInputFieldValue
                                }
                                handleInputFieldChange={handleInputFieldChange}
                                onSelectTabChange={onPickupSelectTabChange}
                                onStateChange={handlePickupStateChange}
                              />
                            </Modal.Body>
                          </Modal>

                          <Modal
                            show={showDropoffModal}
                            onHide={() => setShowDropoffModal(false)}
                            size="xl"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                {" "}
                                <span className="modal-heading">
                                  DropOff Location{" "}
                                </span>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <DropoffLocationModal
                                show={showDropoffModal}
                                handleButtonClick={handleDropOffButtonClick}
                                updateDropoffLocationMessage={
                                  setDropoffLocationMessage
                                }
                                initialSelectedLocation={dropoffLocation}
                                initialInputFieldValue={dropoffLocationMessage}
                                inputDropoffFieldValue={inputDropoffFieldValue}
                                setDropoffInputFieldValue={
                                  setDropoffInputFieldValue
                                }
                                handleInputFieldChange={handleInputFieldChange}
                                onSelectTabChange={onDropoffSelectTabChange}
                                onStateChange={handleDropoffStateChange}
                              />
                            </Modal.Body>
                          </Modal>

                          <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label mb-3">
                                  <b>Pickup Time *</b>
                                </label>
                              </div>
                              <Select
                                options={timeOptions}
                                required
                                className="form-control-pickup-time col-12"
                                value={timeOptions?.find(
                                  (option) =>
                                    option?.value === formFields?.pickTimeV1
                                )}
                                onChange={handlePickUpTimeChange}
                                styles={selectStyles}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label mb-3">
                                  <b>Dropoff Time *</b>
                                </label>
                              </div>
                              <Select
                                options={timeOptions}
                                required
                                className="form-control-dropoff-time col-12"
                                value={timeOptions.find(
                                  (option) =>
                                    option?.value === formFields?.dropTimeV1
                                )}
                                onChange={handleDropOffTimeChange}
                                styles={selectStyles}
                              />
                            </Form.Group>
                          </Col>
                          <ToastContainer />
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <Container fluid className="all-cars-container pb-4">
              <Row>
                <Col xxl={3} lg={3} md={4} className="filters-section">
                  <div className="filters-heading">
                    <div className="row d-flex">
                      <Col>
                        <h4 className="filters-text">Filters</h4>
                      </Col>
                      <Col className="clear-filters-container text-end">
                        <span
                          className="clear-filters "
                          onClick={handleClearAllFilters}
                        >
                          Reset <RxCross2 />
                        </span>
                      </Col>
                    </div>
                  </div>

                  <div className="card search-filters-card ">
                    <article className="card-group-item">
                      <div className="car-categories-label">
                        <header
                          className="card-header styled-label pt-3 pb-3"
                          onClick={toggleCarCategories}
                        >
                          <div className="car-categories-filter-container d-flex justify-content-between align-items-center">
                            <div className="car-categories-icon-title">
                              <BsCarFrontFill className="mr-2" />
                              <b>Car Categories</b>
                            </div>
                            <div className="car-categories-open-close-modal ">
                              {isCarCategoriesOpen ? (
                                <>
                                  <div className="categories-open-icon">
                                    <AiOutlineMinusCircle className="text-right" />
                                  </div>
                                </>
                              ) : (
                                <div className="categories-open-icon">
                                  <AiOutlinePlusCircle className="text-right" />
                                </div>
                              )}
                            </div>
                          </div>
                        </header>
                      </div>{" "}
                      {isCarCategoriesOpen && (
                        <div className="filter-content">
                          <div className="card-body">
                            <article className="card-group-item">
                              <div className="car-card">
                                <Select
                                  isMulti
                                  components={animatedComponents}
                                  options={carCategoriesData?.map(
                                    (category) => ({
                                      value: category?.id,
                                      label: category?.name,
                                    })
                                  )}
                                  value={selectedCategories}
                                  onChange={handleCategoryChange}
                                  styles={selectCategoriesStyles}
                                  getOptionLabel={(option) => (
                                    <div
                                      id={`${option.label.replace(
                                        /\s+/g,
                                        "-"
                                      )}-category-button`}
                                    >
                                      {option.label}
                                    </div>
                                  )}
                                />
                              </div>
                            </article>
                          </div>
                        </div>
                      )}
                    </article>
                  </div>

                  <div className="card search-filters-card checkbox-container">
                    <article className="card-group-item">
                      <div className="car-type-filter-label">
                        <header
                          className="card-header styled-label title car-type-filter-heading pt-3 pb-3"
                          onClick={toggleCarType}
                        >
                          <div className="car-type-filter-container d-flex justify-content-between align-items-center">
                            <div className="car-type-icon-title">
                              <BsJustify className="mr-2" />
                              <b>Models</b>
                            </div>
                            <div className="car-type-open-close-modal ">
                              {isCarTypeOpen ? (
                                <>
                                  <div className="type-open-icon">
                                    <AiOutlineMinusCircle className="text-right" />
                                  </div>
                                </>
                              ) : (
                                <div className="type-open-icon">
                                  <AiOutlinePlusCircle className="text-right" />
                                </div>
                              )}
                            </div>
                          </div>
                        </header>
                      </div>
                      {isCarTypeOpen && (
                        <div className="filter-content">
                          <div className="card-body car-type-filter">
                            {filteredCarTypes?.map((type, index) => (
                              <label
                                className="form-check flipBox"
                                aria-label={`Checkbox ${index}`}
                                key={`${type}-type`}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`${type}-type`}
                                  value={type}
                                  checked={selectedCarTypes.includes(type)}
                                  onChange={() =>
                                    handleCarTypeCheckboxChange(type)
                                  }
                                />
                                <span className="form-check-label">{type}</span>
                                <div className="flipBox_boxOuter">
                                  <div className="flipBox_box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>

                    <article className="card-group-item">
                      <div className="car-price-filter-label">
                        <header
                          className="card-header styled-label price-filter-heading pt-3 pb-3"
                          onClick={toggleCarPriceRange}
                        >
                          <div className="car-type-filter-container d-flex justify-content-between align-items-center">
                            <div className="car-type-icon-title">
                              <BsTags className="mr-2" />
                              <b>Price Range ( </b>per day <b>)</b>
                            </div>
                            <div className="car-price-range-open-close-modal ">
                              {isCarPriceRangeOpen ? (
                                <>
                                  <div className="price-range-open-icon">
                                    <AiOutlineMinusCircle className="text-right" />
                                  </div>
                                </>
                              ) : (
                                <div className="price-range-open-icon">
                                  <AiOutlinePlusCircle className="text-right" />
                                </div>
                              )}
                            </div>
                          </div>
                        </header>
                      </div>
                      {isCarPriceRangeOpen && (
                        <div className="filter-content">
                          <div className="card-body">
                            <div className="">
                              <div className="form-group col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0">
                                <label
                                  htmlFor="minPrice"
                                  className="price-range-label"
                                >
                                  Minimum Price
                                </label>
                                <input
                                  className="form-control-login"
                                  name="minPrice"
                                  autoComplete="off"
                                  type="number"
                                  min={0}
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                  placeholder="Minimum"
                                />
                              </div>

                              <div className="form-group col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0">
                                <label
                                  htmlFor="maxPrice"
                                  className="price-range-label"
                                >
                                  Maximum Price
                                </label>

                                <input
                                  className="form-control-login "
                                  name="maxPrice"
                                  autoComplete="off"
                                  type="number"
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(e.target.value)}
                                  placeholder="Maximum"
                                  min={minPrice}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  </div>
                </Col>

                <Col xxl={9} lg={9} md={8}>
                  <div className="all-cars-section ">
                    <Row className="d-flex justify-content-end">
                      <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                        <div className="sort-by-dropdown">
                          <Row className="sort-by-row  mb-4">
                            <Col>
                              <Form.Group controlId="formSortBy">
                                <Form.Label className="styled-label mt-2">
                                  <h5>
                                    {" "}
                                    <b>Sort By:</b>
                                  </h5>
                                </Form.Label>
                                <Select
                                  options={sortByDropDown}
                                  required
                                  className="form-control-sort-by col-12"
                                  setSortBy
                                  onChange={(selectedOption) => {
                                    setSortBy(selectedOption?.value);
                                  }}
                                  defaultValue={sortByDropDown[0]}
                                  styles={selectStyles}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>

                    <>
                      <h1 className="pb-2 all-cars-heading">All Cars</h1>
                      <h2 className="all-cars-h2 d-none">All Cars</h2>
                      <br />
                      {loading ? (
                        <div className="text-center">
                          <>Loading Cars...</>
                        </div>
                      ) : (
                        <>
                          <Row className="offers-car-container-row">
                            {currentTableData?.map((car, index) => {
                              const price = renderVehiclePrices(
                                car?.tariffGroupId
                              );

                              return (
                                <Col
                                  key={car?.tariffGroupId}
                                  xxl={6}
                                  lg={6}
                                  md={12}
                                  sm={12}
                                  className="all-cars-container-div pb-5"
                                >
                                  <div className="single-car-container-div pb-3">
                                    <div className="car-name-div">
                                      <span className="car-name text-end">
                                        {" "}
                                        <b>{car?.title}</b> | (
                                        {categoryMap[
                                          car?.acrissCategory?.name
                                        ] || car?.acrissCategory?.name}{" "}
                                        )
                                      </span>
                                    </div>
                                    <div className="car-image-container ">
                                      <img
                                        src={car?.displayImageUrl}
                                        title={`${car?.title}`}
                                        alt={`Rent ${car?.title}`}
                                        className="car-image"
                                        // id={`pay-now-for-${car?.title
                                        //   .replace(/\s+/g, "-")
                                        //   .toLowerCase()}-button`}
                                      />
                                    </div>
                                    <div className="all-vehicles-features-icons features-scroll-container text-center">
                                      {dataArray?.map((carData, dataIndex) => (
                                        <span key={dataIndex}>
                                          {carFeaturesWithIcons?.map(
                                            (carFeature, featureIndex) => {
                                              const showIcon =
                                                carData?.tariffGroupId ===
                                                car?.tariffGroupId;
                                              let value;
                                              switch (carFeature?.name) {
                                                case "Person Seats":
                                                  value =
                                                    carData?.passengerCapacity;
                                                  break;
                                                case "Automatic":
                                                  value = carData?.transmission
                                                    ? carData?.transmission
                                                        .split("/")[0]
                                                        .charAt(0)
                                                    : "N";
                                                  break;
                                                case "Air Bags":
                                                  value =
                                                    carData?.smallBagsCapacity +
                                                    carData?.largeBagsCapacity;
                                                  break;
                                                case "AC":
                                                  value = "AC";
                                                  break;
                                                default:
                                                  value =
                                                    carData[carFeature?.name];
                                                  break;
                                              }

                                              return value !== undefined &&
                                                value !== null &&
                                                showIcon === true ? (
                                                <span
                                                  key={featureIndex}
                                                  className="single-feature-container features-values"
                                                >
                                                  {carFeature?.name !==
                                                    "Doors" && (
                                                    <>
                                                      <carFeature.featureIcon className="all-car-icons" />{" "}
                                                    </>
                                                  )}
                                                  <span className="">
                                                    {value}
                                                  </span>
                                                </span>
                                              ) : null;
                                            }
                                          )}
                                        </span>
                                      ))}
                                    </div>

                                    <hr className="discount-line" />

                                    <div className="d-flex justify-content-center">
                                      <div className="col-xxl-10 col-lg-11 col-md-12 col-sm-12 col-12 d-flex justify-content-center flex-column">
                                        <>
                                          <button
                                            className="map-loc-middle"
                                            onClick={() => {
                                              const vehiclePrice =
                                                renderVehiclePrices(
                                                  car.tariffGroupId
                                                );
                                              allCarsBookingButton(
                                                car?.tariffGroupId,
                                                `${car?.title} - ${
                                                  categoryMap[
                                                    car?.acrissCategory?.name
                                                  ] || car?.acrissCategory?.name
                                                }`,
                                                datePickerStartDate,
                                                datePickerEndDate,
                                                vehiclePrice
                                              );
                                            }}
                                          >
                                            {numberOfDays > 0 ? (
                                              <span className="all-cars-animate-button btn4">
                                                <span className="label">
                                                  Pay Now{" "}
                                                  <span
                                                    className="pay-now-price-md-lg"
                                                    id={`pay-now-for-${car?.title
                                                      .replace(/\s+/g, "-")
                                                      .toLowerCase()}-button`}
                                                  >
                                                    <span>|</span> AED:{" "}
                                                    {renderVehiclePrices(
                                                      car?.tariffGroupId
                                                    )}{" "}
                                                    | {numberOfDays} day(s)
                                                  </span>
                                                  <div className="pay-now-price-xs">
                                                    AED:{" "}
                                                    {renderVehiclePrices(
                                                      car?.tariffGroupId
                                                    )}{" "}
                                                    | {numberOfDays} day(s)
                                                  </div>
                                                </span>
                                              </span>
                                            ) : (
                                              <>
                                                <span className="animate-button btn4">
                                                  <span
                                                    className="label"
                                                    id={`pay-now-for-${car?.title
                                                      .replace(/\s+/g, "-")
                                                      .toLowerCase()}-button`}
                                                  >
                                                    Pay Now{" "}
                                                  </span>
                                                </span>
                                              </>
                                            )}
                                          </button>
                                        </>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                          <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={filterCars?.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                          />
                        </>
                      )}
                    </>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      </div>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default VehiclesPage;
