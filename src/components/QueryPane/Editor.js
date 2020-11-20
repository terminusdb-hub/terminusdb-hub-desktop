import React from "react";
require('codemirror/lib/codemirror.css');
require('codemirror/theme/mdn-like.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/python/python.js');
require('codemirror/addon/edit/matchbrackets.js');
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {EDITOR_READ_OPTIONS, EDITOR_WRITE_OPTIONS} from "./constants.querypane"

export const CodeViewer = ({text, language}) => {

    let cmoptions = EDITOR_READ_OPTIONS
    cmoptions.language = getCMLanguage(language)
    cmoptions.mode = {
        name: cmoptions.language,
        statementIndent: 2
    }

    if(language == "json"){
        cmoptions['json'] = true
        cmoptions['jsonld'] = true
        cmoptions.mode.jsonld = true
    } 

    return (<CodeMirror value={ text } options={ cmoptions } className="readOnly"/>)
}

export const CodeEditor = ({text, language, onChange, onBlur, onSubmit}) => {
    function getThemeForEditor(lang){
        return "mdn-like"
    }

    let cmoptions = EDITOR_WRITE_OPTIONS
    cmoptions.language = getCMLanguage(language)
    cmoptions.mode = {
        name: cmoptions.language,
        statementIndent: 2
    }

    if(language == "json"){
        cmoptions['json'] = true
        cmoptions['jsonld'] = true
        cmoptions.mode.jsonld = true
    } 

    if(onSubmit){
        cmoptions.extraKeys['Ctrl-Enter'] = onSubmit
    }

    return (
        <CodeMirror value={ text } options={ cmoptions }
            onChange={(editor, data, value) => {
                if(onChange) onChange(value);
            }}
            onBlur={(editor, data) => {
                if(onBlur) onBlur(editor.doc.getValue());
            }}
        />
    )

}


function getCMLanguage(language){
    if(language == "python") return language
    if(language == "json") return "javascript"
    return "javascript"
}
