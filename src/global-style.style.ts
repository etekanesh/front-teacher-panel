import { css } from "@emotion/react";

export const GlobalStyle = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    direction: rtl;
    font-family: yekanBakh, Arial, sans-serif;
  }

  .MuiDrawer-paper {
    right: 0;
    border-right: unset !important;
    left: unset !important;
    z-index: 10000 !important;
  }
  .MuiAppBar-positionFixed {
    margin: 0 !important;
    right: unset !important;
    left: 0 !important;
    padding-right: 64px;
  }
  .MuiIconButton-root {
    :hover {
      background-color: white !important;
    }
  }
  .MuiList-root {
    display: flex;
    flex-direction: column;
    gap: 16px !important;
    border-bottom: 1px solid;
    padding-bottom: 48px !important;
    border-color: #edf0ef;
  }
  .MuiCollapse-wrapperInner {
    .MuiList-root {
      display: flex;
      flex-direction: column;
      gap: 0 !important;
      border-bottom: unset !important;
      padding-bottom: unset !important;
      border-color: unset;
      border-right: 1px solid;
      border-color: #edf0ef;
      margin-right: 44px;
      border-radius: 15px;
      .MuiButtonBase-root {
        text-align: right;
        padding: 0;
        padding-right: 12px;
      }
    }
  }
`;
