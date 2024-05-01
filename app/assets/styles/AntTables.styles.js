import Table from '@iso/components/uielements/table';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  transition,
  boxShadow,
  borderRadius,
} from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';

const TableWrapper = styled(Table)`
  overflow: hidden;
  overflow-x: auto;
  background-color:${(props) =>
    props.themeName === 'dark' ? '#333232f7' : '#ffffff'} ;

  & .ant-table-tbody {
    overflow-x: auto;
    overflow-y: auto !important;

    // &::-webkit-scrollbar {
    // display: none !important;
    // }

    & .ant-table-row.ant-table-row-level-0 {
      &.cancelRow {
        background: #fff1f0;
      }
    }
  }

  & .descTd {
    padding-left: 50px;
    
    & > span {
      color: ${palette('secondary', 0)}
    }
    p.desc {
      white-space: normal;
      color: ${palette('secondary', 2)}
    }

    @media (max-width: 768px) {
      padding-left: 0px;
      width: 100% !important;
    }
  }

  & .ant-table-cell.services-cell {
    & .serviceMain {
      & span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      & span.subService {
        font-size: 12px;
      }
    }
  }

  & .ant-table-cell.avatar-cell {
    & .ant-badge {
      & .ant-scroll-number-custom-component {
        top: 4px;
        right: 3px;
        font-size: 16px;
      }
    }
  }

  .ant-table-thead > tr > th {
    color: ${(props) =>
    props.themeName === 'dark' ? '#fff' : palette('secondary', 0)};
    // font-size: 13px;
    font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '13px'};
    background-color: ${(props) =>
    props.themeName === 'dark' ? '#333232f7' : palette('color', 21)};
    border-bottom: 0;

    &.ant-table-column-sort {
      background: ${(props) =>
    props.themeName === 'dark' ? '#333232f7' : palette('secondary', 1)};
      margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 4px 0 0' : '0 0 0 4px'};
    }

    &:hover {
      color: ${palette('secondary', 0)};
    }
  }
  .ant-table-thead > tr > th:hover {
    background: ${(props) =>
    props.themeName === 'dark' ? '#fff' : '#544b4b0a'}
  }
  .table-row-dark {
    color: ${(props) =>
    props.themeName === 'dark' ? '#fff' : palette('secondary', 0)};
    // font-size: 13px;
   font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '13px'};
    background-color: ${(props) =>
    props.themeName === 'dark' ? '#323332' : palette('color', 21)};
    border-bottom: 0;
  
  }

  @media (width>768px){
  .ant-table-tbody > tr.ant-table-row:hover > td {
    color:black !important
    background-color: ${(props) =>
    props.themeName === 'dark' && '#121111'} !important
  } 
}
 
  .ant-table-tbody > tr > td a {
    color: ${(props) =>
    props.themeName === 'dark' ? '#fff' : palette('primary', 1)} !important;
    background-color:${(props) =>
    props.themeName === 'dark' ? '#333232f7' : '#ffffff'} ;
    
  }
  span.label {
    display: none;
  }
  .mobile-lbl-val {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) =>
    props.themeName === 'dark' ? '#fff' : palette('secondary', 0)};
    &.bookingDate {
      white-space: normal;

      & .ant-tag {
        cursor: pointer;
      }
    }
  }
  .isoInvoiceBtnView.notAvailableMain {
    display: flex;
    align-items: center;
  }
  
  .isoInvoiceBtnView.mobile-actionBtnWrapper {
    display: none !important;
  }
  
  .isoInvoiceBtnView.actionBtnWrapper {
    & > * {
      margin-right: 10px;
    }
  }

  @media (max-width: 768px) {

    // NEW CSS FOR TABLE
    & .ant-table-content {
      & > table {
        width: 100% !important;

        // AVATAR STYLE
        & .ant-table-cell.avatar-cell {
          width: 100% !important;
          text-align: left !important;
        }

        & .ant-table-cell {
          height: 77px;
        }

        // ACTION BTNS STYLE
        & .ant-table-cell.action-cell {
          position: absolute !important;
          right: 0px !important;
          top: 0px;
          min-width: unset;
          width: auto !important;
          padding-bottom: 0;
          border-bottom: 0px;
          background-color:${(props) =>
    props.themeName === 'dark' ? '#333232f7' : '#ffffff'} ;
        }

        .ant-table-tbody > tr.ant-table-row > td:hover {
          color:black !important
          background-color: ${(props) =>
    props.themeName === 'dark' ? '#121111' : '#f8f8f8'} !important
        } 

        // ACTION SWITCH STYLE
        .ant-table-cell.block-status-cell {
          button {
            margin-top: 5px;
          }
        }
    
        // STATUS TAG STYLE
        .ant-table-cell {
          .ant-tag {
            margin-top: 5px;
          }
        }

        // NAME & EMAIL CELL STYLE
        .ant-table-cell.email-cell, .ant-table-cell.fullname-cell {
          width: 100% !important;
        }

        td.ant-table-cell.ant-table-selection-column{
          display:none;
        }
      }
    }

    &.therapistPatients {
      .ant-table-tbody > tr > td:first-child, .ant-table-tbody > tr > td:nth-child(4) {
        min-width: 100%;
        width: 100%;
      }
    }

    &.invoiceListTable.serviceTable,
    &.invoiceListTable.fileManagerTable,
    &.invoiceListTable.invoiceTable {
      & table {
       & tbody.ant-table-tbody > tr > td:first-child {
          display: block !important;
          width: 100%;
          
        }
      }
    }
    &.invoiceListTable.allWordsTable {
      & table {
       & tbody.ant-table-tbody > tr > td:first-child {
          display: block !important;
          width: 90%;
        }
      }
    }

    & .ant-table-expanded-row {
      margin-bottom: 10px;
    }

    tr.ant-table-expanded-row {
      // & td:first-child {
      //   display: none;
      // }
      & td:nth-child(2) {
        padding: 15px !important;
        margin-top: -7px;
        margin-bottom: 10px;
      }
    }

    &.invoiceListTable.therapistTable,
    &.invoiceListTable.blogsTable,
    &.invoiceListTable.cmsTable,
    &.invoiceListTable.adminTable,
    &.invoiceListTable.implementationTable,
    &.invoiceListTable.conditionTable {
      & table {
       & .ant-table-tbody > tr > td:nth-child(2) {
          // display: block !important;
          // width: 100%;
        }
      }
    }

    &.invoiceListTable.emailTable,
    &.invoiceListTable.adminTable,
    &.invoiceListTable.implementationTable,
    &.invoiceListTable.conditionTable {
      & table {
       & tbody.ant-table-tbody > tr > td:first-child {
          display: block !important;
          background:${(props) =>
    props.themeName === 'dark' ? '#393838' : '#f3f6f9'} ;
        }
      }
    }
    &.invoiceListTable.emailTable,
    &.invoiceListTable.languageTable {
      & table {
       & .ant-table-tbody > tr > td:nth-child(2) {
          display: block !important;
          width: 100%;
        }
      }
    }

    &.appointmentTable {
      .ant-table-tbody > tr > td {
        padding: 10px !important;
        &.ant-table-column-has-sorters  {
          min-width: 100%;
          width: 100%;
        }

        &:not(:last-child) {
          min-height: 70px;
          white-space: normal;
        }
      }
    }
    &.appointmentTable.therapie{
      .ant-table-tbody > tr > td {
        &:nth-child(6)  {
          min-width: 100%;
          width: 100%;
          & .isoInvoiceBtnView {
            margin-top: 10px;
            justify-content: center;
          }
        }
        &:nth-child(5)  {
          & .isoInvoiceBtnView {
            margin-top: 10px;
          }
        }
      }
    }
    &.appointmentTable.patient {
      .ant-table-tbody > tr > td {
        &:nth-child(5)  {
          & .isoInvoiceBtnView {
            margin-top: 10px;
          }
        }
      }
    }

    .ant-table-tbody > tr > td {
        display: inline-block;
        width: 50%;
        min-width: 50%;
        vertical-align: bottom;
    }
    
    .ant-table-thead > tr, .ant-table-tbody > tr {
        display: block;
        width: 100%;
    }

    
    .ant-table-layout-fixed table {
        display: block;
    }
    
    thead.ant-table-thead {
        display: none;
    }
    
    tbody.ant-table-tbody, colgroup {
      display: block;
      width: 100%;
    }
    
    span.label {
      display: block
      padding: 0 10px 0 0;
      // font-size: 14px;
    font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '14px'};

        color: ${(props) =>
    props.themeName === 'dark' ? '#7C7C7A' : ''}

    }
    
    .mobile-lbl-val {
      display: block;
      white-space: nowrap;
      min-width: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '14px'};
    }
    .ant-table-tbody > tr > .ant-table-row-expand-icon-cell:first-child {
      padding: 24px 15px !important;
      display: block;
      width: 100%;
    }
    td.ant-table-selection-column.ant-table-selection-column-custom {
      display: none !important;
    }
    .isoInvoiceBtnView.mobile-actionBtnWrapper {
      display: flex !important;
      flex-direction: row;
      justify-content: flex-end;
    }
    tr.ant-table-row {
      position: relative;
      margin-bottom: 10px;
      border: 1px solid #e9e9e9;
      border-bottom: 0px;
      box-shadow: 1px 1px 3px #dfdfdf;
    }
    .isoInvoiceBtnView.actionBtnBottom  {
      display: block !important;
      position: absolute;
      bottom: 17px;
      right: 10px;
      background-color:${(props) =>
    props.themeName === 'dark' ? '#333232f7' : '#ffffff'} ;
    
    }
    .isoInvoiceBtnView.actionBtnBottomFile  {
      display: block !important;
      position: absolute;
      bottom: 7px;
      right: 10px;
    }

  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    // padding: 16px 15px;
    white-space: nowrap;
    text-align: ${(props) => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};

    p {
      margin-bottom: 0;
    }
  }
  .ant-table-tbody > tr > th, .ant-table-thead > tr > th {
    // font-size: 14px;
   font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '14px'};
  }
  .ant-table-tbody > tr > td {
    // font-size: 14px;
   font-size : ${(props) =>
    props.fontSize === 'small'
      ? '16px'
      : props.fontSize === 'big'
        ? '22px'
        : '14px'};
    color: ${palette('text', 1)};
    border-bottom: 1px solid ${palette('border', 0)};
    background-color:${(props) =>
    props.themeName === 'dark' ? '#333232f7' : '#ffffff'} ;

    a {
      color: ${palette('primary', 0)};
      ${transition()};

      &:hover {
        color: ${palette('primary', 4)};
      }
    }


    @media (max-width: 1440px) {
      padding-right: 10px;
    }
  
  }

  .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td,
  .ant-table-tbody > tr:hover > td {
    background-color: transparent;
  }

  .ant-table-bordered .ant-table-thead > tr > th {
    border-bottom: 1px solid ${palette('border', 0)};
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    border-right: 1px solid ${palette('border', 0)};
  }

  .ant-table-pagination {
    float: ${(props) => (props['data-rtl'] === 'rtl' ? 'left' : 'right')};
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    border: 1px solid ${palette('border', 0)};
  }

  .ant-pagination-disabled .ant-pagination-item-link {
    border: none;
    color: rgb(52,58,64);
  }
  .ant-pagination-item-link {
    border-color: transparent !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    &:hover {
      border-color: ${palette('primary', 0)} !important;
    
    }

  }

  .ant-pagination-disabled,
  .ant-pagination-prev.ant-pagination-disabled,
  .ant-pagination-next.ant-pagination-disabled {
    border: 0px solid ${palette('border', 0)};
    opacity:0.5

    a {
      border: 0;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    border:none;
    transform: ${(props) =>
    props['data-rtl'] === 'rtl' ? 'rotate(180deg)' : 'rotate(0)'};
  }

  .ant-pagination-prev,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    border:none;
    margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 8px' : '0 8px 0 0'};
  }

  .ant-pagination-item {
    margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 8px' : '0 8px 0 0'};
      border-color: transparent;
      border-radius: 50%;

    &:hover {
      border-color: ${palette('primary', 0)};
      ${transition()};
    }

    &:hover a {
      color: ${palette('primary', 0)};
    }
  }

  .ant-pagination-item-active {
    background-color: ${palette('primary', 0)};
    border-color: ${palette('primary', 0)};
    border-radius:50%;

    a {
      color: #ffffff;
    }

    &:hover a {
      color: #ffffff;
    }
  
    &:focus {
      border-color: ${palette('primary', 0)} !important;
      a {
        color: #ffffff !important;
      }
    }
  }

  .ant-table-expanded-row {
    background: ${palette('grayscale', 6)};

    p {
      color: ${palette('text', 3)};
    }
  }

  .ant-spin-nested-loading > div > .ant-spin {
    max-height: none;

    .ant-spin-dot i {
      color: ${palette('primary', 0)};
    }
  }

  .ant-table-header {
    background-color: transparent;
  }

  .ant-table-title {
    background: ${palette('secondary', 1)};
    color: ${palette('secondary', 2)};
    font-size: 13px;
    font-weight: 500;
    padding: 16px 30px;
    ${borderRadius()};
  }

  .ant-table-footer {
    background: ${palette('secondary', 1)};
    color: ${palette('secondary', 2)};
    font-size: 12px;
    font-weight: 400;
    padding: 16px 30px;
    ${borderRadius()};
  }

  .ant-table-content {
    overflow-x: auto !important;
  }

  .ant-table-column-sorter-up.on .anticon-caret-up,
  .ant-table-column-sorter-down.on .anticon-caret-up,
  .ant-table-column-sorter-up.on .anticon-caret-down,
  .ant-table-column-sorter-down.on .anticon-caret-down {
    color: ${palette('primary', 0)};
  }

  &.isoSearchableTable {
    .isoTableSearchBox {
      padding: 20px;
      display: flex;
      background: #ffffff;
      border: 1px solid ${palette('border', 0)};
      ${boxShadow('0 1px 6px rgba(0,0,0,0.2)')};

      input {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 3)};
        line-height: inherit;
        height: 36px;
        width: 100%;
        padding: 0 15px;
        margin: 0;
        border: 1px solid ${palette('secondary', 7)};
        outline: 0 !important;
        overflow: hidden;
        background-color: #ffffff;
        ${borderRadius('3px 0 0 3px')};
        ${transition()};
        ${boxShadow('none')};

        &:focus,
        &:hover {
          border-color: ${palette('secondary', 7)};
          ${boxShadow('none')};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }

      button {
        font-size: 12px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette('primary', 0)};
        border: 0;
        outline: 0;
        height: 36px;
        padding: 0 15px;
        margin-left: -1px;
        cursor: pointer;
        border-radius: ${(props) =>
    props['data-rtl'] === 'rtl' ? '3px 0 0 3px' : '0 3px 3px 0'};
        ${transition()};

        &:hover {
          background-color: ${(props) =>
    props.themeName === 'dark' ? '#333232f7' : palette('primary', 1)};
        }
      }
    }

    .ant-table-thead > tr > th {
      word-break: keep-all;

      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        i {
          margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0'};
          order: -1;
        }
      }
    }
  }

  &.isoGroupTable {
    .ant-table-thead > tr {
      th {
        border: 1px solid ${palette('border', 0)};
        border-left: 0;

        &[rowspan] {
          text-align: center;
        }

        &.isoImageCell {
          padding: 3px;
        }
      }

      &:first-child {
        th {
          &:first-child {
            border-left: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0' : '1px'}
              solid ${palette('border', 0)};
          }
        }
      }

      &:last-child {
        th {
          border-top: 0;
        }
      }
    }

    .ant-table-tbody {
      .ant-table-row {
        td {
          border-right: 1px solid ${palette('border', 0)};

          &:first-child {
            border-left: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0' : '1px'}
              solid ${palette('border', 0)};
          }

          &:last-child {
            border-left: ${(props) =>
    props['data-rtl'] === 'rtl' ? '1px' : '0'}
              solid ${palette('border', 0)};
          }

          &.isoImageCell {
            padding: 3px;
          }
        }
      }
    }
  }

  &.isoEditableTable {
    .isoEditData {
      .isoEditDataWrapper {
        display: flex;
        align-items: center;

        input {
          font-size: 12px;
          font-weight: 400;
          color: ${palette('text', 3)};
          line-height: inherit;
          padding: 7px 10px;
          margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0'};
          border: 1px solid ${palette('border', 0)};
          outline: 0 !important;
          overflow: hidden;
          background-color: #ffffff;
          ${borderRadius('3px')};
          ${boxShadow()};
          ${transition()};

          &:focus,
          &:hover {
            border-color: ${palette('border', 0)};
            ${boxShadow()};
          }

          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }

        .isoEditIcon {
          cursor: pointer;
        }
      }
      .isoDataWrapper {
        display: flex;
        align-items: center;

        .isoEditIcon {
          margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 auto 0 0' : '0 0 0 auto'};
          cursor: pointer;
          flex-shrink: 0;
        }
      }
    }

    @media (max-width: 320px) {
      .invoiceListTable.fileManagerTable {
        & table {
          & tbody.ant-table-tbody > tr > td:nth-last-child(2) {
            text-align: left !important;
          }
        }
      }
    }

  }
`;

const WDCustomizedTableWrapper = styled.div`
  .isoCustomizedTableControlBar {
    margin-bottom: 40px;

    .ant-form-item {
      margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 16px' : '0 16px 0 0'};
    }

    .ant-form-item-label {
      label {
        color: ${palette('secondary', 2)};

        &:after {
          margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 2px 0 8px' : '0 8px 0 2px'};
        }
      }
    }

    .ant-switch-checked {
      border-color: ${palette('primary', 0)};
      background-color: ${palette('primary', 0)};
    }
  }
`;

const CustomizedTableWrapper = WithDirection(WDCustomizedTableWrapper);

export { CustomizedTableWrapper };
export default WithDirection(TableWrapper);
