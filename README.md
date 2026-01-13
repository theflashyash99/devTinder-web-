# DevTInder.

- Created a vite+React Projects.
- Remove unnecessary code.
- install tailwindCSS and DaisyUI
- install react-router-dom (npm i react-router-dom)
- Create NavBar
- Create Routes.
- Create Footer.
- Create LogIn Page.


## Important for cookies set-up in browser.
- the cookies is not set in the browser like the setted-up in the postman. so, we need to do things to set the cookies in browser
# Steps 
- we need to whitelist he domain name. how do we do that?
- (1) in cors setup the options.
- app.use(cors({
    origins : "front-end domain name",
    credentials : true,
}))

- this will let you target the front domain name and send the token to the browser but till we need to do one more thing.
#### axios Credentials

- axios.post ("backend link" , {
    data to send
}, {
    withCredentials : true,
});

##### here the axios credential ultimately set the cookies inside the browser.
#### whenever use the axios or API calls send it with the { withCredentials : true,}




