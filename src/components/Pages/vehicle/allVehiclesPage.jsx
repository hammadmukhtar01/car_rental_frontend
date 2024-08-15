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
  BsFilter,
} from "react-icons/bs";
import { BiSolidMapPin } from "react-icons/bi";
import { GiGearStickPattern } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import "./vehicleDetails.css";
import Pagination from "./pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import { ToastContainer } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { getWithExpiry, setWithExpiry } from "../Utils/localStorageUtils";

const PageSize = 8;
const animatedComponents = makeAnimated();
const locations = [
  { value: "FUJAIRAH", label: "FUJAIRAH" },
  { value: "ABU_DHABI", label: "ABU DHABI" },
  { value: "DUBAI", label: "DUBAI" },
  { value: "RAS_AL_KHAIMAH", label: "RAS AL KHAIMAH" },
  { value: "SHARJAH", label: "SHARJAH" },
  { value: "AJMAN", label: "AJMAN" },
  { value: "UMM_AL_QUWAIN", label: "Umm Al Quwain" },
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

const VehiclesPage = () => {
  const navigate = useNavigate();
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
  const pickupTimeParam = queryParams?.get("pickupTime");
  const dropoffTimeParam = queryParams?.get("dropoffTime");

  const [activeSelection, setActiveSelection] = useState({
    startDate: false,
    endDate: false,
  });

  const storedUserData = useMemo(
    () => getWithExpiry("userLocationData") || {},
    []
  );

  const [pickupLocation, setPickupLocation] = useState(
    storedUserData?.userData?.pickupLocation || pickupLocParam || ""
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    storedUserData?.userData?.dropoffLocation || dropoffLocParam || ""
  );
  const [showDropoff, setShowDropoff] = useState(
    storedUserData?.userData?.showDropoff || false
  );

  const defaultStartDate = new Date();
  const defaultEndDate = new Date(
    defaultStartDate.getTime() + 24 * 60 * 60 * 1000
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(
        storedUserData?.userData?.dateRange?.startDate ||
          startDateParam ||
          defaultStartDate
      ),
      endDate: new Date(
        storedUserData?.userData?.dateRange?.endDate ||
          endDateParam ||
          defaultEndDate
      ),
      key: "selection",
    },
  ]);

  const [pickUpTime, setPickUpTime] = useState(
    storedUserData?.userData?.pickUpTime || pickupTimeParam || ""
  );
  const [dropOffTime, setDropOffTime] = useState(
    storedUserData?.userData?.dropOffTime || dropoffTimeParam || ""
  );

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
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLocationDataOpen, setIsLocationDataOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorFields, setErrorFields] = useState({});

  const updateLocalStorage = (newUserData) => {
    setWithExpiry("userLocationData", newUserData, 24 * 60 * 60 * 1000);
  };

  const handleDropoffCheckboxChange = () => {
    const newShowDropoff = !showDropoff;
    setShowDropoff(newShowDropoff);
    const updatedUserData = {
      ...storedUserData,
      userData: {
        ...storedUserData.userData,
        showDropoff: newShowDropoff,
        dropoffLocation: newShowDropoff ? dropoffLocation : "",
      },
    };
    setDropoffLocation(newShowDropoff ? dropoffLocation : "");
    updateLocalStorage(updatedUserData);
  };

  const handleDateClick = () => {
    setActiveSelection({ startDate: false, endDate: false });
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    setActiveSelection((prev) => ({
      startDate: true,
      endDate: prev.startDate ? true : false,
    }));

    if (activeSelection?.startDate && endDate) {
      setShowDateRangeModal(false);
    }

    setDateRange([ranges.selection]);

    if (startDate && endDate) {
      console.log("dateRange -----222222----", startDate);
      updateLocalStorage({
        ...storedUserData,
        userData: {
          ...storedUserData.userData,
          dateRange: { startDate, endDate },
        },
      });
    }
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
    if (
      dateRange[0].startDate &&
      dateRange[0].endDate &&
      pickUpTime &&
      dropOffTime
    ) {
      const totalDays = calculateNumberOfDays(
        dateRange[0].startDate,
        dateRange[0].endDate,
        pickUpTime,
        dropOffTime
      );
      setNumberOfDays(totalDays);
    }
  }, [dateRange, pickUpTime, dropOffTime]);

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

      const startDate = new Date(
        dateRange[0].startDate.getTime() -
          dateRange[0].startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const endDate = new Date(
        dateRange[0].endDate.getTime() -
          dateRange[0].endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const userData = {
        pickupLocation,
        dropoffLocation,
        pickUpTime,
        dropOffTime,
        showDropoff,
        dateRange: {
          startDate,
          endDate,
        },
      };

      updateLocalStorage({ ...storedUserData, userData });

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/SearchVehicleRates?startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.post(url, {}, { headers });
      const titles = response?.data?.result?.items?.map((item) => item?.title);
      setCarType(titles);
      const cars = response?.data?.result?.items || [];
      setCarsData(cars);

      setLoading(false);

      const tariffPromises = cars?.map((car) =>
        fetchVehicleRentRates(car?.tariffGroupId)
      );
      const tariffs = await Promise.all(tariffPromises);
      const tariffMap = {};
      cars?.forEach((car, index) => {
        tariffMap[car?.tariffGroupId] = tariffs[index];
      });

      setTariffLines(tariffMap);

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

    {
      name: "Air Bags",
      value: 2,
      featureIcon: BsSuitcase,
    },
    {
      name: "Automatic",
      value: "A",
      featureIcon: GiGearStickPattern,
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

  const handlePickUpTimeChange = (selectedOption) => {
    setPickUpTime(selectedOption?.value);
    updateLocalStorage({
      ...storedUserData,
      userData: {
        ...storedUserData.userData,
        pickUpTime: selectedOption?.value,
      },
    });
  };

  const handleDropOffTimeChange = (selectedOption) => {
    setDropOffTime(selectedOption?.value);
    updateLocalStorage({
      ...storedUserData,
      userData: {
        ...storedUserData.userData,
        dropOffTime: selectedOption?.value,
      },
    });
  };

  const allCarsBookingButton = (
    tariffGroupId,
    vehicleName,
    startDate,
    endDate,
    calculatedVehiclePrice
  ) => {
    const newErrorFields = {};
    const missingFields = [];
    console.log("dropoff value is:dsd ", dropoffLocation);

    if (!pickupLocation) {
      newErrorFields.pickupLocation = true;
      missingFields.push("Pickup location");
    }
    if (!pickUpTime) {
      newErrorFields.pickUpTime = true;
      missingFields.push("Pickup time");
    }
    if (!dropOffTime) {
      newErrorFields.dropOffTime = true;
      missingFields.push("Dropoff time");
    }
    if (showDropoff && !dropoffLocation) {
      newErrorFields.dropoffLocation = true;
      missingFields.push("Dropoff location");
    }

    setErrorFields(newErrorFields);

    if (missingFields?.length > 0) {
      setIsLocationDataOpen(true);

      const errorMessageMultiple = `${missingFields.join(
        ", "
      )} fields are missing.`;
      const errorMessageSingle = `${missingFields.join(
        ", "
      )} field is missing.`;

      const errorMessage =
        missingFields?.length === 1 ? errorMessageSingle : errorMessageMultiple;

      toast.dismiss();
      toast(errorMessage, {
        duration: 3000,
      });
      return;
    }

    const timeDiffChecker = validateTimeDifference(
      startDate,
      endDate,
      pickUpTime,
      dropOffTime
    );
    if (!timeDiffChecker) {
      toast.dismiss();
      toast(
        "The difference between pickup and dropoff time should be at least 60 minutes.",
        {
          duration: 2000,
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

    navigate(
      `/bookingPage/1?tariffGroupId=${tariffGroupId}&vehicleName=${vehicleName}&startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}&pickupLoc=${pickupLocation?.label}&dropoffLoc=${dropoffLocation?.label}&checkBoxValue=${showDropoff}&noOfDays=${numberOfDays}&vehiclePrice=${calculatedVehiclePrice}`
    );
  };

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

      const totalPrice = renderVehiclePrices(car?.tariffGroupId);

      if (numberOfDays > 0) {
        const priceMatch =
          (minPrice === "" || totalPrice >= minPrice) &&
          (maxPrice === "" || totalPrice <= maxPrice);

        return categoryMatch && typeMatch && priceMatch;
      } else {
        const priceMatch =
          (minPrice === "" || car?.rate >= minPrice) &&
          (maxPrice === "" || car?.rate <= maxPrice);

        return typeMatch && categoryMatch && priceMatch;
      }
    });

    return filteredCars?.sort((a, b) => {
      switch (sortBy) {
        case "LowToHigh":
          return (
            renderVehiclePrices(a?.tariffGroupId) -
            renderVehiclePrices(b?.tariffGroupId)
          );
        case "HighToLow":
          return (
            renderVehiclePrices(b?.tariffGroupId) -
            renderVehiclePrices(a?.tariffGroupId)
          );
        // case "LowToHigh":
        //   console.log("44");

        //   return b?.discount - a?.discount;
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

    const uniqueTypes = [...new Set(typesInSelectedCategories)];

    if (selectedCategories.length === 0) {
      setSelectedCarTypes([]);
    } else {
      setSelectedCarTypes((prevSelected) => {
        return prevSelected.filter((type) => uniqueTypes.includes(type));
      });
    }

    return uniqueTypes;
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
    if (selectedOptions.length === 0) {
      setSelectedCarTypes([]);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterCars.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterCars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedCarTypes, minPrice, maxPrice, sortBy]);

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

  const handleFiltersToggle = () => setFiltersOpen(!filtersOpen);
  const handleFiltersClose = () => setFiltersOpen(false);

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
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

  const selectStylesError = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid white",
      boxShadow: "none",
      lineHeight: "32px",
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
        <title>Affordable Car Rentals | Milele Car Rental </title>
        <meta
          name="description"
          content="Enjoy a wide range of economy, sedan, and hatchback rental vehicles in Dubai at Milele Car Rental. Enjoy zero deposit and flexible payment options. Rent your perfect car online today!"
        />
        <meta name="keywords" content="keywords" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.milelecarrental.com/vehicles" />
      </Helmet>
      <HeaderCombination />
      <div id="main" className="pb-2 ">
        <>
          <div className="all-cars-main-container-div container">
            <div className="vehicles-page-main-container container">
              <div className="searchbox-container">
                <div className="form-group pb-2 pt-4">
                  <div className=" d-flex justify-content-center">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="all-cars-search-box-container "
                    >
                      <form action="">
                        <div className="card location-data-card">
                          <article className="card-group-item">
                            <div>
                              <header
                                className="card-header styled-label title location-data-heading pt-3 pb-3"
                                onClick={() =>
                                  setIsLocationDataOpen(!isLocationDataOpen)
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BiSolidMapPin className="mr-2" />
                                    <b>Location Data</b>
                                  </div>
                                  <div className="location-data-open-close-modal ">
                                    {isLocationDataOpen ? (
                                      <>
                                        <div className="location-data-open-icon">
                                          <AiOutlineMinusCircle className="text-right" />
                                        </div>
                                      </>
                                    ) : (
                                      <div className="location-data-open-icon">
                                        <FiEdit className="text-right" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </header>
                            </div>
                            {isLocationDataOpen && (
                              <Row className="p-3">
                                <Col xxl={3} lg={3} md={6} sm={6} xs={12}>
                                  <Form.Group controlId="formDropoffDateTime">
                                    <div className="date-label">
                                      <label className="styled-label">
                                        <BsCalendar2Check className="mr-2 pick-drop-date-icon" />
                                        <b>Pick & Drop Date *</b>
                                      </label>
                                    </div>
                                    <div onClick={handleDateClick}>
                                      <input
                                        className={`form-control-date mt-2 col-12 ${
                                          errorFields.dateRange
                                            ? "border-red"
                                            : ""
                                        }`}
                                        type="text"
                                        id="searchboxInputDate"
                                        required
                                        value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                                        onClick={() =>
                                          setShowDateRangeModal(true)
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </Form.Group>
                                </Col>

                                <Modal
                                  show={showDateRangeModal}
                                  onHide={() => setShowDateRangeModal(false)}
                                  size="sm"
                                  className="search-box-date-picker-modal"
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
                                      sm={showDropoff ? 6 : 12}
                                      xs={showDropoff ? 6 : 12}
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
                                            <b>
                                              <span
                                                className={` ${
                                                  errorFields?.pickupLocation
                                                    ? "select-error-label"
                                                    : ""
                                                }`}
                                              >
                                                Pickup*
                                              </span>
                                            </b>
                                          </label>
                                        </div>
                                        <div className="custom-dropdown-container">
                                          <Select
                                            className={`mt-2 ${
                                              errorFields?.pickupLocation
                                                ? "select-error border-red"
                                                : ""
                                            }`}
                                            id="searchboxInputPickUpLoc"
                                            options={locations}
                                            value={pickupLocation}
                                            onChange={(option) => {
                                              setPickupLocation(option);
                                              setErrorFields((prev) => ({
                                                ...prev,
                                                pickupLocation: false,
                                              }));
                                              updateLocalStorage({
                                                ...storedUserData,
                                                userData: {
                                                  ...storedUserData.userData,
                                                  pickupLocation: option,
                                                },
                                              });
                                            }}
                                            placeholder="Location"
                                            styles={
                                              errorFields?.pickupLocation
                                                ? selectStylesError
                                                : selectStyles
                                            }
                                          />
                                        </div>
                                      </Form.Group>
                                    </Col>

                                    {showDropoff ? (
                                      <Col xxl={6} lg={6} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formKeyword">
                                          <div className="location-label">
                                            <label className="styled-label">
                                              <BsGeoAltFill className="mr-2" />
                                              <b>
                                                {" "}
                                                <span
                                                  className={` ${
                                                    errorFields?.dropoffLocation
                                                      ? "select-error-label"
                                                      : ""
                                                  }`}
                                                >
                                                  Dropoff*
                                                </span>
                                              </b>
                                            </label>
                                          </div>
                                          <div className="custom-dropdown-container">
                                            <Select
                                              className={`mt-2 ${
                                                errorFields?.dropoffLocation
                                                  ? "select-error border-red"
                                                  : ""
                                              }`}
                                              id="searchboxInputDropOffLoc"
                                              options={locations}
                                              value={dropoffLocation}
                                              onChange={(option) => {
                                                setDropoffLocation(option);
                                                setErrorFields((prev) => ({
                                                  ...prev,
                                                  dropoffLocation: false,
                                                }));
                                                updateLocalStorage({
                                                  ...storedUserData,
                                                  userData: {
                                                    ...storedUserData.userData,
                                                    dropoffLocation: option,
                                                  },
                                                });
                                              }}
                                              placeholder="Location"
                                              styles={
                                                errorFields?.dropoffLocation
                                                  ? selectStylesError
                                                  : selectStyles
                                              }
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                    ) : (
                                      ""
                                    )}
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

                                <Col xxl={2} lg={2} md={3} sm={6} xs={6}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label mb-3">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.pickUpTime
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Pickup Time*
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <Select
                                      options={timeOptions}
                                      required
                                      className={`form-control-pickup-time col-12 ${
                                        errorFields?.pickUpTime
                                          ? "select-error border-red"
                                          : ""
                                      }`}
                                      value={timeOptions?.find(
                                        (option) => option?.value === pickUpTime
                                      )}
                                      onChange={(time) => {
                                        handlePickUpTimeChange(time);
                                        setErrorFields((prev) => ({
                                          ...prev,
                                          pickUpTime: false,
                                        }));
                                      }}
                                      styles={
                                        errorFields?.pickUpTime
                                          ? selectStylesError
                                          : selectStyles
                                      }
                                    />
                                  </Form.Group>
                                </Col>

                                <Col xxl={2} lg={2} md={3} sm={6} xs={6}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label mb-3">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.dropOffTime
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Dropoff Time*
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <Select
                                      options={timeOptions}
                                      required
                                      className={`form-control-dropoff-time col-12 ${
                                        errorFields?.dropOffTime
                                          ? "select-error border-red"
                                          : ""
                                      }`}
                                      value={timeOptions.find(
                                        (option) =>
                                          option?.value === dropOffTime
                                      )}
                                      onChange={(time) => {
                                        handleDropOffTimeChange(time);
                                        setErrorFields((prev) => ({
                                          ...prev,
                                          dropOffTime: false,
                                        }));
                                      }}
                                      styles={
                                        errorFields?.dropOffTime
                                          ? selectStylesError
                                          : selectStyles
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            )}
                          </article>
                        </div>
                      </form>
                    </Col>
                  </div>
                </div>
              </div>
            </div>

            <Container fluid className="all-cars-container">
              <Row>
                <Col xxl={3} lg={3} md={4} className="filters-section">
                  <button
                    className="filters-button mb-3"
                    onClick={handleFiltersToggle}
                  >
                    Filters
                    <BsFilter size={24} />
                  </button>

                  {/* Filters content */}
                  <div
                    className={`filters-content ${filtersOpen ? "open" : ""}`}
                  >
                    <Row className="filters-cross-button-row">
                      <Col className="d-flex justify-content-start">
                        <button
                          className="apply-filters-button mb-3"
                          aria-label="Apply Filters"
                          onClick={handleFiltersClose}
                        >
                          {" "}
                          Apply
                        </button>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <button
                          className="cross-filters-button mb-3"
                          aria-label="Apply Filters"
                          onClick={handleFiltersClose}
                        >
                          {" "}
                          <RxCross2 />
                        </button>
                      </Col>
                    </Row>

                    <div className="filters-heading">
                      <div className="row d-flex">
                        <Col>
                          <h4 className="filters-text">Filters</h4>
                        </Col>
                        <Col className="clear-filters-container text-end">
                          <span
                            className="clear-filters"
                            onClick={handleClearAllFilters}
                          >
                            Reset <RxCross2 />
                          </span>
                        </Col>
                      </div>
                    </div>

                    <div className="card search-filters-card">
                      <article className="card-group-item">
                        <div className="car-categories-label">
                          <header className="card-header styled-label pt-3 pb-3">
                            <div className="car-categories-filter-container d-flex justify-content-between align-items-center">
                              <div className="car-categories-icon-title">
                                <BsCarFrontFill className="mr-2" />
                                <b>Car Categories</b>
                              </div>
                            </div>
                          </header>
                        </div>

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
                      </article>
                    </div>

                    <div className="card search-filters-card checkbox-container">
                      <article className="card-group-item">
                        <div className="car-type-filter-label">
                          <header className="card-header styled-label title car-type-filter-heading pt-3 pb-3">
                            <div className="car-type-filter-container d-flex justify-content-between align-items-center">
                              <div className="car-type-icon-title">
                                <BsJustify className="mr-2" />
                                <b>Models</b>
                              </div>
                            </div>
                          </header>
                        </div>

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
                      </article>

                      <article className="card-group-item">
                        <div className="car-price-filter-label">
                          <header className="card-header styled-label price-filter-heading pt-3 pb-3">
                            <div className="car-type-filter-container d-flex justify-content-between align-items-center">
                              <div className="car-type-icon-title">
                                <BsTags className="mr-2" />
                                <b>Price Range </b>
                              </div>
                            </div>
                          </header>
                        </div>

                        <div className="filter-content">
                          <div className="card-body">
                            <div className="">
                              <div className="form-group-price-min col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0">
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

                              <div className="form-group-price-max col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0">
                                <label
                                  htmlFor="maxPrice"
                                  className="price-range-label"
                                >
                                  Maximum Price
                                </label>

                                <input
                                  className="form-control-login"
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
                      </article>
                    </div>
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
                          {currentTableData && currentTableData.length > 0 ? (
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
                                            <b>{car?.title}</b>{" "}
                                            <b>{car?.tariffGroupId}</b> | (
                                            {categoryMap[
                                              car?.acrissCategory?.name
                                            ] || car?.acrissCategory?.name}{" "}
                                            )
                                          </span>
                                        </div>

                                        <div className="car-image-container ">
                                          <img
                                            src={car?.displayImageUrl}
                                            title={car?.title}
                                            alt={`Rent ${car?.title}`}
                                            className="car-image"
                                            onClick={() => {
                                              const vehiclePrice =
                                                renderVehiclePrices(
                                                  car.tariffGroupId
                                                );
                                              const datePickerStartDate =
                                                dateRange[0].startDate
                                                  .toISOString()
                                                  .split("T")[0];
                                              const datePickerEndDate =
                                                dateRange[0].endDate
                                                  .toISOString()
                                                  .split("T")[0];
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
                                            id={`${car?.title
                                              .replace(/\s+/g, "-")
                                              .toLowerCase()}-vehicle`}
                                          />
                                        </div>
                                        <div className="all-vehicles-features-icons text-center">
                                          {dataArray?.map(
                                            (carData, dataIndex) => (
                                              <span key={dataIndex}>
                                                {carFeaturesWithIcons?.map(
                                                  (
                                                    carFeature,
                                                    featureIndex
                                                  ) => {
                                                    const showIcon =
                                                      carData?.tariffGroupId ===
                                                      car?.tariffGroupId;
                                                    let value;
                                                    switch (carFeature?.name) {
                                                      case "Person Seats":
                                                        value =
                                                          carData?.passengerCapacity;
                                                        break;
                                                      case "Air Bags":
                                                        value =
                                                          carData?.smallBagsCapacity +
                                                          carData?.largeBagsCapacity;
                                                        break;
                                                      case "Automatic":
                                                        value =
                                                          carData?.transmission
                                                            ? carData?.transmission.split(
                                                                "/"
                                                              )[0]
                                                            : "N";
                                                        break;

                                                      default:
                                                        value =
                                                          carData[
                                                            carFeature?.name
                                                          ];
                                                        break;
                                                    }

                                                    return value !==
                                                      undefined &&
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
                                            )
                                          )}
                                        </div>
                                        <hr className="discount-line" />

                                        <div className="d-flex justify-content-center">
                                          <div className="col-xxl-10 col-lg-11 col-md-12 col-sm-12 col-12 d-flex justify-content-center flex-column">
                                            <>
                                              <button
                                                aria-label="Vehicle rate details"
                                                className="map-loc-middle"
                                                onClick={() => {
                                                  const vehiclePrice =
                                                    renderVehiclePrices(
                                                      car.tariffGroupId
                                                    );
                                                  const datePickerStartDate =
                                                    dateRange[0].startDate
                                                      .toISOString()
                                                      .split("T")[0];
                                                  const datePickerEndDate =
                                                    dateRange[0].endDate
                                                      .toISOString()
                                                      .split("T")[0];
                                                  allCarsBookingButton(
                                                    car?.tariffGroupId,
                                                    `${car?.title} - ${
                                                      categoryMap[
                                                        car?.acrissCategory
                                                          ?.name
                                                      ] ||
                                                      car?.acrissCategory?.name
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
                                                      <span className="pay-now-price-md-lg">
                                                        <span>|</span>{" "}
                                                        {car?.rate} Aed Per{" "}
                                                        {numberOfDays} Day
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
                          ) : (
                            <>
                              <div className="text-center">
                                No Vehicle available.
                              </div>
                            </>
                          )}
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
