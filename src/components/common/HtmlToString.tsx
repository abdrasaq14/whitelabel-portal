import { htmlToText } from "html-to-text";
import parse from "html-react-parser";


export const HtmlToString = (str: any) => {
    const decoded = parse(str)
    const cleanString = htmlToText(decoded.toString(), {
        wordwrap: 130
    })
    return cleanString
};