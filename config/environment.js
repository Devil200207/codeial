const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key: 'chinmay',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'codieal.developer@gmail.com',
            pass:'nveqzhmmtwujuwbh'
        }
    },
    google_client_ID:"1046015082162-fru1tgtt4liphiv44333p8sngejsppa7.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_callback_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret_key:'codeial',
}

const production = {
    name:'production'
}

module.exports = development;