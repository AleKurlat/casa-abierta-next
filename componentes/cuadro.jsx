import { useRef, useEffect, useState } from 'react';

export default function Cuadro(props) {
    const [frameHeight, setFrameHeight] = useState("100px");
    const reference = useRef(null);
    const { fuente } = props;
    useEffect(() => {
        setFrameHeight(reference.current.offsetWidth * 1.5)
    }, [])
    return (
        <iframe ref={reference} width="100%" height={frameHeight} frameBorder="0" allowFullScreen src={fuente}></iframe>
    )
}