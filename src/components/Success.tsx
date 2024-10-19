import React from 'react'
import './Success.css';
import { Link } from 'react-router-dom';
import CheckmarkComponent from './CheckmarkComponent'
const Success = () => {
  return (
    <div>
        <div className="create-credential-containers">
        <h2>Create Credentials for Contract Drafting Skills Workshop</h2>
        <div className="Steps">
          <div>
            <button type="button" className="inactive-step"><Link to="/createcredentials">1. Fill Data</Link></button>
            <button type="button" className="active-step">2. Summary</button>
          </div>
        </div>
      </div>
      <div className="container">

      <CheckmarkComponent />
        {/* Text Section */}
        <h2>1 Credential Has Been Created. But Not Published Yet</h2>
      <p className="instructions">
        You Will Need To Review And Publish Them. Recipients Will Not Be Emailed
        Until You Publish Them. Also, Your Plan Usage Isn't Updated Until You
        Publish The Credentials That Were Created.
      </p>

      {/* Button */}
      <button className="btn-view-unpublished">View Unpublished Credentials</button>
      </div>
    </div>
  )
}

export default Success
