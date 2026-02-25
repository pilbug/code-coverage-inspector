# code-coverage-inspector
Salesforce component to inspect code coverage in an org

## How to Setup
This LWC uses the Tooling API to query Apex Code Coverage. 
The Tooling API cannot be used from an LWC without a Named Credential.
One is provided in this repo you can use, but you must deploy:
1. The Named Credential
2. The Auth Identity Provider
3. The External Client App
In the External Client App change the placeholders for your email and Org Id.
On the Named Credential page in Salesforce Setup, edit, 
leave the launch flow checkbox checked, and Save to login with your credentials.

This repo also contains an App, Tab, and Lightning Page to plug and play.
If you prefer, just drop the codeCoverageInspector LWC onto the page of your choice.