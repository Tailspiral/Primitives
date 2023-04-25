import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import React, { useEffect, useState } from "react";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//@ts-ignore
import { useComponentState } from "host/hooks";

type RichTextProps = {
  propKey: string;
  label: string;
  defaultValue?: string;
};

let timeout: null | ReturnType<typeof setTimeout> = null;

export const RichText = ({
  propKey,
  label = "Rich Text",
  defaultValue = `<p>Default value</p>`,
}: RichTextProps) => {
  const empty = EditorState.createEmpty();

  const [content, setContent] = useComponentState(propKey, defaultValue);

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [content]);

  const debouncedUpdate = (editorState: EditorState) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      const rawContentState = convertToRaw(editorState.getCurrentContent());

      const markup = draftToHtml(rawContentState);
      setContent(markup);
    }, 600);
  };

  const onContentStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    debouncedUpdate(editorState);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold font-inter">{label}</label>
      <Editor
        wrapperClassName="demo-wrapper flex flex-col"
        editorClassName="demo-editor"
        toolbarClassName="demo-toolbar"
        editorState={editorState}
        onEditorStateChange={onContentStateChange}
      />
    </div>
  );
};
