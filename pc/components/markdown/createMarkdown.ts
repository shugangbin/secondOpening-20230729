import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { codePlugin } from './codePlugin/codePlugin'

export function createMarkdown() {
    const md: any = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true, // Convert '\n' in paragraphs into <br>
        highlight: function (str: any, lang: any) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str, true).value
                } catch (__) {}
            }
            try {
                return hljs.highlightAuto(str).value
            } catch (__) {}
        }
    })
    md.use(codePlugin)
    return md
}
