import React, {useEffect, useRef, useState} from "react";
import {ColorType, createChart} from "lightweight-charts";
import "./App.css"
function App() {
    const chartContainerRef = useRef()
    const [candlePrice, setCandlePrice] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current);

        chart.applyOptions({
            layout: {
                background: { type: ColorType.Solid, color: "#222"},
                textColor: '#DDD'
            },
            grid: {
                vertLines: {
                    color: '#222',
                },
                horzLines: {
                    color: '#222',
                },
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
            crosshair: {
                vertLine: {
                    labelBackgroundColor: "#9B7DFF",
                },
                horzLine: {
                    labelBackgroundColor: "#9B7DFF",
                },
            },
        });



        const newSeries = chart.addCandlestickSeries();

        newSeries.applyOptions({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        fetch(process.env.PUBLIC_URL + '/data.json')
            .then(response => response.json())
            .then(data => {
                newSeries.setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        chart.priceScale('right').applyOptions({
            borderColor:"#71649c"
        });
        chart.timeScale().applyOptions({
            borderColor:"#71649c",
            rightOffset: 15,
            barSpacing: 15,
            fixLeftEdge: true,
            timeVisible: true,
        });

        chart.subscribeCrosshairMove((param) =>{
            if (param.time) {
                const data = param.seriesData.get(newSeries)
                setCandlePrice(data);
            }
        })

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            chart.remove()
            window.removeEventListener("resize", handleResize)
        };

    }, []);
    return (
        <div ref={chartContainerRef} style={{ position: "relative" }}>
            <div
                style={{
                    position:"absolute",
                    top: 20,
                    left: 100,
                    zIndex: 20,
                    color: "white",
                }}
                >
                <div>Lightweight Chart</div>
                <div style={{display: 'flex'}}>
                    <div style={{marginRight: 10}}>OPEN: {candlePrice?.open}</div>
                    <div style={{marginRight: 10}}>HiGH: {candlePrice?.high}</div>
                    <div style={{marginRight: 10}}>LOW: {candlePrice?.low}</div>
                    <div style={{marginRight: 10}}>CLOSE: {candlePrice?.close}</div>
                </div>
            </div>
        </div>)
}

export default App;