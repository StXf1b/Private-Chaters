import "./Profile.css"
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

export default function Profile() {
    const { id } = useParams();
    const { document } = useDocument('users', id);
    	
    return (
      <div className="main-profile">
        <div className="profile-left">
          <div className="profile-avatar">
            <img src={document?.photoURL} alt="avatar" />
          </div>
          <div className="btn-add">
            <button>+</button>
          </div>
          <div className="profile-info">
            <h2>@{document?.displayName}</h2>
            <button className="edit-profile">Edit Profile</button>
          </div>
        </div>
        <div className="profile-right">
          <p>fsadfgsfdg</p>
          <p>dsfsadg</p>
          <p>dsfsadg</p>
        </div>

      </div>
    )

}
