"use client"
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, ContentState } from 'draft-js';
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { debounce } from '@mui/material/utils';


function Description({ flat }) {
    // const convertedState = convertFromRaw(JSON.parse(htmlToDraft(flat.description)))
    // const editorValue = EditorState.createWithContent(convertFromRaw(JSON.parse(htmlToDraft(flat.description))).getCurrentContent());

    // const [description,setDescription] = useState()
    const [editorState, setEditorState] = useState(null)
    // const editorState  = EditorState.createEmpty()



    useEffect(() => {
        // console.log(flat.description);
        let blocksFromHtml = htmlToDraft(flat.description);
        let { contentBlocks, entityMap } = blocksFromHtml;
        let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        // console.log(contentState);
        setEditorState(EditorState.createWithContent(contentState))
        // const editorState = EditorState.createWithContent(contentState);
    }, [])



    useEffect(() => {


        // if (editorState === null){
        //     return true;
        // }
        if (editorState !== null) {
            // debounce((request, callback) => {
            // let content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

            // let draft = htmlToDraft(content);
            // draft
            // console.log(htmlToDraft(content));

            // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            // }, 400)
            flat.description = convertToRaw(editorState.getCurrentContent());
            // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            // setEditorState(editorState.)
        }

    }, [editorState])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    return (<>

        <Editor

            toolbar={{
                options: ['inline',  'list', 'emoji',],
                inline: { inDropdown: false },
                list: { inDropdown: false },
                // textAlign: { inDropdown: true },
                // link: { inDropdown: true },
                // history: { inDropdown: true },
                // emoji: { inDropdown: false },
            }}

            editorStyle={{
                border: 'rgba(0, 0, 0, 0.3) 1px solid',
                minHeight: 350,
                // borderRadius: 4,
                // borderColor: 'rgba(0, 0, 0, 0.23)'
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
