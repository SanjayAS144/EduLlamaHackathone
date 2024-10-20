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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

function PaymentMethod() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;

  const { borderWidth, borderColor } = borders;
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Add New Math Tutor
        </SoftTypography>
        <SoftButton variant="gradient" color="dark" onClick={handleConfiguratorOpen}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new
          
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
