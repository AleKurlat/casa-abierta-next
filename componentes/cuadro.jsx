import { useRef, useEffect, useState } from 'react';

export default function Cuadro(props) {
    const [frameHeight, setFrameHeight] = useState("100px");
    const reference = useRef(null);
    const { fuente } = props;
    let url;
    if (fuente.includes("youtube")) {
        const videoID = fuente.split("=").pop()
        url = "https://www.youtube.com/embed/" + videoID
    }
    if (fuente.includes("instagram")) {
        url = fuente + "embed"
    }
    useEffect(() => {
        setFrameHeight(reference.current.offsetWidth * 1.2)
    }, [])
    return (
        <iframe ref={reference} width="100%" height={frameHeight} frameBorder="0" allowFullScreen src={url}></iframe>
    )
}