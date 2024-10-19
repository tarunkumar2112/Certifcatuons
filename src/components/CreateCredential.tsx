import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import credimg from '../assets/credentialsimg.png';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const CreateCredential = () => {
  const [recipientName, setRecipientName] = useState('');
  const [email, setEmail] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [loading, setLoading] = useState(false); // State to handle spinner
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleCreateCredential = async () => {
    // Validate form fields
    if (!recipientName || !email || !issueDate) {
      //setErrorMessage('All fields are required.');
      toast.warning('Please fill in all fields.', {
        position: 'top-right',
    });
      return;
    }

    // Get API URL from environment variable and validate
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
      console.error('API URL is not defined in the environment variables');
      setErrorMessage('API configuration error. Please contact support.');
      return;
    }

    // Prepare the API request
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token token=${process.env.REACT_APP_AUTH_TOKEN}`);
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      credential: {
        recipient: {
          name: recipientName,
          email: email,
        },
        group_id: 626573, // Static group ID
        issued_on: issueDate,
        approve: false,
      },
    });

    try {
      setLoading(true); // Start showing the spinner
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow',
      });
      const result = await response.json();

      if (response.ok) {
        console.log('Credential created:', result);
        setErrorMessage(''); // Clear any previous errors

        // Show success toast and redirect
        toast.success('Credential successfully created!', {
          position: 'top-right', // Correct positioning
        });

        // Extract credential ID from the result
        const credentialId = result.credential.id; // Adjust this based on your API response structure

        // Redirect to /success with the credential ID
        setTimeout(() => {
          navigate(`/success/${credentialId}`); // Pass the credential ID in the URL
        }, 2000);

      } else {
        console.error('Error creating credential:', result);
        setErrorMessage('Failed to create credential. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to create credential. Please try again.');
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  return (
    <div>
      <div className="create-credential-containers">
        <h2>Create Credentials for Contract Drafting Skills Workshop</h2>
        <div className="Steps">
          <div>
            <button type="button" className="active-step"><Link to="/createcredentials">1. Fill Data</Link></button>
            <button type="button" className="inactive-step">2. Summary</button>
          </div>
        </div>
        <div className="form-credentials">
          <h3>Creating 1 credential</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name *</th>
                <th>Email *</th>
                <th>Issue Date *</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <input
                    type="text"
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="button-row">
        <Link to='/'><button className="button cancel-button">
          <FontAwesomeIcon icon={faAngleLeft} /> Cancle
        </button></Link>
        <span className="credential-message">
          <img src={credimg} alt="Credential" /> 1 Credential will be created
        </span>
        <button className="button create-button" onClick={handleCreateCredential} disabled={loading}>
          {loading ? <Spinner /> : 'Create Credentials'}
          {!loading && <FontAwesomeIcon icon={faChevronRight} />}
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateCredential;
