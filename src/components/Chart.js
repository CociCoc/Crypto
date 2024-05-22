import React, { useEffect, useRef, useState } from "react";
import { ColorType, createChart } from "lightweight-charts";
import "../App.css";
import * as lightweightCharts from "lightweight-charts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";

// Function for fetching pairs from the endpoint
async function fetchPairs() {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve from local storage

    const response = await fetch('http://localhost:8000/pairs/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching pairs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

function Chart() {
    const chartContainerRef = useRef();
    const [pairs, setPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState(null);
    const [candlePrice, setCandlePrice] = useState(null);
    const [data2, setData2] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const fetchedPairs = await fetchPairs();
                setPairs(fetchedPairs);
            } catch (error) {
                console.error('Error fetching pairs:', error);
                // Handle error appropriately, e.g., display an error message
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current);

        chart.applyOptions({
            layout: {
                background: { type: ColorType.Solid, color: "#222" },
                textColor: "#DDD",
            },
            grid: {
                vertLines: {
                    color: "#222",
                },
                horzLines: {
                    color: "#222",
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
                mode: lightweightCharts.CrosshairMode.Normal,
            },
        });

        const newSeries = chart.addCandlestickSeries();

        newSeries.applyOptions({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });



        // Update chart data based on selected pair
        if (selectedPair) {
            const fetchDataForPair = async () => {
                try {
                    // Fetch historical data
                    const historicalResponse = await fetch(`http://localhost:8000/data/${selectedPair}/?start=-30d`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });

                    if (!historicalResponse.ok) {
                        throw new Error(`Error fetching data for ${selectedPair}: ${historicalResponse.statusText}`);
                    }

                    const rawData = await historicalResponse.json();

                    // Parse time strings to Date objects
                    const data = rawData.map(item => ({
                        ...item,
                        time: new Date(item.time).getTime() / 1000
                    }));

                    // Sort data by time in ascending order
                    data.sort((a, b) => a.time - b.time);

                    setData2(data);
                    newSeries.setData(data);

                    // Fetch points data
                    const pointsResponse = await fetch(`http://localhost:8000/points/?pair=${selectedPair}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });

                    if (!pointsResponse.ok) {
                        throw new Error(`Error fetching points for ${selectedPair}: ${pointsResponse.statusText}`);
                    }

                    const pointsData = await pointsResponse.json();

                    if (!pointsData[selectedPair]) {
                        throw new Error(`No data available for selected pair: ${selectedPair}`);
                    }

                    const drawPoints = pointsData[selectedPair].draw_points;

                    if (!drawPoints) {
                        throw new Error(`No draw points available for selected pair: ${selectedPair}`);
                    }

                    // Extract and plot LevelsLinesOfResistanceLong
                    const levelsLines = drawPoints.LevelsLinesOfResistanceLong;
                    if (levelsLines && levelsLines.data) {
                        const levelsData = levelsLines.data.flatMap(points =>
                            points.map(([time, value]) => ({
                                time: new Date(time).getTime() / 1000, // Parse time string to milliseconds since epoch
                                value: Number(value)
                            }))
                        );

                        console.log("LevelsLinesOfResistanceLong data:", levelsData); // Log data before adding to chart

                        const levelsLineSeries = chart.addLineSeries({
                            lastValueVisible: false,
                            color: levelsLines.color
                        });

                        levelsLineSeries.setData(levelsData);
                    } else {
                        console.warn(`LevelsLinesOfResistanceLong data is not available for selected pair: ${selectedPair}`);
                    }

                    // Extract and plot CurveLinesOfResistanceLong
                    const curveLines = drawPoints.CurveLinesOfResistanceLong;
                    if (curveLines && curveLines.data) {
                        const curveData = curveLines.data.flatMap(points =>
                            points.map(([time, value]) => ({
                                time: new Date(time).getTime() / 1000, // Parse time string to milliseconds since epoch
                                value: Number(value)
                            }))
                        );

                        console.log("CurveLinesOfResistanceLong data:", curveData); // Log data before adding to chart

                        const curvedLineSeries = chart.addLineSeries({
                            lastValueVisible: false,
                            lineType: 2, // LineType.Curved
                            color: curveLines.color
                        });

                        curvedLineSeries.setData(curveData);
                    } else {
                        console.warn(`CurveLinesOfResistanceLong data is not available for selected pair: ${selectedPair}`);
                    }

                } catch (error) {
                    console.error(error);
                }
            };

            fetchDataForPair();
        }





        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            chart.remove();
            window.removeEventListener("resize", handleResize);
        };
    }, [selectedPair]); // Re-render chart and fetch data on selectedPair change

    const logParam = (param) => {
        //console.log(param);
    };

    const options = pairs.map((pair) => pair);

    const [value] = React.useState(selectedPair);

    const handleChange = (event, newValue) => {
        // Update your state using the newValue provided by the Autocomplete component
        setSelectedPair(newValue);
    };



    return (
        <div ref={chartContainerRef} style={{ position: "relative" }}>
            <div
                style={{
                    position: "relative",
                    top: 20,
                    left: 100,
                    color: "white",
                }}
            >
                <div>Lightweight Chart</div>
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>OPEN: {candlePrice?.open}</div>
                    <div style={{ marginRight: 10 }}>HiGH: {candlePrice?.high}</div>
                    <div style={{ marginRight: 10 }}>LOW: {candlePrice?.low}</div>
                    <div style={{ marginRight: 10 }}>CLOSE: {candlePrice?.close}</div>
                </div>
            </div>
            <div>
                <Box sx = {{display: 'flex',
                    justifyContent: 'center',}}>
                    <Box >
                        <Autocomplete
                            sx = {{
                                width: 300,
                                bgcolor: '#fff',
                            }}
                            disablePortal
                            value={value}
                            onChange={handleChange}
                            id="combo-box-demo"
                            options={options}
                            renderInput={(params) => <TextField {...params} label="Select Pair" />}
                        />
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default Chart;
