import "./Friends.css"
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect } from "react";

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
                // if(doc.displayName !== friend) {
                //     setError('User does not exist!');
                //     return;
                // } REPAIR THIS!!!!!
                if(doc.displayName === friend) {
                    if(doc.requests) {
                        if(doc.requests.includes(user.uid)) {
                            alert('Request already sent!');
                            return;
                        }
                        doc.requests.push(user.uid);
                    }
                    else {
                        doc.requests = [user.uid];
                    }
                    updateDocument(doc.id, doc);
                    setSuccess('Request sent!');
                    setError(null);
                    return;
                }
            })
        }
    setFriend('');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, success])

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
                        return <div className="friend">{doc.displayName}</div>
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
                            <div className="requests">
                                <div className="friend">{doc.displayName}</div>
                                <button className="btn" onClick={handleAccept(doc.id)}>Accept</button>
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
                        return <div className="friend">{doc.displayName}</div>
                    }
                })
            })}    
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
    </div>
  )
}
