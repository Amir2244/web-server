import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages: [
        {duration: '2m', target: 2000},
        {duration: '5m', target: 2000},
        {duration: '2m', target: 0},
    ],
};

export default function () {
    const testInputs = [
        'TaskStatisticalAnalysis&2,4,6,8,10',
        'TaskStatisticalAnalysis&1.5,2.5,3.5,4.5',
        'TaskStatisticalAnalysis&-2,-1,0,1,2',
        'TaskStatisticalAnalysis&100,200,300,400'
    ];

    const response = http.post('http://host.docker.internal:8000', testInputs[Math.floor(Math.random() * testInputs.length)], {
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'has statistical results': (r) => r && r.body && r.body.length > 0
    });

    sleep(0.5);
}
