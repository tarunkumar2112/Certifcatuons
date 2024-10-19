import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
  );
};

export default ViewCredential;
