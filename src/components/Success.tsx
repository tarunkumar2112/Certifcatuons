import React from 'react';
import './Success.css';
import { useNavigate, useParams } from 'react-router-dom';
import CheckmarkComponent from './CheckmarkComponent';

const Success = () => {
  const navigate = useNavigate(); // Get the navigation function
  const { id } = useParams(); // Get the credential ID from the URL

  // Redirect to the view credential page when clicked
  const handleViewCredentials = () => {
    navigate(`/viewcredential/${id}`);
  };

  return (
    <div>
      <div className="create-credential-containers">
        <h2>Create Credentials for Contract Drafting Skills Workshop</h2>
        <div className="Steps">
          <div>
            <button type="button" className="inactive-step">1. Fill Data</button>
            <button type="button" className="active-step">2. Summary</button>
          </div>
        </div>
      </div>

      <div className="container">
        <CheckmarkComponent />
        <h2>1 Credential Has Been Created. But Not Published Yet</h2>
        <p className="instructions">
          You Will Need To Review And Publish Them. Recipients Will Not Be Emailed
          Until You Publish Them. Also, Your Plan Usage Isn't Updated Until You
          Publish The Credentials That Were Created.
        </p>

        {/* Button to view unpublished credentials */}
        <button className="btn-view-unpublished" onClick={handleViewCredentials}>
          View Unpublished Credentials
        </button>
      </div>
    </div>
  );
};

export default Success;
