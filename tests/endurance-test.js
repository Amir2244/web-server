import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages: [
        {duration: '2m', target: 500},
        {duration: '4h', target: 500},
        {duration: '2m', target: 0},
    ],
};

export default function () {
    const complexInputs = [
        'TaskStatisticalAnalysis&1.5,2.7,3.14,4.9,5.5,6.2,7.8,8.3,9.1,10.0',
        'TaskStatisticalAnalysis&-5,-4,-3,-2,-1,0,1,2,3,4,5',
        'TaskStatisticalAnalysis&100,200,300,400,500',
        'TaskStatisticalAnalysis&0.1,0.2,0.3,0.4,0.5'
    ];

    const response = http.post('http://host.docker.internal:8000', complexInputs[Math.floor(Math.random() * complexInputs.length)], {
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'has statistical results': (r) => r && r.body && r.body.length > 0
    });

    sleep(2);
}