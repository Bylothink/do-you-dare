import gql from "graphql-tag";

export const AUTHENTICATE = gql`mutation authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;
export const RENEW_SESSION = gql`mutation {
    renewSession {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;
export const DISCONNECT = gql`mutation { disconnect }`;

// eslint-disable-next-line max-len
export const REGISTER = gql`mutation register($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
    register(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;
export const REQUEST_VALIDATION_MAIL = gql`mutation { requestValidationMail }`;
export const VERIFY_EMAIL = gql`mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token)
}`;
