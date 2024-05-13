import { createReducer, createSelector, on } from "@ngrx/store";
import { authActions } from "./auth.actions";

export interface AuthState {
    isSigningIn : boolean,
    token: string,
}

export const authReducer = createReducer<AuthState>(
    {
        isSigningIn: false,
        token: ''
    },
    on(authActions.signin, (state)=>({...state, isSigningIn: true})),
    on(authActions.signinsuccess, (state, {token})=>({...state, isSigningIn: false, token}) ),
    on(authActions.signinfailure, (state)=>({...state, isSigningIn: false, token: ''})),

    on(authActions.signout, (state)=>({...state, isSigningIn: false,})),
    on(authActions.signoutsuccess, (state)=>({...state, isSigningIn: false, token:''})),
);

export const selectAuthState = (appState: {authState: AuthState})=>appState.authState;


export const selectIsSigningIn = createSelector(selectAuthState, state => state.isSigningIn);
export const selectIsAuthenticated = createSelector(selectAuthState, state=> state.token !== null &&state.token !== '');
