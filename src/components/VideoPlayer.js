import { useEffect, useRef } from "react"
import styles from "./VideoPlayer.module.css"

export function VideoPlayer({
    src, 
    type="video/mp4", 
    onTimeUpdate,
    startTime,
    className, 
    style
}) {
    const videoRef = useRef(null)

    useEffect(() => {
        if(videoRef && videoRef.current) {
            videoRef.current.ontimeupdate = () => {
                const currentTime = videoRef.current.currentTime;
                onTimeUpdate && onTimeUpdate(currentTime)
            }

            if(startTime) {
                console.log("starting video at " + startTime)
                videoRef.current.currentTime = startTime
            }
        }
    }, [videoRef, onTimeUpdate, startTime]);

    return (
        <div className={className} style={style}>
            <video ref={videoRef} className={styles.video} controls>
                <source src={src} type={type}>
                </source>
            </video>
        </div>
    )
}