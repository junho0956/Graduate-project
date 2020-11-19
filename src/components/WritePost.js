import React, {useState} from 'react';
import axios from 'axios';
import {MdAddToPhotos} from 'react-icons/md';
import '../csss/WritePost.css';

const WritePost = ({screenState, changeScreen}) => {
    const whereCircle = screenState[4].writepostCircleName;
    const [Image, setImage] = useState([]);

    const cancleWritePost = () => {
        const newscreenState = screenState.map(res => {return{...res , checked : false }});
        newscreenState[2].checked = true;
        changeScreen(newscreenState);
    }

    /**
     * 필요한 컴포넌트?
     * 이미지는 페이스북을 베이스로 4장을 Max 그 이상은 추가될 때 마다 +1 글로 보여줌 
     * 이미지 아래에는 글 쓰는 곳으로 가즈아
     */

    return(
        <div className="writePost">
            <div className="writePostImage">
                <div className="writePostImageInsert">
                    <span><MdAddToPhotos /></span><span>사진 추가</span>
                </div>
            </div>
            <div className="writePostText">
                
            </div>
            <div className="writePostBtn">
                <div className="writePosting"></div>
                <div className="writePostCancle"></div>
            </div>
        </div>
    )
}

export default WritePost;