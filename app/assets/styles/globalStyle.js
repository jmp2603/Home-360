import { createGlobalStyle } from 'styled-components';
import { palette, font } from 'styled-theme';
// import 'antd/dist/antd.css';
import 'react-day-picker/lib/style.css';

const GlobalStyles = createGlobalStyle`
  /* Poppins-300 - Light */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/Poppins/poppins-light-webfont.eot'); /* IE9 Compat Modes */
    src: local('Poppins Light'), local('Poppins-Light'),
        url('/fonts/Poppins/poppins-light-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/Poppins/poppins-light-webfont.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/Poppins/poppins-light-webfont.woff') format('woff'), /* Modern Browsers */
        url('/fonts/Poppins/poppins-light-webfont.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/Poppins/poppins-light-webfont.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  /* Poppins-regular-400 */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Poppins/poppins-regular-webfont.eot'); /* IE9 Compat Modes */
    src: local('Poppins'), local('Poppins-Regular'),
        url('/fonts/Poppins/poppins-regular-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         /* url('/fonts/Poppins/poppins-regular-webfont.woff2') format('woff2'), Super Modern Browsers */
        url('/fonts/Poppins/poppins-regular-webfont.woff') format('woff'), /*Modern Browsers*/
        url('/fonts/Poppins/poppins-regular-webfont.ttf') format('truetype'),/* Safari, Android, iOS*/
        url('/fonts/Poppins/poppins-regular-webfont.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  /* Poppins-medium - 500 */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/Poppins/poppins-medium-webfont.eot'); /* IE9 Compat Modes */
    src: local('Poppins'), local('Poppins-Regular'),
        url('/fonts/Poppins/poppins-medium-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/Poppins/poppins-medium-webfont.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/Poppins/poppins-medium-webfont.woff') format('woff'), /* Modern Browsers */
        url('/fonts/Poppins/poppins-medium-webfont.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/Poppins/poppins-medium-webfont.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  /* Poppins-600 - SemiBold */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/Poppins/poppins-semibold-webfont.eot'); /* IE9 Compat Modes */
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
        url('/fonts/Poppins/poppins-semibold-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/Poppins/poppins-semibold-webfont.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/Poppins/poppins-semibold-webfont.woff') format('woff'), /* Modern Browsers */
        url('/fonts/Poppins/poppins-semibold-webfont.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/Poppins/poppins-semibold-webfont.svg#Poppins') format('svg'); /* Legacy iOS */
  }

  /* Poppins-700 - Bold */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/Poppins/poppins-bold-webfont.eot'); /* IE9 Compat Modes */
    src: local('Poppins Bold'), local('Poppins-Bold'),
        url('/fonts/Poppins/poppins-bold-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/Poppins/poppins-bold-webfont.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/Poppins/poppins-bold-webfont.woff') format('woff'), /* Modern Browsers */
        url('/fonts/Poppins/poppins-bold-webfont.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/Poppins/poppins-bold-webfont.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Poppins', sans-serif;

  }
  .ant-typography {
    font-family: 'Poppins', sans-serif;
  }
  .for-link-view a span.anticon.anticon-link, .for-link-view a span.anticon.anticon-eye, .for-link-view a span.anticon.anticon-pound, .for-link-view a span.anticon.anticon-key{
    margin-top:8px
  }
  .isoInvoiceTable table tbody tr td .isoInvoiceBtnView.m-5 > a,
  .isoInvoiceTable table tbody tr td .isoInvoiceBtnView.m-5 > button{
    margin: 0 2px 0 0 !important;
  }
  /* roboto-900 - latin */
  /* @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    src: url('/fonts/roboto/roboto-v20-latin-900.eot'); /* IE9 Compat Modes */
    /* src: local('Roboto Black'), local('Roboto-Black'), */
        /* url('/fonts/roboto/roboto-v20-latin-900.eot?#iefix') format('embedded-opentype'), IE6-IE8 */
        /* url('/fonts/roboto/roboto-v20-latin-900.woff2') format('woff2'), Super Modern Browsers */
        /* url('/fonts/roboto/roboto-v20-latin-900.woff') format('woff'), Modern Browsers/ */
        /* url('/fonts/roboto/roboto-v20-latin-900.ttf') format('truetype'), Safari, Android, iOS */
        /* url('/fonts/roboto/roboto-v20-latin-900.svg#Roboto') format('svg'); Legacy iOS */
  }*/
  
  .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft{
    z-index:999;
  }
  * {
    outline: 0 !important;
  }
  .break-word{
    word-break: break-all
  }
  span.anticon.anticon-camera{
    margin:16px !important
  }
  .label-font{
    font-size:16px;
    font-weight:700
  }
  .viewChatLink {
    fontSize: 14px;
    color: ${palette('primary', 0)} !important;
  }

  .linkSecondary {
    color: ${palette('text', 3)};
  }

  .smallIconImg { 
    width: 18px;
    height: 18px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }

  .has-success.has-feedback {
    .ant-select {
      .ant-select-selection {
        .ant-select-selection__rendered {
          .ant-select-selection__placeholder {
            display: none !important;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for project category menu [ScrumBoard]
  /*-----------------------------------------------*/
  .project-category {
    .ant-select-dropdown-menu {
      .ant-select-dropdown-menu-item {
        padding: 8px 12px;
        color: #000000;
        font-family: 'Poppins';
        font-weight: 400;
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for project menu [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-dropdown {
    &.project-menu {
      width: 280px;
      top: 133px !important;
      
      .ant-dropdown-menu {
        padding: 0;
        overflow: hidden;

        .ant-dropdown-menu-item {
          min-height: 54px;
          line-height: auto;
          display: flex;
          align-items: center;
          padding: 10px 20px;

          &:first-child {
            padding: 0;
            border-bottom: 1px solid #f4f6fd;

            &:hover,
            &:focus {
              background-color: #ffffff;
            }
          }

          &:hover,
          &:focus {
            background-color: #F3F5FD;
          }

          &:last-child {
            background-color: #E6EAF8;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for popover [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-popover {
    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      .ant-checkbox-group-item {
        margin: 5px 0;
        span {
          font-size: 14px;
          color: #788195;
          text-transform: capitalize;
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for modal [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-modal-wrap {
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .render-form-wrapper {
            padding: 10px;
            h2 {
              margin: 0;
            }
            form {
              padding: 15px 0 3px;
              .field-container {
                margin-bottom: 26px;
              }
            }
          }
        }
      }
    }
  }

/*-----------------------------------------------*/ 
// style for React Multiple Date Selector
/*-----------------------------------------------*/
.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
  background-color: unset;

  & div.day {
    background-color: #f0f0f0;
    opacity: 0.8;
  }
}

.DayPicker {
  line-height: 1.2;
  .DayPicker-WeekdaysRow {
    border-bottom: 1px solid #f0f0f0;
  }

  & .DayPicker-Day {
    border-radius: 2px;
    padding: 0.4em;
    position: relative;

    & .day {
      padding: 0.4em;
      border-radius: 50%;

      &.choosed {
        font-weight: bold;
  
        & span.dot {
          position: absolute;
          padding: 2.5px;
          border-radius: 50%;
          background: ${palette('primary', 0)};
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

  // & .DayPicker-Day--today {
  //   color: ${palette('primary', 0)};
  // }

  & .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: unset;
    & div.day {
      background-color: ${palette('primary', 0)};
      opacity: 0.8;
    }
  }
  
  & .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: unset;

    & .day {
      color: #eee;
      background-color: ${palette('primary', 0)};
    }
  }
}



/*-----------------------------------------------*/ 
  // Checkbox Style
/*-----------------------------------------------*/

.inlineLabel {
  & > span {
    display: inline-block;
  }
}



/*-----------------------------------------------*/ 
  // style form previous GlobalStyles
  /*-----------------------------------------------*/

.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
  background: #f8f8f8 !important;
  @media only screen and (max-width: 768px) {
    background: transparent !important;
  }
}

font-family: ${font('primary', 0)};

h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
li,
input,
textarea,
span,
div,
img,
strong,
footer,
svg {
  &::selection {
    background: ${palette('primary', 0)};
    color: #fff;
  }
}


.ant-row{
  width: 100%;
}

.ant-row > div {
  padding: 0;
}

/* .isoLeftRightComponent {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  &.remForgotPssd {
    margin-top: 10px !important;
    justify-content: flex-end;
  }
} */

.isoRightComponent {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}

.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/********** Add Your Global CSS Here **********/

body {
  -webkit-overflow-scrolling: touch;
}

html h1,
html h2,
html h3,
html h4,
html h5,
html h6,
html a,
html p,
html li,
input,
textarea,
span,
div,
html,
body,
html a {
  margin-bottom: 0;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}

.scrollbar-track-y,
.scrollbar-thumb-y {
  width: 5px !important;
}

.scrollbar-track-x,
.scrollbar-thumb-x {
  height: 5px !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
}

.scrollbar-track {
  background: rgba(222, 222, 222, 0.15) !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-bottomLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-bottomRight
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-topLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-topRight
  > .ant-popover-content
  > .ant-popover-arrow:after {
  left: 0;
  margin-left: -4px;
}

/* Instagram Modal */

.ant-modal-wrap.instagram-modal .ant-modal {
  max-width: 935px;
  width: 100% !important;
}

@media only screen and (max-width: 991px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 767px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    max-width: 580px;
  }
}

.ant-modal-wrap.instagram-modal .ant-modal-content {
  border-radius: 0;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close {
  position: fixed;
  color: #fff;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close i {
  font-size: 24px;
}

.ant-modal-wrap.instagram-modal .ant-modal-content .ant-modal-body {
  padding: 0;
}

/********** Add Your Global RTL CSS Here **********/

/* Popover */

html[dir='rtl'] .ant-popover {
  text-align: right;
}

/* Ecommerce Card */

html[dir='rtl'] .isoCardInfoForm .ant-input {
  text-align: right;
}

/* Modal */
.ant-modal-content{
border-radius:10px !important;
overflow:hidden;
}
.ant-modal-header
{
  background:#E5E9FB !important;
}
.ant-modal-footer
{
  text-align: center !important; 
}
html[dir='rtl'] .has-success.has-feedback:after,
html[dir='rtl'] .has-warning.has-feedback:after,
html[dir='rtl'] .has-error.has-feedback:after,
html[dir='rtl'] .is-validating.has-feedback:after {
  left: 0;
  right: auto;
}

html[dir='rtl'] .ant-modal-close {
  right: inherit;
  left: 0;
}

html[dir='rtl'] .ant-modal-footer {
  text-align: left;
}

html[dir='rtl'] .ant-modal-footer button + button {
  margin-left: 0;
  margin-right: 8px;
}

html[dir='rtl'] .ant-confirm-body .ant-confirm-content {
  margin-right: 42px;
}

html[dir='rtl'] .ant-btn > .anticon + span,
html[dir='rtl'] .ant-btn > span + .anticon {
  margin-right: 0.5em;
}

html[dir='rtl'] .ant-btn-loading span {
  margin-left: 0;
  margin-right: 0.5em;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
  padding-left: 25px;
  padding-right: 29px;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
  .anticon {
  margin-right: -14px;
  margin-left: 0;
}

/* Confirm */

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-body > .anticon {
  margin-left: 16px;
  margin-right: 0;
  float: right;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns {
  float: left;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns button + button {
  margin-right: 10px;
  margin-left: 0;
}

/* Message */

html[dir='rtl'] .ant-message .anticon {
  margin-left: 8px;
  margin-right: 0;
}

/* Pop Confirm */

html[dir='rtl'] .ant-popover-message-title {
  padding-right: 20px;
  padding-left: 0;
}

html[dir='rtl'] .ant-popover-buttons {
  text-align: left;
}

/* Notification */

html[dir='rtl']
  .ant-notification-notice-closable
  .ant-notification-notice-message {
  padding-left: 24px;
  padding-right: 0;
}

html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-message,
html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-description {
  margin-right: 48px;
}

html[dir='rtl'] .ant-notification-notice-close {
  right: auto;
  left: 16px;
}

html[dir='rtl'] .ant-notification-notice-with-icon {
  left: 0;
}

/* Dropzone */

html[dir='rtl'] .dz-hidden-input {
  display: none;
}

/* Custom global styles */

/* GENERAL */
.mt5 {
  margin-top: 5px;
}
.mt10 {
  margin-top: 10px;
}
.mt15 {
  margin-top: 15px;
}
.mt25 {
  margin-top: 25px;
}
.ml5 {
  margin-left: 5px;
}

.mr5 {
  margin-right: 5px;
}
.rowSpaceBetween { 
  display: flex;
  justify-content: space-between;
}

.avatar-contain {
  .ant-avatar > img {
    object-fit: contain;
  }
}

td.ant-table-cell.actionCell {
  padding-left: 10px;
}

.filterMain {

  & > div {
    margin-bottom: 10px;
  }

  .filterWrapper {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    & > div {
      margin-right: 10px;
      margin-bottom: 10px;

      & .ant-select {
        min-width: 220px;
        width: 100%;
      }
    }
  }

  .btnsMain {
    & button {
      margin-left: 5px;
    }
  }

  @media (max-width: 1220px) {
    flex-direction: column-reverse !important;

    .filterWrapper {
      margin-top: 15px;

      & > div {
        margin-bottom: 10px;
      }
    }

    .ant-btn-icon-only {
      padding: 0px !important;
      min-width: 45px;
    }
  
    .btnsMain { 
      width: 100%;
      flex-direction: row-reverse;

    }
  }

  @media (max-width: 768px) {
    .filterWrapper {
      flex-direction: column;
      flex: unset;
      & > div {
        margin-right: 0px;
      }
    }
  }
}


/* INPUT */

// .ant-input:focus, .ant-input:hover, .ant-input-number:hover , .ant-input-number:focus, .ant-input-number-focused {
//   border-color: ${palette('primary', 0)} !important;
//   box-shadow: 0 0 0 2px ${palette('primary', 14)} !important;
// }

.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
  border-color:  ${palette('primary', 0)} !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}

/* FORM ITEM */
.ant-form {
  & .ant-row.ant-form-item {
    margin-bottom: 10px;
  }
  & .ant-row.form-item-country {
    margin-bottom: 0px;
    & .ant-form-item-control-input {
      min-height: unset;
    }
  }
}


/* DRAWER  */
.ant-drawer-content-wrapper {
  max-width: 100%

  & .ant-drawer-body {
    // padding-bottom: 80px;
    // @media (max-width: 768px) {
    //   padding-bottom: 140px !important;
    // }

    & .bottomBtnWrapper {
      z-index: 999;
      & > div {
        margin-bottom: 0px;
      }
      // @media (max-width: 768px) {
      //   padding-bottom: 67px !important;
      // }
    }
  }
}

.ant-menu.langMenu {
  border-right: 0px;
  & .ant-menu-item {
    // height: 30px;
    // padding: 0;
    min-width: 80px;
  }
}

/* POPOVER CSS */
.ant-popover-placement-bottomLeft {
  & .ant-popover-arrow {
    @media (max-width: 425px) {
      // display: none;
    }
  }
}

@media (max-width: 425px) {
  td.ant-descriptions-item-content{
    word-break: break-all
  }
}

`;

export default GlobalStyles;
