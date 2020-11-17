import React, {useState, useEffect} from 'react';
import '../csss/CircleInfo.css';
import image from '../img/1.jpg';
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;


const CirclePost = ({postdata, screenState, changeScreen}) => {

    const changeScreenCirclePost = () => {
        const newscreenState = screenState.map(res => {return{...res, checked:false}});
        newscreenState[3].checked = true;
        newscreenState[3].postData = postdata;
        console.log(newscreenState[3]);
        changeScreen(newscreenState);
    }

    return(
        <span className="circleMiniPost" onClick={changeScreenCirclePost}>
            <img src={image}></img>
            <div className="circleMiniPostInfo">
                <div className="miniInfoDate">{postdata.post.write_Date}</div>
                <div className="miniInfoMain">
                    <div className="miniInfoAuthor">{postdata.post.author}</div>
                    <div className="miniInfoDescription">{postdata.post.description}</div>
                </div>
            </div>
        </span>
    )
}

const CirclePosts = ({postdata, screenState, changeScreen}) => {
    
    useEffect(() => {

        const miniPostInfoParent = document.querySelectorAll('.circleMiniPostInfo');
        miniPostInfoParent.forEach(res => 
            res.style.cssText="position:absolute; display:none; top:0; left:0; margin:1rem; width:17vw; height:17vw; font-family:'Nanum-Gothic',sans-serif;");

        const miniPostInfoDate = document.querySelectorAll('.miniInfoDate');
        miniPostInfoDate.forEach(res => 
            res.style.cssText="position:absolute; margin-top:1rem; margin-right:1rem; top:2px; right:0;");
        
        const miniPostInfoMain = document.querySelectorAll('.miniInfoMain');
        miniPostInfoMain.forEach(res => 
            res.style.cssText="display:flex; flex-direction:column; width:16vw; height:16vw; justify-content:center; padding-left:1rem;");

        const miniPostInfoAuthor = document.querySelectorAll('.miniInfoAuthor');
        miniPostInfoAuthor.forEach(res => res.style.cssText="font-size:1.25rem; font-weight:600; padding-bottom:0.5rem;");

        const miniPostInfoDes = document.querySelectorAll('.miniInfoDescription');
        miniPostInfoDes.forEach(res => res.style.cssText = "overflow:hidden; width:14vw; white-space:nowrap; text-overflow: ellipsis;")

        $(document).ready(function(){
            $(".circleMiniPost").mouseenter(function(){
                $(this).children('img').css("opacity","0.2");
                $(this).children('.circleMiniPostInfo').css('display',"inline-block");
            })
            $(".circleMiniPost").mouseleave(function(){
                $(this).children('img').css("opacity","1");
                $(this).children('.circleMiniPostInfo').css('display',"none");
            })
        });
    },[postdata]);

    const changeScreenCirclePosts = res => changeScreen(res);

    return(
        <div className="circlePost">
            {postdata !== undefined && postdata.map((res, index)=> {
                return <CirclePost postdata={res} key={index} screenState={screenState} changeScreen={changeScreenCirclePosts}/>
            })}
        </div>
    )
}

export default CirclePosts;