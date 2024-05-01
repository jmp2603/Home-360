import styled from "styled-components";
import BoxComponent from "@iso/components/utility/box";
import { palette } from "styled-theme";
import WithDirection from "@iso/lib/helpers/rtl";

const isFirefox = typeof InstallTrigger !== "undefined";
const BottomViewWrapper = styled.div`
  position: ${isFirefox ? "" : "absolute"};
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 15px 20px;
  background: ${(props) => (props.themeName === "dark" ? "#393838" : "#fff")};
  text-align: right;
  display: flex;
  justify-content: flex-end;

  &.btmWrapTherapist {
    .therapistLangMain {
      display: flex;
      flex: 1;
    }
  }
  @media (max-width: 425px) {
    &.btmWrapTherapist {
      flex-wrap: wrap;
      .therapistLangMain {
        display: flex;
        flex: none;
        width: 100%;
        margin-bottom: 5px;
      }
      .ant-row.ant-form-item {
        margin-bottom: 0px;
        padding-bottom: 0px;
      }
    }
  }
`;

const BoxWrapper = styled(BoxComponent)`
  background: ${(props) =>
      props.themeName === "dark" ? "#333232f7" : "#ffffff"}
    .fileManagerBtn {
    margin-right: 10px;
    @media (max-width: 425px) {
      margin-right: 0px;
    }
  }

  & .settingsGrid {
    margin-bottom: 10px;
  }

  .isoInvoiceTableBtn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .isoInvoiceTableBtn.searchInputsWrapper {
    display: flex;
    justify-content: flex-end;
    // margin-bottom: 20px;
    @media (max-width: 768px) {
      justify-content: space-between !important;
      &.patientWrapper {
        width: 100%;
        justify-content: space-between;
      }
    }
  }
  .isoInvoiceTableBtn.searchInputsWrapper.newSearch {
    display: none;
    justify-content: flex-end;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between !important;
    }
  }
  .isoInvoiceTableBtn.searchInputsWrapper > .ant-btn-icon-only {
    display: none;
    @media (max-width: 768px) {
      display: flex;
    }
    @media (max-width: 320px) {
      padding: 0px 15px;
    }
  }
  .isoInvoiceTableBtn.hideResponsive {
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .appointmentFilterMain.invoiceFilter {
    margin-bottom: 10px;
    // justify-content: flex-start;

    & .filterWrapper {
      @media (min-width: 768px) {
        margin-left: 10px;
      }
    }
    & .isoInvoiceTableBtn.searchInputsWrapper {
      display: none;
    }
    @media (max-width: 1220px) {
      flex-direction: row;
    }
    @media (max-width: 768px) {
      & .filterDesktop {
        display: none;
      }
      & .isoInvoiceTableBtn.searchInputsWrapper {
        display: block;
      }
    }
  }
  .searchInputWrapper {
    display: none;
    @media (max-width: 768px) {
      display: inline-block;
      justify-content: space-between;
      width: 100%;
      & > div {
        padding-bottom: 15px;
      }
    }
  }
  .fileManagerTable {
    table {
      tbody {
        tr {
          cursor: pointer;
        }
      }
    }
  }
  .appointmentFilterMain {
    margin-bottom: 20px;
    align-items: center;
    & > div {
      display: flex;
      margin-bottom: 10px;
      & > div {
        margin-right: 10px;
        & .ant-select {
          min-width: 200px;
        }
      }
    }
    .filterBtnWrapper {
      & .radioWrapper {
        display: none;
      }
      @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        & .radioWrapper {
          width: 33%;
          margin-top: 5px;
          justify-content: flex-end;
          display: flex;
          margin-bottom: 0px !important;
        }
      }
    }
    .filterBtnWrapper.fileFilter {
      & .radioWrapper {
        display: none;
      }
      & > div {
        @media (max-width: 768px) {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          & .radioWrapper {
            width: auto;
            justify-content: flex-end;
            display: flex;
            margin-bottom: 0px !important;
          }
        }

        @media (max-width: 425px) {
          display: block;
          & > button {
            margin-right: 15px;
            padding: 0px 13px;
          }
          & .radioWrapper {
            margin-top: 15px;
            display: flex;
            // justify-content: center;
          }

          & .fileManagerBtn {
            margin-right: 5px;
            padding: 0px 10px;
          }
          & .mateAddInvoiceBtn {
            padding: 0px 10px;
          }
        }
      }
    }
    & .searchInput {
      width: 60%;
    }
    & .isoInvoiceTableBtn {
      @media only screen and (max-width: 580px) {
        margin-bottom: 10px;
        margin-top: 0px;
      }
    }

    @media only screen and (max-width: 1250px) {
      flex-direction: column-reverse;
      align-items: flex-start;
      &.patient {
        flex-direction: row;
      }
    }
    @media only screen and (max-width: 1024px) {
      & > div {
        & > div {
          & .ant-select {
            min-width: 150px;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      &.patient {
        flex-direction: column-reverse;
      }
    }

    @media only screen and (max-width: 650px) {
      & > div {
        flex-wrap: wrap;
        & > div {
          width: 100%;
          margin: 0px 0px 5px 0px;
          & .ant-select {
            min-width: 100%;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .appointmentFilterMain.allWordsFilter {
      & .searchInput {
        margin-bottom: 15px;
        width: auto;
        & > div {
          margin-left: 0px !important;
          margin-bottom: 10px;
        }
        & > span {
          margin-bottom: 12px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .appointmentFilterMain.appoinmentSearchFilter {
      & .filterWrapper {
        display: block;
        width: 100%;
        & > div {
          padding-bottom: 10px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .appointmentFilterMain.feedbackFilter {
      & .feedbackWrapper {
        width: 100%;
      }
    }
    .appointmentFilterMain.fileFilterMain {
      & .fileFilterInput {
        width: 100%;
      }
      &.patient {
        margin-bottom: 10px;
      }
    }
  }
  @media (max-width: 580px) {
    .ant-row-flex.ant-row-flex-space-between.appointmentFilterMain.feedbackFilter
      > .feedbackWrapper {
      width: 100%;
    }
  }
`;

const CardWrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;

  .isoInvoiceTable {
    table {
      tbody {
        tr {
          td {
            .isoInvoiceBtnView {
              display: flex;
              flex-direction: row;
              // justify-content: center;
              > a {
                margin: ${(props) =>
                  props["data-rtl"] === "rtl" ? "0 0 0 15px" : "0 15px 0 0"};
              }
              & > button {
                margin-right: 10px;
              }
              & > button.deleteCircleBtn {
                color: red;
              }
            }
            & a.MoreInfoValue.videoLink {
              margin-left: 10px;
              display: block;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              width: 110px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .invoiceListTable {
    .patientInfo {
      max-width: 70%;
      & .normalWhiteSpace {
        white-space: normal;
      }
      @media only screen and (max-width: 1600px) {
        max-width: 100%;
      }
      & .MoreInfoValue {
        margin-left: 10px;
        @media (max-width: 375px) {
          white-space: nowrap !important;
          width: 110px !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
      }
    }
    .protocolsInfo.patientInfo {
      & .MoreInfoValue {
        @media (max-width: 375px) {
          white-space: normal !important;
          width: auto !important;
          overflow: auto !important;
          text-overflow: initial !important;
        }
      }
    }
    .invoiceDltBtn {
      font-size: 18px;
      display: inline-block;

      & button,
      & button:hover {
        border: 0;
        color: ${palette("error", 0)};
      }
    }
  }

  .auditButton {
    @media (max-width: 375px) {
      font-size: 10px;
    }
  }

  /* CustomTabs.css */
  .ant-tabs-nav {
    border-bottom: none;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    border-bottom: 2px solid #556ee5;
  }

  .ant-tabs-ink-bar {
    display: none;
  }
`;

const FormWrapper = styled.div`
  .avatar-uploader {
    margin: 0px 0px 20px;
    cursor: pointer;
  }
  .ant-form-vertical .ant-form-item-label > label {
    color: ${(props) => (props.themeName === "dark" ? "#fff" : "#000")};
  }
  .ant-typography {
    color: ${(props) => (props.themeName === "dark" ? "#fff" : "#000")};
  }
  .phoneCodePicker > div:first-child {
    border: none;
    box-shadow: none !important;
  }
  .perCheckbox {
    margin-left: 10px;
    margin-top: 15px;
  }
  .userAvtarOrdered {
    order: 2;
    @media only screen and (max-width: 768px) {
      order: 1;
      & + div {
        order: 2;
      }
    }
  }
  .userSettingsTitle {
    color: ${(props) => (props.themeName === "dark" ? "#fff" : "#000")};
    margin-bottom: 30px;
  }

  .dynamicInputs {
    padding: 20px;
    margin: 5px 0 10px;
    border: 1px dashed #ddd;
    background: #f5f5f5;

    & > div {
      & > .ant-row.ant-form-item {
        margin-bottom: 0px;
      }
    }

    & .removeInputBtn {
      padding-left: 5px;
      font-size: 20px;
      color: ${palette("error", 0)};
      margin-top: 6px;
    }
  }

  .image-upload {
    width: 1280px;
    height: 780px;
    background: red;
    border: 1px solid black;
    object-fit: cover;
  }

  .downloadsamplefile {
    @media (max-width: 575px) {
      width: 95px;
      white-space: normal;
    }
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    color: ${(props) => props.themeName === "dark" && "#fff"};
  }
  .ant-collapse-content-box {
    background: ${(props) => props.themeName === "dark" && "#0B0B0B"};
  }
`;

const DrawerWrapper = styled.div`
  .ant-drawer-body {
    // padding-bottom: 140px;
  }
`;

const Box = WithDirection(BoxWrapper);
export { BottomViewWrapper, FormWrapper, CardWrapper, Box, DrawerWrapper };
