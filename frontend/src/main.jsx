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
      <Route path='client/requirement/add' element = {<AddRequirement/>}/>   
      <Route path='client/requirement/all' element = {<AllRequirement/>}/>   
      <Route path='candidate/requirement/all' element = {<AvailableRequirement/>}/>   
      <Route path='candidate/requirement/detail/:requirementId' element = {<RequirementDetail/>}/>   
      <Route path='candidate/profile' element = {<CandidateProfile/>}/>   
      <Route path='candidate/profile/edit' element = {<EditCandidateProfile/>}/>   
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)