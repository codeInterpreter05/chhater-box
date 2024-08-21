export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;


export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`;
export const GET_CONTACTS_FOR_DM_ROUTE = `${CONTACTS_ROUTES}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-all-contacts`;

export const MESSAGES_ROUTES = "api/messages";
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`;

export const GROUP_ROUTES = "api/groups";
export const CREATE_GROUP_ROUTE = `${GROUP_ROUTES}/create-group`;
export const GET_GROUPS_ROUTE = `${GROUP_ROUTES}/get-groups`;
export const GET_GROUP_MESSAGES_ROUTE = `${GROUP_ROUTES}/get-group-messages`;