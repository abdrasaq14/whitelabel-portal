export default function formatHeroText(text: string) { 
    const words = text.replace("<p>", "").replace("</p>", "")
    return words
}