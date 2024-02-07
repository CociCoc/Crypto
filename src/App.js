import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import * as LightweightCharts from "lightweight-charts";

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
                    backgroundColor: '#ffffff',
                    textColor: '#333',
                },
                grid: {
                    vertLines: {
                        color: 'rgba(197, 203, 206, 0.7)',
                    },
                    horzLines: {
                        color: 'rgba(197, 203, 206, 0.7)',
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
                upColor: '#4bffb5',
                downColor: '#ff4976',
                borderDownColor: '#ff4976',
                borderUpColor: '#4bffb5',
                wickDownColor: '#83888D',
                wickUpColor: '#83888D',
            });

            const data = [
                // Replace these sample data points with actual data loaded dynamically
                {time: '2023-01-01', open: 16541.77, high: 16545.70, low: 16508.39, close: 16529.67},
                {time: '2023-01-02', open: 16529.59, high: 16556.80, low: 16525.78, close: 16551.47},
                {time: '2023-01-03', open: 16551.47, high: 16559.77, low: 16538.14, close: 16548.19},
                {time: '2023-01-04', open: 16548.19, high: 16548.19, low: 16518.21, close: 16533.04},
                {time: '2023-01-05', open: 16533.04, high: 16535.97, low: 16511.92, close: 16521.85},
                // Continue with the rest of your data...
            ];
            candleSeries.setData(data);

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
        <div>
            <div className="form-container">
                <form id="orderForm">
                    <select id="coinSelect">
                        <option value="BTC">BTC</option>
                        {/* Add other coins as needed */}
                    </select>
                    <input type="number" value={takeProfit} onChange={e => setTakeProfit(e.target.value)} placeholder="Take Profit Price" />
                    <input type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="Stop Loss Price" />
                    <input type="number" value={limitOrder} onChange={e => setLimitOrder(e.target.value)} placeholder="Limit Order Price" />
                    <button type="button" onClick={placeOrder}>Place Order</button>
                </form>
            </div>
            <div ref={chartRef} id="chart" style={{width: '100%', height: '600px'}}></div>
        </div>
    );
}

export default TradingTerminal;
