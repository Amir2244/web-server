import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages: [
        {duration: '30s', target: 1000},
        {duration: '1m', target: 500},
        {duration: '30s', target: 0},
    ],
};

export default function () {
    // change the task and the input from here and for other tests also
    const response = http.post('http://host.docker.internal:8000', 'TaskStatisticalAnalysis&2,4,6,8,10', {
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'has statistical results': (r) => r && r.body && r.body.length > 0
    });

    sleep(1);
}