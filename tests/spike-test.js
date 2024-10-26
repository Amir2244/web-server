import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '1m', target: 3000},
        {duration: '10s', target: 0},
    ],
};

export default function () {
    const largeInput = Array.from({length: 50}, (_, i) => i + 1).join(',');
    const response = http.post('http://host.docker.internal:8000', `TaskStatisticalAnalysis&${largeInput}`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'has statistical results': (r) => r && r.body && r.body.length > 0
    });

    sleep(0.1);
}
