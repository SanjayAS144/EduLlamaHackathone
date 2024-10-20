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
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";


// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import curriculumService from "services/curricullumService";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const data = [
    { id: 1, name: 'Integration', description: ['Introduction to Integration', 'Basic Integration Rules', 'Integration by Substitution', 'Integration by Parts', 'Integration of Trigonometric Functions', 'Integration of Exponential and Logarithmic Functions', 'Applications of Integration']},
    { id: 2, name: 'Derivation', description: ['Introduction to Integration', 'Basic Integration Rules', 'Integration by Substitution', 'Integration by Parts', 'Integration of Trigonometric Functions', 'Integration of Exponential and Logarithmic Functions', 'Applications of Integration']},
    { id: 3, name: 'Polynomials', description: ['Introduction to Integration', 'Basic Integration Rules', 'Integration by Substitution', 'Integration by Parts', 'Integration of Trigonometric Functions', 'Integration of Exponential and Logarithmic Functions', 'Applications of Integration']},
  ];

  useEffect(() => {
    
    setIsLoading(true);

    const handleCourseUpdate = (updatedCourses) => {
      console.log("Received updated courses:", updatedCourses);
      setCourses(updatedCourses);
      setIsLoading(false);
    };

    const unsubscribe = curriculumService.subscribe(handleCourseUpdate);

    curriculumService.getAllCurriculum().catch(error => {
      console.error("Error fetching courses:", error);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCourseClick = (course) => {
    // Navigate to the CourseLayout component with the course data
    navigate('/CourceLayout', { state: { courseData: course } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PaymentMethod />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {isLoading ? (
            <SoftBox display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </SoftBox>
          ) : (
            <Grid container spacing={3}>
              {courses.map((course, index) => (
                <Grid key={index} item xs={12} sm={6} xl={3}>
                  <SoftBox onClick={() => handleCourseClick(course)} style={{ cursor: 'pointer' }}>
                    <DefaultInfoCard
                      icon="account_balance"
                      title={course.CourcenName || 'No Course Name'}
                      description={`${course.CurriculumData.topics.length} topics`}
                      value={`${Object.keys(course.CurriculumData.dailyItinerary).length} days`}
                    />
                  </SoftBox>
                </Grid>
              ))}
            </Grid>
          )}
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
