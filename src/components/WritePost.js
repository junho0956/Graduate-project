import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {MdAddToPhotos} from 'react-icons/md';
import '../csss/WritePost.css';
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const addStyleTextArea = () => {
    $(document).ready(function(){
        $('.writePostText textarea').on('keyup', function(e){
            $(this).css('height','auto');
            $(this).height(this.scrollHeight);
        })
        // $('.writePostText textarea').keyup();
    })
}

const addNewPicture = () => {
    const imageFile = document.querySelector('#imageFile');
    const imageView = document.querySelector('.writePostImage');
    imageFile.addEventListener('change', function(e){
        if(e.target.files !== null){
            let reader = new FileReader();
            reader.onload = function(e){
                let newImage = document.createElement('img');
                newImage.src = e.target.result;
                newImage.style.width = '40vw';
                newImage.style.height = '40vh';
                imageView.appendChild(newImage);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    })
}

const WritePost = ({screenState, changeScreen}) => {
    const whereCircle = screenState[4].writepostCircleName;
    const [Image, setImage] = useState([]);
    const [area, setArea] = useState();

    const cancleWritePost = () => {
        if(window.confirm('작성을 취소하시겠습니까?')){
            const newscreenState = screenState.map(res => {return{...res , checked : false }});
            newscreenState[2].checked = true;
            changeScreen(newscreenState);
        }
    }

    useEffect(() => {
        addStyleTextArea();
        addNewPicture();
    }, [])

    const addPicture = (e) => {
        if(e.target.files !== null){
            // const newImage = new FormData();
            // newImage.append("data", e.target.files[0]);
            // let newImageSet = Image.map(res=>res);
            // newImageSet = newImageSet.concat(newImage);
            let newImage = Image.map(res => res);
            newImage = newImage.concat(e.target.files[0].name);
            console.log("newImage : ",newImage);
            // setImage(newImageSet);
            setImage(newImage);
        }
    }

    const AreaChange = e => {
        const newArea = e.target.value;
        setArea(newArea);
    }

    const GoPost = () => {
        const formdata = {
            description: area,
            photoUrl: Image
        };
        axios({
            method:'post',
            url:`http://3.35.240.252:8080/circles/${screenState[4].writepostCircleID}/posts`,
            headers: {'Authorization':'Bearer '+localStorage.getItem('token')},
            data: formdata,
        })
        .then(res => console.log("res : ",res))
        .catch(error => console.log("error!", error))
    }

    return(
        <div className="writePost">
            <div className="writePostTitle">
                <div className="writePostTitleIn">게시물 만들기</div></div>
            <div className="writePostImage">
                <div className="writePostImageInsert" onChange={addPicture}>
                    <input type="file" id="imageFile"></input>
                    <label htmlFor="imageFile"><span><MdAddToPhotos /></span><span>사진 추가</span></label>
                </div>
            </div>
            <div className="writePostText">
                <textarea placeholder="내용을 입력해주세요." onChange={AreaChange}></textarea>
            </div>
            <div className="writePostBtn">
                <div className="writePosting" onClick={GoPost}>게시</div>
                <div className="writePostCancle" onClick={cancleWritePost}>취소</div>
            </div>
        </div>
    )
}

export default WritePost;