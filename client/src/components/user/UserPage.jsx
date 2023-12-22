import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
// 불러오는 데 시간 걸림. async await 필요
import firebase from "../../firebase.js";

const UserPage = () => {
  const [currentImage, setCurrentImage] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // 유저 로딩이 완료된 후 확인하기(버그 해결하기)
    if (user.isLoading && !user.accessToken) {
      navigate("/login");
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  // 네이버 클라우드에 저장하기 (PostImage의 FileUpload 참고하기)
  const ImageUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios.post("/api/user/profile/img", formData).then((response) => {
      setCurrentImage(response.data.filePath);
    });
  };

  // 몽고DB에 저장하기
  const SaveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: currentImage,
      });
    } catch (err) {
      return alert("프로필 저장 실패");
    }

    let body = {
      photoURL: currentImage,
      uid: user.uid,
    };
    
    axios.post("/api/user/profile/update", body).then((response) => {
      if (response.data.success) {
        alert("프로필 저장에 성공하였습니다.");
        window.location.reload();
      } else {
        return alert("프로필 저장에 실패하였습니다.");
      }
    });
  };

  return (
    <div className="mypage">
      <form>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => ImageUpload(e)}
          />
          <Avatar size="30" round={true} src={currentImage} />
        </label>
        <button onClick={(e) => SaveProfile(e)}>저장하기</button>
      </form>
    </div>
  );
};

export default UserPage;
