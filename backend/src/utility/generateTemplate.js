const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);

const generateMessage = async (new_user, randomPassword) => {
    const template = 
    `<!DOCTYPE html>
    <html>
    
    <head>
      <title></title>
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="website" property="og:type" />
      <meta content="" property="og:description" />
      <meta content="https://duiuap3gtx.preview-postedstuff.com/V2-s0CD-Vixk-I8Fi-ubnR/" property="og:url" />
      <meta content="https://pro-bee-beepro-thumbnail.getbee.io/messages/793045/776834/1665626/8228328_large.jpg" property="og:image" />
      <meta content="" property="og:title" />
      <meta content="" name="description" />
      <meta charset="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <style>
        .bee-row,
        .bee-row-content {
          position: relative
        }
    
        .bee-button .content {
          text-align: center
        }
    
        .bee-row-2,
        .bee-row-2 .bee-row-content,
        .bee-row-3,
        .bee-row-4,
        .bee-row-5,
        .bee-row-6,
        .bee-row-7,
        .bee-row-8 {
          background-color: #fff;
          background-repeat: no-repeat
        }
    
        .bee-row-1,
        .bee-row-10,
        .bee-row-11,
        .bee-row-2,
        .bee-row-2 .bee-row-content,
        .bee-row-3,
        .bee-row-4,
        .bee-row-5,
        .bee-row-6,
        .bee-row-7,
        .bee-row-8,
        .bee-row-9 {
          background-repeat: no-repeat
        }
    
        body {
          background-color: #f9f9f9;
          color: #000;
          font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif
        }
    
        a {
          color: #0068a5
        }
    
        * {
          box-sizing: border-box
        }
    
        body,
        h1,
        p {
          margin: 0
        }
    
        .bee-row-content {
          max-width: 670px;
          margin: 0 auto;
          display: flex
        }
    
        .bee-row-content .bee-col-w2 {
          flex-basis: 17%
        }
    
        .bee-row-content .bee-col-w3 {
          flex-basis: 25%
        }
    
        .bee-row-content .bee-col-w4 {
          flex-basis: 33%
        }
    
        .bee-row-content .bee-col-w6 {
          flex-basis: 50%
        }
    
        .bee-row-content .bee-col-w7 {
          flex-basis: 58%
        }
    
        .bee-row-content .bee-col-w12 {
          flex-basis: 100%
        }
    
        .bee-button a,
        .bee-icon .bee-icon-label-right a {
          text-decoration: none
        }
    
        .bee-divider,
        .bee-image {
          overflow: auto
        }
    
        .bee-divider .center,
        .bee-image .bee-center {
          margin: 0 auto
        }
    
        .bee-image .bee-right {
          float: right
        }
    
        .bee-row-1 .bee-col-2 .bee-block-2,
        .bee-row-1 .bee-col-3 .bee-block-2,
        .bee-row-3 .bee-col-1 .bee-block-4 {
          width: 100%
        }
    
        .bee-icon {
          display: inline-block;
          vertical-align: middle
        }
    
        .bee-icon .bee-content {
          display: flex;
          align-items: center
        }
    
        .bee-image img {
          display: block;
          width: 100%
        }
    
        .bee-social .icon img {
          max-height: 32px
        }
    
        .bee-text {
          overflow-wrap: anywhere
        }
    
        .bee-row-1 .bee-row-content,
        .bee-row-10 .bee-row-content,
        .bee-row-11 .bee-row-content,
        .bee-row-3 .bee-row-content,
        .bee-row-4 .bee-row-content,
        .bee-row-5 .bee-row-content,
        .bee-row-6 .bee-row-content,
        .bee-row-7 .bee-row-content,
        .bee-row-8 .bee-row-content,
        .bee-row-9 .bee-row-content {
          background-repeat: no-repeat;
          color: #000
        }
    
        .bee-row-1 .bee-col-1,
        .bee-row-1 .bee-col-2,
        .bee-row-1 .bee-col-3,
        .bee-row-10 .bee-col-2,
        .bee-row-10 .bee-col-3,
        .bee-row-11 .bee-col-1,
        .bee-row-2 .bee-col-1,
        .bee-row-2 .bee-col-2,
        .bee-row-3 .bee-col-1,
        .bee-row-4 .bee-col-1,
        .bee-row-4 .bee-col-2,
        .bee-row-5 .bee-col-1,
        .bee-row-5 .bee-col-2,
        .bee-row-6 .bee-col-1,
        .bee-row-6 .bee-col-2,
        .bee-row-7 .bee-col-1,
        .bee-row-8 .bee-col-1,
        .bee-row-9 .bee-col-1 {
          padding-bottom: 5px;
          padding-top: 5px
        }
    
        .bee-row-1 .bee-col-1 .bee-block-1 {
          padding-left: 35px;
          padding-top: 10px;
          width: 100%
        }
    
        .bee-row-1 .bee-col-2 .bee-block-1,
        .bee-row-1 .bee-col-2 .bee-block-3,
        .bee-row-1 .bee-col-3 .bee-block-1,
        .bee-row-10 .bee-col-2 .bee-block-1,
        .bee-row-10 .bee-col-2 .bee-block-2,
        .bee-row-10 .bee-col-3 .bee-block-1,
        .bee-row-10 .bee-col-3 .bee-block-2,
        .bee-row-2 .bee-col-1 .bee-block-1,
        .bee-row-2 .bee-col-2 .bee-block-1,
        .bee-row-2 .bee-col-2 .bee-block-2,
        .bee-row-2 .bee-col-2 .bee-block-3,
        .bee-row-2 .bee-col-2 .bee-block-5,
        .bee-row-3 .bee-col-1 .bee-block-3,
        .bee-row-3 .bee-col-1 .bee-block-5,
        .bee-row-3 .bee-col-1 .bee-block-7,
        .bee-row-7 .bee-col-1 .bee-block-1,
        .bee-row-7 .bee-col-1 .bee-block-2,
        .bee-row-7 .bee-col-1 .bee-block-4,
        .bee-row-8 .bee-col-1 .bee-block-1,
        .bee-row-9 .bee-col-1 .bee-block-1 {
          padding: 10px
        }
    
        .bee-row-2 .bee-row-content {
          background-position: top center;
          color: #000
        }
    
        .bee-row-2 .bee-col-1 .bee-block-2,
        .bee-row-2 .bee-col-1 .bee-block-4 {
          padding: 10px 10px 10px 25px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-3 {
          padding: 10px 25px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-5,
        .bee-row-2 .bee-col-1 .bee-block-6 {
          padding-left: 25px;
          padding-right: 10px;
          padding-top: 10px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-7,
        .bee-row-4 .bee-col-2 .bee-block-4 {
          padding: 10px 10px 10px 20px;
          text-align: left
        }
    
        .bee-row-2 .bee-col-2 .bee-block-4 {
          padding-right: 5px;
          width: 100%
        }
    
        .bee-row-3 {
          background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/Background.png');
          background-position: top center
        }
    
        .bee-row-3 .bee-col-1 .bee-block-1 {
          text-align: center;
          width: 100%
        }
    
        .bee-row-3 .bee-col-1 .bee-block-2,
        .bee-row-3 .bee-col-1 .bee-block-6,
        .bee-row-7 .bee-col-1 .bee-block-3 {
          padding: 5px 35px 10px
        }
    
        .bee-row-4 .bee-col-1 .bee-block-1,
        .bee-row-5 .bee-col-2 .bee-block-1,
        .bee-row-6 .bee-col-1 .bee-block-1 {
          padding: 10px;
          width: 100%
        }
    
        .bee-row-4 .bee-col-2 .bee-block-1,
        .bee-row-5 .bee-col-1 .bee-block-1,
        .bee-row-6 .bee-col-2 .bee-block-1 {
          padding: 10px 10px 10px 15px
        }
    
        .bee-row-4 .bee-col-2 .bee-block-2,
        .bee-row-4 .bee-col-2 .bee-block-3 {
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 10px
        }
    
        .bee-row-5 .bee-col-1 .bee-block-2,
        .bee-row-5 .bee-col-1 .bee-block-3,
        .bee-row-6 .bee-col-2 .bee-block-2,
        .bee-row-6 .bee-col-2 .bee-block-3 {
          padding-bottom: 10px;
          padding-left: 25px;
          padding-right: 10px
        }
    
        .bee-row-5 .bee-col-1 .bee-block-4,
        .bee-row-6 .bee-col-2 .bee-block-4 {
          padding: 10px 10px 10px 25px;
          text-align: left
        }
    
        .bee-row-7 {
          background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/background_down.png')
        }
    
        .bee-row-7 .bee-col-1 .bee-block-5 {
          padding: 5px 10px 10px 35px
        }
    
        .bee-row-7 .bee-col-1 .bee-block-6 {
          padding: 10px 60px 20px
        }
    
        .bee-row-7 .bee-col-1 .bee-block-7 {
          padding: 10px 10px 10px 25px;
          text-align: center
        }
    
        .bee-row-7 .bee-col-1 .bee-block-8 {
          padding-top: 15px;
          width: 100%
        }
    
        .bee-row-10,
        .bee-row-9 {
          background-color: #413ea1
        }
    
        .bee-row-10 .bee-col-1 {
          padding-top: 5px
        }
    
        .bee-row-10 .bee-col-1 .bee-block-1,
        .bee-row-10 .bee-col-1 .bee-block-2 {
          padding: 10px 10px 10px 20px
        }
    
        .bee-row-10 .bee-col-3 .bee-block-3 {
          padding: 10px;
          text-align: left
        }
    
        .bee-row-11 .bee-col-1 .bee-block-1 {
          color: #9d9d9d;
          font-family: inherit;
          font-size: 15px;
          padding-bottom: 5px;
          padding-top: 5px;
          text-align: center
        }
    
        .bee-row-11 .bee-col-1 .bee-block-1 .bee-icon-image {
          padding: 5px 6px 5px 5px
        }
    
        @media (max-width:690px) {
          .bee-mobile_hide {
            display: none
          }
    
          .bee-row-content:not(.no_stack) {
            display: block
          }
    
          .bee-row-2 .bee-col-1 .bee-block-7,
          .bee-row-2 .bee-col-1 .bee-block-7 .bee-button-content,
          .bee-row-4 .bee-col-2 .bee-block-4,
          .bee-row-4 .bee-col-2 .bee-block-4 .bee-button-content,
          .bee-row-5 .bee-col-1 .bee-block-4,
          .bee-row-5 .bee-col-1 .bee-block-4 .bee-button-content,
          .bee-row-6 .bee-col-2 .bee-block-4,
          .bee-row-6 .bee-col-2 .bee-block-4 .bee-button-content,
          .bee-row-7 .bee-col-1 .bee-block-7 .bee-button-content {
            text-align: center !important
          }
    
          .bee-row-4 .bee-col-2 .bee-block-2 {
            padding: 0 10px 10px 60px !important
          }
    
          .bee-row-5 .bee-col-1 .bee-block-2 {
            padding: 0 10px 10px 45px !important
          }
    
          .bee-row-4 .bee-col-2 .bee-block-3 {
            padding: 0 10px 10px 25px !important
          }
    
          .bee-row-7 .bee-col-1 .bee-block-7 {
            padding: 10px 10px 10px 15px !important
          }
        }
      </style>
    </head>
    
    <body>
      <div class="bee-page-container">
        <div class="bee-row bee-row-1">
          <div class="bee-row-content no_stack">
            <div class="bee-col bee-col-1 bee-col-w2">
              <div class="bee-block bee-block-1 bee-image"><img alt="" class="bee-fixedwidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/editor_images/b7e8d070-bb3c-4414-80fc-41e40c5dd6e1.png" style="max-width:76px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w3">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:1px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-autowidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/editor_images/0c180f63-c4da-4b23-8fd4-44d89e6e4b34.png" style="max-width:167px;" /></div>
              <div class="bee-block bee-block-3 bee-divider">
                <div class="spacer" style="height:5px;"></div>
              </div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w7">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-right bee-autowidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/VB%20Logo.svg" style="max-width:216px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-2">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:10px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; color: #61697a; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 16px;">Hi ${new_user?.firstName},</p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; color: #1f0b0b; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 16px;"><strong style=""><span style="font-size: 46px; line-height: 55px;">Welcome Aboard!</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px;"><span style="font-size: 14px; line-height: 21px;"><span style="font-size: 15px; line-height: 22px;">You have been invited to <span style="color: #8a3b8f; line-height: 18px;"><strong style="">G10x</strong></span> by<strong style=""> <span style="color: #8a3b8f; line-height: 18px;">.</span></strong></span><span style="color: #8a3b8f; line-height: 18px;"><span style="font-size: 15px; line-height: 22px;"> </span><br style="" /></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-5 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px; text-align: left;"><span style="font-size: 14px; line-height: 21px;"><span style="color: #8a3b8f; line-height: 18px;"><strong style=""><span style="color: #000000; line-height: 18px;"><span style="color: #7c7676; line-height: 18px;">Email - </span><span style="color: #7c7676; line-height: 18px;"><span style="color: #000000; line-height: 18px;">${new_user?.email}</span></span></span></strong></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px; text-align: left;"><span style="font-size: 14px; line-height: 21px;"><span style="color: #8a3b8f; line-height: 18px;"><strong style=""><span style="color: #7c7676; line-height: 18px;">Password - ${randomPassword}</span></strong></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-3 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-4 bee-image"><img alt="Alternate text" class="bee-center bee-autowidth" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/Image_1.png" style="max-width:330px;" /></div>
              <div class="bee-block bee-block-5 bee-divider">
                <div class="spacer" style="height:30px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-3">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-heading">
                <h1 style="color:#8a3c90;direction:ltr;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:27px;font-weight:700;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><span class="tinyMce-placeholder">Onboard your entire company on a high performance mindset  driven execution.</span> </h1>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">  Achieve goals with strategic goal planning, monitoring execution, employee engagement and performance management.</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-divider">
                <div class="spacer" style="height:20px;"></div>
              </div>
              <div class="bee-block bee-block-4 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/middle_Image.png" style="max-width:468px;" /></div>
              <div class="bee-block bee-block-5 bee-divider">
                <div class="spacer" style="height:45px;"></div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Drive your teams into High Performance Mode.</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-4">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/search.png" style="max-width:314px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;"><strong style=""><span style="font-size: 24px; line-height: 48px;">Track your goals</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;">Tracking helps you stay focused on what's important to reaching your goal, identify potential obstacles.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-5">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px; text-align: left;"><span style="font-size: 24px; line-height: 48px;"><strong style="">Work with Analytics</strong></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px; text-align: left;"> You can visualize your progress and along with your team to achieve high potential goals and grow 10x together.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fullwidthOnMobile bee-fixedwidth" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/find_.png" style="max-width:314px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-6">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/finding.png" style="max-width:314px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;"><strong style=""><span style="font-size: 24px; line-height: 48px;">Track your progress</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;">We are obsessed with our mission of making teams high-performant. Enable you to continuously milestone your progress with your goals.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-7">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:10px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-divider">
                <div class="spacer" style="height:25px;"></div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Used and loved by enterprises and </span></strong><strong style=""><span style="font-size: 24px; line-height: 36px;">hiring </span></strong><strong style="font-family: inherit; background-color: transparent;"><span style="font-size: 24px; line-height: 36px;">managers all over the globe</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
              <div class="bee-block bee-block-5 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Get a personalized Demo</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #555555;">
                  <p style="font-size: 14px; line-height: 25px; text-align: center;">Discover how <strong style="">Grow10x</strong> can help you simplify your goals</p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">REQUEST A DEMO</strong></span></a></div>
              <div class="bee-block bee-block-8 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/find_new_job.png" style="max-width:435px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-8">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:35px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-9">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:35px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-10">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Links</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/about" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">About Us</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/resources/blogs" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Insights</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/success-stories" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Success stories</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/career" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Career</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/privacy" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank">Privacy Policy</a></p>
                </div>
              </div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Contact Info</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><strong style="">Indore, India</strong></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">Benchmark Building, 216, Scheme No 54, Indore, Madhya Pradesh 452010</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">+91 80 88048711</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/contact-us" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank">Contact Us</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="mailto:hello@valuebound.com" style="text-decoration: underline; color: #d0d0d0;">hello@valuebound.com</a></p>
                  <a href="https://www.valuebound.com/contact-us" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank"> </a>
                </div>
              </div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Valuebound Services LLP</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><strong style="">HQ, Bangalore, India</strong><br style="" />815, 2nd Floor, 27th Main<br style="" />Sector 1, HSR Layout<br style="" />Bangalore - 560102.</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">©2022 Valuebound. All Rights Reserved</p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-social">
                <div class="content"><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.facebook.com/valuebound/"><img alt="Facebook" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" title="Facebook" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://twitter.com/valuebound"><img alt="Twitter" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" title="Twitter" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.instagram.com/valuebound"><img alt="Instagram" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" title="Instagram" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://in.linkedin.com/company/valuebound"><img alt="LinkedIn" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" title="LinkedIn" /></a></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-11">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-icons" id="beepro-locked-footer">
                <div class="bee-icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    
    </html>`
    const message = template;
    return message;
  };
  
const generateMessageInviteTemplate = async (new_user, invitedBy , randomPassword) => {
const template = 
    `<!DOCTYPE html>
    <html>
    
    <head>
      <title></title>
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="website" property="og:type" />
      <meta content="" property="og:description" />
      <meta content="https://duiuap3gtx.preview-postedstuff.com/V2-s0CD-Vixk-I8Fi-ubnR/" property="og:url" />
      <meta content="https://pro-bee-beepro-thumbnail.getbee.io/messages/793045/776834/1665626/8228328_large.jpg" property="og:image" />
      <meta content="" property="og:title" />
      <meta content="" name="description" />
      <meta charset="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <style>
        .bee-row,
        .bee-row-content {
          position: relative
        }
    
        .bee-button .content {
          text-align: center
        }
    
        .bee-row-2,
        .bee-row-2 .bee-row-content,
        .bee-row-3,
        .bee-row-4,
        .bee-row-5,
        .bee-row-6,
        .bee-row-7,
        .bee-row-8 {
          background-color: #fff;
          background-repeat: no-repeat
        }
    
        .bee-row-1,
        .bee-row-10,
        .bee-row-11,
        .bee-row-2,
        .bee-row-2 .bee-row-content,
        .bee-row-3,
        .bee-row-4,
        .bee-row-5,
        .bee-row-6,
        .bee-row-7,
        .bee-row-8,
        .bee-row-9 {
          background-repeat: no-repeat
        }
    
        body {
          background-color: #f9f9f9;
          color: #000;
          font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif
        }
    
        a {
          color: #0068a5
        }
    
        * {
          box-sizing: border-box
        }
    
        body,
        h1,
        p {
          margin: 0
        }
    
        .bee-row-content {
          max-width: 670px;
          margin: 0 auto;
          display: flex
        }
    
        .bee-row-content .bee-col-w2 {
          flex-basis: 17%
        }
    
        .bee-row-content .bee-col-w3 {
          flex-basis: 25%
        }
    
        .bee-row-content .bee-col-w4 {
          flex-basis: 33%
        }
    
        .bee-row-content .bee-col-w6 {
          flex-basis: 50%
        }
    
        .bee-row-content .bee-col-w7 {
          flex-basis: 58%
        }
    
        .bee-row-content .bee-col-w12 {
          flex-basis: 100%
        }
    
        .bee-button a,
        .bee-icon .bee-icon-label-right a {
          text-decoration: none
        }
    
        .bee-divider,
        .bee-image {
          overflow: auto
        }
    
        .bee-divider .center,
        .bee-image .bee-center {
          margin: 0 auto
        }
    
        .bee-image .bee-right {
          float: right
        }
    
        .bee-row-1 .bee-col-2 .bee-block-2,
        .bee-row-1 .bee-col-3 .bee-block-2,
        .bee-row-3 .bee-col-1 .bee-block-4 {
          width: 100%
        }
    
        .bee-icon {
          display: inline-block;
          vertical-align: middle
        }
    
        .bee-icon .bee-content {
          display: flex;
          align-items: center
        }
    
        .bee-image img {
          display: block;
          width: 100%
        }
    
        .bee-social .icon img {
          max-height: 32px
        }
    
        .bee-text {
          overflow-wrap: anywhere
        }
    
        .bee-row-1 .bee-row-content,
        .bee-row-10 .bee-row-content,
        .bee-row-11 .bee-row-content,
        .bee-row-3 .bee-row-content,
        .bee-row-4 .bee-row-content,
        .bee-row-5 .bee-row-content,
        .bee-row-6 .bee-row-content,
        .bee-row-7 .bee-row-content,
        .bee-row-8 .bee-row-content,
        .bee-row-9 .bee-row-content {
          background-repeat: no-repeat;
          color: #000
        }
    
        .bee-row-1 .bee-col-1,
        .bee-row-1 .bee-col-2,
        .bee-row-1 .bee-col-3,
        .bee-row-10 .bee-col-2,
        .bee-row-10 .bee-col-3,
        .bee-row-11 .bee-col-1,
        .bee-row-2 .bee-col-1,
        .bee-row-2 .bee-col-2,
        .bee-row-3 .bee-col-1,
        .bee-row-4 .bee-col-1,
        .bee-row-4 .bee-col-2,
        .bee-row-5 .bee-col-1,
        .bee-row-5 .bee-col-2,
        .bee-row-6 .bee-col-1,
        .bee-row-6 .bee-col-2,
        .bee-row-7 .bee-col-1,
        .bee-row-8 .bee-col-1,
        .bee-row-9 .bee-col-1 {
          padding-bottom: 5px;
          padding-top: 5px
        }
    
        .bee-row-1 .bee-col-1 .bee-block-1 {
          padding-left: 35px;
          padding-top: 10px;
          width: 100%
        }
    
        .bee-row-1 .bee-col-2 .bee-block-1,
        .bee-row-1 .bee-col-2 .bee-block-3,
        .bee-row-1 .bee-col-3 .bee-block-1,
        .bee-row-10 .bee-col-2 .bee-block-1,
        .bee-row-10 .bee-col-2 .bee-block-2,
        .bee-row-10 .bee-col-3 .bee-block-1,
        .bee-row-10 .bee-col-3 .bee-block-2,
        .bee-row-2 .bee-col-1 .bee-block-1,
        .bee-row-2 .bee-col-2 .bee-block-1,
        .bee-row-2 .bee-col-2 .bee-block-2,
        .bee-row-2 .bee-col-2 .bee-block-3,
        .bee-row-2 .bee-col-2 .bee-block-5,
        .bee-row-3 .bee-col-1 .bee-block-3,
        .bee-row-3 .bee-col-1 .bee-block-5,
        .bee-row-3 .bee-col-1 .bee-block-7,
        .bee-row-7 .bee-col-1 .bee-block-1,
        .bee-row-7 .bee-col-1 .bee-block-2,
        .bee-row-7 .bee-col-1 .bee-block-4,
        .bee-row-8 .bee-col-1 .bee-block-1,
        .bee-row-9 .bee-col-1 .bee-block-1 {
          padding: 10px
        }
    
        .bee-row-2 .bee-row-content {
          background-position: top center;
          color: #000
        }
    
        .bee-row-2 .bee-col-1 .bee-block-2,
        .bee-row-2 .bee-col-1 .bee-block-4 {
          padding: 10px 10px 10px 25px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-3 {
          padding: 10px 25px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-5,
        .bee-row-2 .bee-col-1 .bee-block-6 {
          padding-left: 25px;
          padding-right: 10px;
          padding-top: 10px
        }
    
        .bee-row-2 .bee-col-1 .bee-block-7,
        .bee-row-4 .bee-col-2 .bee-block-4 {
          padding: 10px 10px 10px 20px;
          text-align: left
        }
    
        .bee-row-2 .bee-col-2 .bee-block-4 {
          padding-right: 5px;
          width: 100%
        }
    
        .bee-row-3 {
          background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/Background.png');
          background-position: top center
        }
    
        .bee-row-3 .bee-col-1 .bee-block-1 {
          text-align: center;
          width: 100%
        }
    
        .bee-row-3 .bee-col-1 .bee-block-2,
        .bee-row-3 .bee-col-1 .bee-block-6,
        .bee-row-7 .bee-col-1 .bee-block-3 {
          padding: 5px 35px 10px
        }
    
        .bee-row-4 .bee-col-1 .bee-block-1,
        .bee-row-5 .bee-col-2 .bee-block-1,
        .bee-row-6 .bee-col-1 .bee-block-1 {
          padding: 10px;
          width: 100%
        }
    
        .bee-row-4 .bee-col-2 .bee-block-1,
        .bee-row-5 .bee-col-1 .bee-block-1,
        .bee-row-6 .bee-col-2 .bee-block-1 {
          padding: 10px 10px 10px 15px
        }
    
        .bee-row-4 .bee-col-2 .bee-block-2,
        .bee-row-4 .bee-col-2 .bee-block-3 {
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 10px
        }
    
        .bee-row-5 .bee-col-1 .bee-block-2,
        .bee-row-5 .bee-col-1 .bee-block-3,
        .bee-row-6 .bee-col-2 .bee-block-2,
        .bee-row-6 .bee-col-2 .bee-block-3 {
          padding-bottom: 10px;
          padding-left: 25px;
          padding-right: 10px
        }
    
        .bee-row-5 .bee-col-1 .bee-block-4,
        .bee-row-6 .bee-col-2 .bee-block-4 {
          padding: 10px 10px 10px 25px;
          text-align: left
        }
    
        .bee-row-7 {
          background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/background_down.png')
        }
    
        .bee-row-7 .bee-col-1 .bee-block-5 {
          padding: 5px 10px 10px 35px
        }
    
        .bee-row-7 .bee-col-1 .bee-block-6 {
          padding: 10px 60px 20px
        }
    
        .bee-row-7 .bee-col-1 .bee-block-7 {
          padding: 10px 10px 10px 25px;
          text-align: center
        }
    
        .bee-row-7 .bee-col-1 .bee-block-8 {
          padding-top: 15px;
          width: 100%
        }
    
        .bee-row-10,
        .bee-row-9 {
          background-color: #413ea1
        }
    
        .bee-row-10 .bee-col-1 {
          padding-top: 5px
        }
    
        .bee-row-10 .bee-col-1 .bee-block-1,
        .bee-row-10 .bee-col-1 .bee-block-2 {
          padding: 10px 10px 10px 20px
        }
    
        .bee-row-10 .bee-col-3 .bee-block-3 {
          padding: 10px;
          text-align: left
        }
    
        .bee-row-11 .bee-col-1 .bee-block-1 {
          color: #9d9d9d;
          font-family: inherit;
          font-size: 15px;
          padding-bottom: 5px;
          padding-top: 5px;
          text-align: center
        }
    
        .bee-row-11 .bee-col-1 .bee-block-1 .bee-icon-image {
          padding: 5px 6px 5px 5px
        }
    
        @media (max-width:690px) {
          .bee-mobile_hide {
            display: none
          }
    
          .bee-row-content:not(.no_stack) {
            display: block
          }
    
          .bee-row-2 .bee-col-1 .bee-block-7,
          .bee-row-2 .bee-col-1 .bee-block-7 .bee-button-content,
          .bee-row-4 .bee-col-2 .bee-block-4,
          .bee-row-4 .bee-col-2 .bee-block-4 .bee-button-content,
          .bee-row-5 .bee-col-1 .bee-block-4,
          .bee-row-5 .bee-col-1 .bee-block-4 .bee-button-content,
          .bee-row-6 .bee-col-2 .bee-block-4,
          .bee-row-6 .bee-col-2 .bee-block-4 .bee-button-content,
          .bee-row-7 .bee-col-1 .bee-block-7 .bee-button-content {
            text-align: center !important
          }
    
          .bee-row-4 .bee-col-2 .bee-block-2 {
            padding: 0 10px 10px 60px !important
          }
    
          .bee-row-5 .bee-col-1 .bee-block-2 {
            padding: 0 10px 10px 45px !important
          }
    
          .bee-row-4 .bee-col-2 .bee-block-3 {
            padding: 0 10px 10px 25px !important
          }
    
          .bee-row-7 .bee-col-1 .bee-block-7 {
            padding: 10px 10px 10px 15px !important
          }
        }
      </style>
    </head>
    
    <body>
      <div class="bee-page-container">
        <div class="bee-row bee-row-1">
          <div class="bee-row-content no_stack">
            <div class="bee-col bee-col-1 bee-col-w2">
              <div class="bee-block bee-block-1 bee-image"><img alt="" class="bee-fixedwidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/editor_images/b7e8d070-bb3c-4414-80fc-41e40c5dd6e1.png" style="max-width:76px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w3">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:1px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-autowidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/editor_images/0c180f63-c4da-4b23-8fd4-44d89e6e4b34.png" style="max-width:167px;" /></div>
              <div class="bee-block bee-block-3 bee-divider">
                <div class="spacer" style="height:5px;"></div>
              </div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w7">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-right bee-autowidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/VB%20Logo.svg" style="max-width:216px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-2">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:10px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; color: #61697a; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 16px;">Hi ${new_user?.firstName},</p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; color: #1f0b0b; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 16px;"><strong style=""><span style="font-size: 46px; line-height: 55px;">Welcome Aboard!</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px;"><span style="font-size: 14px; line-height: 21px;"><span style="font-size: 15px; line-height: 22px;">You have been invited to <span style="color: #8a3b8f; line-height: 18px;"><strong style="">G10x</strong></span> by<strong style=""> <span style="color: #8a3b8f; line-height: 18px;">${invitedBy.firstName} ${invitedBy.surname ? invitedBy.surname : ''}.</span></strong></span><span style="color: #8a3b8f; line-height: 18px;"><span style="font-size: 15px; line-height: 22px;"> </span><br style="" /></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-5 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px; text-align: left;"><span style="font-size: 14px; line-height: 21px;"><span style="color: #8a3b8f; line-height: 18px;"><strong style=""><span style="color: #000000; line-height: 18px;"><span style="color: #7c7676; line-height: 18px;">Email - </span><span style="color: #7c7676; line-height: 18px;"><span style="color: #000000; line-height: 18px;">${new_user?.email}</span></span></span></strong></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
                  <p style="font-size: 12px; line-height: 18px; text-align: left;"><span style="font-size: 14px; line-height: 21px;"><span style="color: #8a3b8f; line-height: 18px;"><strong style=""><span style="color: #7c7676; line-height: 18px;">Password - ${randomPassword}</span></strong></span></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-3 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-4 bee-image"><img alt="Alternate text" class="bee-center bee-autowidth" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/Image_1.png" style="max-width:330px;" /></div>
              <div class="bee-block bee-block-5 bee-divider">
                <div class="spacer" style="height:30px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-3">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-heading">
                <h1 style="color:#8a3c90;direction:ltr;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:27px;font-weight:700;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><span class="tinyMce-placeholder">Onboard your entire company on a high performance mindset  driven execution.</span> </h1>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">  Achieve goals with strategic goal planning, monitoring execution, employee engagement and performance management.</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-divider">
                <div class="spacer" style="height:20px;"></div>
              </div>
              <div class="bee-block bee-block-4 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/middle_Image.png" style="max-width:468px;" /></div>
              <div class="bee-block bee-block-5 bee-divider">
                <div class="spacer" style="height:45px;"></div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Drive your teams into High Performance Mode.</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-4">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/search.png" style="max-width:314px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;"><strong style=""><span style="font-size: 24px; line-height: 48px;">Track your goals</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;">Tracking helps you stay focused on what's important to reaching your goal, identify potential obstacles.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-5">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px; text-align: left;"><span style="font-size: 24px; line-height: 48px;"><strong style="">Work with Analytics</strong></span></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px; text-align: left;"> You can visualize your progress and along with your team to achieve high potential goals and grow 10x together.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fullwidthOnMobile bee-fixedwidth" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/find_.png" style="max-width:314px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-6">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w6">
              <div class="bee-block bee-block-1 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/finding.png" style="max-width:314px;" /></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w6">
              <div class="bee-block bee-block-1 bee-divider bee-mobile_hide">
                <div class="spacer" style="height:30px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;"><strong style=""><span style="font-size: 24px; line-height: 48px;">Track your progress</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 200%; font-size: 12px; color: #555555; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 28px;">We are obsessed with our mission of making teams high-performant. Enable you to continuously milestone your progress with your goals.</p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-7">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:10px;"></div>
              </div>
              <div class="bee-block bee-block-2 bee-divider">
                <div class="spacer" style="height:25px;"></div>
              </div>
              <div class="bee-block bee-block-3 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Used and loved by enterprises and </span></strong><strong style=""><span style="font-size: 24px; line-height: 36px;">hiring </span></strong><strong style="font-family: inherit; background-color: transparent;"><span style="font-size: 24px; line-height: 36px;">managers all over the globe</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-4 bee-divider">
                <div class="spacer" style="height:0px;"></div>
              </div>
              <div class="bee-block bee-block-5 bee-text">
                <div class="bee-text-content" style="line-height: 150%; font-size: 12px; color: #34495e; font-family: inherit;">
                  <p style="font-size: 14px; line-height: 21px; text-align: center;"><strong style=""><span style="font-size: 24px; line-height: 36px;">Get a personalized Demo</span></strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-6 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #555555;">
                  <p style="font-size: 14px; line-height: 25px; text-align: center;">Discover how <strong style="">Grow10x</strong> can help you simplify your goals</p>
                </div>
              </div>
              <div class="bee-block bee-block-7 bee-button"><a class="bee-button-content" href="${config.PROD_ORIGIN}" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">REQUEST A DEMO</strong></span></a></div>
              <div class="bee-block bee-block-8 bee-image"><img alt="Alternate text" class="bee-center bee-fixedwidth bee-fullwidthOnMobile" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/find_new_job.png" style="max-width:435px;" /></div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-8">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:35px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-9">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-divider">
                <div class="spacer" style="height:35px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-10">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Links</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/about" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">About Us</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/resources/blogs" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Insights</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/success-stories" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Success stories</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/career" rel="noopener" style="text-decoration: none; color: #d0d0d0;" target="_blank">Career</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/privacy" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank">Privacy Policy</a></p>
                </div>
              </div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Contact Info</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><strong style="">Indore, India</strong></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">Benchmark Building, 216, Scheme No 54, Indore, Madhya Pradesh 452010</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">+91 80 88048711</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="https://www.valuebound.com/contact-us" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank">Contact Us</a></p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><a href="mailto:hello@valuebound.com" style="text-decoration: underline; color: #d0d0d0;">hello@valuebound.com</a></p>
                  <a href="https://www.valuebound.com/contact-us" rel="noopener" style="text-decoration: underline; color: #d0d0d0;" target="_blank"> </a>
                </div>
              </div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w4">
              <div class="bee-block bee-block-1 bee-text">
                <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #ffffff;">
                  <p style="font-size: 16px; line-height: 19px; text-align: left;"><strong style="">Valuebound Services LLP</strong></p>
                </div>
              </div>
              <div class="bee-block bee-block-2 bee-text">
                <div class="bee-text-content" style="line-height: 180%; font-size: 12px; font-family: inherit; color: #d0d0d0;">
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"><strong style="">HQ, Bangalore, India</strong><br style="" />815, 2nd Floor, 27th Main<br style="" />Sector 1, HSR Layout<br style="" />Bangalore - 560102.</p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
                  <p style="font-size: 14px; line-height: 25px; text-align: left;">©2022 Valuebound. All Rights Reserved</p>
                </div>
              </div>
              <div class="bee-block bee-block-3 bee-social">
                <div class="content"><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.facebook.com/valuebound/"><img alt="Facebook" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" title="Facebook" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://twitter.com/valuebound"><img alt="Twitter" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" title="Twitter" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.instagram.com/valuebound"><img alt="Instagram" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" title="Instagram" /></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://in.linkedin.com/company/valuebound"><img alt="LinkedIn" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" title="LinkedIn" /></a></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-11">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-icons" id="beepro-locked-footer">
                <div class="bee-icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    
    </html>`
    return template;
}

const generateSendOtpTemplate = async ( user, randomOTP ) => {
    const template = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
        </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="right">
          
          <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          <a href="${config.PROD_ORIGIN}" target="_blank">
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 174px;" width="174"/>
          </a>
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 14px;">
        <strong>Hi, ${user.firstName} ${user.surname ?user.surname: ''}, Your Password Reset Request is Received.</strong>
      </h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Montserrat',sans-serif; font-size: 14px;">
        
      </h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 100%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 100%; font-size: 14px;"><span style="font-family: 'Playfair Display', serif; font-size: 14px; line-height: 14px;"><span style="font-size: 14px; line-height: 24px;"><strong>Your OTP for reset password is :- ${randomOTP}</strong></span></span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: #000000">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:110px;">
      <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/" title="Facebook" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://instagram.com/" title="Instagram" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://pinterest.com/" title="Pinterest" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    `;
    return template
}

const generateSuccessUpdatePassword = async () => {
    const template = 
    `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        @media (max-width:620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
    
          .icons-inner {
            text-align: center;
          }
    
          .icons-inner td {
            margin: 0 auto;
          }
    
          .image_block img.big,
          .row-content {
            width: 100% !important;
          }
    
          .mobile_hide {
            display: none;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/793045_776834/image__1_-removebg-preview.png" style="display: block; height: auto; border: 0; width: 360px; max-width: 100%;" width="360" alt="Your Logo" title="Your Logo"></div>
                                  </td>
                                </tr>
                              </table>
                              <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/animated_header.gif" style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;" width="600" alt="Card Header with Border and Shadow Animated" title="Card Header with Border and Shadow Animated"></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/body_background_2.png'); background-position: top center; background-repeat: repeat; background-size: auto;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 600px;" width="600">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 50px; padding-right: 50px; vertical-align: top; padding-top: 15px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div class style="font-size: 14px; mso-line-height-alt: 16.8px; color: #506bec; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                        <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="background-color:transparent;font-size:38px;"><strong>Password</strong></span><strong style="font-size:14px;"><span style="font-size:38px;">&nbsp;Updated</span></strong></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div class style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                        <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:16px;">The Password has been updated successfully!</span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
                                    <div class="alignment" align="left">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:46px;width:84px;v-text-anchor:middle;" arcsize="35%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px"><![endif]--><a href="${config.PROD_ORIGIN}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;font-weight:400;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:25px;padding-right:20px;font-size:15px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word;"><span style="line-height: 30px;" dir="ltr" data-mce-style><strong>Login</strong></span></span></span></a>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="text_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div class style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                        <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;">Having trouble? <span style="color:#003aff;"><a href="https://forms.gle/vSfnkpcs4mrP1KnB9" target="_blank" style="text-decoration: underline; color: #40507a;" rel="noopener">click here.</a></span></span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 10px; padding-right: 10px; vertical-align: top; padding-top: 10px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div class style="font-size: 14px; mso-line-height-alt: 16.8px; color: #97a2da; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">This link will expire in the next 24 hours.<br>Please feel free to contact us <span style="color:#003aff;"><a href="https://forms.gle/smjm4puEHsceTfAZ7" target="_blank" style="text-decoration:underline;color:#003aff;" rel="noopener">about issues here.</a></span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div class style="font-size: 14px; mso-line-height-alt: 16.8px; color: #97a2da; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                        <p style="margin: 0; text-align: center; font-size: 12px; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:12px;">Copyright© 2022 G10x.</span></p>
                                        <p id="m_8010100107078456808text01" style="margin: 0; text-align: center; font-size: 12px; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:12px;"><a href="#" target="_blank" title="Unsubscribe" style="text-decoration: underline; color: #97a2da;" rel="noopener">Unsubscribe</a> |&nbsp;<a href="#" target="_blank" title="Manage your preferences" style="text-decoration: underline; color: #97a2da;" rel="noopener">Manage your preferences</a>&nbsp;|<a href="https://www.valuebound.com/privacy" target="_blank" style="text-decoration: underline; color: #97a2da;" rel="noopener">&nbsp;Privacy Policy</a></span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="alignment" style="vertical-align: middle; text-align: center;">
                                          <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                          <!--[if !vml]><!-->
                                          <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation">
                                            <!--<![endif]-->
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>`;
    return template;
}

const weeklyReminderTemplate = async (user) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
        .u-row .u-col-100 {
          width: 600px !important;
        }
      }
      
      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: calc(100% - 40px) !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col>div {
          margin: 0 auto;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table,
      td {
        color: #000000;
      }
      
      a {
        color: #0000ee;
        text-decoration: underline;
      }
      
      @media (max-width: 480px) {
        #u_column_1 .v-col-padding {
          padding: 0px 0px 30px !important;
        }
        #u_column_2 .v-col-padding {
          padding: 30px 0px !important;
        }
        #u_content_heading_10 .v-font-size {
          font-size: 24px !important;
        }
        #u_content_heading_13 .v-font-size {
          font-size: 24px !important;
        }
        #u_column_4 .v-col-padding {
          padding: 30px 0px !important;
        }
      }
    </style>
  
  
  
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css">
    <!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
  
  
            <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="right">
  
                                      <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;"
                                        width="145" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="${config.PROD_ORIGIN}" target="_blank">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;"
                                          width="156.6" />
                                      </a>
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
                                  Hi ${user.firstName},
                                </h1>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 14px;">
                                  You have OKR need to be updated. Checking in keeps the OKR progress transparent and real time.*
                                </h1>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <div style="line-height: 100%; text-align: left; word-wrap: break-word;">
                                  <p style="line-height: 100%; font-size: 14px;"><span style="font-family: 'Playfair Display', serif; font-size: 10px; line-height: 10px;"><span style="line-height: 10px; font-size: 10px;">*Ignore if already checked-in.</span></span>
                                  </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: #000000">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;"
                                        width="69.6" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <div align="center">
                                  <div style="display: table; max-width:110px;">
                                    <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://facebook.com/" title="Facebook" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://instagram.com/" title="Instagram" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://pinterest.com/" title="Pinterest" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
  
                                <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>
  `;
  return message
}

const createOkrReminderTemplate = async(user) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }

      .u-row .u-col-100 {
        width: 600px !important;
      }

    }

    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }

    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }

    p {
      margin: 0;
    }

    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }

    * {
      line-height: inherit;
    }

    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }

    table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
        </style>
      
      

    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

    </head>

    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
        

    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="right">
          
          <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          <a href="${config.PROD_ORIGIN}" target="_blank">
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
          </a>
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
        Hi ${user.firstName},
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

    <table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 14px;">
        You haven't created your OKR. Your OKR keeps the  progress transparent and real time with your manager &amp; organization. Please Create it now by clicking on below link.
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 100%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 100%; font-size: 14px;"><span style="font-family: 'Playfair Display', serif; font-size: 10px; line-height: 10px;"><span style="line-height: 10px; font-size: 10px;">Click <a rel="noopener" href="${config.PROD_ORIGIN}" target="_blank">here</a> to login </span></span></p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #000000">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:110px;">
      <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/" title="Facebook" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://instagram.com/" title="Instagram" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://pinterest.com/" title="Pinterest" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>


        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>

  </html>`;
  return message;
}

const weeklySummaryTemplate = async(user, summary) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }

      .u-row .u-col-50 {
        width: 300px !important;
      }

      .u-row .u-col-100 {
        width: 600px !important;
      }

    }

    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }

    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }

    p {
      margin: 0;
    }

    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }

    * {
      line-height: inherit;
    }

    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }

    table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
        </style>
      
      

    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

    </head>

    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
        

    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="right">
          
          <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          <a href="http://localhost:3000/" target="_blank">
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
          </a>
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
        Hi ${user.firstName} ${user.surname? user.surname: ''},
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

    <table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 14px;">
        <p>Your Weekly OKR Summary is given below:-</p>
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        Overall Progress (%) :-
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        ${summary[0] ? summary[0] : 0}%
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        Status:-
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        ${summary[1] ? summary[1] : 'Not Yet Started'}
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #000000">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:110px;">
      <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/" title="Facebook" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://instagram.com/" title="Instagram" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://pinterest.com/" title="Pinterest" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>


        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>

    </html>`;
  return message;
}

const teamCreatedTemplate = async(user, team) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_content_heading_19 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="right">
      
      <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:3000/" target="_blank">
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
      </a>
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
    Hi ${user.firstName} ${user.surname? user.surname: ''},
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 20px;">
    <p>You have Created the Team ${team} successfully.</p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_19" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #000000; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: courier new,courier; font-size: 10px;">
    <p><em>This email is auto-generated by VB10X.co</em></p>
<p><em>Please do not reply to this message.</em></p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #000000">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:110px;">
  <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://pinterest.com/" title="Pinterest" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`;
  return message;
}

const addedToTeamTemplate = async(user, team) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_content_heading_19 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="right">
      
      <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:3000/" target="_blank">
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
      </a>
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
    Hi ${user.firstName} ${user.surname ? user.surname : ''},
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 20px;">
    <p>You have been added to the Team ${team}.</p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_19" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #000000; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: courier new,courier; font-size: 10px;">
    <p><em>This email is auto-generated by VB10X.co</em></p>
<p><em>Please do not reply to this message.</em></p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #000000">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:110px;">
  <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://pinterest.com/" title="Pinterest" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`;
  return message;
}

const deletedTeamTemplate = async(user, team) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_content_heading_19 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="right">
      
      <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:3000/" target="_blank">
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
      </a>
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
    Hi ${user.firstName} ${user.surname ? user.surname :''},
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 20px;">
    <p>You have Deleted the Team ${team} successfully.</p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_19" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #000000; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: courier new,courier; font-size: 10px;">
    <p><em>This email is auto-generated by VB10X.co</em></p>
<p><em>Please do not reply to this message.</em></p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #000000">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:110px;">
  <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://pinterest.com/" title="Pinterest" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`;
  return message;
}

const updatedTeamTemplate = async(user, team) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_content_heading_19 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="right">
      
      <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:3000/" target="_blank">
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
      </a>
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
    Hi ${user.firstName} ${user.surname ? user.surname :''},
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 20px;">
    <p>You have Updated the Team ${team} successfully.</p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_19" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #000000; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: courier new,courier; font-size: 10px;">
    <p><em>This email is auto-generated by VB10X.co</em></p>
<p><em>Please do not reply to this message.</em></p>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #000000">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:110px;">
  <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://pinterest.com/" title="Pinterest" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`;
  return message;
}

const companyWeeklySummaryTemplate = async(user, summary, orgName) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }

      .u-row .u-col-50 {
        width: 300px !important;
      }

      .u-row .u-col-100 {
        width: 600px !important;
      }

    }

    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }

    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }

    p {
      margin: 0;
    }

    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }

    * {
      line-height: inherit;
    }

    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }

    table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_1 .v-col-padding { padding: 0px 0px 30px !important; } #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_content_heading_10 .v-font-size { font-size: 24px !important; } #u_content_heading_13 .v-font-size { font-size: 24px !important; } #u_column_4 .v-col-padding { padding: 30px 0px !important; } }
        </style>
      
      

    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

    </head>

    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
        

    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #fbf4ec;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #fbf4ec;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="right">
          
          <img align="right" border="0" src="https://assets.unlayer.com/projects/0/1658406509573-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #fbf4ec">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbf4ec;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div id="u_column_1" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 0px 40px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          <a href="http://localhost:3000/" target="_blank">
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406969113-vb10x.jpg" alt="VB10X.CO" title="VB10X.CO" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
          </a>
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 30px;">
        Hi ${user.firstName} ${user.surname? user.surname: ''},
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

    <table id="u_content_heading_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 100%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Cabin',sans-serif; font-size: 14px;">
        <p>${orgName}'s Weekly OKR Summary is given below:-</p>
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        Overall Progress (%) :-
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        ${summary[0] ? summary[0] : 0}%
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        Status:-
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
        ${summary[1] ? summary[1] : 'Not Started Yet'}
      </h1>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: #000000">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #000000;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_4" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 35px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">If you have questions regarding your data, please visit our Privacy Policy<br />© 2022 Valuebound. All Rights Reserved.</p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1658406924990-vb10x.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 69.6px;" width="69.6"/>
          
        </td>
      </tr>
    </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:110px;">
      <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/" title="Facebook" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://instagram.com/" title="Instagram" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://pinterest.com/" title="Pinterest" target="_blank">
              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/pinterest.png" alt="Pinterest" title="Pinterest" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="59%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>

          </td>
        </tr>
      </tbody>
    </table>

    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 45px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">No. 815, 2nd Floor, 27th Main, Sector 1, HSR Layout, Bangalore – 560 102 </p>
      </div>

          </td>
        </tr>
      </tbody>
    </table>

      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>


        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>

    </html>`;
  return message;
}

const companyTemplateNew = async( oldProgress, newProgress, companyName, oldStatus, newStatus, sevenDaysAgoArray, weekEndDateArray) => {
  const message = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
    .u-row {
      width: 600px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-100 {
      width: 600px !important;
    }
  
  }
  
  @media (max-width: 620px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
      </style>
    
    
  
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
      
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Cabin',sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://assets.unlayer.com/projects/97440/1661341373305-vb10x.jpg" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 70.8px;" width="70.8"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Cabin',sans-serif;" align="left">
          
    <div style="color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">${companyName}'s Weekly OKR Summary Report</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div style="color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">${sevenDaysAgoArray[0]}, ${sevenDaysAgoArray[1]} - ${weekEndDateArray[0]}, ${weekEndDateArray[1]} </span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-image: url('https://assets.unlayer.com/projects/97440/1661341835506-66831.png');background-repeat: no-repeat;background-position: center top;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('https://assets.unlayer.com/projects/97440/1661341835506-66831.png');background-repeat: no-repeat;background-position: center top;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div>
      
  <!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  * {
    box-sizing: border-box;
  }
  
  /* Create three equal columns that floats next to each other */
  .column {
    float: left;
    width: 100px;
    padding: 10px;
    height: 100px; /* Should be removed. Only for demonstration */
  }
  
  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  </style>
  </head>
  <body>
  
  <div class="row" style="align: center;padding-left:130px">
    <div class="column" style="background-color:white;">
      <h2 align="center" >${oldProgress}%</h2>
      <p align="center" style="font-size:12px; color: ${oldStatus === 'At Risk' ? 'red' : oldStatus === 'None' ? 'black': oldStatus === 'On Track' ? 'green' : oldStatus === 'Behind' ? 'orange' : 'green'}">Pace: ${oldStatus}</p>
    </div>
    <div class="column" style="background-color:white;">
      <h2 align="center" style="font-size:30px;">→</h2>
    </div>
    <div class="column" style="background-color:white;">
      <h2 align="center" >${newProgress}%</h2>
      <p align="center" style="font-size:12px; color: ${newStatus === 'At Risk' ? 'red' : newStatus === 'None' ? 'black': newStatus === 'On Track' ? 'green' : newStatus === 'Behind' ? 'orange' : 'green'}">Pace: ${newStatus}</p>
    </div>
  </div>
  
  </body>
  </html>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div>
      <!DOCTYPE html>
  <html>
  <head>
  <style>
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 50%;
  }
  
  #customers td, #customers th {
    font-weight: normal;
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  #customers tr:hover {background-color: #ddd;}
  
  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #cccaca;
    color: black;
    width: auto;
  }
  </style>
  </head>
  <body>
  
  
  
  <table id="customers" align="center">
    <tr>
      <th>Objectives</th>
      <th>Beginning of Week</th>
      <th>End of Week</th>
    </tr>
    <tr>
      <td style="width: 50%">${companyName}</td>
      <td style="color: ${oldStatus === 'At Risk' ? 'red' : oldStatus === 'None' ? 'black': oldStatus === 'On Track' ? 'green' : oldStatus === 'Behind' ? 'orange' : 'green'}">${oldProgress}%</td>
      <td style="color: ${newStatus === 'At Risk' ? 'red' : newStatus === 'None' ? 'black': newStatus === 'On Track' ? 'green' : newStatus === 'Behind' ? 'orange' : 'green'}">${newProgress}%</td>
    </tr> 
  
  </table>
  
  </body>
  </html>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
  <div align="center">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://3.110.212.212/okr" style="height:37px; v-text-anchor:middle; width:188px;" arcsize="11%" stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
      <a href="${config.PROD_ORIGIN}/okr" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
        <span style="display:block;padding:10px 20px;line-height:120%;"><p style="font-size: 14px; line-height: 120%;"><span style="font-size: 14px; line-height: 16.8px;">View ${companyName}'s OKRs</span></p></span>
      </a>
    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 12px; line-height: 16.8px;">Click this <a rel="noopener" href="${config.PROD_ORIGIN}/okr" target="_blank">link</a> if the button does not work.</span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: #f6f3f3">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f6f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
          
    <div style="color: #7e8c8d; line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: center;"><a rel="noopener" href="https://www.valuebound.com/" target="_blank">valuebound.com</a><br />815, 2nd Floor, 27th Main Sector 1, HSR Layout</p>
  <p style="font-size: 14px; line-height: 140%; text-align: center;">Bangalore - 560102.<br />+91 80 88048711</p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`;
  return message;
}

module.exports = { 
    generateMessage, 
    generateMessageInviteTemplate, 
    generateSendOtpTemplate, 
    generateSuccessUpdatePassword,
    weeklyReminderTemplate,
    createOkrReminderTemplate,
    weeklySummaryTemplate,
    teamCreatedTemplate,
    addedToTeamTemplate,
    deletedTeamTemplate,
    updatedTeamTemplate,
    companyWeeklySummaryTemplate,
    companyTemplateNew
};