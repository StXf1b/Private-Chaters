import "./Profile.css"
import { useParams } from "react-router-dom";

export default function Profile() {
    const { id } = useParams();
  return (
    <div>{id}</div>
  )
}
