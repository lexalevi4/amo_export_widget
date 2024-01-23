"use client"
// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";

// import { EditorState, ContentState } from 'draft-js';
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCallback, useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// const htmlToDraft = dynamic(
//     () => import('html-to-draftjs').then((mod) => mod.htmlToDraft),
//     { ssr: false }
// )
// import { debounce } from '@mui/material/utils';
import _ from 'lodash';
import { useObjectFormState } from "@/app/objects/create/store";
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)
// import debounce from "lodash.debounce";

function Description({ flat }) {

    // const [editor, setEditor] = useState(false)
    const [editorState, setEditorState] = useState(null)
    // useEffect(() => {
    //     setEditor(true)
    // })

    // useEffect(() => {
    //     console.log(editor)
    // }, [editor])

    console.log(flat);

    // const value = getter('description');
    const setter = useObjectFormState((state) => state.updateFlat);
    const value = useObjectFormState((state) => state.flat['description']);


    useEffect(() => {
        if (window) {
            let blocksFromHtml = htmlToDraft(value);
            let { contentBlocks, entityMap } = blocksFromHtml;
            let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, [window, flat])
    const handleDebounceFn = (state) => {
        setter('description', draftToHtml(convertToRaw(state.getCurrentContent())))
    };
    const debounceFn = useCallback(_.debounce(handleDebounceFn, 500), []);

    let htmlToDraft = null;

    if (window === undefined) {
        return <>
        </>
    }

    if (!window) {
        return (<>
        </>)
    }

    // if (editor) {



    // };

    if (typeof window === 'object') {
        htmlToDraft = require('html-to-draftjs').default;






        const onEditorStateChange = (editorState) => {
            setEditorState(editorState);
            debounceFn(editorState)
        }

        if (editorState) {
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

            </>)
        }


    }



    return (<>
    </>)





}
export default dynamic(() => Promise.resolve(Description), { ssr: false })
// export default Description;
