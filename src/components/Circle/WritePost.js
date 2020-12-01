import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {MdAddToPhotos} from 'react-icons/md';
import '../css/WritePost.css';
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
    const [ImageFormData, setImageFormData] = useState([]);

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
            let newImage = Image.concat(e.target.files[0].name);
            const fd = new FormData();
            fd.append("data", e.target.files[0]);
            let newimageformdata = ImageFormData.concat(fd);

            setImage(newImage);
            setImageFormData(newimageformdata);
        }
    }

    const AreaChange = e => {
        const newArea = e.target.value;
        setArea(newArea);
    }

    const GoPost = async() => {
        
        // 업로드 후에 받은 주소를 서버로 보내줌
        const getUploadUrl = await Promise.all(
            ImageFormData.map(async(res) => {
                return await axios({
                    method:'POST',
                    url: "http://3.35.240.252:8080/upload",
                    Headers:{'Authorization':'Bearer ' + localStorage.getItem('token')},
                    data:res,
                    processData:false,
                    contentType:false,
                })
                .then(res => {return res.data});
            })
        )

        const formdata = {
            description: area,
            photoUrl: getUploadUrl,
        };
        axios({
            method:'post',
            url:`http://3.35.240.252:8080/circles/${screenState[4].writepostCircleID}/posts`,
            headers: {'Authorization':'Bearer '+localStorage.getItem('token')},
            data: formdata,
        })
        .then(res => {
            const newscreenState = screenState.map(res => {return{...res , checked : false }});
            newscreenState[2].checked = true;
            changeScreen(newscreenState);
        })
        .catch(error => console.log("error!", error));
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