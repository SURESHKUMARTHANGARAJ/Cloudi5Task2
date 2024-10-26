import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isOpen,setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [countries, setCountries] = useState([]);
  const [firms, setFirms] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [logo, setLogo] = useState(null);

  const initialFirmDetails = {
    id: "",
    firmName: "",
    altFirmName: "",
    ownerName: "",
    email: "",
    website: "",
    mobile: "",
  };
  const initialAddressDetails = {
    country: "",
    state: "",
    district: "",
    taluka: "",
    pincode: "",
    address: "",
  };
  const initialOtherDetails = {
    panNo: "",
    tanNo: "",
    gstNo: "",
    fssaiNo: "",
    cinNo: "",
    contactNo: "",
    status: false,
  };

  const [firmDetails, setFirmDetails] = useState(initialFirmDetails);
  const [addressDetails, setAddressDetails] = useState(initialAddressDetails);
  const [otherDetails, setOtherDetails] = useState(initialOtherDetails);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    fetchFirms();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) fetchTalukas();
  }, [selectedDistrict]);

  const fetchFirms = () => {
    axios
      .get("http://localhost:5000/api/firms")
      .then((response) => setFirms(response.data))
      .catch((error) => console.log(error));
  };

  const fetchCountries = () => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  const fetchStates = () => {
    axios
      .get(`http://localhost:5000/api/states/country/${selectedCountry}`)
      .then((response) => setStates(response.data))
      .catch((error) => console.log(error));
  };

  const fetchDistricts = () => {
    axios
      .get(`http://localhost:5000/api/districts/state/${selectedState}`)
      .then((response) => setDistricts(response.data))
      .catch((error) => console.log(error));
  };

  const fetchTalukas = () => {
    axios
      .get(`http://localhost:5000/api/talukas/district/${selectedDistrict}`)
      .then((response) => setTalukas(response.data))
      .catch((error) => console.log(error));
  };

  const handleFirmDetailChange = (e) => {
    const { name, value } = e.target;
    setFirmDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressDetailChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtherDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOtherDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddFirm = async () => {
    if(!firmDetails.id){
      try {
        const formData = new FormData();
        formData.append("logo", logo); 
        formData.append("firmDetails", JSON.stringify(firmDetails));
        formData.append("addressDetails", JSON.stringify(addressDetails));
        formData.append("otherDetails", JSON.stringify(otherDetails));
  
        const response = await axios.post(
          "http://localhost:5000/api/firms",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Firm added successfully");
        clearForm();
        fetchFirms();
      } catch (error) {
        alert("Error adding firm");
      }
    }else{
      alert("Please Update First");
    }
  };

  const handleUpdateFirm = async () => {
    if(firmDetails.id){
      try {
        const formData = new FormData();
  
        if (logo && typeof logo !== "string") {
          formData.append("logo", logo);
        }
  
        formData.append("firmDetails", JSON.stringify(firmDetails));
        formData.append("addressDetails", JSON.stringify(addressDetails));
        formData.append("otherDetails", JSON.stringify(otherDetails));
  
        await axios.put(
          `http://localhost:5000/api/firms/${firmDetails.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        alert("Firm updated successfully");
        fetchFirms();
        clearForm();
      } catch (error) {
        alert("Error updating firm");
      }
  
    } else{
      alert("please try add first")
    } 
  };

  const handleDeleteFirm = async () => {
    if(firmDetails.id){
      try {
        await axios.delete(`http://localhost:5000/api/firms/${firmDetails.id}`);
        alert("Firm deleted successfully");
        clearForm();
        fetchFirms();
      } catch (error) {
        alert("Error deleting firm");
      }
    }else{
      alert("unable to delete without ID");
    }
  };

  const handleGetFirmByName = async () => {
    if(firmDetails.firmName){
      try {
        const response = await axios.get(
          `http://localhost:5000/api/firms/name/${firmDetails.firmName}`
        );
        const firmData = response.data;
  
        setFirmDetails({
          id: firmData._id,
          firmName: firmData.firmName,
          altFirmName: firmData.altFirmName,
          ownerName: firmData.ownerName,
          email: firmData.email,
          website: firmData.website,
          mobile: firmData.mobile,
        });
  
        setAddressDetails({
          country: firmData.address.country,
          state: firmData.address.state,
          district: firmData.address.district,
          taluka: firmData.address.taluka,
          pincode: firmData.address.pincode,
          address: firmData.address.address,
        });
  
        setOtherDetails({
          panNo: firmData.otherDetails.panNo,
          tanNo: firmData.otherDetails.tanNo,
          gstNo: firmData.otherDetails.gstNo,
          fssaiNo: firmData.otherDetails.fssaiNo,
          cinNo: firmData.otherDetails.cinNo,
          contactNo: firmData.otherDetails.contactNo,
          status: firmData.otherDetails.status,
        });
  
        if (firmData.logo) {
          setImage(`http://localhost:5000/${firmData.logo}`);
        }
        alert("Firm fetched successfully");
      } catch (error) {
        console.error("Error fetching firm by name:", error);
      }
  
    }else{
      alert("FirmName is required to Fetch Data")
    }
  };

  

  const clearForm = () => {
    setFirmDetails(initialFirmDetails);
    setAddressDetails(initialAddressDetails);
    setOtherDetails(initialOtherDetails);
    setLogo(null);
    setImage(null);
  };

    const changeToggle = () => {
        setIsOpen(!isOpen); 
    }

  return (
    <GlobalContext.Provider value={{
      isOpen,
      setIsOpen,
      changeToggle,
      image,
      setImage,
      countries,
      setCountries,
      firms,
      setFirms,
      states,
      setStates,
      districts,
      setDistricts,
      talukas,
      setTalukas,
      logo,
      setLogo,
      firmDetails,
      setFirmDetails,
      addressDetails,
      setAddressDetails,
      otherDetails,
      setOtherDetails,
      selectedCountry,
      setSelectedCountry,
      selectedState,
      setSelectedState,
      selectedDistrict,
      setSelectedDistrict,
      handleFirmDetailChange,
      handleAddressDetailChange,
      handleOtherDetailChange,
      handleAddFirm,
      handleUpdateFirm,
      handleDeleteFirm,
      handleGetFirmByName,
      clearForm,
      fetchFirms,
      fetchCountries,
      fetchStates,
      fetchDistricts,
      fetchTalukas,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
