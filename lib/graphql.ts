import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    uuid
    avatarUrl
  }
`

export const AUTH_PAY_LOAD_FIELDS = gql`
  fragment AuthPayLoadFields on AuthPayLoad {
    code
    token
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const INTERACT_FIELDS = gql`
  fragment InteractFields on Interact {
    id
    postId
    commentId
    valueCount
    interestCount
    hateCount
    thinkCount
    handCount
    againstCount
  }
`

export const AUTHOR_FIELDS = gql`
  fragment UserFields on User {
    __typename
    id
    name
    uuid
    avatarUrl
  }
`

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    __typename
    id
    text
    userId
    toUid
    interact {
      ...InteractFields
    }
    user {
      ...UserFields
    }
    toUser {
      ...UserFields
    }
  }
  ${AUTHOR_FIELDS}
  ${INTERACT_FIELDS}
`

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    content
    createdAt
    interact {
      ...InteractFields
    }
    author {
      ...UserFields
    }
    commentsTotalCount
    comments {
      id
      userId
      text
      toUid
      user {
        ...UserFields
      }
      toUser {
        ...UserFields
      }
    }
  }

  ${INTERACT_FIELDS}
  ${AUTHOR_FIELDS}
`

export const PostQuery = gql`
  query postsQuery($cursor: Int) {
    postsQuery(cursor: $cursor) {
      edges {
        ...PostFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${POST_FIELDS}
`

export const PostOneQuery = gql`
  query post($where: PostWhereUniqueInput!) {
    post(where: $where) {
      ...PostFields
      comments {
        ...CommentFields
      }
    }
  }
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
  ${AUTHOR_FIELDS}
`

// 文章互动
export const InteractMutation = gql`
  mutation interactMutation(
    $postId: Int!
    $actionType: InteractAction!
    $count: Int!
  ) {
    interactMutation(postId: $postId, actionType: $actionType, count: $count) {
      ...InteractFields
    }
  }
  ${INTERACT_FIELDS}
`

// 留言互动
export const InteractCommentMutation = gql`
  mutation interactCommentMutation(
    $commentId: Int!
    $actionType: String!
    $count: Int!
  ) {
    interactCommentMutation(
      commentId: $commentId
      actionType: $actionType
      count: $count
    ) {
      ...InteractFields
    }
  }

  ${INTERACT_FIELDS}
`

export const UserInfoQuery = gql`
  query ProductDetails($productId: ID!) {
    product(id: $productId) {
      name
      price
      isInCart @client
    }
  }
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export const SignupMutation = gql`
  mutation createNewUser($name: String!, $email: String!, $password: String!) {
    createNewUser(name: $name, email: $email, password: $password) {
      token
      userInfo {
        ...UserFields
      }
    }
  }
  ${AUTHOR_FIELDS}
`

export const CreateOneComment = gql`
  mutation createOneComment($data: CommentCreateInput!) {
    createOneComment(data: $data) {
      id
      userId
      toUid
      text
      user {
        ...UserFields
      }
      toUser {
        ...UserFields
      }
    }
  }
  ${AUTHOR_FIELDS}
`

export const CreateNewPost = gql`
  mutation createNewPost($content: String!) {
    createNewPost(content: $content) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      ...AuthPayLoadFields
    }
  }
  ${AUTH_PAY_LOAD_FIELDS}
`
