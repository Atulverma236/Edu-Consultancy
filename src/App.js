import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import CourseAddition from './Components/CourseComponent/CourseAddition';
import AdminCourseList from './Components/CourseComponent/AdminCourseList';
import StudentCourseList from './Components/CourseComponent/StudentCourseList';
import CourseUpdate from './Components/CourseComponent/CourseUpdate';
import StudentAddition from './Components/StudentComponent/StudentAddition';
import StudentList from './Components/StudentComponent/StudentList';
import StudentUpdate from './Components/StudentComponent/StudentUpdate';
import StudentCurrent from './Components/StudentComponent/StudentCurrent';
import StudentDetail from './Components/StudentComponent/StudentDetail';
import CurrentSubscription from './Components/SubscriptionComponent/CurrentSubscription';
import SubscriptionAddition from './Components/SubscriptionComponent/SubscriptionAddition';
import SubscriptionDetails from './Components/SubscriptionComponent/SubscriptionDetails';
import SubscriptionList from './Components/SubscriptionComponent/SubscriptionList';
import SubscriptionUpdate from './Components/SubscriptionComponent/SubscriptionUpdate';
import SubscriptionByStudentList from './Components/SubscriptionComponent/SubscriptionByStudentList';
import PaymentEntry from './Components/PaymentComponent/PaymentEntry';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/AdminMenu' element={<AdminMenu />} />
            <Route path='/StudentMenu' element={<StudentMenu/>} />
            <Route path='/course-add' element={<CourseAddition/>} />
            <Route path='/admin-course-list' element={<AdminCourseList/>} />
            <Route path='/student-course-list' element={<StudentCourseList/>} />
            <Route path='/update-course/:id' element={<CourseUpdate/>} />
            <Route path='/student-add' element={<StudentAddition/>} />
            <Route path='/student-list' element={<StudentList/>} />
            <Route path='/update-student/:reg' element={<StudentUpdate/>} />
            <Route path='/current-student' element={<StudentCurrent/>} />
            <Route path='/student-detail' element={<StudentDetail/>} />
            <Route path='/current-subscription' element={<CurrentSubscription/>} />
            <Route path='/add-subscription/:courseId' element={<SubscriptionAddition/>} />
            <Route path='/subscription-detail' element={<SubscriptionDetails/>} />
            <Route path='/subscription-list' element={<SubscriptionList/>} />
            <Route path='/subscription-update/:subscriptionId' element={<SubscriptionUpdate/>} />
            <Route path='/subscription-by-student-list' element={<SubscriptionByStudentList/>} />
            <Route path='/payment-entry' element={<PaymentEntry/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
