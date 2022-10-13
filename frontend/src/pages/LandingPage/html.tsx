const getLandingPage = () => {
  return `
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
          .bee-row-3 {
              background-color: #fff;
              background-repeat: no-repeat
          }
  
          .bee-row-1,
          .bee-row-2,
          .bee-row-2 .bee-row-content,
          .bee-row-3,
          .bee-row-4,
          .bee-row-5,
          .bee-row-6,
          .bee-row-7 {
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
  
          .bee-image .bee-center {
              margin: 0 auto
          }
  
          .bee-divider .right,
          .bee-image .bee-right {
              float: right
          }
  
          .bee-row-1 .bee-col-2 .bee-block-2,
          .bee-row-1 .bee-col-3 .bee-block-2 {
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
  
          .bee-paragraph,
          .bee-text {
              overflow-wrap: anywhere
          }
  
          .bee-row-1 .bee-row-content,
          .bee-row-3 .bee-row-content,
          .bee-row-4 .bee-row-content,
          .bee-row-5 .bee-row-content,
          .bee-row-6 .bee-row-content,
          .bee-row-7 .bee-row-content {
              background-repeat: no-repeat;
              color: #000
          }
  
          .bee-row-1 .bee-col-1,
          .bee-row-1 .bee-col-2,
          .bee-row-1 .bee-col-3,
          .bee-row-2 .bee-col-1,
          .bee-row-2 .bee-col-2,
          .bee-row-3 .bee-col-1,
          .bee-row-4 .bee-col-1,
          .bee-row-5 .bee-col-2,
          .bee-row-5 .bee-col-3,
          .bee-row-6 .bee-col-1,
          .bee-row-7 .bee-col-1 {
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
          .bee-row-2 .bee-col-1 .bee-block-1,
          .bee-row-2 .bee-col-2 .bee-block-1,
          .bee-row-2 .bee-col-2 .bee-block-3,
          .bee-row-3 .bee-col-1 .bee-block-1,
          .bee-row-4 .bee-col-1 .bee-block-1,
          .bee-row-5 .bee-col-2 .bee-block-1,
          .bee-row-5 .bee-col-2 .bee-block-2,
          .bee-row-5 .bee-col-3 .bee-block-1,
          .bee-row-5 .bee-col-3 .bee-block-2 {
              padding: 10px
          }
  
          .bee-row-2 .bee-row-content {
              background-position: top center;
              color: #000
          }
  
          .bee-row-2 .bee-col-1 .bee-block-2 {
              padding: 10px 25px
          }
  
          .bee-row-2 .bee-col-1 .bee-block-3 {
              padding-left: 25px;
              padding-right: 10px;
              padding-top: 10px
          }
  
          .bee-row-2 .bee-col-1 .bee-block-4 {
              padding: 10px 10px 10px 20px;
              text-align: left
          }
  
          .bee-row-2 .bee-col-2 .bee-block-2 {
              padding-right: 5px;
              width: 100%
          }
  
          .bee-row-4,
          .bee-row-5,
          .bee-row-6 {
              background-color: #413ea1
          }
  
          .bee-row-5 .bee-col-1 {
              padding-top: 5px
          }
  
          .bee-row-5 .bee-col-1 .bee-block-1,
          .bee-row-5 .bee-col-1 .bee-block-2 {
              padding: 10px 10px 10px 20px
          }
  
          .bee-row-5 .bee-col-3 .bee-block-3 {
              padding: 10px;
              text-align: left
          }
  
          .bee-row-7 .bee-col-1 .bee-block-1 {
              color: #9d9d9d;
              font-family: inherit;
              font-size: 15px;
              padding-bottom: 5px;
              padding-top: 5px;
              text-align: center
          }
  
          @media (max-width:690px) {
              .bee-row-content:not(.no_stack) {
                  display: block
              }
  
              .bee-row-2 .bee-col-1 .bee-block-4,
              .bee-row-2 .bee-col-1 .bee-block-4 .bee-button-content {
                  text-align: center !important
              }
          }
  
          .bee-row-7 .bee-col-1 .bee-block-1 .bee-icon-image {
              padding: 5px 6px 5px 5px
          }
  
          .bee-row-6 .bee-col-1 .bee-block-1 {
              color: #e2e5f0;
              direction: ltr;
              font-size: 13px;
              font-weight: 400;
              letter-spacing: 0;
              line-height: 120%;
              text-align: center
          }
  
          .bee-row-6 .bee-col-1 .bee-block-1 a {
              color: #8a3c90
          }
  
          .bee-row-6 .bee-col-1 .bee-block-1 p:not(:last-child) {
              margin-bottom: 16px
          }
      </style>
  </head>
  <body>
  <div class="bee-page-container">
  <div class="bee-row bee-row-1">
  <div class="bee-row-content no_stack">
  <div class="bee-col bee-col-1 bee-col-w2">
  <div class="bee-block bee-block-1 bee-image"><img alt="" class="bee-fixedwidth" src="images/b7e8d070-bb3c-4414-80fc-41e40c5dd6e1.png" style="max-width:76px;"/></div>
  </div>
  <div class="bee-col bee-col-2 bee-col-w3">
  <div class="bee-block bee-block-1 bee-divider">
  <div class="spacer" style="height:1px;"></div>
  </div>
  <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-autowidth" src="images/0c180f63-c4da-4b23-8fd4-44d89e6e4b34.png" style="max-width:167px;"/></div>
  <div class="bee-block bee-block-3 bee-divider">
  <div class="spacer" style="height:5px;"></div>
  </div>
  </div>
  <div class="bee-col bee-col-3 bee-col-w7">
  <div class="bee-block bee-block-1 bee-divider">
  <div class="spacer" style="height:0px;"></div>
  </div>
  <div class="bee-block bee-block-2 bee-image"><img alt="" class="bee-right bee-autowidth" src="images/VB_Logo_full.svg" style="max-width:216px;"/></div>
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
  <div class="bee-text-content" style="line-height: 120%; font-size: 12px; color: #1f0b0b; font-family: inherit;">
  <p style="font-size: 14px; line-height: 16px;"><strong style=""><span style="font-size: 46px; line-height: 55px;">Welcome to Grow10x!</span></strong></p>
  </div>
  </div>
  <div class="bee-block bee-block-3 bee-text">
  <div class="bee-text-content" style="font-size: 12px; line-height: 150%; color: #393d47; font-family: inherit;">
  <p style="font-size: 12px; line-height: 18px; text-align: right;"><span style="font-size: 14px; line-height: 21px;"><span style="color: #8a3b8f; line-height: 18px;"><strong style=""><span style="color: #7c7676; line-height: 18px;">                        </span></strong>       </span></span></p>
  </div>
  </div>
  <div class="bee-block bee-block-4 bee-button"><a class="bee-button-content" href="http://valuebound.grow10x.org/login" style="font-size: 16px; background-color: #5855bd; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; border-radius: 4px; border-right: 0px solid #8a3b8f; border-top: 0px solid #8a3b8f; color: #ffffff; direction: ltr; font-family: inherit; font-weight: 400; max-width: 100%; padding-bottom: 10px; padding-left: 50px; padding-right: 45px; padding-top: 10px; width: auto; display: inline-block;"><span style="word-break: break-word; font-size: 16px; line-height: 200%;"><strong style="font-size: 16px;">Get Started</strong></span></a></div>
  </div>
  <div class="bee-col bee-col-2 bee-col-w6">
  <div class="bee-block bee-block-1 bee-divider">
  <div class="spacer" style="height:30px;"></div>
  </div>
  <div class="bee-block bee-block-2 bee-image"><img alt="Alternate text" class="bee-center bee-autowidth" src="images/Image_1.png" style="max-width:330px;"/></div>
  <div class="bee-block bee-block-3 bee-divider">
  <div class="spacer" style="height:30px;"></div>
  </div>
  </div>
  </div>
  </div>
  <div class="bee-row bee-row-3">
  <div class="bee-row-content">
  <div class="bee-col bee-col-1 bee-col-w12">
  <div class="bee-block bee-block-1 bee-divider">
  <div class="spacer" style="height:35px;"></div>
  </div>
  </div>
  </div>
  </div>
  <div class="bee-row bee-row-4">
  <div class="bee-row-content">
  <div class="bee-col bee-col-1 bee-col-w12">
  <div class="bee-block bee-block-1 bee-divider">
  <div class="spacer" style="height:35px;"></div>
  </div>
  </div>
  </div>
  </div>
  <div class="bee-row bee-row-5">
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
  <p style="font-size: 14px; line-height: 25px; text-align: left;"><strong style="">HQ, Bangalore, India</strong><br style=""/>815, 2nd Floor, 27th Main<br style=""/>Sector 1, HSR Layout<br style=""/>Bangalore - 560102.</p>
  <p style="font-size: 14px; line-height: 25px; text-align: left;"> </p>
  <p style="font-size: 14px; line-height: 25px; text-align: left;">©2022 Valuebound. All Rights Reserved</p>
  </div>
  </div>
  <div class="bee-block bee-block-3 bee-social">
  <div class="content"><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.facebook.com/valuebound/"><img alt="Facebook" src="images/facebook2x.png" title="Facebook"/></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://twitter.com/valuebound"><img alt="Twitter" src="images/twitter2x.png" title="Twitter"/></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://www.instagram.com/valuebound"><img alt="Instagram" src="images/instagram2x.png" title="Instagram"/></a></span><span class="icon" style="padding:0 2.5px 0 2.5px;"><a href="https://in.linkedin.com/company/valuebound"><img alt="LinkedIn" src="images/linkedin2x.png" title="LinkedIn"/></a></span></div>
  </div>
  </div>
  </div>
  </div>
  <div class="bee-row bee-row-6">
  <div class="bee-row-content">
  <div class="bee-col bee-col-1 bee-col-w12">
  <div class="bee-block bee-block-1 bee-paragraph">
  <p>© 2022 Valueboun. All Rights Reserved.</p>
  </div>
  </div>
  </div>
  </div>
  <div class="bee-row bee-row-7">
  <div class="bee-row-content">
  <div class="bee-col bee-col-1 bee-col-w12">
  <div class="bee-block bee-block-1 bee-icons" id="beepro-locked-footer">
  <div class="bee-icon">
  <div class="bee-content">
  </div>
  </div>
  </div>
  </div>
  </div>
  </body>
  </html>`
};

export default getLandingPage;
