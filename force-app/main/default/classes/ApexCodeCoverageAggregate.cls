public with sharing class ApexCodeCoverageAggregate {
    public String entityTypeName{get;set;}
    public String queryLocator{get;set;}
    public Boolean done{get;set;}
    public Integer totalSize{get;set;}
    public List<Record> records{get;set;}
    public Integer size{get;set;}

	public class Record {
		public String ApexClassOrTriggerId{get;set;}
		public Integer NumLinesCovered{get;set;}
		public ApexClassOrTrigger ApexClassOrTrigger{get;set;}
		public attributes attributes{get;set;}
		public Integer NumLinesUncovered{get;set;}
		public Coverage Coverage{get;set;}
	}

	public class Coverage {
		public List<Integer> coveredLines{get;set;}
		public List<Integer> uncoveredLines{get;set;}
	}

	public class attributes{
		public String type{get;set;}
		public String url{get;set;}
	}
    
	public class ApexClassOrTrigger{
		public attributes attributes{get;set;}
		public String Name{get;set;}
	}
}