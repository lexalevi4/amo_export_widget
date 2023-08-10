"use client"
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, ContentState } from 'draft-js';
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCallback, useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import { debounce } from '@mui/material/utils';
import _ from 'lodash';
// import debounce from "lodash.debounce";

function Description({ setter, getter }) {

    const [editorState, setEditorState] = useState(null)
    const value = getter('description');


    const handleDebounceFn = (state) => {
        setter('description', convertToRaw(state.getCurrentContent()))
    };


    const debounceFn = useCallback(_.debounce(handleDebounceFn, 500), []);


    useEffect(() => {
        let blocksFromHtml = htmlToDraft(value);
        let { contentBlocks, entityMap } = blocksFromHtml;
        let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditorState(EditorState.createWithContent(contentState))
    }, [])



    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        debounceFn(editorState)
    }
    return (<>

        <Editor

            toolbar={{
                options: ['inline', 'list', 'emoji',],
                inline: { inDropdown: false },
                list: { inDropdown: false },
            }}
            editorStyle={{
                border: 'rgba(0, 0, 0, 0.3) 1px solid',
                minHeight: 350,
            }}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
        />

    </>);
}

export default Description;
