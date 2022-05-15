import React, { Fragment } from "react";
import Header from "../CommonComps/Header";
import Footer from "../CommonComps/Footer";

const Homepage = () => {
  return (
    <Fragment>
      <Header />
      <div className="text-center">
        <h1>Zero Knowledge Authentication</h1>
        <h6> 1. Client can login without sharing password</h6>
        <h6> 2. Keys are encrypted using SHA-256 algorithm</h6>
        <h6> 3. Passwords are used only for convenience of user</h6>
        <h6> 4.Server and database don't take password as input</h6>
        <h6> 5. Based on paper{`->`} 
          <a 
          href="https://www.researchgate.net/publication/316492793_A_Survey_of_Zero-Knowledge_Proof_for_Authentication" 
          rel="noopener noreferrer" 
          target="_blank">
            Zero Knowledge Proof for Authentication
          </a>
        </h6>
        <h6><small style={{opacity:"0.5"}}>{` (published on : Feb 2015)`}</small></h6>
        {/* 
        <br/>
        <h3>CON :</h3>
        <h6>User creds are used as source of randomness and key encryption It's still secure but a better approach should be considered.</h6> 
        */}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Homepage;
