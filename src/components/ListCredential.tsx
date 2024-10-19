import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton styles
import credentialsimg from '../assets/credentialsimg.png';
import './ListCredential.css';
import { Link } from 'react-router-dom';
import { faChevronRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define the Credential interface
interface Credential {
  id: string;
  recipient: {
    name: string;
    email: string;
  };
  group_name: string;
  issued_on: string;
  expired_on: string | null;
}

const Credentials: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token token=${process.env.REACT_APP_AUTH_TOKEN}`,
        }),
        redirect: 'follow' as RequestRedirect,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_LIST_URL}?group_id=626573`, requestOptions);
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          setCredentials(result.credentials);
        } else {
          console.error('Response is not JSON:', response);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching credentials:', error);
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  return (
    <div className='main-wrapper'>
      <div className="credential-main">
        <div className="container">
          <div className="cred-rowfirst">
            <div className="cred-colmain1">
              <img src={credentialsimg} alt="credentialsimg" /> 
              <h1>Credentials</h1>
            </div>
            <div className="cred-colmain2">
              <Link to='/createcredentials'>Create Credentials</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main-cred">
        <div className="container">
          <div className="list-view">
            <span>Viewing 1 - {credentials.length} of {credentials.length} credentials</span>
            <div className="page-controls">
              <button className="page-arrow"><FontAwesomeIcon icon={faAngleLeft} /></button>
              <button className="page-arrow"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <table className="credentials-table">
                <thead>
                  <tr>
                    <th><Skeleton width={20} /></th>
                    <th><Skeleton width={100} /></th>
                    <th><Skeleton width={200} /></th>
                    <th><Skeleton width={100} /></th>
                    <th><Skeleton width={100} /></th>
                    <th><Skeleton width={100} /></th>
                    <th><Skeleton width={100} /></th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => ( // Generate 5 skeleton rows
                    <tr key={index}>
                      <td><Skeleton width={20} /></td>
                      <td><Skeleton width={100} /></td>
                      <td>
                        <Skeleton circle width={30} height={30} /> {/* Circle for recipient's initial */}
                        <Skeleton width={150} />
                      </td>
                      <td><Skeleton width={100} /></td>
                      <td><Skeleton width={100} /></td>
                      <td><Skeleton width={100} /></td>
                      <td><Skeleton width={100} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="credentials-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Credentials ID</th>
                    <th>Recipient</th>
                    <th>Group</th>
                    <th>Issue Date</th>
                    <th>Expiry Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials.map((cred) => (
                    <tr key={cred.id}>
                      <td><input type="checkbox" /></td>
                      <td>{cred.id}</td>
                      <td>
                        <span className={`circle ${cred.recipient.name[0].toLowerCase()}`}>
                          {cred.recipient.name[0]}
                        </span> 
                        {cred.recipient.name}<br />
                        <small>{cred.recipient.email}</small>
                      </td>
                      <td><a href="#">{cred.group_name}</a></td>
                      <td>{cred.issued_on}</td>
                      <td>{cred.expired_on || '—'}</td>
                      <td><button className="open-button">Open</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
