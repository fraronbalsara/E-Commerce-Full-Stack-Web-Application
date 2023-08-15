import { useState, useRef, useEffect } from "react";
import '../App.css'

const ButtonSpinner = (defaultText = 'Load', loadingText = 'Loading...') => {
    const [isLoading, setIsLoading] = useState(false);
    const element = useRef(null);

    useEffect(()=>{
        if(isLoading && element.current != null){
            element.current.disabled = true;
            element.current.innerHTML = '<i class="fa fa-spinner fa-spin"></i> ' + loadingText;
        }
        else if(element.current != null){
            element.current.disabled = false;
            element.current.innerHTML = defaultText;
        }
    },[isLoading])
    return [element, setIsLoading];
}
export default ButtonSpinner;