import { useState } from "react"
import { AlertOptions } from "../types"

export const useCustomAlert = () => { 
    const [alertConfig, setAlertConfig] = useState<AlertOptions | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const showAlert = (options: AlertOptions) => { 
        setAlertConfig(options);
        setIsVisible(true);
    }

    const hideAlert = () => { 
        setIsVisible(false);
        setAlertConfig(null);
    }

    return {
        alertConfig,
        isVisible,
        showAlert,
        hideAlert,
    }
}