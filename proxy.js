

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', createProxyMiddleware({
    target: 'https://script.google.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/macros/s/AKfycbwLp7LSTd4X3QT6t0iuAgWdjdTnitM7IK3d_8AcCpFx7cCPnyjI20GWOMSb9BUES3r7/exec'
    },
    onProxyReq: (proxyReq, req, res) => {
        // 원본 URL의 쿼리 문자열을 유지
        const originalUrl = new URL(req.url, `http://${req.headers.host}`);
        proxyReq.path = '/macros/s/AKfycbwLp7LSTd4X3QT6t0iuAgWdjdTnitM7IK3d_8AcCpFx7cCPnyjI20GWOMSb9BUES3r7/exec' + originalUrl.search;
        
        console.log('Proxying request to:', proxyReq.path);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Received response:', proxyRes.statusCode);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error: ' + err.message);
    }
}));


app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});

