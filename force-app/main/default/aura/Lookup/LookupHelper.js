({
	itemSelected : function(component, event, helper) {
        
        var target = event.target;         
        var SelIndex = helper.getIndexFrmParent(target,helper,"data-selectedIndex");
		
        if(SelIndex){
            var serverResult = component.get("v.server_result");
            var selItem = serverResult[SelIndex];
            if(selItem.val){
               component.set("v.selItem",selItem); 
               component.set("v.selItemId",selItem.val);
                component.set("v.selItemIdAcc",selItem.AccVal);
                component.set("v.selItemIdAccName",selItem.AccName);
                component.set("v.disableOpp",true);
                console.log('valll==='+selItem.val);
                component.set("v.oppCount",selItem.count);
                component.set("v.oppMap",selItem.oppMap);
                component.set("v.runChild",true);
                component.set("v.oppShow",true);
                console.log(selItem.oppMap);
                component.set("v.last_ServerResult",serverResult);
                var myEvent = $A.get("e.c:getaccradiobtnvalue");
                myEvent.setParams({"storeRadioAccEvent": "OldAccount"});
                myEvent.fire();
            } 
            component.set("v.server_result",null); 
            
        }
	}, 
    serverCall : function(component, event, helper) {  
        var target = event.target;  
        var searchText = target.value; 
        var last_SearchText = component.get("v.last_SearchText");
        //Escape button pressed 
        if (event.keyCode == 27 || !searchText.trim()) { 
            helper.clearSelection(component, event, helper);
        }else if(searchText.trim() != last_SearchText && searchText.length > 2){ 
            //  && /\s+$/.test(searchText) 
            //Save server call, if last text not changed
            //Search only when space character entered
         
            var objectName = component.get("v.objectName");
            
            console.log('obname',objectName);
            var field_API_text = component.get("v.field_API_text");
            console.log('field_API_text',field_API_text);
            var field_API_val = component.get("v.field_API_val");
            console.log('field_API_val',field_API_val);
            var field_API_val2 = component.get("v.field_API_val2");
            console.log('field_API_val2',field_API_val2);
            var field_API_val3 = component.get("v.field_API_val3");
            console.log('field_API_val3',field_API_val3);
            var field_API_search = component.get("v.field_API_search");
            console.log('field_API_search',field_API_search);
            var field_API_search2 = component.get("v.field_API_search2");
            console.log('field_API_search2',field_API_search2);
            //var limit = component.get("v.limit");
            console.log('searchText',searchText);
            var action = component.get("c.searchDB");
            action.setStorable();
            
            action.setParams({
                'objectName' : objectName,
                'fld_API_Text' : field_API_text,
                'fld_API_Val' : field_API_val,
                'fld_API_Val2' : field_API_val2,
                'fld_API_Val3' : field_API_val3,
                'fld_API_Search' : field_API_search,
                'fld_API_Search2' : field_API_search2,
                'searchText' : searchText
            });
    
            action.setCallback(this,function(a){
                console.log('in callback');
                this.handleResponse(a,component);
            });
            $A.enqueueAction(action); 
            component.set("v.last_SearchText",searchText.trim());
            
        }else if(searchText && last_SearchText && searchText.trim() == last_SearchText.trim() && searchText.length > 2){ 
            component.set("v.server_result",component.get("v.last_ServerResult"));
        }
/*            else if(searchText.length < 3){
            //helper.clearSelection(component, event, helper);
        }*/
	},
    handleResponse : function (res,component){
        if (res.getState() === 'SUCCESS') {
            var retObj = JSON.parse(res.getReturnValue());
            console.log('IDDDDD'+res.getReturnValue());
            if(retObj.length <= 0){
                var noResult = JSON.parse('[{"text":"No Results Found"}]');
                component.set("v.server_result",noResult); 
            	component.set("v.last_ServerResult",noResult);
                
            }else{
                component.set("v.server_result",retObj); 
            	component.set("v.last_ServerResult",retObj);
                component.set("v.objId",res.getReturnValue());
                console.log('in handle else');
                console.log('account id',retObj.val);
            }  
        }else if (res.getState() === 'ERROR'){
            var errors = res.getError();
            if (errors) {
                console.log('In Error');
                console.log(res);
                if (errors[0] && errors[0].message) {
                    console.log('No Records Found');
                }
            } 
        }
    },
    getIndexFrmParent : function(target,helper,attributeToFind){
        console.log('=======innn');
        //User can click on any child element, so traverse till intended parent found 
        
        var SelIndex = target.getAttribute(attributeToFind);
        while(!SelIndex){
            console.log('waooo');
            target = target.parentNode ;
            console.log('target'+target);
            SelIndex = helper.getIndexFrmParent(target,helper,attributeToFind);  
            console.log('SelIndex wao'+SelIndex);
        }       
        return SelIndex;
    },
    clearSelection: function(component, event, helper){        
        component.set("v.selItem",null);
        component.set("v.server_result",null);
        component.set("v.selItemIdAcc",null);
        component.set("v.selItemIdAccName",null);
    } 
})