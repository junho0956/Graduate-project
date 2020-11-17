export const User = {
    email: String,
    password: String,
    name: String,
    nickname: String,
    user_gender: String,
    user_organization: String,
    myCircle: Array,
    followCircle: Array,
    join: Date,
    profilePhoto: URL,
};

export const CircleMember = {
    member: User,
    position: String
}

export const Comment = {
    author: User,
    description: String,
    created: Date
}

export const Post = {
    author: User,
    description: String,
    postPhoto: URL,
    created: Date,
    likeCount: Number,
    comment: Array(Comment)
}

export const Circle = {
    leader: String,
    name: String,
    organization: String,
    description: String,
    circleProfilePhoto: URL,
    follower: Array(User),
    circleMember: Array(CircleMember),
    category: String,
    post: Array(Post)
}

