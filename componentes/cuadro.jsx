export default function Cuadro(props) {
    const { fuente } = props;
    let url;
    let clase;
    if (fuente.includes("youtube")) {
        const videoID = fuente.split("=").pop()
        clase = "frameYoutube"
        url = "https://www.youtube.com/embed/" + videoID
    }
    if (fuente.includes("instagram")) {
        url = fuente + "embed"
        clase = "frameInstagram"
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe className={clase + " embedFrame"} frameBorder="0" allowFullScreen src={url}></iframe>
        </div>
    )
}