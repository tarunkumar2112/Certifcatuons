import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import credentialsimg from '../assets/credentialsimg.png';
import './ListCredential.css';
import { Link } from 'react-router-dom';
import { faChevronRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';

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

const PAGE_SIZE = 5; // Set the number of credentials per page

const Credentials: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Track selected IDs
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // Track deletion state
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const totalPages = Math.ceil(credentials.length / PAGE_SIZE); // Calculate total pages

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

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  // Delete selected credentials
  const handleDelete = async () => {
    setIsDeleting(true);
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Token token=${process.env.REACT_APP_AUTH_TOKEN}`,
    });

    try {
      const deleteRequests = selectedIds.map(id => {
        return fetch(`https://api.accredible.com/v1/credentials/${id}`, {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        });
      });

      // Wait for all delete requests to complete
      await Promise.all(deleteRequests);
      toast.success('Selected credentials deleted successfully!'); // Show success toast
      setSelectedIds([]); // Clear selected IDs
      // Optionally, refetch credentials here
      setCredentials(prev => prev.filter(cred => !selectedIds.includes(cred.id))); // Remove deleted from state
    } catch (error) {
      console.error('Error deleting credentials:', error);
      toast.error('Error deleting selected credentials.'); // Show error toast
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination logic
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const displayedCredentials = credentials.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
            <span>Viewing {(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, credentials.length)} of {credentials.length} credentials</span>
            <button
              className={`delete-button ${selectedIds.length === 0 ? 'disabled' : ''}`}
              onClick={handleDelete}
              disabled={selectedIds.length === 0 || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <div className="page-controls">
              <button className="page-arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="page-arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
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
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td><Skeleton width={20} /></td>
                      <td><Skeleton width={100} /></td>
                      <td>
                        <Skeleton circle width={30} height={30} />
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
              <>
                <table className="credentials-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds(credentials.map(cred => cred.id)); // Select all credentials
                            } else {
                              setSelectedIds([]); // Deselect all credentials
                            }
                          }}
                          checked={selectedIds.length === credentials.length && credentials.length > 0}
                        />
                      </th>                      <th>Credentials ID</th>
                      <th>Recipient</th>
                      <th>Group</th>
                      <th>Issue Date</th>
                      <th>Expiry Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCredentials.map((cred) => (
                      <tr key={cred.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(cred.id)}
                            onChange={() => handleCheckboxChange(cred.id)}
                          />
                        </td>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
