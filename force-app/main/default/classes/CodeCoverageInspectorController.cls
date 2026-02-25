public with sharing class CodeCoverageInspectorController {
    // TODO make API configurable
    private static String endPoint = '/query/?q=';

    @AuraEnabled 
    public static CodeCoverageInspectorRow[] getData2() {
        CodeCoverageInspectorRow[] rows = new CodeCoverageInspectorRow[]{};
        
        String queryStr = 'SELECT+NumLinesCovered,ApexClassOrTriggerId,ApexClassOrTrigger.Name,NumLinesUncovered,Coverage+FROM+ApexCodeCoverageAggregate+ORDER+BY+ApexClassOrTrigger.Name';
        
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint('callout:ToolingAPI' + endPoint + queryStr);
        //req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID());
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('GET');
        req.setTimeout(120000);

        Http http = new Http();
        System.debug('About to do callout...');
        HTTPResponse res = http.send(req);

        CalloutLog__c log = new CalloutLog__c();
        log.RequestBody__c = req.getBody();
        log.ResponseBody__c = res.getBody();
        log.StatusCode__c = res.getStatusCode();
        log.Endpoint__c = req.getEndpoint();
        log.Status__c = res.getStatus();
        System.debug(log);
        insert log;

        if (res.getStatusCode() == 200) {
            ApexCodeCoverageAggregate jsonStructure = 
            (ApexCodeCoverageAggregate)JSON.deserialize(res.getBody(), ApexCodeCoverageAggregate.class);
            rows = convertJsonStructure(jsonStructure);
            return rows;
        } else {
            throw new AuraHandledException(res.getStatusCode() + ' ' + res.getStatus());
        }
    }

    private static CodeCoverageInspectorRow[] convertJsonStructure(ApexCodeCoverageAggregate agg) {
        CodeCoverageInspectorRow[] rows = new CodeCoverageInspectorRow[]{};
        for (ApexCodeCoverageAggregate.Record record : agg.records) {
            CodeCoverageInspectorRow thisRow = new CodeCoverageInspectorRow();
            thisRow.className = record.ApexClassOrTrigger.Name;
            thisRow.id = record.ApexClassOrTriggerId;
            thisRow.coveredLines = record.Coverage.coveredLines;
            thisRow.uncoveredLines = record.Coverage.uncoveredLines;
            Integer numCovered = record.NumLinesCovered;
            Integer numUncovered = record.NumLinesUncovered;
            thisRow.coverage = numCovered + numUncovered == 0 ? 0 :
                100 * numCovered / (numCovered + numUncovered);
            rows.add(thisRow);
        }
        return rows;
    }

    private class CodeCoverageInspectorRow {
        @AuraEnabled public String id {get; set;}
        @AuraEnabled public String className {get; set;}
        @AuraEnabled public Decimal coverage {get; set;}
        @AuraEnabled public Integer[] coveredLines {get; set;}
        @AuraEnabled public Integer[] uncoveredLines {get; set;}
    }
}