import API from 'Common/Utils/API';
import { EVERY_MINUTE } from 'Common/Utils/CronTime';
import { INGESTOR_URL } from '../Config';
import LocalCache from 'CommonServer/Infrastructure/LocalCache';
import URL from 'Common/Types/API/URL';
import logger from 'CommonServer/Utils/Logger';
import ProbeAPIRequest from '../Utils/ProbeAPIRequest';
import Register from '../Services/Register';
import BasicCron from 'CommonServer/Utils/BasicCron';

BasicCron({
    jobName: 'Basic:Alive',
    options: {
        schedule: EVERY_MINUTE,
        runOnStartup: false,
    },
    runFunction: async () => {
        logger.debug('Checking if probe is alive...');

        const probeId: string | undefined = LocalCache.getString(
            'PROBE',
            'PROBE_ID'
        );

        if (!probeId) {
            logger.warn(
                'Probe is not registered yet. Skipping alive check. Trying to register probe again...'
            );
            await Register.registerProbe();
            return;
        }

        logger.debug('Probe ID: ' + probeId.toString());

        await API.post(
            URL.fromString(INGESTOR_URL.toString()).addRoute('/alive'),
            ProbeAPIRequest.getDefaultRequestBody()
        );
    },
});
