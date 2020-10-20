import {UserController} from './controller/UserController'

export const Routes = [{
    method: 'get',
    route: "/users",
    controller: UserController,
    action: "all",
    status: 200
}, {
    method: 'get',
    route: "/user/:id",
    controller: UserController,
    action: "findById",
    status: 200
}, {
    method: 'put',
    route: "/user/confirm",
    controller: UserController,
    action: "saveConfirmation",
    status: 202
}]