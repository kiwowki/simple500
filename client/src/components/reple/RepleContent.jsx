import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const RepleContent = (props) => {
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [reple, setReple] = useState(props.reple.reple);

  const user = useSelector((state) => state.user);
  const ref = useRef(); // useEffect쓰기에 애매함. 토글메뉴에 어울리는 react 훅.
  useOnClickOutside(ref, () => setModalFlag(false));

  const SubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };

    axios.post("/api/reple/edit", body).then((response) => {
      if (response.data.success) {
        alert("댓글 수정에 성공하였습니다.");
      } else {
        alert("댓글 수정에 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };
      axios
        .post("/api/reple/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <div>
      <div className="reple">
        <p>{props.reple.author.displayName}</p>

        {props.reple.author.uid === user.uid && (
          <div className="reple-info">
            <span onClick={() => setModalFlag(true)}>...</span>
            {modalFlag && (
              <div className="modal" ref={ref}>
                <p onClick={(e) => DeleteHandler(e)}>삭제</p>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
              </div>
            )}
          </div>
        )}
        {editFlag ? (
            // 수정할 수 있게 write와 동일한 구성
          <div>
            <form>
              <input
                style={{ border: "1px solid #000", padding: "10px" }}
                text="text"
                value={reple}
                onChange={(e) => {
                  setReple(e.currentTarget.value);
                }}
              />
              <button
                onClick={(e) => {
                  SubmitHandler(e);
                }}
              >
                수정하기
              </button>
              /{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditFlag(false);
                }}
              >
                취소하기
              </button>
            </form>
          </div>
        ) : (
            // 그냥 댓글 보이게
          <p>{props.reple.reple}</p>
        )}
      </div>
    </div>
  );
};

// useRef 부분(토글메뉴)
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default RepleContent;
