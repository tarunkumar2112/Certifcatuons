import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewCredential.css';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { faAngleLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewCredential = () => {
  const { id } = useParams(); // Get the credential ID from the URL
  const [credential, setCredential] = useState<any>(null); // State to store credential data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Function to fetch the credential details from the API
    const fetchCredential = () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Token token=${process.env.REACT_APP_AUTH_TOKEN}`);

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${process.env.REACT_APP_API_URL}/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setCredential(result.credential);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching credential:', error);
          setError('Failed to fetch credential');
          setLoading(false);
        });
    };

    fetchCredential();
  }, [id]); // Fetch credential when the component mounts or when the id changes

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="credential-details">
        <h1>{credential.name}</h1>
        <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: credential.description }} /></p>
        <p><strong>Recipient:</strong> {credential.recipient.name} ({credential.recipient.email})</p>
        <p><strong>Issued On:</strong> {credential.issued_on}</p>
        <p><strong>Group Name:</strong> {credential.group_name}</p>
        <p><strong>Course Link:</strong> <a href={credential.course_link} target="_blank" rel="noopener noreferrer">{credential.course_link}</a></p>
        <p><strong>Certificate URL:</strong> <a href={credential.url} target="_blank" rel="noopener noreferrer">{credential.url}</a></p>
        {credential.expired_on ? (
          <p><strong>Expired On:</strong> {credential.expired_on}</p>
        ) : (
          <p><strong>Expiration:</strong> Not expired</p>
        )}
        <p><strong>Issuer:</strong> {credential.issuer.name} - <a href={credential.issuer.url} target="_blank" rel="noopener noreferrer">{credential.issuer.url}</a></p>
      </div>
      <div className="page-wrapper">
        <div className="container first-section">
          <div className="first-main-row">
            <div className="col left-side">
              <div className='Icon-back'>
                <Link to='/'>
                  <span className='icon'><FontAwesomeIcon icon={faAngleLeft} /></span>
                  <span className='Linktext'>Credentials</span></Link>
              </div>
              <h4 className='heading'>credential<span>{id}</span></h4>
            </div>
            <div className="col right-side">
              <button className='success main-button'>Publish</button>
              <button className='Danger main-button'>Delete</button>
            </div>
          </div>
          <div className="publish-banner">
            <p>
              <span>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </span>
              this credential is <span className='approvaltext'>unpublished</span>. changes will only be visible to the owner once it is published.
            </p>
          </div>
        </div>
        <div className='container second-section'>
          <div className="row-main-information">
            <div className="column update-column">
            <form >
        <div className='warpper-two-inputs'>
      <div className="form-group">
        <label htmlFor="credentialLicenseId">Credential License ID:</label>
        <input type="text" id="credentialLicenseId" name="credentialLicenseId" value={id}/>
      </div>
    
      <div className="form-group">
        <label htmlFor="recipientId">Recipient ID:</label>
        <input type="text" id="recipientId" name="recipientId" value={credential.recipient.id} />
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="recipientName">Recipient Name:</label>
        <input type="text" id="recipientName" name="recipientName" value={credential.recipient.name}/>
      </div>

      <div className="form-group">
        <label htmlFor="recipientEmail">Recipient Email Address:</label>
        <input type="email" id="recipientEmail" name="recipientEmail" value={credential.recipient.email}/>
      </div>

      <div className="form-group">
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" value={credential.grade}/>
      </div>
      <div className='warpper-two-inputs'>
      <div className="form-group">
        <label htmlFor="issueDate">Issue Date:</label>
        <input type="date" id="issueDate" name="issueDate" value={credential.issued_on} />
      </div>

      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input type="date" id="expiryDate" name="expiryDate" value={credential.expired_on}/>
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="convenedBy">Convened By:</label>
        <input type="text" id="convenedBy" name="convenedBy" />
      </div>

      <div className="form-group">
        <label htmlFor="nameDirectorSigning">Name Director Signing:</label>
        <input type="text" id="nameDirectorSigning" name="nameDirectorSigning" />
      </div>

      <div className="form-group">
        <label htmlFor="dateSigned">Date Signed:</label>
        <input type="date" id="dateSigned" name="dateSigned" />
      </div>

      <button type="submit">Save</button>
    </form>
            </div>
            <div className="column View-column">
              <p>Credential Preview</p>
                <div className="main-bview-column">
                  <img 
                  src={credential.certificate.image.preview}
                  alt="credential Preview"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCredential;
