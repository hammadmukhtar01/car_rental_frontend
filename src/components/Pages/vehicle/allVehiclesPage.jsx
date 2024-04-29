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
import { LuSnowflake, LuSearch } from "react-icons/lu";
import "./vehicleDetails.css";
import PickupLocationModal from "../homePage/pickupSearchBoxDropDown";
import DropoffLocationModal from "../homePage/dropoffSearchBoxDropDown";
import Pagination from "./pagination";
import MainNavbar from "../navbar/mainNavbar";
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

const PageSize = 8;
const animatedComponents = makeAnimated();

const VehiclesPage = () => {
  const carTypeInURL = useLocation();
  const queryParams = new URLSearchParams(carTypeInURL.search);
  // const initialCarType = queryParams.get("carType");
  const pickupLocParam = queryParams.get("pickupLoc");
  const dropoffLocParam = queryParams.get("dropoffLoc");
  // const pickupTimeParam = queryParams.get("pickupTime");
  // const dropoffTimeParam = queryParams.get("dropoffTime");
  const startDateParam = queryParams.get("startDate");
  const endDateParam = queryParams.get("endDate");
  const carCategoryParam = queryParams.get("carCategory");

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");

  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];
  const [carsData, setCarsData] = useState([]);
  const [carType, setCarType] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [carCategoriesData, setCarCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pickupLocationMessage, setPickupLocationMessage] = useState(
    pickupLocParam || ""
  );
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState(
    dropoffLocParam || ""
  );
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [pickupLocStateValue, setPickupLocStateValue] = useState("DUBAI");
  const [dropoffLocStateValue, setDropoffLocStateValue] = useState("DUBAI");

  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [inputPickupFieldValue, setPickupInputFieldValue] = useState("");
  const [inputDropoffFieldValue, setDropoffInputFieldValue] = useState("");

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

  // useEffect(() => {
  //   const storedFormFields =
  //     JSON.parse(localStorage.getItem("formFields")) || {};
  //   const queryParams = new URLSearchParams(window.location.search);
  //   let storedStartDateRange;
  //   let storedEndDateRange;
  //   const {
  //     showDropoffV1: storedShowDropoff = false,
  //     selectedTabPickUp,
  //     selectedTabDropOff,
  //     pickupLocationStateV1,
  //     dateRangeV1,
  //     pickupInputMessageV1,
  //     deliveryMapLocPickUp,
  //     dropoffInputMessageV1,
  //     deliveryMapLocDropOff,
  //     pickTimeV1,
  //     dropTimeV1,
  //   } = storedFormFields;

  //   setShowDropoff(storedShowDropoff);

  //   setPickUpTime(pickTimeV1 || "");
  //   setDropOffTime(dropTimeV1 || "");

  //   if (!pickupLocParam) {
  //     setPickupLocStateValue(
  //       pickupLocationStateV1 || queryParams.get("pickupLocState") || "Dubai"
  //     );
  //     const pickupLocation =
  //       selectedTabPickUp === "pick"
  //         ? pickupInputMessageV1
  //         : deliveryMapLocPickUp;
  //     const dropoffLocation =
  //       selectedTabDropOff === "pick"
  //         ? dropoffInputMessageV1
  //         : deliveryMapLocDropOff;

  //     setPickupLocationMessage(pickupLocation || pickupLocParam || "");
  //     console.log(
  //       "setDropoffLocationMessage off loc is before set: ",
  //       dropoffLocation || dropoffLocParam || ""
  //     );

  //     setDropoffLocationMessage(dropoffLocation || dropoffLocParam || "");
  //     console.log("Drop off loc is now: ", dropoffLocationMessage);
  //   }

  //   if (storedFormFields?.dateRangeV1) {
  //     storedStartDateRange = new Date(storedFormFields.dateRangeV1.startDate);
  //     storedEndDateRange = new Date(storedFormFields.dateRangeV1.endDate);
  //     if (
  //       isNaN(storedStartDateRange.getTime()) ||
  //       isNaN(storedEndDateRange.getTime())
  //     ) {
  //       storedStartDateRange = new Date();
  //       storedEndDateRange = new Date(
  //         new Date().getTime() + 24 * 60 * 60 * 1000
  //       );
  //     }
  //   }

  //   const storedPickUpTime = storedFormFields.pickTimeV1 || "";
  //   setPickUpTime(storedPickUpTime);
  //   const storedDropOffTime = storedFormFields.dropTimeV1 || "";
  //   setDropOffTime(storedDropOffTime);

  //   setDateRange([
  //     {
  //       startDate: storedStartDateRange || new Date(),
  //       endDate:
  //         storedEndDateRange ||
  //         new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  //       key: "selection",
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    const reqLocalStorageData = localStorage.getItem("formFields");
    if (reqLocalStorageData) {
      const storedFormFields = JSON.parse(reqLocalStorageData);
      console.log("Stored date range is: ", storedFormFields);
      let storedStartDateRange;
      let storedEndDateRange;
      let pickupLocMainInput;
      let dropoffLocMainInput;
      let pickupLocTabV1;
      let dropoffLocTabV1;
      let checkBoxStoredValue;

      if (storedFormFields) {
        checkBoxStoredValue = storedFormFields?.showDropoffV1 === 1;
        console.log(
          "jfvnj checkBoxStoredValuendfe --- 1/0 -- ",
          checkBoxStoredValue
        );
        setShowDropoff(checkBoxStoredValue);

        pickupLocTabV1 = storedFormFields?.selectedTabPickUp;
        dropoffLocTabV1 = storedFormFields?.selectedTabDropOff;
        // pickupLocMainInput = storedFormFields?.pickupInputMessageV1;
        // setPickupLocationMessage(pickupLocMainInput? pickupLocMainInput : '');

        // pickupLocMainInput = storedFormFields?.deliveryMapLocPickUp;
        // setPickupLocationMessage(pickupLocMainInput? pickupLocMainInput : '');

        if (storedFormFields?.dateRangeV1) {
          storedStartDateRange = new Date(
            storedFormFields.dateRangeV1.startDate
          );
          storedEndDateRange = new Date(storedFormFields.dateRangeV1.endDate);
          if (
            isNaN(storedStartDateRange.getTime()) ||
            isNaN(storedEndDateRange.getTime())
          ) {
            storedStartDateRange = new Date(); // Fallback to current date
            storedEndDateRange = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            ); // Fallback to tomorrow
          }
        }

        if (pickupLocTabV1 === "pick") {
          pickupLocMainInput = storedFormFields?.pickupInputMessageV1;
          setPickupLocationMessage(
            pickupLocMainInput ? pickupLocMainInput : ""
          );
        } else if (pickupLocTabV1 === "deliver") {
          pickupLocMainInput = storedFormFields?.deliveryMapLocPickUp;
          setPickupLocationMessage(
            pickupLocMainInput ? pickupLocMainInput : ""
          );
        }
        if (dropoffLocTabV1 === "pick") {
          dropoffLocMainInput = storedFormFields?.dropoffInputMessageV1;
          setDropoffLocationMessage(dropoffLocMainInput);
        } else if (dropoffLocTabV1 === "deliver") {
          dropoffLocMainInput = storedFormFields?.deliveryMapLocDropOff;
          setDropoffLocationMessage(dropoffLocMainInput);
        }
        const storedPickUpTime = storedFormFields?.pickTimeV1 || "";
        setPickUpTime(storedPickUpTime);
        const storedDropOffTime = storedFormFields?.dropTimeV1 || "";
        setDropOffTime(storedDropOffTime);
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
  }, []);

  const navigate = useNavigate();

  const { formFields, handleFieldChange } = UseGlobalFormFields({
    pickTimeV1: pickUpTime || "",
    dropTimeV1: dropOffTime || "",
    // pickupInputMessageV1: pickupLocationMessage || "",
    // dropoffInputMessageV1: pickupLocationMessage || "",
    dateRangeV1: "",
    showDropoffV1: 0,
  });

  useEffect(() => {
    console.log(
      `useeffect useeffect useeffect dropoffLocationMessage useeffect is : ${dropoffLocationMessage}`
    );
  }, [dropoffLocationMessage]);

  const handlePickupModalClose = () => {
    setShowPickupModal(false);
  };

  const handlePickupLocationChange = (location) => {
    setPickupLocationMessage(location);
  };

  const handlePickupLocationModalOpen = () => {
    setShowPickupModal(true);
  };

  useEffect(() => {
    const pickupTimeParam = queryParams.get("pickupTime");
    if (pickupTimeParam && !pickUpTime) {
      setPickUpTime(pickupTimeParam);
    }
    if (showDropoff === false) {
      setDropoffLocStateValue(pickupLocStateValue);
      setDropoffLocationMessage(dropoffLocationMessage);
    }
  }, [queryParams, pickUpTime]);

  const handlePickUpTimeChange = (selectedOption) => {
    setPickUpTime(selectedOption.value);
    handleFieldChange("pickTimeV1", selectedOption.value);
  };

  // useEffect(() => {
  //   const dropoffTimeParam = queryParams.get("dropoffTime");
  //   if (dropoffTimeParam && !dropOffTime) {
  //     setDropOffTime(dropoffTimeParam);
  //   }
  // }, [queryParams, dropOffTime]);

  const handleDropOffTimeChange = (selectedOption) => {
    setDropOffTime(selectedOption.value);
    handleFieldChange("dropTimeV1", selectedOption.value);
  };

  const handleInputFieldChange = (value) => {
    setPickupInputFieldValue(value);
  };

  // console.log(`Start param dateeeeee ${startDateParam}\nEEEEEEEE ${endDateParam}`)
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
      const titles = response.data.result.items.map((item) => item.title);
      setCarType(titles);

      setCarsData(response.data.result.items);
      // console.log("Result of all cars is : ", response.data.result.items);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchCarsData();
  }, [dateRange, fetchCarsData]);

  const handleSearchCarButton = async (e) => {
    e.preventDefault();
    fetchCarsData();
  };

  const categoryMap = {
    Standard: "Sedan",
    "Small SUV 5 Seater": "SUV",
    Compact: "HatchBack",
    Fullsize: "Station Wagon",
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

      // console.log(
      //   "Raw categories response 1111111111:",
      //   response.data.result.categories
      // );

      const filteredAndRenamedCategories = response?.data?.result?.categories
        .filter((category) => requiredCategories.includes(category.name))
        .map((category) => ({
          id: category?.id,
          name: categoryMap[category.name] || category.name,
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
      carCategoriesData.map((cat) => ({
        ...cat,
        name: cat.name.toUpperCase(),
      })),
    [carCategoriesData]
  );

  const enhanceCategoryData = useCallback(() => {
    const categoryDetailsMap = new Map();
    const categoryMap = {
      Standard: "Sedan",
      "Small SUV 5 Seater": "SUV",
      Compact: "HatchBack",
      Fullsize: "Station Wagon",
    };

    carsData.forEach((car) => {
      if (car.acrissCategory) {
        const key = `${car.acrissCategory.code}-${car.acrissCategory.name}`;
        if (!categoryDetailsMap.has(key)) {
          // Use the categoryMap to rename the category name
          const renamedName =
            categoryMap[car.acrissCategory.name] || car.acrissCategory.name;
          categoryDetailsMap.set(key, {
            id: car.acrissCategory.id,
            name: renamedName,
            code: car.acrissCategory.code,
          });
        }
      }
    });

    const updatedCategories = [...categoryDetailsMap.values()];
    setCarCategoriesData(updatedCategories);
  }, [carsData]);

  useEffect(() => {
    if (carsData.length > 0) {
      enhanceCategoryData();
    }
  }, [carsData, enhanceCategoryData]); // Ensure this runs every time carsData updates

  // useEffect(() => {
  //   console.log("useeffect select category -- ", selectedCategories);
  //   const newSelectedCategories = selectedCategories.map((selected) => {
  //     const foundCategory = carCategoriesData.find(
  //       (category) => category.id === selected.value
  //     );
  //     return foundCategory
  //       ? { ...selected, label: foundCategory.name }
  //       : selected;
  //   });
  //   setSelectedCategories(newSelectedCategories);
  //   carCategoryFromURL();
  // }, [carCategoriesData]);

  useEffect(() => {
    if (carCategoryParam && normalizedCarCategories.length > 0) {
      const matchedCategory = normalizedCarCategories.find((cat) => {
        const isMatch =
          cat?.name?.toUpperCase() === carCategoryParam?.toUpperCase();
        // console.log(
        //   `Comparing ${cat.name.toUpperCase()} with ${carCategoryParam.toUpperCase()}: ${isMatch}`
        // );
        return isMatch;
      });

      if (matchedCategory) {
        setSelectedCategories([
          { label: matchedCategory.name, value: matchedCategory.id },
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

  carsData.forEach((item) => {
    const dataObject = {
      category: item.acrissCategory?.name,
      fuel: item.acrissFuelAc?.name,
      type: item.acrissType?.name,
      transmission: item.acrissTransDrive?.name,
      passengerCapacity: item?.passengerCapacity,
      smallBagsCapacity: item?.smallBagsCapacity,
      largeBagsCapacity: item?.largeBagsCapacity,
      tariffGroupId: item?.tariffGroupId,
    };
    dataArray.push(dataObject);
  });

  // console.log("Data Array is: --- ", dataArray);

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

  const allCarsBookingButton = (
    tariffGroupId,
    vehicleName,
    startDate,
    endDate
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
    console.log("missingFields", missingFields);
    if (missingFields.length > 0) {
      const errorMessage = `${missingFields.join(", ")} field(s) are missing.`;
      toast.error(errorMessage, {
        autoClose: 1000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
      return;
    }
    console.log("dshowDropoff value is: ", showDropoff);

    console.log("All Cars Booking Button");

    navigate(
      `/bookingPage/1?tariffGroupId=${tariffGroupId}&vehicleName=${vehicleName}&startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}&pickupLoc=${pickupLocationMessage}&dropoffLoc=${dropoffLocationMessage}&pickupLocState=${pickupLocStateValue}&dropoffLocState=${dropoffLocStateValue}&checkBoxValue=${showDropoff}`
    );
  };

  const filterCars = useMemo(() => {
    // console.log("Starting to filter cars with the following data:");
    // console.log("Cars Data:", carsData);
    // console.log("Normalized Categories:", normalizedCarCategories);
    // console.log("Selected Categories:", selectedCategories);

    return carsData
      .filter((car) => {
        const typeMatch =
          selectedCarTypes.length === 0 || selectedCarTypes.includes(car.title);

        const currentCarCategory = normalizedCarCategories.find(
          (cat) => cat.id === car.acrissCategory.id
        );

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.some((selectedCategory) => {
            const valueMatch =
              selectedCategory.value === currentCarCategory?.id;
            const labelMatch =
              selectedCategory?.label?.toUpperCase() ===
              currentCarCategory?.name?.toUpperCase();

            return valueMatch && labelMatch;
          });

        const priceMatch =
          (minPrice === "" || car.rate >= minPrice) &&
          (maxPrice === "" || car.rate <= maxPrice);

        return typeMatch && categoryMatch && priceMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "LowToHigh":
            return a.rate - b.rate;
          case "HighToLow":
            return b.rate - a.rate;
          case "Recommended":
            return b.discount - a.discount;
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

  const handleCategoryChange = (selectedOptions) => {
    console.log(`In handle changse: selectedOptions is: `, selectedOptions);
    setSelectedCategories(
      selectedOptions.map((option) => {
        const category = carCategoriesData.find(
          (cat) =>
            cat.id === option.id &&
            cat?.name?.toUpperCase() === option?.label?.toUpperCase()
        );
        return category ? { id: category.id, label: category.name } : option;
      })
    );
    console.log("Updated selected categories:", selectedOptions);
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
    console.log("Clear all filetrs");
    setSelectedCarTypes([]);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    const pickupDate = startDate ? startDate.toLocaleDateString() : null;
    const dropoffDate = endDate ? endDate.toLocaleDateString() : null;

    setPickUpDate(pickupDate);
    setDropOffDate(dropoffDate);

    const updatedStartDate = startDate
      ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
      : null;
    const updatedEndDate = endDate
      ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000)
      : null;

    const dateRangeObject = {
      startDate: updatedStartDate.toISOString().split("T")[0],
      endDate: updatedEndDate.toISOString().split("T")[0],
      // key: "selection",
    };

    handleFieldChange("dateRangeV1", dateRangeObject);

    setDateRange([ranges.selection]);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      console.log("Number of days:", totalDays);
      setNumberOfDays(totalDays);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked outside");
      if (
        showDatePicker &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        console.log("Closing datepicker");
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
      backgroundColor: isSelected ? "#cc6119" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#cc6119" : "rgb(229, 229, 229)",
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
      backgroundColor: isSelected ? "#cc6119" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#cc6119" : "#cc6119",
        color: isSelected ? "gray" : "white",
      },
    }),
  };

  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <div id="main" className="pb-2 ">
      <>
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div>
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
                                  formFields.dateRangeV1.startDate &&
                                  formFields.dateRangeV1.endDate
                                    ? `${new Date(
                                        formFields.dateRangeV1.startDate
                                      ).toLocaleDateString()} - ${new Date(
                                        formFields.dateRangeV1.endDate
                                      ).toLocaleDateString()}`
                                    : "Select date range"
                                }
                                onClick={() => setShowDateRangeModal(true)}
                                readOnly
                              />
                            </div>
                            {/* {showDatePicker && (
                              <div onClick={(e) => e.stopPropagation()}>
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={handleDateChange}
                                  moveRangeOnFirstSelection={false}
                                  ranges={dateRange}
                                  disabledDay={(date) =>
                                    date < new Date().setHours(0, 0, 0, 0)
                                  }
                                  onClose={() => setShowDatePicker(false)}
                                />
                              </div>
                            )} */}
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
                            rangeColors={["#cc6119"]}
                            disabledDay={(date) =>
                              date < new Date().setHours(0, 0, 0, 0)
                            }
                            onClose={() => setShowDatePicker(false)}
                            // onClick={() => setShowDateRangeModal(true)}
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
                                    // onClick={handlePickupLocationModalOpen}
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
                                      onClick={() => setShowDropoffModal(true)}
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
                          // onHide={handlePickupModalClose}
                          size="xl"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Pickup Location</Modal.Title>
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
                            />
                          </Modal.Body>
                        </Modal>

                        <Modal
                          show={showDropoffModal}
                          onHide={() => setShowDropoffModal(false)}
                          size="xl"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>DropOff Location</Modal.Title>
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
                              value={timeOptions.find(
                                (option) =>
                                  option.value === formFields.pickTimeV1
                              )}
                              // onChange={(selectedOption) => {
                              //   console.log(
                              //     "Selected option is: ",
                              //     selectedOption
                              //   );
                              //   setPickUpTime(selectedOption.value);
                              // }}
                              // value={{ value: pickUpTime, label: pickUpTime }}
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
                                  option.value === formFields.dropTimeV1
                              )}
                              // onChange={(selectedOption) => {
                              //   console.log(
                              //     "Selected Dropoff option is: ",
                              //     selectedOption
                              //   );
                              //   setDropOffTime(selectedOption.value);
                              // }}
                              // value={{ value: dropOffTime, label: dropOffTime }}
                              onChange={handleDropOffTimeChange}
                              styles={selectStyles}
                            />
                          </Form.Group>
                        </Col>

                        {/* <Col
                          xxl={1}
                          lg={1}
                          md={3}
                          sm={6}
                          xs={6}
                          className="pt-5"
                        >
                          <div className="button-container">
                            <button
                              className="animated-search-button"
                              onClick={handleSearchCarButton}
                            >
                              {" "}
                              <span className="button-text-span">
                                <span className="transition"></span>
                                <span className="gradient"></span>
                                <span className="label">
                                  {" "}
                                  <LuSearch />{" "}
                                </span>
                              </span>
                            </button>
                            </div>
                          </Col> */}
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
                        <div className="car-categories-filter-container d-flex justify-content-between">
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
                                options={carCategoriesData?.map((category) => ({
                                  value: category?.id,
                                  label: category?.name,
                                }))}
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                styles={selectCategoriesStyles}
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
                        <div className="car-type-filter-container d-flex justify-content-between">
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
                          {carType?.map((type, index) => (
                            <label
                              className="form-check flipBox"
                              aria-label={`Checkbox ${index}`}
                              key={index}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
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
                        <div className="car-type-filter-container d-flex justify-content-between">
                          <div className="car-type-icon-title">
                            <BsTags className="mr-2" />
                            <b>Price Range</b>
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
                            <div className="form-group col-xxl-6 col-lg-9 col-md-9 col-sm-6 col-6 pl-0">
                              <input
                                className="form-control-login"
                                name="minPrice"
                                autoComplete="off"
                                type="number"
                                min={0}
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="min value"
                              />
                            </div>

                            <div className="form-group col-xxl-6 col-lg-9 col-md-9 col-sm-6 col-6 pl-0">
                              <input
                                className="form-control-login "
                                name="maxPrice"
                                autoComplete="off"
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="max value"
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
                                <h6>
                                  {" "}
                                  <b>Sort By:</b>
                                </h6>
                              </Form.Label>
                              <Select
                                options={sortByDropDown}
                                required
                                className="form-control-sort-by col-12"
                                setSortBy
                                onChange={(selectedOption) => {
                                  console.log(
                                    "Selected optn is: ",
                                    selectedOption
                                  );
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
                    <h3 className="pb-2 all-cars-heading">
                      All Cars
                      <hr className="middle-hr-tag" />
                    </h3>
                    <Row className="offers-car-container-row">
                      {currentTableData.map((car, index) => (
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
                                {categoryMap[car?.acrissCategory?.name] ||
                                  car?.acrissCategory?.name}
                                ){/* <b>{car?.acrissCategory?.name} | </b>( */}
                                {/* ) */}
                              </span>
                            </div>
                            <div className="car-image-container ">
                              <div
                                onClick={() =>
                                  allCarsBookingButton(
                                    car?.tariffGroupId,
                                    `${car?.title} - ${
                                      categoryMap[car?.acrissCategory?.name] ||
                                      car?.acrissCategory?.name
                                    }`,
                                    startDate,
                                    endDate
                                  )
                                }
                              >
                                {" "}
                                <img
                                  src={car?.displayImageUrl}
                                  alt={`Car ${index + 1}`}
                                  className="car-image"
                                />
                              </div>
                            </div>
                            <div className="all-vehicles-features-icons features-scroll-container text-center">
                              {dataArray.map((carData, dataIndex) => (
                                <span key={dataIndex}>
                                  {carFeaturesWithIcons?.map(
                                    (carFeature, featureIndex) => {
                                      const showIcon =
                                        carData?.tariffGroupId ===
                                        car?.tariffGroupId;
                                      let value;
                                      switch (carFeature?.name) {
                                        case "Person Seats":
                                          value = carData?.passengerCapacity;
                                          break;
                                        // case "Doors":
                                        //   const [doorRange = carData.type] = carData.type.split(/[-/]/);
                                        //   const [doorRange = carData.type] =
                                        //     carData.type.includes("%")
                                        //       ? carData.type.split("")
                                        //       : [carData.type];
                                        //   value = doorRange;
                                        //   break;
                                        case "Automatic":
                                          value = carData.transmission
                                            ? carData.transmission
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
                                          value = carData[carFeature?.name];
                                          break;
                                      }

                                      return value !== undefined &&
                                        value !== null &&
                                        showIcon === true ? (
                                        <span
                                          key={featureIndex}
                                          className="single-feature-container features-values"
                                        >
                                          {carFeature?.name !== "Doors" && (
                                            <>
                                              <carFeature.featureIcon className="all-car-icons" />{" "}
                                            </>
                                          )}
                                          <span className="">{value}</span>
                                          {/* {featureIndex < carFeaturesWithIcons.length - 1 && (
                                              <span className="car-features-vertical-line mr-2 ml-2">|</span>
                                            )} */}
                                        </span>
                                      ) : null;
                                    }
                                  )}
                                </span>
                              ))}
                            </div>

                            <hr className="discount-line" />

                            {numberOfDays <= 0 && (
                              <>
                                <div className="price-day-main-div">
                                  <div className="row">
                                    {durations?.map((duration, index) => (
                                      <div
                                        key={index}
                                        className="col-xxl-4 col-lg-6 col-md-6 col-sm-6 col-8 pt-2"
                                      >
                                        <div className="card price-per-specificDay-container">
                                          <div className="card-body price-day-div">
                                            <div className="card-text">
                                              <span className="per-specificDay-heading">
                                                Per {duration}
                                              </span>
                                              <br />
                                              {/* {car.discount > 0 && (
                                                <>
                                                  <del className="value-del-line">
                                                    {car.originalPrice *
                                                      durationValues[
                                                        index
                                                      ]}{" "}
                                                  </del>{" "}
                                                  <span className="AED-text">
                                                    
                                                  </span>{" "}
                                                </>
                                              )}{" "} */}
                                              {/* {car.discount <= 0 && (
                                                <>
                                                  <span className="p-1 mr-2"></span>
                                                </>
                                              )} */}
                                              <span className="final-discounted-value-span">
                                                {/* {calculateSalePrice(
                                                  car.originalPrice,
                                                  car.discount
                                                ) * durationValues[index]}{" "}
                                                AED{" "} */}
                                                {car.rate *
                                                  durationValues[index]}{" "}
                                                AED{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <br />
                              </>
                            )}
                            <div className="d-flex justify-content-center">
                              <div className="col-xxl-10 col-lg-11 col-md-12 col-sm-8 col-12 d-flex justify-content-center">
                                {numberOfDays > 0 ? (
                                  <>
                                    <button
                                      className="animated-button"
                                      onClick={() => {
                                        console.log(
                                          `--------------------------Start date is ---- ${datePickerStartDate} \n End Date is ---- ${datePickerEndDate}`
                                        );
                                        allCarsBookingButton(
                                          car?.tariffGroupId,
                                          `${car?.title} - ${
                                            categoryMap[
                                              car?.acrissCategory?.name
                                            ] || car?.acrissCategory?.name
                                          }`,
                                          datePickerStartDate,
                                          datePickerEndDate
                                        );
                                      }}
                                    >
                                      <span className="button-text-span">
                                        <span className="transition"></span>
                                        <span className="gradient"></span>
                                        <span className="label">
                                          Pay Now{" "}
                                          <span className="pay-now-price-md-lg">
                                            <span>|</span> AED:{" "}
                                            {car?.rate * numberOfDays} |{" "}
                                            {numberOfDays} days
                                          </span>
                                          <div className="pay-now-price-xs">
                                            AED: {car?.rate * numberOfDays} |{" "}
                                            {numberOfDays} days
                                          </div>
                                        </span>
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="button-container">
                                      <button
                                        className="animated-button"
                                        onClick={allCarsBookingButton}
                                      >
                                        <span className="button-text-span">
                                          <span className="transition"></span>
                                          <span className="gradient"></span>
                                          <span className="label">
                                            Rent Now
                                          </span>
                                        </span>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filterCars?.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </div>
  );
};

export default VehiclesPage;
