import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

function CourseLayout() {
  const navigate = useNavigate();
  const handleOnCardClick = (day,activities)=>{
    console.log("Cource name in cource layout " + courseData.CourcenName)
    navigate('/chatLayout', { state: { day: day,activities:activities,courseName:courseData.CourcenName } })
  }

  const location = useLocation();
  const { courseData } = location.state || {};

  if (!courseData) {
    return <div>No course data available</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={3} ml={3}> {/* Added ml={3} for left margin */}
              <SoftTypography variant="h4" gutterBottom>
                {courseData.CourcenName}
              </SoftTypography>
              <SoftTypography variant="h6" gutterBottom>
                Topics:
              </SoftTypography>
              <SoftBox ml={3}> {/* Added separate SoftBox with ml={3} for list items */}
                <ul>
                  {courseData.CurriculumData.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </SoftBox>
              <SoftTypography variant="h6" gutterBottom>
                Daily Itinerary:
              </SoftTypography>
              <Grid container spacing={2}>
                {Object.entries(courseData.CurriculumData.dailyItinerary).map(([day, activities]) => (
                  <Grid item xs={12} sm={6} md={4} key={day} >
                    <Card onClick={()=>handleOnCardClick(day,activities)}>
                      <SoftBox p={2} ml={2}> {/* Added ml={2} for left margin in cards */}
                        <SoftTypography variant="h6">{day}</SoftTypography>
                        <ul>
                          {activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </SoftBox>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CourseLayout;