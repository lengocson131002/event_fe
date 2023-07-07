import ReactQuill from 'react-quill'
import styled from 'styled-components'

export const CustomReactQuillComment = styled(ReactQuill)`
  max-width: 100%;

  & .ql-toolbar.ql-snow {
  }

  & .ql-container.ql-snow {
    height: 200px;
    border: 1px solid #dfdfdf !important;

    &:focus-within {
      border-color: #6ba7fa !important;
      box-shadow: 0 0 0 2px rgb(64 129 236 / 20%);
      border-right-width: 1px;
      outline: 0;
    }

    & > .ql-editor.ql-blank::before {
      font-size: 14px !important;
      font-style: normal !important;
    }
    & > .ql-editor {
      overflow-wrap: anywhere;
      padding-right: 60px;
    }
  }

  & p {
    font-size: 14px;
  }

  &:focus {
    border-color: #6ba7fa;
    box-shadow: 0 0 0 2px rgb(64 129 236 / 20%);
    border-right-width: 1px;
    outline: 0;
  }
`
