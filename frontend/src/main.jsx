import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import { RegisterCandidate } from './components/authentication/RegisterCandidate.jsx'
import Home from './components/home/home.jsx'
import { LoginCandidate } from './components/authentication/LoginCandidate.jsx'
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import Login from './components/authentication/Login.jsx'
import Register from './components/authentication/Register.jsx'
import { LoginClient } from './components/authentication/LoginClient.jsx'
import { RegisterClient } from './components/authentication/RegisterClient.jsx'
import AddRequirement from './components/client/requirement/AddRequirement.jsx' 
import AllRequirement from './components/client/requirement/AllRequirement.jsx'
import AvailableRequirement from './components/candidate/requirement/AvailableRequirement.jsx'
import RequirementDetail from './components/candidate/requirement/RequirementDetail.jsx'
import CandidateProfile from './components/candidate/profile/CandidateProfile.jsx'
import EditCandidateProfile from './components/candidate/profile/EditCandidateProfile.jsx'
import AllApplication from './components/candidate/application/AllApplication.jsx'
import ApplicationDetail from './components/candidate/application/ApplicationDetail.jsx'
import AllApplicants from './components/client/applicants/AllApplicants.jsx'
import ApplicantsByRequirement from './components/client/applicants/ApplicantsByRequirement.jsx'
import ApplicantDetail from './components/client/applicants/ApplicantDetail.jsx'
import AddInterview from './components/client/interview/AddInterview.jsx'
import UpcommingInterview from './components/client/interview/UpcommingInterview.jsx'
import InterviewClient from './components/client/interview/InterviewClient.jsx'
import InterviewCandidate from './components/candidate/interview/InterviewCandidate.jsx'
import JoinInterview from './components/candidate/interview/JoinInterview.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element = {<App/>}>
      <Route path = ''  element = {<Home/>}/>
      <Route path='register/candidate' element = {<RegisterCandidate/>}/>
      <Route path='login/candidate' element = {<LoginCandidate/>}/>      
      <Route path='login/client' element = {<LoginClient/>}/>      
      <Route path='register/client' element = {<RegisterClient/>}/>      
      <Route path='about' element = {<About/>}/>      
      <Route path='contact' element = {<Contact/>}/>      
      <Route path='login' element = {<Login/>}/>      
      <Route path='register' element = {<Register/>}/>   
      <Route path='client/add/requirement' element = {<AddRequirement/>}/>   
      <Route path='client/requirement' element = {<AllRequirement/>}/>
      <Route path='client/applicants' element = {<AllApplicants/>}/>
      <Route path='client/applicants/requirements/:requirementId' element = {<ApplicantsByRequirement/>}/>
      <Route path='client/applicants/detail/:applicationId' element = {<ApplicantDetail/>}/>
      <Route path='client/interview/schedule/:applicationId' element = {<AddInterview/>}/>
      <Route path='client/interview/upcomming' element = {<UpcommingInterview/>}/>
      <Route path='candidate/requirement' element = {<AvailableRequirement/>}/>   
      <Route path='candidate/requirement/detail/:requirementId' element = {<RequirementDetail/>}/>   
      <Route path='candidate/profile' element = {<CandidateProfile/>}/>
      <Route path='candidate/profile/edit' element = {<EditCandidateProfile/>}/>
      <Route path='candidate/application' element = {<AllApplication/>}/>
      <Route path='candidate/application/detail/:applicationId' element = {<ApplicationDetail/>}/>
      <Route path='candidate/interview/upcoming' element = {<JoinInterview/>}/>
      <Route path='interview/start/:interviewId' element = {<InterviewClient/>}/>
      <Route path='interview/join' element = {<InterviewCandidate/>}/>
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)