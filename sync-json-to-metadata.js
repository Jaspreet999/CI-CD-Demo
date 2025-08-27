const fs = require("fs");
const path = require("path");

// Input/Output paths
const jsonFile = path.join(__dirname, "../Additional-files/my_record.json");
const metadataFile = path.join(__dirname, "../force-main/main/default/customMetadata/JSON_HOLDER.TEST.md-meta.xml");

// Read JSON
const jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

// Convert JSON to Metadata XML
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>Test</label>
    <protected>false</protected>
    <values>
        <field>Value__c</field>
        <value xsi:type="xsd:string">${jsonData}</value>
    </values>
</CustomMetadata>`;

// Write output
fs.writeFileSync(metadataFile, xmlContent, "utf8");