({
	itemSelected : function(component, event, helper) {
		helper.itemSelected(component, event, helper);
	},
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    },
    serverCall :  function(component, event, helper) {
		helper.serverCall(component, event, helper); 
	},
    clearSelection : function(component, event, helper){
        helper.clearSelection(component, event, helper);
    },
    clearList : function(component, event, helper){
        window.setTimeout(
            $A.getCallback(function() {
                if(component.get("v.selItem") == null){
                     var target = event.target;
                    target.value = '';
                    component.set("v.selItem",null);
                    component.set("v.server_result",null);
                }else{
                           
                }                   
            }), 1500
        );
    } 
})