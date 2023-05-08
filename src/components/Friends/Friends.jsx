import "./Friends.css"
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Friends() {
    const { documents } = useCollection('users');
    const { user } = useAuthContext();
    const { updateDocument } = useFirestore('users');
    const [friend, setFriend] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { document } = useDocument('users', user.uid);
    const handleClick = (e) => {
        e.preventDefault();
        if(documents) {
            documents.map((doc) => {
                if(doc.displayName === friend) {
                    if(doc.requests) {
                        if(doc.requests.includes(user.uid)) {
                            setError('Request already sent!');
                            return false;
                        }
                        if (doc.friends && doc.friends.includes(user.uid)) {
                            setError('Already friends!');
                            return false;
                        }
                        doc.requests.push(user.uid);
                    }
                    else {
                        doc.requests = [user.uid];
                    }
                    updateDocument(doc.id, doc);
                    setError(null);
                    setSuccess('Request sent!');
                }
                else {
                    if (success) {
                        setError(null);
                    }
                    else {
                        setError('User not found!');
                    }
                }
            })
        }
    setFriend('');
    }

    const handleUnfriend = (user) => {
        // remove the user from the friends array of the current user and the other user
        return (e) => {
            e.preventDefault();
            if(document) {
                if(document.friends) {
                    document.friends = document.friends.filter((friend) => friend !== user);
                }
                updateDocument(document.id, document);
            }
            if(documents) {
                documents.map((doc) => {
                    if(doc.id === user) {
                        if(doc.friends) {
                            doc.friends = doc.friends.filter((friend) => friend !== document.id);
                        }
                        updateDocument(doc.id, doc);
                    }
                })
            }
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, success])

    const handleDecline = (user) => {
        // remove the user from the requests array of the current user and the other user
        return (e) => {
            e.preventDefault();
            if(document) {
                if(document.requests) {
                    document.requests = document.requests.filter((req) => req !== user);
                }
                updateDocument(document.id, document);
            }
            if(documents) {
                documents.map((doc) => {
                    if(doc.id === user) {
                        if(doc.requests) {
                            doc.requests = doc.requests.filter((req) => req !== document.id);
                        }
                        updateDocument(doc.id, doc);
                    }
                })
            }
        }
    }
    const handleAccept = (user) => {
        // add the user to the friends array of the current user and the other user and remove the user from the requests array
        return (e) => {
            e.preventDefault();
            if(document) {
                if(document.friends) {
                    document.friends.push(user);
                }
                else {
                    document.friends = [user];
                }
                if(document.requests) {
                    document.requests = document.requests.filter((req) => req !== user);
                }
                updateDocument(document.id, document);
            }
            if(documents) {
                documents.map((doc) => {
                    if(doc.id === user) {
                        if(doc.friends) {
                            doc.friends.push(document.id);
                        }
                        else {
                            doc.friends = [document.id];
                        }
                        if(doc.requests) {
                            doc.requests = doc.requests.filter((req) => req !== document.id);
                        }
                        updateDocument(doc.id, doc);
                    }
                })
            }
        }
    }
  return (
    <div className="friends-main">
        <h1 className="friends-title">Friends</h1>
        <div className="add-firend-inp">
            <input type="text" placeholder="Add Friend"
            onChange={(e) => setFriend(e.target.value)}
            value={friend}
            />
            <button className="btn" onClick={handleClick}>Send Request</button>
        </div>
        <div className="friends-list">
            <h2>Requests Sent</h2>
            <hr/>
            { documents && documents.map((doc) => {
                if(doc.requests) {
                    if(doc.requests.includes(user.uid)) {
                        return (
                            <>
                            <div className="requests-card">
                                <div className="friend-avatar">
                                    <Link to={`profile/${doc.id}`}><img src={doc.photoURL} alt="Avatar" /></Link>
                                </div>
                                <div className="friend" style={{"marginLeft": "30px"}} >{doc.displayName}</div>
                                <div className="friend-btns">
                                    <button className="btn-red" onClick={handleDecline(doc.id)}>Cancel</button>
                                </div>
                            </div>
                            </>
                        )
                    }
                }
            })}
            <h2>Requests To Accept</h2>
            <hr/>
            { document && document.requests && document.requests.map((req) => {
                // we get the use uid from the requests array and then we find the user displayname 
                // from the documents array
                return documents && documents.map((doc) => {
                    if(doc.id === req) {
                        return (
                            <div className="requests-card">
                                <div className="friend-avatar">
                                    <Link to={`profile/${doc.id}`}><img src={doc.photoURL} alt="Avatar" /></Link>
                                </div>
                                <div className="friend" style={{"marginLeft": "30px"}} >{doc.displayName}</div>
                                <div className="friend-btns">
                                    <button className="btn" style={{"marginRight": "10px"}} onClick={handleAccept(doc.id)}>Accept</button>
                                    <button className="btn-red" onClick={handleDecline(doc.id)}>Decline</button>
                                </div>
                            </div>
                        )
                    }
                })
            })}
            <h2>Friends</h2>
            <hr/>
            { document && document.friends && document.friends.map((friend) => {
                return documents && documents.map((doc) => {
                    if(doc.id === friend) {
                        return (
                            <div key={doc.id} className="friend-card">
                                <div className="friend-avatar">
                                    <Link to={`profile/${doc.id}`}><img src={doc.photoURL} alt="Avatar" /></Link>
                                </div>
                                <div className="friend-name" style={{"marginLeft": "30px"}}>{doc.displayName}</div>
                                <div className="friend-btns">
                                    <button className="btn" onClick={handleUnfriend(doc.id)}>Unfriend</button>
                                </div>
                            </div>
                        )
                    }
                })
            })}    
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
    </div>
  )
}


// add delete friend functionality
// add unfriend functionality
// add cancel request functionality