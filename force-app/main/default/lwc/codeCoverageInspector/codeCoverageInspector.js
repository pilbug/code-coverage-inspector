import { LightningElement } from 'lwc';
import getData from '@salesforce/apex/CodeCoverageInspectorController.getData2';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class CodeCoverageInspector extends LightningElement {
    data = [];
    columns = COLUMNS;
    selectedRow = {};
    showDetails = false;
    updateDetailsQueued = false;
    sortedBy;
    sortedDirection;

    get detailsCardTitle() {
        return this.selectedRow?.className + ' Details';
    }
    
    get selectedRowCoveredLines() {
        if(this.selectedRow?.coveredLines.length > 0) {
            return this.selectedRow.coveredLines.join(', ');
        }
        return 'None ';
    }

    get selectedRowUncoveredLines() {
        if(this.selectedRow?.uncoveredLines.length > 0) {
            return this.selectedRow.uncoveredLines.join(', ');
        }
        return 'None ';
    }

    connectedCallback() {
        getData().then(result => {
            this.data = result;
        }).catch(error => {
            console.error(error);
            this.dispatchEvent(new ShowToastEvent({
                title: error?.body?.message,
                message: 'Error getting data from Tooling API',
                variant: 'error',
                mode: 'sticky'
            }));
        });
    }

    selectionHandler(e) {
        this.showDetails = true;
        this.selectedRow = e.detail.selectedRows?.[0];
        this.updateDetailsQueued = true;
    }

    sortHandler(e) {
        let { fieldName: sortBy, sortDirection } = e.detail;
        this.sortedBy = sortBy;
        this.sortedDirection = sortDirection;
        this.data = this.sortData();
    }

    sortData() {
        console.log(this.sortedBy, this.sortedDirection);
        return JSON.parse(JSON.stringify(this.data)).sort((a, b) => {
            if(b[this.sortedBy] > a[this.sortedBy]) {
                return this.sortedDirection === 'asc' ? 1 : -1;
            } else {
                return this.sortedDirection === 'asc' ? -1 : 1;
            }
        });
    }

    updateDetails() {
        if(!this.selectedRow) { console.log('no row'); return;}
        if(this.selectedRow.coverage >= 75) {
            this.refs.progbar.classList.add('success');
        } else {
            this.refs.progbar.classList.remove('success');
        }
    }

    openClass() {
        window.open('/' + this.selectedRow.id, '_blank'); //TODO replace w/ nav mixin
    }

    renderedCallback() {
        if(this.updateDetailsQueued && this.refs.progbar) {
            this.updateDetailsQueued = false;
            this.updateDetails();
        }
    }
}

const COLUMNS = [
    { label: 'Class Name', fieldName: 'className', sortable: true },
    { label: 'Coverage (%)', fieldName: 'coverage', type: 'number', sortable: true, fixedWidth: 120 },
];