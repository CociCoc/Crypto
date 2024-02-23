import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import * as LightweightCharts from "lightweight-charts";
import './App.css';

function TradingTerminal() {
    const [takeProfit, setTakeProfit] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [limitOrder, setLimitOrder] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        const chartElement = chartRef.current;
        if (chartElement) {
            const chart = LightweightCharts.createChart(chartElement, {
                width: chartElement.offsetWidth,
                height: chartElement.offsetHeight,
                layout: {
                    backgroundColor: '#565969',
                    textColor: '#fff',
                    background: {
                        color: '#565969',
                    },
                },
                grid: {
                    vertLines: {
                        color: '#565969',
                    },
                    horzLines: {
                        color: '#565969',
                    },
                },
                crosshair: {
                    mode: LightweightCharts.CrosshairMode.Normal,
                },
                priceScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
                timeScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
            });

            const candleSeries = chart.addCandlestickSeries({
                upColor: '#439a46',
                downColor: '#181818',
                borderDownColor: '#555556',
                borderUpColor: '#749d76',
                wickDownColor: '#5c5c5c',
                wickUpColor: '#688269',
            });

            fetch(process.env.PUBLIC_URL + '/data.json')
                .then(response => response.json())
                .then(data => {
                    candleSeries.setData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // Attach event listener to chart element
            chartElement.addEventListener('click', (event) => {
                const priceData = candleSeries.priceToCoordinate(event.y);
                const clickedPrice = candleSeries.coordinateToPrice(event.y);
                console.log(`Clicked price: ${clickedPrice}`);
                console.log(`Price data at click:`, priceData);
                // You can perform further operations with the clicked price here
                // For example, update your lastPrice variable
                // lastPrice = clickedPrice;
            });

            candleSeries.createPriceLine(priceLineOptions(limitPrice, 'blue', 'Limit'));
            candleSeries.createPriceLine(priceLineOptions(takeProfitPrice, 'green', 'Take Profit'));
            candleSeries.createPriceLine(priceLineOptions(stopLossPrice, 'red', 'Stop Loss'));
        }
    }, [takeProfit, stopLoss, limitOrder]); // Empty dependency array to ensure this effect runs only once after component mount

    function placeOrder() {
        // Implementation for placing order based on form inputs
        // This is a placeholder. Actual implementation will depend on backend APIs.
        const takeProfitPrice = document.getElementById('takeProfit').value;
        const stopLossPrice = document.getElementById('stopLoss').value;
        const limitOrderPrice = document.getElementById('limitOrder').value;

        // Logic to handle the order placement...
        console.log(`Order placed with Take Profit: ${takeProfitPrice}, Stop Loss: ${stopLossPrice}, Limit Order: ${limitOrderPrice}`);
    }

    // Drawing limit, take profit and stop loss lines
    const priceLineOptions = (value, color, title) => ({
        price: value,
        color: color,
        lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Dashed,
        axisLabelVisible: true,
        title: title,
    });

    // Example limit, take profit and stop loss values, adjust based on actual data or preferences
    const limitPrice = 150; // Adjust this value
    const takeProfitPrice = 160; // Adjust this value
    const stopLossPrice = 140; // Adjust this value

    return (
        <div className="container">
            <div className="chart-container" ref={chartRef} id="chart"></div>
            <div className="form-container">
                <form id="orderForm">
                    <select id="coinSelect">
                        <option value="BTC">BTC</option>
                    </select>
                    <input type="number" value={takeProfit} onChange={e => setTakeProfit(e.target.value)}
                           placeholder="Take Profit Price"/>
                    <input type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)}
                           placeholder="Stop Loss Price"/>
                    <input type="number" value={limitOrder} onChange={e => setLimitOrder(e.target.value)}
                           placeholder="Limit Order Price"/>
                    <button type="button" onClick={placeOrder}>Place Order</button>
                    <button type="button">Trading line</button>
                </form>
            </div>
        </div>
    );
}

export default TradingTerminal;
