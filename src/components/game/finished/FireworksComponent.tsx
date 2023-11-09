import Fireworks from "@fireworks-js/react";
import {CSSProperties} from "react";

type Props = {
    style: CSSProperties
}

export default function FireworksComponent({ style }: Props) {
    return (
        <Fireworks
            options={{
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 150,
                traceLength: 3,
                traceSpeed: 10,
                explosion: 8,
                intensity: 30,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                    min: 0,
                    max: 360
                },
                delay: {
                    min: 30,
                    max: 60
                },
                rocketsPoint: {
                    min: 50,
                    max: 50
                },
                lineWidth: {
                    explosion: {
                        min: 1,
                        max: 3
                    },
                    trace: {
                        min: 1,
                        max: 2
                    }
                },
                brightness: {
                    min: 50,
                    max: 80
                },
                decay: {
                    min: 0.015,
                    max: 0.5
                }
            }}

            style={style}
        />
    )
}