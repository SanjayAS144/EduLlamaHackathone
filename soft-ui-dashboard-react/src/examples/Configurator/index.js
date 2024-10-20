/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import styles from "examples/Configurator/style.css";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import curriculumService from "../../services/curricullumService";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";

function Configurator() {

  const [isOpen, setIsOpen] = useState(false); // State to track if dropdown is open
  const [isLevelOpen, setIsLevelOpen] = useState(false); // State to track if dropdown is open
  const [selectedItem, setSelectedItem] = useState(null);
  const [LevelItemSelected, setLevelItemSelected] = useState(false); // State to track if dropdown is open
  const items = ['Integration', 'derivation', 'Polynomial'];
  const Levels = ['Beginer', 'Intermediate'];
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with input value
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await curriculumService.addCurriculum(selectedItem, LevelItemSelected, inputValue);
      console.log('Submitted Value:', inputValue);
      // Reset form fields after successful submission
      setSelectedItem(null);
      setLevelItemSelected(null);
      setInputValue('');
    } catch (error) {
      console.error('Error submitting curriculum:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleLevelDropdown = () => {
    setIsLevelOpen(!isLevelOpen);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item); // Set selected item
    setIsOpen(false); // Close dropdown after selection
  };
  const handleLevelItemClick = (item) => {
    setLevelItemSelected(item); // Set selected item
    setIsLevelOpen(false); // Close dropdown after selection
  };
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    handleItemClick(null);
    setOpenConfigurator(dispatch, false)
  };
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SoftBox>
          <SoftTypography variant="h5">Create a new Cource</SoftTypography>
        </SoftBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SoftBox>

      <Divider />

      <SoftBox pt={1.25} pb={3} px={3}>

      <div className="selector-container">
        <div className="selector-button" onClick={toggleDropdown}>
          {selectedItem || 'Select subtopic'}
          <span>{isOpen ? '▲' : '▼'}</span> {/* Arrow indicator */}
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {items.map((item, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <SoftBox pt={1.25} pb={1} px={3}></SoftBox>
      
      <div className="selector-container">
        <div className="selector-button" onClick={toggleLevelDropdown}>
          {LevelItemSelected || 'Select Level'}
          <span>{isLevelOpen ? '▲' : '▼'}</span> {/* Arrow indicator */}
        </div>
        {isLevelOpen && (
          <ul className="dropdown-list">
            {Levels.map((item, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleLevelItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

        <SoftBox pt={1.25} pb={1} px={3}></SoftBox>
      <SoftInput placeholder="number of days" value={inputValue} // Bind input value to state
          onChange={handleInputChange}></SoftInput>

        <Divider />

        <SoftBox mt={3} mb={2}>
          <SoftBox mb={2}>
            <SoftButton
              component={Link}
              href="https://www.creative-tim.com/product/soft-ui-dashboard-react"
              target="_blank"
              rel="noreferrer"
              color="dark"
              variant="gradient"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
