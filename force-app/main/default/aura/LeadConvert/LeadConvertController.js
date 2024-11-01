({
    doInit : function(component, event, helper) {
        
        var selectedConnew = 'NewContact';
        component.set("v.showAcc",true);
        component.set("v.storeRadioCon" , selectedConnew);
        var selectedAccnew = 'NewAccount';
        var selectedOppnew = 'NewOpp';
        var selectedAccold = 'OldAccount';
        component.set("v.storeRadioAcc" , selectedAccnew);
        console.log('sled==='+component.get("v.storeRadioAcc"));
        component.set("v.storeRadioOpp",selectedOppnew);
        
        //////////////////////////////////////////////////////////////////////////////
        //var action = component.get("c.getOpportunityRecordTypes");
        console.log("Method Called33")
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log("state--"+state)
            if (state === "SUCCESS") {
                var data= response.getReturnValue(); 
                console.log("data--",JSON.stringify(data));
                component.set("v.opportunityRecTypes",data);
                
            } else if (state === "ERROR") {
                console.log('error in recordtype--- ');
            }
        });
        $A.enqueueAction(action);  
        
        /////////////////////////////////////////////////////////////////////////////////////        
        var action = component.get("c.checkLeadType");
        action.setParams({
            "recordId" : component.get("v.recordId")
        })
        action.setCallback(this,function(response){
            if (response.getState() === 'SUCCESS') {  
                var leadtype=response.getReturnValue();
                console.log('lead record type -- '+ leadtype);
                component.set("v.leadRecordType",leadtype);
                if(leadtype === 'B2B'){
                    component.set("v.accRecordType",'Business Account');
                    component.set("v.isBusiness",true);
                }else{
                    component.set("v.accRecordType",'Person Account');
                    component.set("v.isPerson",true);
                }
            }
        });
        $A.enqueueAction(action);
        
        ////////////////////////////////////////////////////////////////////////////////////        
        var action = component.get("c.getLeadDetail");
        action.setParams({
            "recordId" : component.get("v.recordId")
        })
        console.log('LeadID---'+component.get("v.recordId"));
        action.setCallback(this,function(response){
            if (response.getState() === 'SUCCESS') {  
                var leads=response.getReturnValue();
                console.log('Lead--'+JSON.stringify(leads[0]));
                component.set("v.opportunityName",leads[0].Company__c+'-');
                
                console.log("v.opportunityName---"+component.get("v.opportunityName"));   
                
                component.set("v.leadList",leads[0]);  
                console.log("leadList==="+ JSON.Stringify(component.get("v.leadList")));
            }
        });
        $A.enqueueAction(action);
        
    },
    ////////////////////////////////////////////////////////////////////////////////////  
    sectionOne : function(component, event, helper) {
        var acc = component.get("v.showAcc");
        console.log('acc---'+acc);
        if(acc == true){
            component.set("v.showAcc",false);
        }else{
            component.set("v.showAcc",true);
        } 
        helper.helperFun(component,event,'articleOne');
        
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    sectionTwo : function(component, event, helper) {
        
        var con = component.get("v.showCon");
        
        if(con == true){
            component.set("v.showCon",false);
        }else{
            component.set("v.showCon",true);
        }
        console.log(con);
        helper.helperFun(component,event,'articleTwo');
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    sectionThree : function(component, event, helper) {
        var opp = component.get("v.showOpp");
        
        console.log('showOpp=='+opp);
        if(opp == true){
            component.set("v.showOpp",false);
        }else{
            component.set("v.showOpp",true);
        }
        helper.helperFun(component,event,'articleThree');
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onChangeAcc : function(component, event) {
        
        component.set("v.showAcc",true);
        var selected = event.getSource().get("v.text");
        component.set("v.storeRadioAcc" , selected);
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onGroupcon: function(component, event) {
        component.set("v.showCon",true)
        var selected = event.getSource().get("v.text");
        component.set("v.storeRadioCon" , selected);
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onCheck: function(component, event) {
        var selectedchkbox = event.getSource().get("v.value");
        console.log('selectedchkbox--'+selectedchkbox);                      
        if(selectedchkbox){
            console.log('in if');
            component.set('v.opportunityCreate',true);
        }
        else{
            console.log('in else');
            component.set('v.opportunityCreate',false);
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onGroupopp: function(component, event) {
        var selected = event.getSource().get("v.text");
        console.log(selected);
        component.set("v.storeRadioOpp" , selected);
        if(selected == 'OldOpp'){
            component.set("v.openChild",true);
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    getaccradiobtnvalue : function(component, event, helper){
        var storeRadioAccEventval = event.getParam("storeRadioAccEvent");
        component.set("v.storeRadioAcc" , storeRadioAccEventval);
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    cancelBtn : function(component, event, helper) { 
        // Close the action panel 
        var dismissActionPanel = $A.get("e.force:closeQuickAction"); 
        dismissActionPanel.fire(); 
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onOppRecordTypeChange: function(component){
        var oppRecordTypeCmp = component.get("v.showOpp")==true?component.find("oppRecordTypeIdTrue"):component.find("oppRecordTypeIdFalse");
        component.set("v.oppRecordType", oppRecordTypeCmp.get("v.value"));
        console.log('OppRecordType-->'+component.get("v.oppRecordType"));
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    onAccRecordTypeChange: function(component){
        console.log('Here147--');
        var accRecordTypeCmp = component.get("v.showAcc")==true?component.find("accRecordTypeIdTrue"):component.find("accRecordTypeIdFalse");
        console.log('accRecordTypeCmp--',accRecordTypeCmp);
        component.set("v.accRecordType", accRecordTypeCmp.get("v.value"));
        if(accRecordTypeCmp.get("v.value") == 'Competitor'){
            component.set("v.oppCheckbox",true);
            component.set("v.disableOpportunity",true);
        }else{
            component.set("v.oppCheckbox",false);
            component.set("v.disableOpportunity",false);
        }
        console.log('accRecordType-->'+component.get("v.accRecordType"));
    },
    ////////////////////////////////////////////////////////////////////////////////////      
    leadConvert2 :function(component, event, helper){ 
        
        var getoppId = '';
        var recId = component.get("v.recordId");
        console.log('recId$$$$$$'+recId);
        var selectedCon= component.get("v.storeRadioCon");
        console.log('selectedCon==='+selectedCon);
        var selectedOpp= component.get("v.storeRadioOpp");
        console.log('selectedOpp==='+selectedOpp);
        var showAcc = component.get("v.showAcc");
        var leadList=component.get("v.leadList");
        var leadCompanyName=leadList.Company;
       // var parentCom=leadList[0].Parent_Company__c;
        console.log('leadCompanyName:'+leadCompanyName);
        //var zzone=component.get("v.zone");
        //console.log('zzone192---:'+zzone);
        
        var accstatusname= component.get("v.storeRadioAcc");
        if(showAcc == true){
            var accName=component.find("AccountName1").get("v.value");
        }
        if(showAcc == false){
            var accName=component.find("AccountName2").get("v.value");
        }
        var accountRecordType=component.get("v.accRecordType");
        console.log('accountRecordType==='+accountRecordType);
        var opportunityRecordType=component.get("v.oppRecordType");
        
        var checkOppotCreation = component.get("v.opportunityCreate");
        console.log('checkOppotCreation==='+checkOppotCreation);
        var selectedOppRecrdtype=component.get("v.selectedOppRecordType");
        console.log('selectedOppRecrdtype==='+selectedOppRecrdtype);
        var opprecTypeSelected;
     
        var showCon = component.get("v.showCon");
        console.log('showCon2=='+showCon);
        var accID1 = component.get("v.selItemId"); 
        //console.log('testACCID'+accID1);
        if(showCon == true){
            var conFirstName=component.find("firstnameid1").get("v.value");
            console.log('Fn1=='+conFirstName);
            var conLastName=component.find("lastnameid1").get("v.value");
            console.log('Ln1=='+conLastName);
            var Salutation=component.find("makeId1").get("v.value"); 
            console.log('s1=='+Salutation);
            
            
            var idCon = component.get("v.selItemIdCon");
            var idAcc = component.get("v.selItemId");
            console.log('IDDDDDCon==='+idCon);
            
            
        }
        if(showCon == false){
            var conFirstName=component.find("firstnameid2").get("v.value");
            var conLastName=component.find("lastnameid2").get("v.value");
            console.log('Ln2=='+conLastName);
            console.log('Fn2=='+conFirstName);
        }             
                                if(checkOppotCreation){
                                    console.log('fetched if');
                                    var params={'recordId':recId,
                                                'Name':accName,
                                                'AccountRecordType':accountRecordType,
                                                'existingAccountId':accID1,
                                                'Salutation':Salutation,
                                                'FirstName':conFirstName,
                                                'LastName':conLastName,
                                                'existingContactId':idCon,
                                                'accstatusname':accstatusname,
                                                'conStatus':selectedCon,
                                                'opportunityCreate':checkOppotCreation,
                                                'OpportunityrecordTypeName':selectedOppRecrdtype
                                               
                                               }
                                    }
                                else{
                                    console.log('fetched else');
                                    var params={'recordId':recId,
                                                'Name':accName,
                                                'AccountRecordType':accountRecordType,
                                                'existingAccountId':accID1,
                                                'Salutation':Salutation,
                                                'FirstName__c':conFirstName,
                                                'LastLaName':conLastName,
                                                'existingContactId':idCon,
                                                'accstatusname':accstatusname,
                                                'conStatus':selectedCon
                                               }
                                    }
                                
                                console.log('in action@2');
                                var action2 = component.get("c.convertLead");                                
                                action2.setParams({
                                    'paramMap':params                                   
                                })                                 
                                
                                action2.setCallback(this,function(response){
                                    if(response.getState() === "ERROR"){                  
                                        var errors = response.getError();
                                        console.log('error'+JSON.stringify(errors));
                                        if (errors) {
                                            if (errors[0] && errors[0].message) {
                                                console.log("Error message: " +
                                                            errors[0].message);
                                            }
                                        }
                                        console.log('error');
                                    }
                                    if (response.getState() === 'SUCCESS') { 
                                        var recId = response.getReturnValue();
                                        var toastEvent = $A.get("e.force:showToast");
                                        toastEvent.setParams({                           
                                            "title": "Success!",
                                            "type":"success",
                                            "message": "Lead Converted Successfully"
                                        });
                                        toastEvent.fire();
                                        var navEvt = $A.get("e.force:navigateToSObject");
                                        navEvt.setParams({
                                            "recordId": recId,
                                            "slideDevName": "related"
                                        });
                                        navEvt.fire();
                                    }
                                }
                                                   );
                                $A.enqueueAction(action2);
    }
})