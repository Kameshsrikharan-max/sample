//import Form from "./Form";

//function App() {
//  return (
//    <div>
//      <Form />
//    </div>
//  );
//}

//export default App;


//import Header from "./components/Header";
//import Hero from "./components/Hero";
//import Destinations from "./components/Destinations";
//import Gallery from "./components/Gallery";
//import Contact from "./components/Contact";
//import Contactus from "./components/Contactus";
//import Footer from "./components/Footer";

//function App() {
//  return (
//    <>
//      <Header />
  //    <Hero />
  //    <Destinations />
  //    <Gallery />
 //     <Contact />
//      <Contactus />
//      <Footer />
  //  </>
  //);
//}

//export default App;

//import { useState } from "react";
//import LoginUI from "./LoginUI.jsx";
//function App() {
//  const [isLoggedIn, setIsLoggedIn] = useState(false);

//  return (

//    <>
 //     {!isLoggedIn ? (
  //      <LoginUI onLogin={() => setIsLoggedIn(true)} />
    //  ) : (
      //  <Dashboard />
      //)}
    //</>
  //);
//}

//export default App;


import React, { useState } from "react";
import PhotoLog from "./Photo_Log";
import PhotoDashboard from "./Photo_Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (credentials) => {
    console.log("User Logged In:", credentials);
    setIsLoggedIn(true);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {isLoggedIn ? (
        <PhotoDashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <PhotoLog onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}