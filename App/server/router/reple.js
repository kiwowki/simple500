const express = require("express");
const router = express.Router();

const { Post } = require("../model/Post.js");
const { Reple } = require("../model/Reple.js");
const { User } = require("../model/User.js");

// 댓글 제출
router.post("/submit", async (req, res) => {
    let temp = {
        reple: req.body.reple,
        postId: req.body.postId,
    };

    try {
        const userInfo = await User.findOne({ uid: req.body.uid }).exec(); // 누가썼는가?
        temp.author = userInfo._id; // 템프에 아이디값 추가
        const NewReple = new Reple(temp);
        await NewReple.save();

        await Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $inc: { repleNum: 1 } }
        ).exec();

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false });
    }
});

// 댓글 가져오기
router.post("/getReple", (req, res) => {
    Reple.find({ postId: req.body.postId })
        .populate("author")
        .exec()
        .then((repleInfo) => {
            return res.status(200).json({ success: true, repleList: repleInfo })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false })
        })
})

// 댓글 수정
router.post("/edit", (req, res) => {
    // 수정 할 때 필요한 것
    let temp = {
        postId: req.body.postId,
        reple: req.body.reple,
        uid: req.body.uid,
    }
    // 댓글에 다시 세팅
    Reple.findOneAndUpdate({ _id: req.body.repleId }, { $set: temp })
        .exec()
        .then(() => {
            return res.status(200).json({ success: true })
        })
        .catch((err) => {
            return res.status(400).json({ success: false })
        })
})

// 댓글 삭제
router.post("/delete", (req, res) => {
    // 아이디값 일단 지움
    Reple.deleteOne({ _id: req.body.repleId })
        .exec()
        .then(() => {
            // 다시 찾아서 업데이트
            Post.findOneAndUpdate(
                {
                    _id: req.body.postId
                },
                { $inc: { repleNum: -1 } }
            )
                .exec()
                .then(() => {
                    return res.status(200).json({ success: true })
                })
        })
        .catch((err) => {
            return res.status(400).json({ success: false })
        })
})


module.exports = router;