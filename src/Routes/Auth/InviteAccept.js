import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { HOST_URL } from "../../App";

const InviteAccept = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const invitedToken = searchParams.get("token");
  console.log(invitedToken);

  const navigate = useNavigate();

  const onInviteAccept = async () => {
    try {
      const response = await axios.post(
        `${HOST_URL}/diaries/invite`,
        {
          token: invitedToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        alert(response.data.message);
      }

      navigate("/");
    } catch (error) {
      console.error("초대수락 실패", error);
    }
  };

  return (
    <div>
      <button onClick={onInviteAccept}>초대 수락</button>
    </div>
  );
};

export default InviteAccept;
