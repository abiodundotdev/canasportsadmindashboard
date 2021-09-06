export const Types = {
    setUserLoggedIn : "SET_USER_LOGGED_IN",
    setUser : "SET_USER"
}

export const AppActions = {
        setUserLogged : (data) => ({ type : Types.setUserLoggedIn, payload : {data} }),
        setUser : (data) => ({ type : Types.setUser, payload : data })
    }