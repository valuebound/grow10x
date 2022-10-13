const config = {
    PORT : 0,
    MONGO_URL:"",
    EXPIRESIN:"",
    REFRESH_EXPIRESIN:"",
    ISSUER:"",
    JWT_SECRET:"",
    BCRYPT_SALTORROUND:0,
    email:"",
    password:"",
    ORIGIN : [],
    SUPER_ADMIN_EMAIL : "",
    SUPER_ADMIN_PASSWORD : "",
    TEMPLATE_IMAGE_URL : "",
    GOOGLE_CLIENT_ID : "",
    APP_NAME:"",
    APP_INFO:"",
    LOGO_URL:"",
    PROD_ORIGIN:"",
    SENDGRID_API:"",
};
  
Object.freeze(config);
  
module.exports = config;
