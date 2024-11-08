// src/App.js

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Login } from './pages/out/login/Login';
import { Registration } from './pages/out/registration/Registration';
import { Welcome } from './pages/out/welcome/Welcome';
import { Publish } from './pages/out/publish/Publish';
import { Provider } from './pages/out/provider/Provider';
import { Work } from './pages/out/work/Work';
import { Announcement } from './pages/out/announcement/Announcement';
import { Presentation } from './pages/out/presentation/Presentation';
import { Navbar } from './components/out/navbar/Navbar';
import { Footer } from './components/out/footer/Footer';
import { Identify } from './pages/out/identify/Identify';
import { Otp } from './pages/out/otp/Otp';
import { Password } from './pages/out/password/Password';
import { Confirm } from './pages/out/confirm/Confirm';
import { Recovery } from './pages/out/recovery/Recovery';
import { Dashboard } from './pages/in/dashboard/Dashboard';
import { Header } from './components/in/header/Header';
import { Foot } from './components/in/foot/Foot';
import { SideBar } from './components/in/sideBar/SideBar';
import { Todo } from './pages/in/todo/Todo';
import { FastAnnouncement } from './pages/in/fastAnnouncement/FastAnnouncement';
import { ProjectHead } from './components/in/projectHead/ProjectHead';
import { ProjectClientHead } from './components/in/projectClientHead/ProjectClientHead';
import { ProjectProviderHead } from './components/in/projectProviderHead/ProjectProviderHead';

import { SearchFreelance } from './pages/in/projectClient/searchFreelance/SearchFreelance';
import { ClientPublish } from './pages/in/projectClient/clientPublish/ClientPublish';
import { OngoingClient } from './pages/in/projectClient/ongoingClient/OngoingClient';
import { PastClient } from './pages/in/projectClient/pastClient/PastClient';
import { DiscussionsClient } from './pages/in/projectClient/discussionsClient/DiscussionsClient';
import { OffresProvider } from './pages/in/projectProvider/offresProvider/OffresProvider';
import { OngoingProvider } from './pages/in/projectProvider/ongoingProvider/OngoingProvider';
import { PastProvider } from './pages/in/projectProvider/pastProvider/PastProvider';
import { ServicesProvider } from './pages/in/projectProvider/servicesProvider/ServicesProvider';
import { DiscussionsProvider } from './pages/in/projectProvider/discussionsProvider/DiscussionsProvider';
import AuthRoute from './components/authRoute/AuthRoute';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { AnnouncementHead } from './components/in/announcementHead/AnnouncementHead';
import { AllAnnouncement } from './pages/in/allAnnouncement/AllAnnouncement';
import { OtpInfo } from './pages/out/otpInfo/OtpInfo';
import Subscription from './pages/in/subscription/Subscription';

function App() {
  const Layout = () => (
    <div className="main">
      <div className="fixe">
        <Navbar />
      </div>
      <div className="container">
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
      
    </div>
  );

  const LayoutAdmin = () => (
    <div className="admin-main">
      <Header />
      <div className='admin-container'>
        <SideBar />
        <div className="admin-container-right">
          <Outlet />
        </div>
      </div>
      {/* <Foot /> */}
    </div>
  );

  const LayoutProject = () => (
    <div className="main-project">
      <ProjectHead />
      <div className="container-project">
        <Outlet />
      </div>
    </div>
  );

  const LayoutProjectClient = () => (
    <div className="main-project-client">
      <ProjectClientHead />
      <div className="container-project-client">
        <Outlet />
      </div>
    </div>
  );

  const LayoutProjectProvider = () => (
    <div className="main-project-provider">
      <ProjectProviderHead />
      <div className="container-project-provider">
        <Outlet />
      </div>
    </div>
  );

  const LayoutAnnouncement = () => (
    <div className="main-project-provider">
      <AnnouncementHead />
      <div className="container-project-provider">
        <Outlet />
      </div>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Welcome /> },
        { path: "publish", element: <Publish /> },
        { path: "provider", element: <Provider /> },
        { path: "otp-info", element: <OtpInfo /> },
        { path: "work", element: <Work /> },
        { path: "announcement", element: <Announcement /> },
        { path: "presentation", element: <Presentation /> },
      ]
    },
    { path: "/login", element: <Login /> },
    { path: "/registration", element: <Registration /> },
    { path: "/otp", element: <Otp /> },
    { path: "/identify", element: <Identify /> },
    { path: "/confirm", element: <Confirm /> },
    { path: "/password", element: <Password /> },
    { path: "/recovery", element: <Recovery /> },
    {
      path: "dashboard",
      element: <AuthRoute />,  // Protéger le dashboard
      children: [
        { path: "", element: <LayoutAdmin />,
          children: [
            { path: "", element: <Dashboard /> },
            { path: "todo", element: <Todo /> },

        { path: "subscription", element: <Subscription /> },
        { path: "discussion", element: <DiscussionsClient /> },
        { 
          path: "project",
          element: <LayoutProject />,
          children: [
            { 
              path: "", 
              element: <LayoutProjectClient />, 
              children: [
                { path: "", element: <SearchFreelance /> },
                { path: "client-publish", element: <ClientPublish /> },
                { path: "ongoing-client", element: <OngoingClient /> },
                { path: "past-client", element: <PastClient /> },
                // { path: "discussions-client", element: <DiscussionsClient /> },
              ]
            },
            { 
              path: "prestataire", 
              element: <LayoutProjectProvider />,
              children: [
                { path: "", element: <OffresProvider /> },
                { path: "ongoing-provider", element: <OngoingProvider /> },
                { path: "past-provider", element: <PastProvider /> },
                { path: "services-provider", element: <ServicesProvider /> },
                // { path: "discussions-provider", element: <DiscussionsProvider /> },
              ]
            },
          ]
        },
        { path: "fastannouncement",
           element: <LayoutAnnouncement /> ,
          children: [
            { path: "", element:<FastAnnouncement /> },
            { path: "liste-annonces", element: <AllAnnouncement /> }

          ]},
          ]
         },
        
      ]
    }
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
