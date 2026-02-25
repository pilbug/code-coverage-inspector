import { LightningElement, api } from 'lwc';
import desert from './svgs/desert.html';
import fishingDeals from './svgs/fishingDeals.html';
import goingCamping from './svgs/goingCamping.html';
import goneFishing from './svgs/goneFishing.html';
import lakeMountain from './svgs/lakeMountain.html';
import maintenance from './svgs/maintenance.html';
import noAccess from './svgs/noAccess.html';
import noAccess2 from './svgs/noAccess2.html';
import noConnection from './svgs/noConnection.html';
import noContent from './svgs/noContent.html';
import noEvents from './svgs/noEvents.html';
import noPreview from './svgs/noPreview.html';
import noTask from './svgs/noTask.html';
import notAvailableInLightning from './svgs/notAvailableInLightning.html';
import openRoad from './svgs/openRoad.html';
import pageNotAvailable from './svgs/pageNotAvailable.html';
import preview from './svgs/preview.html';
import research from './svgs/research.html';
import setup from './svgs/setup.html';
import walkthroughNotAvailable from './svgs/walkthroughNotAvailable.html';

export default class SldsSvg extends LightningElement {
    @api illustration;

    render() {
        const template = this.illustration ? this.illustration.toLowerCase() : null;
        switch (template) {
            case 'desert': {
                return desert;
            }
            case 'goingcamping': {
                return goingCamping;
            }
            case 'gonefishing': {
                return goneFishing;
            }
            case 'lakemountain': {
                return lakeMountain;
            }
            case 'maintenance': {
                return maintenance;
            }
            case 'noaccess': {
                return noAccess;
            }
            case 'noaccess2': {
                return noAccess2;
            }
            case 'noconnection': {
                return noConnection;
            }
            case 'nocontent': {
                return noContent;
            }
            case 'noevents': {
                return noEvents;
            }
            case 'nopreview': {
                return noPreview;
            }
            case 'notask': {
                return noTask;
            }
            case 'notavailableinlightning': {
                return notAvailableInLightning;
            }
            case 'openroad': {
                return openRoad;
            }
            case 'pagenotavailable': {
                return pageNotAvailable;
            }
            case 'preview': {
                return preview;
            }
            case 'research': {
                return research;
            }
            case 'setup': {
                return setup;
            }
            case 'walkthroughnotavailable': {
                return walkthroughNotAvailable;
            }
            default: {
                return fishingDeals;
            }
        }
    }
}