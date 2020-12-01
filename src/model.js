export const User = {
    email: "",
    password: "",
    name: "",
    nickname: "",
    user_gender: "",
    user_organization: "",
    myCircle: [],
    followCircle: [],
    join: "",
    profilePhoto: "",
};

export const CircleMember = {
    member: User,
    position: ""
}

export const Comment = {
    author: User,
    id: null,
    postID: null,
    description: "",
    write_Date: "",
}

export const Post = {
    id: null,
    author: User,
    circleId: null,
    circleName: "",
    circleProfilePhoto: "",
    description: "",
    postPhoto: [{
        id: null,
        photoUrl: "",
        postId: null
    }],
    likeNum: null,
    write_Date: "",
    postComment: [Comment],
    postLike: [{
        id:null,
        postId: null,
        userId: null
    }]
}

export const Circle = {
    leader: "",
    name: "",
    organization: "",
    description: "",
    circleProfilePhoto: "",
    follower: [User],
    circleMember: [CircleMember],
    category: "",
    post: [Post]
}

export const CircleInformation = {
    id: null,
    name: "",
    circleProfilePhoto: "",
    organization: "",
    description: "",
    category: "",
    place: "",
    circlePosts: [],
    circleMember: [],
    circleFollower: [],
    circleUserCheck: {
      join : false, 
      follow : false,
    },
}

export const UserCircleInfo = {
    myCircle: [],
    followCircle: [],
}


