import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const authActions = createActionGroup({
    source: 'auth',
    events:{
        'signin': props<{email: string, password: string}>(),
        'signinsuccess': props<{token: string}>(),
        'signinfailure': emptyProps(),

        'signout': emptyProps(),
        'signoutsuccess' : emptyProps(),
    }
})