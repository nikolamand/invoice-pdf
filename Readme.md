# Pdf invoice generator

## Setup

1. Run `npm install`
2. Create `index.js` file that has the same structure as `index-example.js` and fill it in properly
3. Create `.env` file with the following values
SEND_FROM_EMAIL="*youremail*@gmail.com"  
SEND_FROM_PASSWORD="*yourpassword*"  
SEND_TO="*email-you-will-send-to*@gmail.com"  
This will be the email you will be sending your generated PDF from, it must be **gmail** and you must have [less secure apps turned](https://myaccount.google.com/intro/security) on so i sugest creating a new gmail account that you will use just for this purpouse.

You can now generte your Invoice using  
`npm start`

If everything is setup correctly, you should have a mail with the generated PDF invoice. If it doesn't show up check your `spam folder` and mark it as not a spam.
