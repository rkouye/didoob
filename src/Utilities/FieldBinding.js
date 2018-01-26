// Coming from Angular I find field binding in React really verbose, so I made this utility to make it less verbose

function updateStateFromEvent(event, callback){
    this.setState({
        [event.target.name] : event.target.value
    }, callback);
}

function setFieldAsDirtyFromEvent(event){
    this.setState({
        [event.target.name +"$isDirty"] : true 
    });
}

function createBinderFor(component){

    const onChange = updateStateFromEvent.bind(component);
    const onBlur = setFieldAsDirtyFromEvent.bind(component);

    function bindAs (fieldName){
        return {
            name : fieldName,
            value : component.state[fieldName],
            onChange,
            onBlur,
        }
    }
    
    return {
       bindAs , 
       updateStateFromEvent : onChange
    }
}

export { createBinderFor };